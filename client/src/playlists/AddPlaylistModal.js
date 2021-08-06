import React from 'react';
import ReactDom from 'react-dom';
import "../playlists/AddPlaylistModal";

function AddplaylistModal({ open, children, onClose }) {
    
    if (!open) return null
  
    return ReactDom.createPortal(
      <>
        <div className="overlay" >
            <div className="modal">
          <button onClick={onClose}>Close Modal</button>
          {children}
                </div>
        </div>
        </>
      ,
      document.getElementById('portal')
    )
  }

  export default AddplaylistModal;