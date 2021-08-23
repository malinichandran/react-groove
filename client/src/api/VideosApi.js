import axios from "axios";
const KEY = "AIzaSyCSs9d61GJkyO_AkkObwbVD6Ja5DXmKEDE";

export default axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    key: KEY
  }
  
});