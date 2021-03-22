/**
 * Connect to MetaMask Wallet
 */
const connectMetaMask = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        isMetaMaskConnected();
    }
    else {
        window.alert("Please install MetaMask");
    }
}

/**
 * Check MetaMask Connection
 */
const isMetaMaskConnected = async () => {
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    if (!accounts || accounts.length <= 0) {
        console.log("MetaMask not connected!");
        metamask_connected = document.getElementById("metamask-connected");
        metamask_connected.setAttribute("style", "display: none");
        connect_metamask = document.getElementById("connect-metamask");
        connect_metamask.setAttribute("style", "display: block");
        return false;
    }
    else {
        console.log("MetaMask connected!");
        metamask_connected = document.getElementById("metamask-connected");
        metamask_connected.setAttribute("style", "display: block");
        connect_metamask = document.getElementById("connect-metamask");
        connect_metamask.setAttribute("style", "display: none");
        return true;
    }
}

/** 
 * Event Listener - When MetaMask Accounts are Changed
*/
window.ethereum.on("accountsChanged", (accounts) => {
    if (accounts.length <= 0)
        isMetaMaskConnected();
});