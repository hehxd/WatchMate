package watchmate.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "titles")
public class Title {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "imdb_id", nullable = false, unique = true, length = 20)
    private String imdbId;

    @Column(nullable = false, length = 255)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TitleType type;

    @Column(name = "year_text", length = 20)
    private String yearText;

    @Column(columnDefinition = "text")
    private String plot;

    @Column(name = "poster_url", columnDefinition = "text")
    private String posterUrl;

    @Column(name = "imdb_rating", precision = 3, scale = 1)
    private BigDecimal imdbRating;

    @Column(name = "total_seasons")
    private Integer totalSeasons;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @OneToMany(mappedBy = "title", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Rating> ratings = new ArrayList<>();

    @OneToMany(mappedBy = "title", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "title", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserListItem> listItems = new ArrayList<>();

    @OneToMany(mappedBy = "title", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SeriesProgress> seriesProgressList = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        this.createdAt = OffsetDateTime.now();
    }

}
