import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Web3 from 'web3';
import * as syncActions from '../../../redux/actions/Sync.action';

const Navbar = (props) => {
  const links = [
    { title: 'Your NFTs', to: '/gallery' },
    { title: 'Homepage', to: '/' },
    { title: 'Connect Metamask', to: '/', isMetmask: true },
    { title: 'Help', to: '/help' },
  ];

  const connectMetamask = async (e) => {
    e.preventDefault();
    if (window.ethereum && window.web3) {
      await initConnection();
      window.ethereum.on('accountsChanged', function () {
        window.web3.eth.getAccounts(function (error, accounts) {
          if (accounts) {
            props.dispatch(syncActions.saveUserAccount(accounts[0]));
          } else {
            props.dispatch(syncActions.saveUserAccount(null));
          }
        });
      });
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  const initConnection = async () => {
    await loadWeb3();
    const accounts = await window.web3.eth.getAccounts();
    const userAccount = accounts[0];
    props.dispatch(syncActions.saveUserAccount(userAccount));
  };

  const loadWeb3 = async () => {
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

  const linkList = links.map((link, i) => {
    if (link.isMetmask) {
      return <li key={i} onClick={connectMetamask}><Link to="#">{link.title}</Link></li>
    }
    return <li key={i}><Link to={link.to}>{link.title}</Link></li>
  });
  return (
    <div className="navbar">
      <ul>
        {linkList}
      </ul>
    </div>
  );
}


const select = state => state;
export default connect(select)(Navbar);