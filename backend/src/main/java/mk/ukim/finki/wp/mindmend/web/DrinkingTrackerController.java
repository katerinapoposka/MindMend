package mk.ukim.finki.wp.mindmend.web;

import mk.ukim.finki.wp.mindmend.model.DTO.DrinkingTrackerDTO;
import mk.ukim.finki.wp.mindmend.model.habits.DrinkingTracker;
import mk.ukim.finki.wp.mindmend.service.DrinkingTrackerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin({"chrome-extension://migfoencdaebpjdhkjodepnekmapmjlb", "http://localhost:3000"})
@RequestMapping("/api/drinking-tracker")
public class DrinkingTrackerController {
    private final DrinkingTrackerService drinkingTrackerService;

    public DrinkingTrackerController(DrinkingTrackerService drinkingTrackerService) {
        this.drinkingTrackerService = drinkingTrackerService;
    }

    @GetMapping(value = {"","/"})
    public List<DrinkingTracker> getDrinkTrackers()
    {
        return drinkingTrackerService.findAllDrinkingTrackers();
    }

    @GetMapping("/{id}")
    public DrinkingTracker getDrinkTrackerById(@PathVariable Long id)
    {
        return drinkingTrackerService.findById(id);
    }

    @PostMapping("/add")
    public DrinkingTracker create(@RequestBody DrinkingTrackerDTO drinkingTrackerDTO)
    {
        return drinkingTrackerService.create(
                drinkingTrackerDTO.getNumOfDrinks(),
                drinkingTrackerDTO.getMaxDrinks()
        );
    }
    @PostMapping("/edit/{id}")
    public DrinkingTracker edit(@RequestBody DrinkingTrackerDTO drinkingTrackerDTO, @PathVariable Long id)
    {
        return drinkingTrackerService.edit(id,
                drinkingTrackerDTO.getNumOfDrinks(),
                drinkingTrackerDTO.getMaxDrinks());
    }
    @DeleteMapping("/delete/{id}")
    public DrinkingTracker delete(@PathVariable Long id)
    {
        return drinkingTrackerService.delete(id);
    }
}
