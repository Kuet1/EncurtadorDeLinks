package io.github.kuettt.dto;

import java.time.Instant;
import java.util.List;

public record LinkStatsResponseDto(String code, String originalUrl, Instant createdAt, long totalClicks,
                                   List<DailyClicksResponseDto> clicksByDay) {
}
