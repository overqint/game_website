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
    let _this = this;

    if (window.ethereum) {
      const acc = await window.ethereum.request({ method: 'eth_accounts' });
      if (acc[0] != '') {
        await _this.initConnection();
        await _this.fetchUsersNFTs();

        _this.props.dispatch(syncActions.saveUserAccount(acc));
        // _this.props.dispatch(syncActions.setLoader(false));
      } else {
        _this.props.dispatch(syncActions.saveUserAccount(null));
        //_this.props.dispatch(syncActions.setLoader(true));
      }
      window.ethereum.on('accountsChanged', async function () {
        const acc = await window.ethereum.request({ method: 'eth_accounts' });
        if (acc[0] != '') {
          await _this.initConnection();
          await _this.fetchUsersNFTs();

          _this.props.dispatch(syncActions.saveUserAccount(acc));
          // _this.props.dispatch(syncActions.setLoader(false));
        } else {
          _this.props.dispatch(syncActions.saveUserAccount(null));
          //_this.props.dispatch(syncActions.setLoader(true));
        }
      });
    }

    setInterval(async () => {
      if (window.ethereum) {
        const acc = await window.ethereum.request({ method: 'eth_accounts' });

        if (acc[0] != '') {
          //_this.props.dispatch(syncActions.setLoader(true));
        } else {
          //_this.props.dispatch(syncActions.setLoader(false));
        }
      }
    }, 1000);
  };

  initConnection = async () => {
    await this.loadWeb3();
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    const userAccount = accounts;
    this.setState({ userAccount });
    this.props.dispatch(syncActions.saveUserAccount(userAccount));
    //this.props.dispatch(syncActions.setLoader(false));
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
      //this.props.dispatch(syncActions.setLoader(true));
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  };

  fetchUsersNFTs = async () => {
    setTimeout(async () => {
      //this.props.dispatch(syncActions.setLoader(true));
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
      //this.props.dispatch(syncActions.setLoader(false));
    }, 3000);
  };

  fetchRandomNFTs = async () => {
    const response = await axios.get(`https://rinkeby-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=50`);
    let data = response.data.assets;
    let NftImages = [];
    data.map(el => {
      if (NftImages.length >= 5) {
        return;
      }
      if (el.image_url && !NftImages.includes(el.image_url)) {
        NftImages.push(el.image_url);
      }
      return null;
    });
    if (NftImages.length < 5) {
      setTimeout(async () => {
        await this.fetchRandomNFTs();
      }, 10000);
    } else {
      this.setState({ randomNftImages: NftImages });
    }

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
