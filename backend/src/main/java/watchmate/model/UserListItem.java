package watchmate.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(
    name = "user_list_items",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_list_item_list_title", columnNames = {"list_id", "title_id"})
    }
)
public class UserListItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "added_at", nullable = false)
    private OffsetDateTime addedAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "list_id", nullable = false)
    private UserList userList;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "title_id", nullable = false)
    private Title title;

    @PrePersist
    public void prePersist() {
        this.addedAt = OffsetDateTime.now();
    }
}
