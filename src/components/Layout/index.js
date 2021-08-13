import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Web3 from 'web3';

import Header from '../Common/Header';
import Footer from '../Common/Footer';
import * as syncActions from '../../redux/actions/Sync.action';
import Loader from "react-spinners/RingLoader";

import '../../assets/scss/common.scss';
const override = `
  display: block;
  margin: 0 auto;
`;
class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            UserAccount: "",
            loader: props.appReducer.Loader
        }
    }

    initConnection = async () => {
        await this.loadWeb3();
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const userAccount = accounts;
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


    async componentDidMount() {
        let _this = this;

        if (window.ethereum) {
            //await this.initConnection();
            window.ethereum.on('accountsChanged', async function () {
                const acc = await window.ethereum.request({ method: 'eth_accounts' });
                if (acc[0] != '') {
                    _this.props.dispatch(syncActions.saveUserAccount(acc[0]));
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
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.appReducer.UserAccount !== this.state.UserAccount) {
            this.setState({ UserAccount: nextProps.appReducer.UserAccount });
        }
        //this.setState({ Loader: nextProps.appReducer.Loader });

    }

    render() {
        return (
            <div className="container">
                <Header />
                {this.state.loader && <>
                    <Loader loading={this.state.loader} css={override} color="#fff" size={150}></Loader>
                    <div style={{ display: "block", width: "100%", textAlign: "center", marginTop: "80px" }}>Metamask loading ....</div>
                </>}
                <div style={{ display: this.state.loader ? "none" : "block" }}>{this.props.children}</div>
                <Footer />
            </div>
        )
    }
}

const select = state => state
export default connect(select)(withRouter(Layout));