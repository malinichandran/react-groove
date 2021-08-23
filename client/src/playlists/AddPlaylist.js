import React from "react";
import {useState, useContext} from "react";
import UserContext from "../auth/UserContext";
import Form  from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "../common/Alert";
import "./AddPlaylist.css";
import GrooveApi from "../api/api";
import { useHistory, useLocation ,Link} from "react-router-dom";
import PlaylistVideos from "./PlaylistVideos";

function AddPlaylist(){
    const location = useLocation();
    const video = location.state?.video;
    const history = useHistory();
    const {currentUser} = useContext(UserContext);
    const [playlist, setPlaylist] = useState([]);
    const [checked, setChecked] = useState(true);
    const [saveConfirmed, setSaveConfirmed] = useState(false);
    const [formData, setFormData] = useState({
        username: currentUser.username,
        playlist_name: "",
        description: "",
        PUBLIC_PRIVATE_FLAG: checked
    })
    const [formErrors, setFormErrors] = useState([]);
    
    console.debug("playlistform",
    "formData=",formData,   
    "formErrors=", formErrors);

   // const toggleChecked = () => setChecked(value => !value);

   console.log(video);

    function handleChange(evt){
        const { name, value } = evt.target;
        setFormData(data => ({...data, [name]:value}));
        setFormErrors([]);
    }



    function checkValueChange(e){
        console.log(e.target.value)
        setChecked(e.target.value === !e.target.value)

        console.log(checked)
    }

    async function handleSubmit(evt){
        evt.preventDefault();
        let playlistData = {
            username :currentUser.username,
            playlist_name: formData.playlist_name,
            description: formData.description,
            PUBLIC_PRIVATE_FLAG: checked
        }
        console.log(playlistData)
        let newPlaylist;
        try{
            newPlaylist = await GrooveApi.addPlaylist(playlistData);
            
        }catch(errors){
            setFormErrors(errors);
            return
        }
        if(video === undefined){
        setFormData(f=>({...f}));
        setFormErrors([]);
        setSaveConfirmed(true);
        setPlaylist(newPlaylist);
        history.push("/playlists");
        }
        else{
            setFormData(f=>({...f}));
            setFormErrors([]);
            setSaveConfirmed(true);
            setPlaylist(newPlaylist);
            history.push({
                pathname:`/playlists/${newPlaylist.playlist_name}`,
                state:{video}
            })
        }
    }
   function handleClose(){
       history.push("/playlists");
   }
return(
    <div>
        <div className="col-lg-6 offset-md-3 col-lg-8 offset-lg-1">
            <h3 className="mb-3">Add a new playlist</h3>
            <div className="addplaylistcard">
                <div >
                    <form>
                        <div className="form-group">
                            <label>Playlist Name</label>
                            <input
                               name="playlist_name"
                               className="form-control"
                               value={formData.playlist_name}
                               onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input
                               name="description"
                               className="form-control"
                               value={formData.description}
                               onChange={handleChange}/>
                        </div>
                        {/* <div className="form-group">
                            <div className="form-check">
                         <input className="form-check-input" 
                                    type="radio"
                                    name="PUBLIC_PRIVATE_FLAG"
                                     value="true"
                                     checked={checked==="true"}
                                     onChange={onValueChange}
                                     />
                        <label className="form-check-label" >
                              Public
                        </label> 
                     </div>
</div>*/}
                        <div className="form-group">
                            <div className="form-check">
                         <input className="form-check-input" 
                                    type="checkbox"
                                    name="PUBLIC_PRIVATE_FLAG"
                                    value="true"
                                    onChange={checkValueChange}
                                     />
                        <label className="form-check-label" >
                               Private
                        </label>
                     </div>
                        </div>
                        {formErrors.length
              ? <Alert type="danger" messages={formErrors} />
              : null}

          {saveConfirmed
              ?
              <Alert type="success" messages={["Playlist added successfully."]} />
              : null}

          <Button
              variant="light secondary"
              onClick={handleSubmit}
          >
            Save Changes
          </Button>
          <Button variant="light secondary"
            onClick={handleClose}>Close  </Button>
                    </form>
                </div>
            </div>
            
        </div>
    </div>
)
}

export default AddPlaylist;