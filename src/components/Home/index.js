import Header from './Header';
import Footer from './Footer';

import './index.scss';

const Home = () => {
  return (
    <div className="container">
      <Header />
      <div className="main">
        <div>
          <div className="title">PLAY YOUR AVATAR</div>
          <ul className="game-panel">
            <li>
              <div className="game game1">
                <div className="game-img"></div>
                <div className="title">Game A</div>
                <div className="play">PLAY</div>
              </div>
            </li>
            <li>
              <div className="game game2">
                <div className="game-img"></div>
                <div className="title">Game B</div>
                <div className="play">PLAY</div>
              </div>
            </li>
            <li>
              <div className="game game3">
                <div className="game-img"></div>
                <div className="title">Game C</div>
                <div className="play">PLAY</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
