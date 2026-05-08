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

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/lists")
@RequiredArgsConstructor
public class UserListController {

    private final UserListService userListService;

    @PostMapping("/user/{userId}")
    public ResponseEntity<UserListResponse> createList(
            @PathVariable UUID userId,
            @RequestBody CreateUserListRequest request
    ) {
        UserListResponse response = userListService.createList(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserListResponse>> getUserLists(@PathVariable UUID userId) {
        List<UserListResponse> response = userListService.getUserLists(userId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{listId}/user/{userId}/items")
    public ResponseEntity<UserListItemResponse> addTitleToList(
            @PathVariable UUID userId,
            @PathVariable Long listId,
            @RequestBody AddTitleToListRequest request
    ) {
        UserListItemResponse response = userListService.addTitleToList(userId, listId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{listId}/user/{userId}/items")
    public ResponseEntity<List<UserListItemResponse>> getListItems(
            @PathVariable UUID userId,
            @PathVariable Long listId
    ) {
        List<UserListItemResponse> response = userListService.getListItems(userId, listId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{listId}/user/{userId}/items/{titleId}")
    public ResponseEntity<Void> removeTitleFromList(
            @PathVariable UUID userId,
            @PathVariable Long listId,
            @PathVariable Long titleId
    ) {
        userListService.removeTitleFromList(userId, listId, titleId);
        return ResponseEntity.noContent().build();
    }
}
