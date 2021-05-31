import './index.scss';

const Footer = () => {
  return (
    <div className="footer">
      <ul className="links">
        <li><a href="#">About</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Privacy Policy</a></li>
      </ul>
      <div className="copyright">
        &#169; Company Name 2021. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
