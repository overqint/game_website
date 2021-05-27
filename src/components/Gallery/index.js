import React, { useState } from 'react';

import './index.scss';

import Alert from '../Common/Alert';
import Nfts from './Nfts';

const Home = () => {
  const [showAvatarAlert, setShowAvatarAlert] = useState(true);

  setTimeout(() => {
    setShowAvatarAlert(false);
  }, 4900)

  return (
      <div className="page-gallery">
        <div className="content">
          <Alert show={showAvatarAlert} status="success" msg="Great job, selecting a NFT. Now choose and play a game" link={{title: 'here', to: '/'}} />
          <div className="title">Gallery</div>
          <Nfts type="your" />
          <Nfts type="random" />
        </div>
      </div>
  );
};

export default Home;
