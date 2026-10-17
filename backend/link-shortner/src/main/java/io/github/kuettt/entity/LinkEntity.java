package io.github.kuettt.entity;


import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "link")
public class LinkEntity extends PanacheEntity {

    @Column(unique = true, nullable = false, length = 8)
    public String code;

    @Column(length = 2048, nullable = false)
    public String originalUrl;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    public Instant createdAt;
}
