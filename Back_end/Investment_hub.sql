-- ============================================
--           INVESTMENT HUB DATABASE
-- ============================================

CREATE DATABASE investment_hub;
USE investment_hub;


-- ============================================
--                  investment_groups
-- ============================================
CREATE TABLE    investment_groups (
    id                  INT             AUTO_INCREMENT PRIMARY KEY,
    name                VARCHAR(50)     NOT NULL,
    total_investment    BIGINT          DEFAULT 0,
    total_profit        BIGINT          DEFAULT 0,
    photo_url           VARCHAR(255)
);


-- ============================================
--                 INVESTORS
-- ============================================
CREATE TABLE investors (
    id                  INT             AUTO_INCREMENT PRIMARY KEY,
    name                VARCHAR(100)    NOT NULL,
    phone VARCHAR(15),
    email               VARCHAR(100)    UNIQUE NOT NULL,
    pass                VARCHAR(255)    NOT NULL,
    photo_url           VARCHAR(255),
    total_investment    BIGINT          DEFAULT 0,
    total_profit        BIGINT          DEFAULT 0,
    grp_id              INT             DEFAULT NULL,
   FOREIGN KEY (grp_id) REFERENCES investment_groups(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);


-- ============================================
--                 COMPANIES
-- ============================================
CREATE TABLE companies (
    id                  INT             AUTO_INCREMENT PRIMARY KEY,
    name                VARCHAR(100)    NOT NULL,
    total_deals         INT             DEFAULT 0,
    total_profit        BIGINT          DEFAULT 0,
    valuation           BIGINT          DEFAULT 0,
     photo_url           VARCHAR(255)
   
);


-- ============================================
--               BUSINESSMEN
-- ============================================
CREATE TABLE businessmen (
    id                  INT             AUTO_INCREMENT PRIMARY KEY,
    name                VARCHAR(100)    NOT NULL,
    phone VARCHAR(15),
    email               VARCHAR(100)    UNIQUE NOT NULL,
    pass                VARCHAR(255)    NOT NULL,
    photo_url           VARCHAR(255),
    company_id          INT             NOT NULL,
    created_at          TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);


-- ============================================
--             INVESTMENT ADS
-- ============================================
CREATE TABLE investment_ads (
    id                  INT             AUTO_INCREMENT PRIMARY KEY,
    company_id          INT             NOT NULL,
    businessman_id      INT             NOT NULL,
    amount_needed       BIGINT          NOT NULL,
    amount_raised       BIGINT          DEFAULT 0,
    pitch               TEXT,
    status              ENUM(
                            'open',
                            'closed',
                            'funded'
                        )               DEFAULT 'open',

    FOREIGN KEY (company_id)    REFERENCES companies(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    FOREIGN KEY (businessman_id) REFERENCES businessmen(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);


-- ============================================
--                  DEALS
-- (solo investor OR group invests in an ad)
-- ============================================
CREATE TABLE deals (
    id                  INT             AUTO_INCREMENT PRIMARY KEY,
    ad_id               INT             NOT NULL,
    investor_id         INT             DEFAULT NULL,   -- solo investor
    group_id            INT             DEFAULT NULL,   -- group investment
    amount_invested     BIGINT          NOT NULL,
    profit              BIGINT          DEFAULT 0,
    status              ENUM(
                            'pending',
                            'active',
                            'completed',
                            'cancelled'
                        )               DEFAULT 'pending',
    created_at          TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ad_id)         REFERENCES investment_ads(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    FOREIGN KEY (investor_id)   REFERENCES investors(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (group_id)      REFERENCES investment_groups(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE

  
);

select * from investors;


-- ============================================
--                  POSTS
-- ============================================
CREATE TABLE posts (
    id                  INT             AUTO_INCREMENT PRIMARY KEY,
    caption             TEXT            NOT NULL,
    photo_url           VARCHAR(255),
    likes               INT             DEFAULT 0,
    type                ENUM(
                            'general',
                            'profit',
                            'complaint',
                            'question',
                            'revenue',
                            'funding'
                        )               DEFAULT 'general',
    created_at          TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    investor_id         INT             DEFAULT NULL,
    businessman_id      INT             DEFAULT NULL,
    FOREIGN KEY (investor_id)   REFERENCES investors(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (businessman_id) REFERENCES businessmen(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);
