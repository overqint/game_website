import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Web3 from 'web3';

import Header from '../Common/Header';
import Footer from '../Common/Footer';
import * as syncActions from '../../redux/actions/Sync.action';

import '../../assets/scss/common.scss';

class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            UserAccount: ""
        }
    }

    initConnection = async () => {
        await this.loadWeb3();
        const accounts = await window.web3.eth.getAccounts();
        const userAccount = accounts[0];
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