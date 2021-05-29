import { Link } from 'react-router-dom';

const Navbar = () => {
  const links = [
    {title: 'Your NFTs', to: '/gallery'},
    {title: 'Wallet', to: '/'},
    {title: 'Connet Metamask', to: '/'},
    {title: 'Account Settings', to: '/'},
    {title: 'Help', to: '/'},
  ];

  const linkList = links.map((link, i) => {
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

export default Navbar;