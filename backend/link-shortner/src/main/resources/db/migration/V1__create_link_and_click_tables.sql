create sequence click_seq start with 1 increment by 50;
create sequence link_seq start with 1 increment by 50;

create table link (
    id bigint not null,
    code varchar(8) not null unique,
    created_at timestamp(6) with time zone not null,
    original_url varchar(2048) not null,
    primary key (id)
);

create table click (
    id bigint not null,
    clicked_at timestamp(6) with time zone not null,
    link_id bigint not null,
    primary key (id),
    constraint fk_click_link foreign key (link_id) references link (id) on delete cascade
);

create index idx_click_link_id on click (link_id);
