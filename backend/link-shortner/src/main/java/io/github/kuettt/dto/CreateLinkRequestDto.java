package io.github.kuettt.dto;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.URL;


public record CreateLinkRequestDto(@NotBlank @URL String originalUrl) {
}
