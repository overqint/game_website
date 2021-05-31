import React, { useState } from 'react';

const Nfts = ({ type, images, saveImage }) => {
  const [img, setImg] = useState(null);

  const selectImage = (el) => {
    setImg(el);
    saveImage(el);
  }

  return (
    <div className={`nfts ${type}`}>
      <div className="title">{type} NFTs</div>
      <ul>
        {
          images.map((el, key) => {
            return <li key={key} onClick={() => selectImage(el)}
              className={img === el ? "selected" : ""}
            ><img src={el} alt="NFT" /></li>
          })
        }
      </ul>
    </div>
  )
}

export default Nfts;