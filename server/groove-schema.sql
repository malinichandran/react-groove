CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL CHECK (position('@' IN email) > 1),
    password TEXT NOT NULL,
    profile_pic TEXT DEFAULT 'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg',
    country TEXT 
);

CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL REFERENCES users ON DELETE CASCADE,
    playlist_name TEXT NOT NULL,
    description TEXT,
    PUBLIC_PRIVATE_FLAG BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    api_video_id VARCHAR(25) NOT NULL,
    website TEXT DEFAULT 'YouTube',
    playlist_id INTEGER NOT NULL REFERENCES playlists ON DELETE CASCADE
);


