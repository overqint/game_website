import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { useMetaMask } from 'metamask-react';
import Web3 from 'web3';

function App() {
  // const { status, connect, account } = useMetaMask();
  const [showButton, setShowButton] = useState(null);
  const [web3ctx, setWeb3ctx] = useState({
    networkId: '',
    networkName: '',
    etherscanUrl: '',
    activeWallet: '',
    lastBlockNumber: '',
    currentBalance: '',
    tokenAddress: '',
    ipfsGateway: 'https://ipfs.infura.io/ipfs/'
  });
  const [myToken, setMyToken] = useState({
    address: '',
    // abi: tokenContract.abi,
    imageBuffer: '',
    ipfsImageHash: '',
    ipfsImageUrl: '',
    // metadataBuffer: metadata,
    ipfsMetadataHash: '',
    ipfsMetadataUrl: '',
    recipientAddress: '',
    txHash: '',
    txReceipt: '',
    blockNumber: '',
    gasUsed: ''
  });

  // constants used to build etherscan links
  const web3networks = {
    1: {
      name: 'main',
      etherscanUrl: 'https://etherscan.io/tx/'
    },
    3: {
      name: 'ropsten',
      etherscanUrl: 'https://ropsten.etherscan.io/tx/'
    },
    4: {
      name: 'rinkeby',
      etherscanUrl: 'https://rinkeby.etherscan.io/tx/'
    },
    42: {
      name: 'kovan',
      etherscanUrl: 'https://kovan.etherscan.io/tx/'
    }
  };

  //setup web3
  useEffect(() => {
    // Modern DApp Browsers
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then(async function () {
          // first update the values that can change while connected
          let myContext = web3ctx;
          let accounts = await web3.eth.getAccounts();
          myContext.activeWallet = accounts[0];
          myContext.lastBlockNumber = await web3.eth.getBlockNumber();
          myContext.currentBalance = await web3.eth.getBalance(accounts[0]);

          // await web3.eth.net.getId((err, netId) => {
          //   console.log(err, netId);

          //   if (netId && web3ctx.networkId !== netId) {
          //     // we're on a new network, look for deployed contract
          //     console.log('refreshing settings for network ' + netId);

          //     myContext.networkId = netId;
          //     myContext.networkName = (web3networks[netId] ? web3networks[netId].name : 'unknown');
          //     myContext.etherscanUrl = (web3networks[netId] ? web3networks[netId].etherscanUrl : 'unknown');

          //     // if (tokenContract.networks[netId]) {
          //     //   // attempt to load contract address deployed on this network
          //     //   let newAddress = (tokenContract.networks[netId].address ? tokenContract.networks[netId].address : '');

          //     //   console.log('Using contract at address \'' + newAddress + '\'');
          //     //   myContext.tokenAddress = newAddress;

          //     // } else {
          //     //   console.log('No contract deployed on network ' + netId);
          //     //   myContext.tokenAddress = '';
          //     // }
          //   }
          // });
          // User has allowed account access to DApp...
          //alert('Access granted by user!!');
          web3.eth.getAccounts().then(async (account) => {
            const currentBlock = await web3.eth.getBlockNumber();
            web3.eth.getBlock(currentBlock)
              .then(console.log);
            setShowButton(<div>Connected account: {account}</div>);
          })

        });
      } catch (e) {
        // User has denied account access to DApp...
        alert('Access denied by user!!');
      }
    }
    // Legacy DApp Browsers
    else if (window.web3) {
      const web3 = new Web3(window.web3.currentProvider);
    }
    // Non-DApp Browsers
    else {
      alert('You have to install MetaMask !');
    }
  }, []);

  // //Connect to metamask
  // useEffect(() => {
  //   if (status === "unavailable") setShowButton(<div>MetaMask not available :(</div>)

  //   if (status === "initializing") setShowButton(<div>Synchronisation with MetaMask ongoing...</div>)

  //   if (status === "notConnected") setShowButton(<button className="App-link" onClick={connect}>Connect to MetaMask</button>)

  //   if (status === "connecting") setShowButton(<div>Connecting...</div>)

  //   if (status === "connected") setShowButton(<div>Connected account: {account}</div>)
  // }, [status, account, connect]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {showButton}
      </header>
    </div>
  );
}

export default App;
