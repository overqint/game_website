import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import abi from './ERC721.abi.json';
import Web3 from 'web3';

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
    setAccount(accounts[0]);

    //const networkId = await web3.eth.net.getId();
    //console.log("check id", networkId);
    //const networkData = Color.networks[networkId]
    // if(networkData) {
    //   const abi = Color.abi
    //   const address = networkData.address
    const contract = new web3.eth.Contract(abi, "0x495f947276749Ce646f68AC8c248420045cb7b5e");
    console.log("check contract", contract);
    //   this.setState({ contract })
    const totalSupply = await contract.methods.totalSupply().call();
    console.log("total supply", totalSupply);
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
