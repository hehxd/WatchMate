package watchmate.service.implementation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import watchmate.dto.AddTitleToListRequest;
import watchmate.dto.CreateUserListRequest;
import watchmate.dto.UserListItemResponse;
import watchmate.dto.UserListResponse;
import watchmate.model.Title;
import watchmate.model.User;
import watchmate.model.UserList;
import watchmate.model.UserListItem;
import watchmate.repository.TitleRepository;
import watchmate.repository.UserListItemRepository;
import watchmate.repository.UserListRepository;
import watchmate.repository.UserRepository;
import watchmate.service.UserListService;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserListServiceImpl implements UserListService {

    private final UserListRepository userListRepository;
    private final UserListItemRepository userListItemRepository;
    private final UserRepository userRepository;
    private final TitleRepository titleRepository;

    @Override
    public UserListResponse createList(UUID userId, CreateUserListRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserList userList = new UserList();
        userList.setUser(user);
        userList.setName(request.getName());

        UserList saved = userListRepository.save(userList);

        return new UserListResponse(saved.getId(), saved.getName());
    }

    @Override
    public List<UserListResponse> getUserLists(UUID userId) {
        return userListRepository.findByUserId(userId)
                .stream()
                .map(list -> new UserListResponse(list.getId(), list.getName()))
                .toList();
    }

    @Override
    public UserListItemResponse addTitleToList(UUID userId, Long listId, AddTitleToListRequest request) {
        UserList userList = userListRepository.findByIdAndUserId(listId, userId)
                .orElseThrow(() -> new RuntimeException("List not found"));

        Title title = titleRepository.findById(request.getTitleId())
                .orElseThrow(() -> new RuntimeException("Title not found"));

        UserListItem item = userListItemRepository.findByUserListIdAndTitleId(listId, request.getTitleId())
                .orElse(new UserListItem());

        item.setUserList(userList);
        item.setTitle(title);

        UserListItem saved = userListItemRepository.save(item);

        return new UserListItemResponse(
                saved.getId(),
                saved.getTitle().getId(),
                saved.getTitle().getImdbId(),
                saved.getTitle().getTitle(),
                saved.getTitle().getType().name(),
                saved.getTitle().getPosterUrl()
        );
    }

    @Override
    public List<UserListItemResponse> getListItems(UUID userId, Long listId) {
        userListRepository.findByIdAndUserId(listId, userId)
                .orElseThrow(() -> new RuntimeException("List not found"));

        return userListItemRepository.findByUserListId(listId)
                .stream()
                .map(item -> new UserListItemResponse(
                        item.getId(),
                        item.getTitle().getId(),
                        item.getTitle().getImdbId(),
                        item.getTitle().getTitle(),
                        item.getTitle().getType().name(),
                        item.getTitle().getPosterUrl()
                ))
                .toList();
    }

    @Override
    public void removeTitleFromList(UUID userId, Long listId, Long titleId) {
        userListRepository.findByIdAndUserId(listId, userId)
                .orElseThrow(() -> new RuntimeException("List not found"));

        userListItemRepository.deleteByUserListIdAndTitleId(listId, titleId);
    }
}
