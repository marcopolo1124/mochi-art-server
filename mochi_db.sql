CREATE TABLE users.admin (
    username VARCHAR(100) PRIMARY KEY,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE commissions.commissions (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    character_name VARCHAR(100),
    number_of_characters INTEGER,
    scope VARCHAR(20) NOT NULL,
    com_type VARCHAR(20) NOT NULL,
    details VARCHAR(10000),
    date_of_purchase TIMESTAMP NOT NULL DEFAULT now(),
    commission_status VARCHAR(20) DEFAULT 'pending' NOT NULL,
    CONSTRAINT status_chk CHECK (commission_status in ('pending', 'in-progress', 'rejected', 'completed')),
    CONSTRAINT scope_chk CHECK (scope in ('bust', 'half-body', 'full-body')),
    CONSTRAINT com_type_check CHECK (com_type in ('sketch', 'colored-sketch', 'full-render', 'vtuber'))
);

CREATE TABLE commissions.commission_images (
    commission_id VARCHAR(36) NOT NULL,
    file_name VARCHAR(50) NOT NULL PRIMARY KEY,
    CONSTRAINT commission_fk
        FOREIGN KEY (commission_id) REFERENCES commissions.commissions(id)
);

CREATE TABLE site.state (
    lock char(1) DEFAULT 'X',
    commission_open boolean,
    art_trade_open boolean,
    constraint pk_site_state PRIMARY KEY (lock),
    constraint check_state_lock CHECK (lock='X')
);

CREATE TABLE site.gallery_images (
    file_name VARCHAR(50) PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    image_description VARCHAR(10000),
    date_posted TIMESTAMP
);
