import React, { useEffect } from 'react';

const Nfts = ({ type, images }) => {
  const [img, setImg] = React.useState(null);

  const selectImage = (el) => {
    setImg(el);
  }

  useEffect(() => {
    if(images.length > 0) {
      setImg(images[0]);
    }
  }, []);

  return (
    <div className={`nfts ${type}`}>
      <div className="title">{type} NFTs</div>
      <ul>
        {
          images.map((el, key) => {
            return <li key={key} onClick={() => selectImage(el)}
              className={img == el ? "selected" : ""}
            ><img src={el} alt="NFT" /></li>
          })
        }
      </ul>
    </div>
  )
}

export default Nfts;