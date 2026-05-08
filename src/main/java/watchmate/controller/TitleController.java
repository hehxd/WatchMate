package watchmate.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import watchmate.dto.TitleRequest;
import watchmate.dto.TitleResponse;
import watchmate.dto.TitleSearchResponse;
import watchmate.service.TitleService;

import java.util.List;

@RestController
@RequestMapping("/api/titles")
@RequiredArgsConstructor
public class TitleController {

    private final TitleService titleService;

    @PostMapping
    public ResponseEntity<TitleResponse> createTitle(@RequestBody TitleRequest request) {
        TitleResponse response = titleService.createTitle(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TitleResponse> getTitleById(@PathVariable Long id) {
        TitleResponse response = titleService.getTitleById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<TitleSearchResponse>> getAllTitles() {
        List<TitleSearchResponse> response = titleService.getAllTitles();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<List<TitleSearchResponse>> searchTitles(@RequestParam String query) {
        List<TitleSearchResponse> response = titleService.searchTitles(query);
        return ResponseEntity.ok(response);
    }
}
