import React, { useState } from 'react';
import { connect } from 'react-redux';

import './index.scss';

import Alert from '../Common/Alert';

const Home = (props) => {
  const games = [
    { id: 1, title: 'Game A' },
    { id: 2, title: 'Game B' },
    { id: 3, title: 'Game C' },
  ];
  const selectedAvatar = props.appReducer.SelectedImage;
  const [showAvatarAlert, setShowAvatarAlert] = useState(false);

  const handleClick = e => {
    if(!selectedAvatar) {
      showAlert();
      return;
    }
  };

  const showAlert = () => {
    if (!showAvatarAlert) setShowAvatarAlert(true);
    
    let alertTimeout = setTimeout(() => {
      setShowAvatarAlert(false);
    }, 5000);
    clearTimeout(alertTimeout);
  }

  const gameList = games.map((game, i) => {
    return <li onClick={handleClick} key={i}>
      <div className={`game game${game.id}`}>
        <div className="game-img"></div>
        <div className="title">{game.title}</div>
        <div className="play">PLAY</div>
      </div>
    </li>;
  });

  return (
    <div className="main">
      <div className="content">
        <Alert show={showAvatarAlert} status="failure" msg="Please select an avatar from the" link={{title: 'NFTs gallery', to: '/gallery'}} />
        
        <div className="title">PLAY YOUR AVATAR</div>
        <ul className="game-panel">
          {gameList}
        </ul>
      </div>
    </div>
  );
};

const select = state => state;
export default connect(select)(Home);