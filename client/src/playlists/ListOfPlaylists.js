import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";

const ListOfPlaylists = ({playlists}) => {

 return(
     <div>
         <ul>
             {playlists.map(playlist=>
                <li><Link>{playlist.playlist_name}</Link></li>)}
         </ul>
     </div>
 )
}

export default ListOfPlaylists;