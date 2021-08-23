import React, { useState, useContext ,useEffect} from "react";
import UserContext from "../auth/UserContext";
import GrooveApi from "../api/api";
import Alert from "../common/Alert";
import { useHistory, useParams } from "react-router-dom";
import "./EditPlaylist.css";
import {Button} from "react-bootstrap";

function EditPlaylist(){
    const history = useHistory();
    const {playlist_name} = useParams();
    
    const [playlist, setPlaylist] = useState([]);
    const [checked, setChecked] = useState(true);
    const [formData, setFormData] = useState({
        playlist_name: "",
        description: "",
        public_private_flag: true
    });

    let result;
    useEffect(function callPlaylistData(){
        playlistData(playlist_name);
    },[]);
    
    async function playlistData(playlist_name){
     try{
 result = await GrooveApi.getPlaylistData(playlist_name);
setFormData(result);
setChecked(result.public_private_flag);
     }catch(errs){
        console.log(errs);
     }
     
    }
   
       
    const [formErrors, setFormErrors] = useState([]);
    const [saveConfirmed, setSaveConfirmed] = useState(false);

    async function handleSubmit(evt){
        evt.preventDefault();
        let playlistData = {
            playlist_name: formData.playlist_name,
            description: formData.description,
            public_private_flag: checked
        }
        let updatedPlaylist;
        try{
          updatedPlaylist = await GrooveApi.updatePlaylist(playlist_name, playlistData);
        }catch(errors){
            setFormErrors(errors);
            return;
        }
        setFormData(f=>({...f}));
        setFormErrors([]);
        setSaveConfirmed(true);
        setPlaylist(updatedPlaylist);
        history.push("/playlists");
        
    }
console.log(formData)
    function handleChange(evt){
        console.log("handlechange called");
        const {name, value} = evt.target;
        setFormData(data => ({...data, [name]:value}));
        setFormErrors([]);
    }

    function onValueChange(e){
        
       setChecked((c)=>!c);
       setFormData(f=>({...f,public_private_flag:checked}))
        // setFormDa
        console.log(e.target.checked)
        console.log(formData)
       
    }
    
    function handleClose(){
        history.push(`/playlists/${playlist_name}`)
    }
    return(
        <div>
        <div className="col-lg-6 offset-md-3 col-lg-8 offset-lg-1">
            <h3 className="mb-3">Edit playlist</h3>
            <div className="editplaylistcard">
                <div >
                    <form>
                        <div className="form-group">
                            <label>Playlist Name</label>
                            <input
                               name="playlist_name"
                               className="form-control"
                               value={formData.playlist_name}
                              onChange={handleChange}
                               />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input
                               name="description"
                               className="form-control"
                               value={formData.description}
                               onChange={handleChange}
                               />
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                         <input className="form-check-input" 
                                    type="checkbox"
                                    name="public_private_flag"
                                    // value={formData.public_private_flag}
                                    //checked={formData.public_private_flag}
                                    onChange={onValueChange}
                                       checked={checked}
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
                  onClick={handleClose}>
              Close
          </Button>
                    </form>
                </div>
            </div>
            
        </div>
    </div>
    )
}

export default EditPlaylist;