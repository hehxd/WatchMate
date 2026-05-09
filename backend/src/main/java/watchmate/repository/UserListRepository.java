package watchmate.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import watchmate.model.UserList;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserListRepository extends JpaRepository<UserList, Long> {

    List<UserList> findByUserId(UUID userId);

    Optional<UserList> findByIdAndUserId(Long id, UUID userId);

    Optional<UserList> findByUserIdAndNameIgnoreCase(UUID userId, String name);
    
}