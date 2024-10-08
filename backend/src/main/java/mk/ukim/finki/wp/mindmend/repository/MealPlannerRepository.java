package mk.ukim.finki.wp.mindmend.repository;

import mk.ukim.finki.wp.mindmend.model.ApplicationUser;
import mk.ukim.finki.wp.mindmend.model.habits.MealPlanner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MealPlannerRepository extends JpaRepository<MealPlanner,Long> {
    Optional<MealPlanner> getMealPlannerByUser(ApplicationUser user);
}
