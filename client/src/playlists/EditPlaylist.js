import React, { useState, useContext ,useEffect} from "react";
import UserContext from "../auth/UserContext";
import GrooveApi from "../api/api";
import Alert from "../common/Alert";
import { useHistory, useParams } from "react-router-dom";

function EditPlaylist(){
    const history = useHistory();
    const {playlist_name} = useParams();
    console.log(playlist_name);
    const [playlist, setPlaylist] = useState([]);
    const [checked, setChecked] = useState(true);
    
//     useEffect(function callPlaylistData(){
//         playlistData(playlist_name);
//     },[]);
//     async function playlistData(playlist_name){
//      try{
//  let result = await GrooveApi.getPlaylistData(playlist_name);
//  console.log(result);
//      }catch(errs){
//         console.log(errs);
//      }
     
//     }
    
        const [formData, setFormData] = useState({
            playlist_name: "",
            description: "",
            PUBLIC_PRIVATE_FLAG: checked
        });
    const [formErrors, setFormErrors] = useState([]);
    const [saveConfirmed, setSaveConfirmed] = useState(false);

    async function handleSubmit(evt){
        evt.preventDefault();
        let playlistData = {
            playlist_name: formData.playlist_name,
            description: formData.description,
            PUBLIC_PRIVATE_FLAG: checked
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

    function handleChange(evt){
        const {name, value} = evt.target;
        setFormData(data => ({...data, [name]:value}));
        setFormErrors([]);
    }

    function onValueChange(e){
        setChecked(e.target.value)
    }
    return(
        <div>
        <div className="col-lg-6 offset-md-3 col-lg-8 offset-lg-1">
            <h3 className="mb-3">Edit playlist</h3>
            <div className="card">
                <div className="card-body">
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
                        <div className="form-group">
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
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                         <input className="form-check-input" 
                                    type="radio"
                                    name="PUBLIC_PRIVATE_FLAG"
                                     value="false"
                                     checked={checked==="false"}
                                     onChange={onValueChange}
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

          <button
              className="btn btn-secondary btn-block mt-4"
              onClick={handleSubmit}
          >
            Save Changes
          </button>
                    </form>
                </div>
            </div>
            
        </div>
    </div>
    )
}

export default EditPlaylist;