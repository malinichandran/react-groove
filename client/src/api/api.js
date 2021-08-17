import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/***API class.
 * Static class tying together methods used to get/send to the API.
 */

 class GrooveApi {
     // the token for interaction with the API is stored here

     static token;

     static async request(endpoint, data = {}, method = "get"){
         console.debug("API Call:", endpoint, data, method);

         const url = `${BASE_URL}/${endpoint}`;
         const headers = { Authorization: `Bearer ${GrooveApi.token}`};
         const params = (method === "get")
             ? data
             : {};
         try{
             return (await axios({ url, method, data, params, headers})).data;
         } catch (err) {
             console.error("API Error:", err.response);
             let message = err.response.data.error.message;
             throw Array.isArray(message) ? message : [message];
         }
     }

     //Individual API routes

     /** Get the current user. */

     static async getCurrentUser(username) {
         let res = await this.request(`users/${username}`);
         return res.user;
     }

     /*** Get playlists of  current user */
     static async getPlaylists(username){
         let res = await this.request(`playlists/${username}`);
         return res.playlists;
       
     }

   /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Update user profile page */
  static async saveProfile(username, data){
      let res = await this.request(`users/${username}`, data, "patch");
      return res.user;
  }

  /** Add video to a playlist */
 
  static async addVideo(playlist_name, username, videoData){
     let res = await this.request(`playlists/${username}/${playlist_name}`,  videoData, "post")
     return res.video;
    }

/** TO delete a user from the database */
   static async removeProfile(username){
       
       let res = await this.request(`users/${username}`, {} , "delete");
        return res;
        //console.log(res);
   }
  /** Get videos of a playlist */

  static async getVideos( username, playlist_name){
      let res = await this.request(`playlists/${username}/${playlist_name}`);
      return res.videos;
  }

  /** Add a new playlist */
  static async addPlaylist(data){
      let res = await this.request("playlists", data, "post");
      return res.playlist;
  }

  /**Update playlist data */
  static async updatePlaylist(playlist_name, data){
      let res = await this.request(`playlists/${playlist_name}`, data, "patch");
      return res.playlist;
  }
  /**Get data on a playlist */
  static async getPlaylistData(playlist_name){
      let res = await this.request(`playlists/${playlist_name}` )
      //return res.playlist;
      console.log(res.playlist);
  }

  /**Delete a playlist */
  static async deletePlaylist(playlist_name){
      let res =  await this.request(`playlists/${playlist_name}`, {}, "delete");
      return res;
  }

  /**Delete a video from a playlist */
  static async removeVideo( username, playlist_name, videoId){
      let res = await this.request(`playlists/${username}/${playlist_name}/${videoId}`,{}, "delete");
      return res;
  }
 }


 export default GrooveApi;