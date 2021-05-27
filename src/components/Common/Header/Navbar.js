import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li><Link to="/gallery">Your NFTs</Link></li>
        <li><Link to="/">Wallet</Link></li>
        <li><Link to="/">Connet Metamask</Link></li>
        <li><Link to="/">Account Settings</Link></li>
        <li><Link to="/">Help</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;