package watchmate.service;

import watchmate.dto.AddTitleToListRequest;
import watchmate.dto.CreateUserListRequest;
import watchmate.dto.UserListItemResponse;
import watchmate.dto.UserListResponse;

import java.util.List;
import java.util.UUID;

public interface UserListService {
    UserListResponse createList(UUID userId, CreateUserListRequest request);
    List<UserListResponse> getUserLists(UUID userId);
    UserListItemResponse addTitleToList(UUID userId, Long listId, AddTitleToListRequest request);
    List<UserListItemResponse> getListItems(UUID userId, Long listId);
    void removeTitleFromList(UUID userId, Long listId, Long titleId);
}
