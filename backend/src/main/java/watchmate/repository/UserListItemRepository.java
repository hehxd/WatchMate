package watchmate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import watchmate.model.UserListItem;

import java.util.List;
import java.util.Optional;

public interface UserListItemRepository extends JpaRepository<UserListItem, Long> {

    List<UserListItem> findByUserListId(Long listId);

    Optional<UserListItem> findByUserListIdAndTitleId(Long listId, Long titleId);

    void deleteByUserListIdAndTitleId(Long listId, Long titleId);
    
}
