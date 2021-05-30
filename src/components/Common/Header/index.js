import React from 'react';
import { connect } from 'react-redux';

import './index.scss';
import defaultAvatar from '../../../assets/img/avatar.png';
import Navbar from './Navbar';

const Header = (props) => {
  const selectedImage = props.appReducer.SelectedImage;
  const avatar = selectedImage ? selectedImage : defaultAvatar;

  return (
    <div className="header">
      <div className="profile">
        <div className="avatar">
          <img src={avatar} alt="Avatar" />
          <Navbar />
        </div>
        <div>Player</div>
      </div>
      <div className="user-holdings">
        <div>
          <span>$567</span>
          <span>|</span>
          <span>4231</span>
          <span className="coins">coins</span>
        </div>
      </div>
    </div>
  );
};

const select = state => state;
export default connect(select)(Header);
