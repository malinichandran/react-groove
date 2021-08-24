import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import GrooveApi from "../api/api";
import { Button, Card } from "react-bootstrap";
import "./ListOfPlaylists.css";

const ListOfPlaylists = ({ videoId }) => {
  const [video, setVideo] = useState(videoId);
  const { currentUser } = useContext(UserContext);
  const [playlists, setPlaylists] = useState([]);


  useEffect(function callGetPlaylists() {
    getPlaylists();
  }, []);

  let username;

  async function getPlaylists() {
    username = currentUser.username;
    try {
      let result = await GrooveApi.getPlaylists(username);

      setPlaylists(result);
    } catch (errors) {
      console.error("Error fetching data", errors);
      return { success: false, errors };
    }
  }


  return (
    <div>
      <Card className="playlistcardstyle">
        <Card.Title className="playlistcardtitle">
          {currentUser.username}'s Playlists
        </Card.Title>
        <Card.Text>
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                <Link
                  className="playlistlink"
                  to={{
                    pathname: `/playlists/${playlist.playlist_name}`,
                    state: { video },
                  }}
                >
                  {" "}
                  {playlist.playlist_name}{" "}
                </Link>
              </li>
            ))}
          </ul>
          <Button variant="light secondary" className="createplaylistbutton">
            <Link
              className="Buttonlink"
              to={{
                pathname: "/addplaylist",
                state: { video },
              }}
            >
              Add New Playlist
            </Link>
          </Button>
        </Card.Text>
      </Card>
    </div>
  );
};

export default ListOfPlaylists;
