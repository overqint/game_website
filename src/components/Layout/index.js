import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Web3 from 'web3';
import { OpenSeaPort, Network } from 'opensea-js';
import * as Constants from 'opensea-js/lib/constants';
import cryptoKittiesABI from '../../abi/cryptoKitties.abi.json';

import Header from '../Common/Header';
import Footer from '../Common/Footer';
import * as syncActions from '../../redux/actions/Sync.action';

import '../../assets/scss/common.scss';

const live = true;
const liveContractAddresses = [{
    "name": "cryptoKitties",
    "address": Constants.CK_ADDRESS
},
{
    "name": "decentraLand",
    "address": Constants.DECENTRALAND_ESTATE_ADDRESS
}
];
const testContractAddresses = [{
    "name": "openstore",
    "address": Constants.WYVERN_EXCHANGE_ADDRESS_RINKEBY
}];

let ContractAddresses = liveContractAddresses;


class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            UserAccount: "",
            userTokens: []
        }
    }

    initConnection = async () => {
        await this.loadWeb3();
        await this.loadContractData();
        await this.loadBlockchainData();
    };

    loadContractData = async () => {
        const wFetch = window.web3.eth;
        const kittieContract = new wFetch.Contract(cryptoKittiesABI, Constants.CK_ADDRESS);
        const accounts = await wFetch.getAccounts();
        const userAccount = accounts[0];
        console.log("check kitties", kittieContract);
        // kittieContract.balanceOf(userAccount, (result) => {
        //     console.log("check result", result);
        // })

    }

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

    loadBlockchainData = async () => {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        const userAccount = accounts[0];
        // this.setState({
        //     UserAccount: userAccount
        // });
        this.props.dispatch(syncActions.saveUserAccount(userAccount));

        // const seaport = new OpenSeaPort(window.web3.currentProvider, {
        //     networkName: live ? Network.Main : Network.Rinkeby
        // });

        // if (!live) {
        //     ContractAddresses = testContractAddresses;
        // }

        // const balanceOfWETH = await seaport.getTokenBalance({
        //     accountAddress: userAccount, // string
        //     tokenAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        // });

        // console.log("check ethers", balanceOfWETH.toNumber());

        // ContractAddresses.map(async (el, key) => {
        //     const balance = await seaport.getAssetBalance({
        //         accountAddress: userAccount, // string
        //         asset: {
        //             tokenAddress: el.address,
        //             tokenId: "0"
        //         }
        //     });

        //     const ownsThisToken = balance.greaterThan(0);

        //     const userTokenObj = { "name": el.name, ownsThisToken };

        //     let tempTokens = this.state.userTokens;
        //     tempTokens.push(userTokenObj);
        //     this.setState({userTokens: [...tempTokens]});
        // });
    }

    componentDidMount() {
        this.initConnection();
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.appReducer.UserAccount !== this.state.UserAccount) {
            this.setState({ UserAccount: nextProps.appReducer.UserAccount });
        }
    }

    render() {
        console.log("check account", this.state.UserAccount);
        return (
            <div className="container">
                <Header />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

const select = state => state
export default connect(select)(withRouter(Layout));