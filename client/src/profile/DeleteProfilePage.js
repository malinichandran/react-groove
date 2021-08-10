import React, {useState, useContext} from 'react';
import { Button, Modal } from "react-bootstrap";
import GrooveApi from "../api/api";
import UserContext from "../auth/UserContext";

function DeleteProfilePage(){
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { currentUser, setCurrentUser } = useContext(UserContext);
   let removeUser;
   
   async function deleteProfile(){
       console.log("delete profile called")
    let username = currentUser.username;
       try{
        removeUser = await GrooveApi.removeProfile(username);
        setCurrentUser(null);
       }catch(errors){
        setErrors(errors);
       }

    }
    return (
      <>
        <Button variant="warning" onClick={handleShow}>
         Click here to Delete Profile
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           Proceeding with this action will delete all your saved playlists and videos. Do you wish to proceed?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={deleteProfile}>Yes, Delete My Profile</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }


export default DeleteProfilePage;