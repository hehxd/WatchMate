package watchmate.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import watchmate.dto.AddTitleToListRequest;
import watchmate.dto.CreateUserListRequest;
import watchmate.dto.UserListItemResponse;
import watchmate.dto.UserListResponse;
import watchmate.service.UserListService;
import watchmate.security.CurrentUserProvider;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/lists")
@RequiredArgsConstructor
public class UserListController {

    private final UserListService userListService;
    private final CurrentUserProvider currentUserProvider;

    @PostMapping
    public ResponseEntity<UserListResponse> createList(@RequestBody CreateUserListRequest request) {
        UUID userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userListService.createList(userId, request));
    }

    @GetMapping("/me")
    public ResponseEntity<List<UserListResponse>> getMyLists() {
        UUID userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.ok(userListService.getUserLists(userId));
    }

    @PostMapping("/{listId}/items")
    public ResponseEntity<UserListItemResponse> addTitleToList(
            @PathVariable Long listId,
            @RequestBody AddTitleToListRequest request) {
        UUID userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userListService.addTitleToList(userId, listId, request));
    }

    @GetMapping("/{listId}/items")
    public ResponseEntity<List<UserListItemResponse>> getListItems(@PathVariable Long listId) {
        UUID userId = currentUserProvider.getCurrentUserId();
        return ResponseEntity.ok(userListService.getListItems(userId, listId));
    }

    @DeleteMapping("/{listId}/items/{titleId}")
    public ResponseEntity<Void> removeTitleFromList(
            @PathVariable Long listId,
            @PathVariable Long titleId) {
        UUID userId = currentUserProvider.getCurrentUserId();
        userListService.removeTitleFromList(userId, listId, titleId);
        return ResponseEntity.noContent().build();
    }
}