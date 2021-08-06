import React from "react";
import {Card, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";

function ProfileData({profile}){
  console.log(profile);

  return(
      <div>
         <Card style={{ width: '28rem', padding:'10px', margin: '100px' }}>
  <Card.Img variant="top" src={profile.profile_pic} />
  <Card.Body>
    <Card.Title>User Profile</Card.Title>
    <Card.Text>
      <p>First Name: {profile.firstName}</p>
      <p>Last Name: {profile.lastName}</p>
      <p>email: {profile.email}</p>
      <p>Country of living: {profile.country}</p>
    </Card.Text>
    <Button variant="secondary"><Link to="/editprofile">Edit Profile</Link></Button>
  </Card.Body>
</Card>
      </div>
  )
}

export default ProfileData;