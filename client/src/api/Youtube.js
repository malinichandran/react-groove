import axios from "axios";
const KEY = "AIzaSyCSs9d61GJkyO_AkkObwbVD6Ja5DXmKEDE";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key: KEY
  }
  
});