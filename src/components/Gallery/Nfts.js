import nftImg from '../../assets/img/nft.png';

const Nfts = ({type}) => {
  return (
    <div className={`nfts ${type}`}>
      <div className="title">{type} NFTs</div>
      <ul>
        <li><img src={nftImg} alt="NFT" /></li>
        <li><img src={nftImg} alt="NFT" /></li>
        <li><img src={nftImg} alt="NFT" /></li>
      </ul>
    </div>
  )
}

export default Nfts;