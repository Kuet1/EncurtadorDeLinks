package io.github.kuettt.dto;

import java.time.LocalDate;

public record DailyClicksResponseDto(LocalDate date, long clicks) {
}
