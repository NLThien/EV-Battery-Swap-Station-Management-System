CREATE TABLE user
(
    id           VARCHAR(255) NOT NULL,
    first_name   VARCHAR(255) NULL,
    last_name    VARCHAR(255) NULL,
    email        VARCHAR(255) NULL,
    phone_number VARCHAR(255) NULL,
    password     VARCHAR(255) NULL,
    birthday     date         NULL,
    create_at    datetime     NULL,
    update_at    datetime     NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)
);

CREATE TABLE user_roles
(
    user_id VARCHAR(255) NOT NULL,
    roles   VARCHAR(255) NULL
);

ALTER TABLE user_roles
    ADD CONSTRAINT fk_user_roles_on_user FOREIGN KEY (user_id) REFERENCES user (id);