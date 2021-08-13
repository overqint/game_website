import './index.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <ul className="links">
        <li><a href="#">About</a></li>
        <li><Link to="/help">Help</Link></li>
        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
      </ul>
      <div className="copyright">
        &#169; Pixelk {new Date().getFullYear()}. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
