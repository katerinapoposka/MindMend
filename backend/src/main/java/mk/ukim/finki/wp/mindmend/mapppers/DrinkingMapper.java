package mk.ukim.finki.wp.mindmend.mapppers;

import mk.ukim.finki.wp.mindmend.model.DTO.DrinkingTrackerDTO;
import mk.ukim.finki.wp.mindmend.model.habits.DrinkingTracker;

import java.util.ArrayList;
import java.util.List;

public class DrinkingMapper {
    public static DrinkingTrackerDTO MapToViewModel(DrinkingTracker drinkingTracker)
    {
        return new DrinkingTrackerDTO(
                drinkingTracker.getApplicationUser().getId(),
                drinkingTracker.getNumOfDrinks(),
                drinkingTracker.getMaxDrinks()
        );
    }
    public static List<DrinkingTrackerDTO> MapToListViewModel(List<DrinkingTracker> drinkingTrackers){
        List<DrinkingTrackerDTO> drinkingTrackerDTOS = new ArrayList<>();
        for (var d : drinkingTrackers){
            drinkingTrackerDTOS.add(MapToViewModel(d));
        }
        return drinkingTrackerDTOS;
    }
}
