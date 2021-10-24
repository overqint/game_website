import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import './index.scss';
import Web3 from 'web3';

import Alert from '../Common/Alert';
import Nfts from './Nfts';

import * as syncActions from '../../redux/actions/Sync.action';

const customStyles = {
  /*
    Gallery component to fetch NFTs from opensea using User's wallet address
    */
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
class Gallery extends React.Component {
  state = {
    showAvatarAlert: false,
    userAccount: "",
    userNftImages: [],
    randomNftImages: [],
    SelectedImage1: null,
    SelectedImage2: null,
    holdingImage: null,
    modalOpen: false
  };
  alertTimeout = null;

  componentDidMount = async () => {
    await this.fetchRandomNFTs();
    let _this = this;

    if (window.ethereum) {
      const acc = await window.ethereum.request({ method: 'eth_accounts' });
      if (acc[0] !== '') {
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
        if (acc[0] !== '') {
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

        if (acc[0] !== '') {
          //_this.props.dispatch(syncActions.setLoader(true));
        } else {
          //_this.props.dispatch(syncActions.setLoader(false));
        }
      }
    }, 1000);
  };

  /*
    Initializing the metamask connection
    */
  initConnection = async () => {
    await this.loadWeb3();
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    const userAccount = accounts;
    this.setState({ userAccount });
    this.props.dispatch(syncActions.saveUserAccount(userAccount));
    //this.props.dispatch(syncActions.setLoader(false));
  };

  /*
   Adding web3 object to windows
    */

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

  /*
    Fetching user's NFTs from Opensea using the API
    */
  fetchUsersNFTs = async () => {
    setTimeout(async () => {
      //this.props.dispatch(syncActions.setLoader(true));
      const response = await axios.get(`https://api.opensea.io/api/v1/assets?owner=${this.state.userAccount}&order_direction=desc&offset=0&limit=20`, { headers: { 'X-API-KEY': process.env.REACT_APP_OPENSEA_API } });
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

  /*
    Fetching the random NFTs from Opensea using the API
    */

  fetchRandomNFTs = async () => {
    const response = await axios.get(`https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=50`, { headers: { 'X-API-KEY': process.env.REACT_APP_OPENSEA_API } });
    let data = response.data.assets;
    let NftImages = [];
    data.map(el => {
      if (NftImages.length >= 5) {
        return false;
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

  /*
    Store images in cookies once user select them
    */
  saveImage = (image, player) => {
    if (image) {
      //
      if(player === 1){
        document.cookie="Player1="+image+ ";domain=.pixelk.fun;path=/"; this.props.dispatch(syncActions.saveUserImage1(image));
      }
      else if(player === 2) {
        document.cookie="Player2="+image+ ";domain=.pixelk.fun;path=/"; this.props.dispatch(syncActions.saveUserImage2(image));
      }
      this.showAlert();
    }
  };

  showAlert() {
    if (this.alertTimeout) clearTimeout(this.alertTimeout);

    if (!this.showAvatarAlert) this.setState({ showAvatarAlert: true });
    if(!this.state.SelectedImage1 || !this.state.SelectedImage2) {
      this.alertTimeout = setTimeout(() => {
      this.setState({ showAvatarAlert: false });
    }, 5000);
    }
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.appReducer.SelectedImage1 !== this.state.SelectedImage1) {
      this.setState({ SelectedImage1: nextProps.appReducer.SelectedImage1 });
    }
    if (nextProps.appReducer.SelectedImage2 !== this.state.SelectedImage2) {
      this.setState({ SelectedImage2: nextProps.appReducer.SelectedImage2 });
    }
    if(nextProps.appReducer.SelectedImage2 && nextProps.appReducer.SelectedImage1) {
      this.setState({ showAvatarAlert: true });
      setTimeout(() => {
        this.showAlert();
      }, 5000);
    }
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  afterOpenModal = (el) => {
    this.setState({ modalOpen: true, holdingImage: el })
  }

  render() {
    let msg;
    if(!this.state.SelectedImage1) {
      msg = "Please select image for player 1"
    } 
    if(!this.state.SelectedImage2) {
      msg = "Please select image for player 2"
    } 
    if(this.state.SelectedImage1 && this.state.SelectedImage2) {
      msg = "Great job, selecting a NFT. Now choose and play a game";
    }
    return (
      <div className="page-gallery">
        <ReactModal
        isOpen={this.state.modalOpen}
        ariaHideApp={false}
        style={customStyles}
        onRequestClose={this.closeModal}
        contentLabel="Choose this NFT for?"
      >
      <div className="module_main">
          <h2>Select this NFT for?</h2>
          <div className="module_button_close">
            <button onClick={this.closeModal}>X</button>
          </div>
          <div className="module_button">
            <button className="btn btn_1" onClick={() => {this.saveImage(this.state.holdingImage, 1); this.closeModal();}}>Player 1</button>
            <button className="btn btn_2" onClick={() => {this.saveImage(this.state.holdingImage, 2); this.closeModal();}}>Player 2</button>
          </div>
        </div>
      </ReactModal>
        <div className="content">
          <Alert show={this.state.showAvatarAlert} status="success" msg={msg} isLink={false} link={(this.state.SelectedImage1 && this.state.SelectedImage2) ? { title: 'here', to: 'http://pixelk.fun' } : {}} />
          <div className="title">Gallery</div>
          {
            this.state.userNftImages.length > 0 &&
            <Nfts type="your" saveImage={this.afterOpenModal} images={this.state.userNftImages} selectedImage1={this.state.SelectedImage1} selectedImage2={this.state.SelectedImage2} />
          }
          {
            this.state.randomNftImages.length > 0 &&
            <Nfts type="random" saveImage={this.afterOpenModal} images={this.state.randomNftImages} selectedImage1={this.state.SelectedImage1} selectedImage2={this.state.SelectedImage2} />
          }
        </div>
      </div>
    );
  }
};

const select = state => state;
export default connect(select)(Gallery);
