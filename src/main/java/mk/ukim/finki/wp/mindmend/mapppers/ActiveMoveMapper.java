package mk.ukim.finki.wp.mindmend.mapppers;

import mk.ukim.finki.wp.mindmend.dto.ActiveMoveTrackerDTO;
import mk.ukim.finki.wp.mindmend.dto.MealPlannerDTO;
import mk.ukim.finki.wp.mindmend.model.ActiveMoveTracker;
import mk.ukim.finki.wp.mindmend.model.MealPlanner;

import java.util.ArrayList;
import java.util.List;

public class ActiveMoveMapper {
    public static ActiveMoveTrackerDTO MapToViewModel(ActiveMoveTracker moveTracker)
    {
        return new ActiveMoveTrackerDTO(
                moveTracker.getDailyStepsGoal()
        );
    }
    public static List<ActiveMoveTrackerDTO> MapToListViewModel(List<ActiveMoveTracker> moveTrackers){
        List<ActiveMoveTrackerDTO> moveTrackerDTOS = new ArrayList<>();
        for (var a : moveTrackers){
            moveTrackerDTOS.add(MapToViewModel(a));
        }
        return moveTrackerDTOS;
    }
}
