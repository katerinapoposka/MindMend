import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import "../../css/SleepTracker/SleepTracker.css";

function EditSleepTracker({ isAdmin, user, setUser }) {
  const [formData, setFormData] = useState({
    recommendedSleepTime: "",
    wakeUpTime: "",
    bedTime: "",
  });
  const [errors, setErrors] = useState({
    connectionErrorEditById: "",
    connectionErrorFindById: "",
    wakeUpTime: "",
    bedTime: "",
  });

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `http://localhost:8080/api/sleep-tracker/${id}`
        );    
        if(user != null && user.username !== result.data.username && !isAdmin) {
          navigate("/sleep-tracker");
        }
        setFormData(result.data);
        setLoading(false);
      } catch (error) {
        setErrors((prevState) => ({
          ...prevState,
          connectionErrorFindById:
            "There was an error accessing the sleep tracker",
        }));
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user, navigate, isAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.wakeUpTime || !formData.bedTime) {
      setErrors({
        wakeUpTime: !formData.wakeUpTime ? "Wake-up time is required!" : "",
        bedTime: !formData.bedTime ? "Bed time is required!" : "",
      });
      return;
    }
  
    const updatedFormData = {
      ...formData,
      recommendedSleepTime: formData.recommendedSleepTime || "8",
    };
  
    const today = new Date();
    const todayDate = today.toISOString().split('T')[0]; 
  
    const parseTime = (timeStr) => {
      const [hours, minutes] = timeStr.split(':');
      return new Date(`${todayDate}T${hours}:${minutes}:00Z`);
    };
  
    const bedtime = parseTime(formData.bedTime);
    const wakeupTime = parseTime(formData.wakeUpTime);
  
    const now = new Date();
  
    if (bedtime <= now) {
      bedtime.setDate(bedtime.getDate() + 1); 
    }
    
    if (wakeupTime <= now) {
      wakeupTime.setDate(wakeupTime.getDate() + 1); 
    }
    const preBedtimeReminderTime = new Date(bedtime.getTime() - 30 * 60000);
  
    // Debug
    console.log("Bedtime:", bedtime.toISOString());
    console.log("Wakeup Time:", wakeupTime.toISOString());
    console.log("Pre-Bedtime Reminder Time:", preBedtimeReminderTime.toISOString());
  
    if (isNaN(bedtime.getTime()) || isNaN(wakeupTime.getTime()) || isNaN(preBedtimeReminderTime.getTime())) {
      setErrors({
        ...errors,
        connectionErrorEditById: "Invalid time value provided.",
      });
      return;
    }
  
    const reminders = [];
    reminders.push({
      time: preBedtimeReminderTime.toISOString(),
      message: `Time to wind down! You should be in bed in ${formData.recommendedSleepTime} hours.`,
      habitId: id,
    });
  
    reminders.push({
      time: wakeupTime.toISOString(),
      message: "Time to wake up!",
      habitId: id,
    });

    localStorage.setItem(`${user.username}_sleep_reminders`, JSON.stringify(reminders));
  
    setLoading(true);
    try {
      await axios.post(
        `http://localhost:8080/api/sleep-tracker/edit/${id}`,
        updatedFormData
      );
      navigate("/sleep-tracker");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorEditById: "There was an error editing the sleep tracker",
      }));
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  return (
    <>
      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : !errors.connectionErrorEditById && !errors.connectionErrorFindById ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          mt={2}
          className="fade-in-content"
        >
          {loading ? (
            <div>
              <CircularProgress />
            </div>
          ) : (
            <Grid
              item
              xs={10}
              sm={10}
              md={8}
              lg={6}
              sx={{
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                padding: "16px",
                backgroundColor: "white",
                margin: "16px",
              }}
            >
              {(errors.wakeUpTime || errors.bedTime) && (
                <div className="flex flex-col items-center mt-5">
                  {errors.wakeUpTime && (
                    <Alert severity="error" className="mb-2">
                      {errors.wakeUpTime}
                    </Alert>
                  )}
                  {errors.bedTime && (
                    <Alert severity="error" className="mb-2">
                      {errors.bedTime}
                    </Alert>
                  )}
                </div>
              )}
              <form onSubmit={handleSubmit} className="input-form-container">
                <div className="input-group">
                  <label
                    htmlFor="recommendedSleepTime"
                    className="label-for-form"
                  >
                    Recommended sleep time (in hours):
                  </label>
                  <div>
                    <input
                      className="input-spaces"
                      type="number"
                      id="recommendedSleepTime"
                      name="recommendedSleepTime"
                      value={formData.recommendedSleepTime}
                      onChange={handleChange}
                      min="0"
                      max="24"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="wakeUpTime" className="label-for-form">
                    Wake-up time:
                  </label>
                  <div>
                    <input
                      className="input-spaces"
                      type="time"
                      id="wakeUpTime"
                      name="wakeUpTime"
                      value={formData.wakeUpTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="bedTime" className="label-for-form">
                    Bed time:
                  </label>
                  <div>
                    <input
                      className="input-spaces"
                      type="time"
                      id="bedTime"
                      name="bedTime"
                      value={formData.bedTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="position-button">
                  <button id="add-form-button" type="submit">
                    <span>Edit Sleep Tracker</span>
                  </button>
                </div>
              </form>
            </Grid>
          )}
        </Grid>
      ) : (
        <div className="d-flex justify-content-center align-items-center error-container">
          {errors.connectionErrorEditById && (
            <div className="p-2 error">{errors.connectionErrorEditById}</div>
          )}
          {errors.connectionErrorFindById && (
            <div className="p-2 error">{errors.connectionErrorFindById}</div>
          )}
        </div>
      )}
    </>
  );
}

export default EditSleepTracker;
