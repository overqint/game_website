import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './index.scss';
import Web3 from 'web3';

import Alert from '../Common/Alert';
import Nfts from './Nfts';

import * as syncActions from '../../redux/actions/Sync.action';

class Home extends React.Component {
  state = {
    showAvatarAlert: false,
    userAccount: "",
    userNftImages: [],
    randomNftImages: [],
    SelectedImage: null
  }
  // setTimeout(() => {
  //   setShowAvatarAlert(false);
  // }, 4900)
  componentDidMount = async () => {
    await this.initConnection();
    await this.fetchUsersNFTs();
    await this.fetchRandomNFTs();
  }

  initConnection = async () => {
    await this.loadWeb3();
    const accounts = await window.web3.eth.getAccounts();
    const userAccount = accounts[0];
    this.setState({ userAccount });
    this.props.dispatch(syncActions.saveUserAccount(userAccount));
  };

  loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  fetchUsersNFTs = async () => {
    const response = await axios.get(`https://rinkeby-api.opensea.io/api/v1/assets?owner=${this.state.userAccount}&order_direction=desc&offset=0&limit=20`);
    let data = response.data.assets;
    let NftImages = [];
    data.map(el => {
      if (el.image_url) {
        NftImages.push(el.image_url);
      }
    });
    this.setState({ userNftImages: NftImages });
  }

  fetchRandomNFTs = async () => {
    const response = await axios.get(`https://rinkeby-api.opensea.io/wyvern/v1/orders?bundled=false&include_bundled=false&include_invalid=false&limit=5&offset=0&order_by=created_date&order_direction=desc`);
    let data = response.data.orders;
    let NftImages = [];
    data.map(el => {
      if (el.asset.image_url) {
        NftImages.push(el.asset.image_url);
      }
    });
    this.setState({ randomNftImages: NftImages });
  }

  saveImage = (image) => {
    if (image) {
      this.props.dispatch(syncActions.saveUserImage(image));
    }
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.appReducer.SelectedImage !== this.state.SelectedImage) {
      this.setState({ SelectedImage: nextProps.appReducer.SelectedImage });
    }
  }

  render() {
    return (
      <div className="page-gallery">
        <div className="content">
          <Alert show={this.state.showAvatarAlert} status="success" msg="Great job, selecting a NFT. Now choose and play a game" link={{ title: 'here', to: '/' }} />
          <div className="title">Gallery</div>
          {
            this.state.userNftImages.length > 0 &&
            <Nfts type="your" selectedImage={this.state.SelectedImage} saveImage={this.saveImage} images={this.state.userNftImages} />
          }
          {
            this.state.randomNftImages.length > 0 &&
            <Nfts type="random" selectedImage={this.state.SelectedImage} saveImage={this.saveImage} images={this.state.randomNftImages} />
          }
        </div>
      </div>
    );
  }
};

const select = state => state
export default connect(select)(Home);
