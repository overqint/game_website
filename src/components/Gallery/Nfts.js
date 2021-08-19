import React, { useState } from 'react';

const Nfts = ({ type, images, saveImage, selectedImage1, selectedImage2 }) => {
  
  const selectImage = (el) => {
    saveImage(el);
   // saveImage(el);
   // document.cookie="Image="+el+ ";domain=.pixelk.fun;path=/";
  }

  return (
    <div className={`nfts ${type}`}>
      <div className="title">{type} NFTs</div>
      <ul>
        {
          images.map((el, key) => {
            var classN = "";
            var text = "";
            if(selectedImage1 === el) {
              classN="selectedPlayer1";
              text="Player 1";
            } else if(selectedImage2 === el) {
              classN="selectedPlayer2";
              text="Player 2"
            } 
            return <div>
            <li style={{ marginBottom: "10px" }} key={key} onClick={() => selectImage(el)}
              className={classN}
            ><img src={el} alt="NFT" />
            </li>
            <span style={{ margin: "12px 20px" }}>
              {text}
            </span>
            </div>
          })
        }
      </ul>
    </div>
  )
}

export default Nfts;
