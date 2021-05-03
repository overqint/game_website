import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
//import abi from './ERC721.abi.json';
import Web3 from 'web3';
//const erc721 = require("@0xcert/ethereum-erc721/build/erc721.json").ERC721;
import { OpenSeaPort, Network } from 'opensea-js';

function App() {
  // const { status, connect, account } = useMetaMask();
  const [account, setAccount] = useState('');

  const initConnection = async () => {
    await loadWeb3();
    await loadBlockchainData();
  };

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
      networkName: Network.Main
    });

    const cryptoAsset = {
      tokenAddress: "0x06012c8cf97bead5deae237070f9587f8e7a266d", // string
      tokenId: "1" // string | number | null
    };

    const balance = await seaport.getAssetBalance({
      accountAddress: userAccount, // string
      asset: cryptoAsset // Asset
    });
    
    const ownsKitty = balance.greaterThan(0);

    console.log("check it kitties", ownsKitty);


    //const networkId = await web3.eth.net.getId();
    //console.log("check id", networkId);
    //const networkData = Color.networks[networkId]
    // if(networkData) {
    //   const abi = Color.abi
    //   const address = networkData.address
    //const contract = new web3.eth.Contract(erc721.abi, "0x495f947276749Ce646f68AC8c248420045cb7b5e");
    //const totalSupply = await contract.methods.totalSupply().call();
    
    //   this.setState({ contract })
    // const totalSupply = await contract.methods.totalSupply().call();
    // console.log("total supply", totalSupply);
    //   this.setState({ totalSupply })
    //   // Load Colors
    //   for (var i = 1; i <= totalSupply; i++) {
    //     const color = await contract.methods.colors(i - 1).call()
    //     this.setState({
    //       colors: [...this.state.colors, color]
    //     })
    //   }
    // } else {
    //   window.alert('Smart contract not deployed to detected network.')
    // }
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {account === '' ?
          <button onClick={() => initConnection()} className="button">Connect to metamask</button>
          : <p>connected account is: {account}</p>}
      </header>
    </div>
  );
}

export default App;
