package mk.ukim.finki.wp.mindmend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class DrinkingTracker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int numOfDrinks;
    @OneToOne
    ApplicationUser applicationUser;

    @Transient
    private static final int MAX_DRINKS = 4;

    public DrinkingTracker() {
        this.numOfDrinks=0;
    }

    public DrinkingTracker(ApplicationUser applicationUser) {
        super();
        this.applicationUser = applicationUser;
        this.numOfDrinks=0;
    }

    public DrinkingTracker(int numOfDrinks, ApplicationUser applicationUser) {
        super();
        this.numOfDrinks = numOfDrinks;
        this.applicationUser = applicationUser;
    }
}
