
    
    My final project named Groove is a full stack app that uses Node/Express for the backend and React for the frontend and uses Postgresql to handle data. This project will evenly focus on both the front-end and the back-end. 
     
    Groove is a website mainly designed for music-lovers. The user can search for any of their favorite bands or albums or songs and create a playlist to save their favorite song videos. Though Groove mainly focuses on music-lovers, my app allows all users to access all kinds of videos and save it to their favorites. 

    The app will be using the Youtube API for the search feature. Each video id is stored in the database for future access. 
   
    For Eg:
    https://www.googleapis.com/youtube/v3/search

    JSON respone:{
     "kind": "youtube#searchResult",
    "etag": etag,
    "id": {
        "kind": string,
        "videoId": string,
        "channelId": string,
        "playlistId": string
    },
    "snippet": {
        "publishedAt": datetime,
        "channelId": string,
        "title": string,
        "description": string,
        "thumbnails": {
        (key): {
            "url": string,
            "width": unsigned integer,
            "height": unsigned integer
        }
        },
        "channelTitle": string,
        "liveBroadcastContent": string
    }
    }

    My database schema will have four tables namely users, playlists, videos and follows. The users table has the username as the primary key. The playlists table stores all user playlists with username as the foriegn key. The videos table stores the api_video id and uses playlist_id as the foreign key. The follows table uses username as foreign key from users table.

    The only issue i see with using the API would be with embedding part. The rest of the data is easy-to work with for my project.

    In order to secure the user-data, this app will be using b-crypt to help with the user authentication. B-crypt's hashing algorithm provides a very efficient hashing for the password which makes user authentication and hence the user data very secure.

    My app will include the search functionality which helps users to access videos and save it to their own personal playlists.

    Groove will have a home page which allows users to login or signup along with searching for videos. While searching the user gets a list of videos based on the serach criteria. Each video comes with a add to playlist button but the user will be allowed to add the video to a playlist only after logging into the account. Once Logged in the user will have four tabs namely profile, playlists, community and logout. The profile tab gives access to user profile details and allows user to edit his details. The playlists tab lists all the playlists that the user has saved in his account. He will be able to edit, delete or create new playlists from this tab. The community tab allows user to follow other users and view the users followers. 


    The stretch feature for my app would be to access videos from different apis. For eg: from snaptube dailymotion and vimeo. 