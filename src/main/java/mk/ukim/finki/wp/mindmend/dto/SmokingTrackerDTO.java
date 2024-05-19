package mk.ukim.finki.wp.mindmend.dto;

import lombok.Getter;

@Getter
public class SmokingTrackerDTO {
    private int cigarettesPerDay;

    public SmokingTrackerDTO() {
        this.cigarettesPerDay=5;
    }

    public SmokingTrackerDTO(int cigarettesPerDay) {
        this.cigarettesPerDay = cigarettesPerDay;
    }
}
