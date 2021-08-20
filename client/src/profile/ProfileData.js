import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import "./ProfileData.css";

function ProfileData({profile}){
  console.log(profile);

  return(
      <div >
         <Card  className="ProfileData">
  <Card.Img variant="top" className="ProfileImg" src={profile.profile_pic} />
  <Card.Body variant="top">
    <Card.Title>User Profile</Card.Title>
    <Card.Text>
      <p>First Name: {profile.firstName}</p>
      <p>Last Name: {profile.lastName}</p>
      <p>email: {profile.email}</p>
      <p>Country of living: {profile.country}</p>
    </Card.Text>
    <Button variant="light secondary"><Link className="link" to="/editprofile">Edit Profile</Link></Button>
    <Button variant="danger"><Link className="link" to="/deleteprofile">Delete Profile</Link></Button>
  </Card.Body>
</Card>
      </div>
  )
}

export default ProfileData;