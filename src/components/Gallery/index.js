import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './index.scss';
import Web3 from 'web3';

import Alert from '../Common/Alert';
import Nfts from './Nfts';

import * as syncActions from '../../redux/actions/Sync.action';

class Gallery extends React.Component {
  state = {
    showAvatarAlert: false,
    userAccount: "",
    userNftImages: [],
    randomNftImages: [],
    SelectedImage: null
  };
  alertTimeout = null;

  componentDidMount = async () => {
    await this.fetchRandomNFTs();
    if (window.ethereum && window.web3) {
      await this.initConnection();
      await this.fetchUsersNFTs();
      let _this = this;
      window.ethereum.on('accountsChanged', function () {
        window.web3.eth.getAccounts(function (error, accounts) {
          if (accounts) {
            _this.props.dispatch(syncActions.saveUserAccount(accounts[0]));
          } else {
            _this.props.dispatch(syncActions.saveUserAccount(null));
          }
        });
      });
    }
  };

  initConnection = async () => {
    await this.loadWeb3();
    const accounts = await window.web3.eth.getAccounts();
    const userAccount = accounts[0];
    this.setState({ userAccount });
    this.props.dispatch(syncActions.saveUserAccount(userAccount));
  };

  loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  };

  fetchUsersNFTs = async () => {
    setTimeout(async () => {
      const response = await axios.get(`https://rinkeby-api.opensea.io/api/v1/assets?owner=${this.state.userAccount}&order_direction=desc&offset=0&limit=20`);
      let data = response.data.assets;
      let NftImages = [];
      data.map(el => {
        if (el.image_url) {
          NftImages.push(el.image_url);
        }
        return null;
      });
      this.setState({ userNftImages: NftImages });
    }, 3000);
  };

  fetchRandomNFTs = async () => {
    const response = await axios.get(`https://rinkeby-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20`);
    let data = response.data.assets;
    let NftImages = [];
    data.map(el => {
      if (el.image_url && !NftImages.includes(el.image_url)) {
        NftImages.push(el.image_url);
      }
      return null;
    });
    this.setState({ randomNftImages: NftImages });
  };

  saveImage = (image) => {
    if (image) {
      this.props.dispatch(syncActions.saveUserImage(image));
      this.showAlert();
    }
  };

  showAlert() {
    if (this.alertTimeout) clearTimeout(this.alertTimeout);

    if (!this.showAvatarAlert) this.setState({ showAvatarAlert: true });
    this.alertTimeout = setTimeout(() => {
      this.setState({ showAvatarAlert: false });
    }, 5000);
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
            <Nfts type="your" saveImage={this.saveImage} images={this.state.userNftImages} />
          }
          {
            this.state.randomNftImages.length > 0 &&
            <Nfts type="random" saveImage={this.saveImage} images={this.state.randomNftImages} />
          }
        </div>
      </div>
    );
  }
};

const select = state => state;
export default connect(select)(Gallery);
