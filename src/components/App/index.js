import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { OpenSeaPort, Network } from 'opensea-js';
import * as Constants from 'opensea-js/lib/constants';
import cryptoKittiesABI from '../../abi/cryptoKitties.abi.json';

function App() {

  const live = true;
  const [account, setAccount] = useState('');
  const [userTokens, setUserTokens] = useState([]);
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

  const initConnection = async () => {
    await loadWeb3();
    await loadContractData();
    //await loadBlockchainData();
  };

  const loadContractData = async () => {
    const wFetch = window.web3.eth;
    const kittieContract = new wFetch.Contract(cryptoKittiesABI, Constants.CK_ADDRESS);
    const accounts = await wFetch.getAccounts();
    const userAccount = accounts[0];
    console.log("check kitties", kittieContract);
    kittieContract.balanceOf(userAccount, (result) => {
      console.log("check result", result);
    })
    
  }

  const loadWeb3 = async () => {
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

  const loadBlockchainData = async () => {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    const userAccount = accounts[0];
    setAccount(userAccount);

    const seaport = new OpenSeaPort(window.web3.currentProvider, {
      networkName: live ? Network.Main : Network.Rinkeby
    });

    if (!live) {
      ContractAddresses = testContractAddresses;
    }

    const balanceOfWETH = await seaport.getTokenBalance({
      accountAddress: userAccount, // string
      tokenAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    });

    console.log("check ethers", balanceOfWETH.toNumber());

    ContractAddresses.map(async (el, key) => {
      const balance = await seaport.getAssetBalance({
        accountAddress: userAccount, // string
        asset: {
          tokenAddress: el.address,
          tokenId: "0"
        }
      });

      const ownsThisToken = balance.greaterThan(0);

      const userTokenObj = { "name": el.name, ownsThisToken };

      let tempTokens = userTokens;
      tempTokens.push(userTokenObj);
      setUserTokens([...tempTokens]);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {account === '' ?
          <button onClick={() => initConnection()} className="button">Connect to metamask</button>
          : <p>connected account is: {account}</p>}
        {userTokens.map((el, key) => {
          return <div key={key}>{el.ownsThisToken ? `You own ${el.name}` : `You don't own any ${el.name}`}</div>;
        })}
      </header>
    </div>
  );
}

export default App;
