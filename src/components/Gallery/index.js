import './index.scss';

import Nfts from './Nfts';

const Home = () => {
  return (
      <div className="page-gallery">
        <div>
          <div className="title">Gallery</div>
          <Nfts type="your" />
          <Nfts type="random" />
        </div>
      </div>
  );
};

export default Home;
