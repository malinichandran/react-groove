CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL CHECK (position('@' IN email) > 1),,
    password TEXT NOT NULL,
    profile_pic TEXT,
    country TEXT
);

CREATE TABLE 