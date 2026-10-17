package io.github.kuettt.dto;

import java.time.Instant;

public record LinkResponseDto(Long id, String code, String originalUrl, Instant createdAt, long totalClicks) {
}
