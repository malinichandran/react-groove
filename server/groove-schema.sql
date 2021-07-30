CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL CHECK (position('@' IN email) > 1),
    password TEXT NOT NULL,
    profile_pic TEXT,
    country TEXT
);

CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL REFERENCES users ON DELETE CASCADE,
    playlist_name TEXT NOT NULL,
    PUBLIC_PRIVATE_FLAG BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    api_video_id VARCHAR(25) NOT NULL,
    website TEXT DEFAULT 'YouTube',
    playlist_id INTEGER NOT NULL REFERENCES playlists ON DELETE CASCADE
);

CREATE TABLE follows (
    id SERIAL PRIMARY KEY,
    users_being_followed_id VARCHAR(25) NOT NULL REFERENCES users ON DELETE CASCADE,
    users_following_id VARCHAR(25) NOT NULL REFERENCES users ON DELETE CASCADE
);

-- CREATE TABLE playlist_videos(
--     id SERIAL PRIMARY KEY,
--     video_id INTEGER NOT NULL REFERENCES videos ON DELETE CASCADE,
--     playlist_id INTEGER NOT NULL REFERENCES playlists ON DELETE CASCADE
-- );