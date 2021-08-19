import { Link } from 'react-router-dom';

import './index.scss';

const Alert = (props) => {

  return (
    <div className={`alert ${props.status} ${props.show ? 'show' : ''}`}>
      <span className="msg">
        {props.msg ? props.msg : 'Something wrong!'}
      </span>
      {props.link && props.isLink &&
        <Link to={props.link.to}>{props.link.title}</Link>
      }
      {props.link && !props.isLink &&
        <a href={props.link.to}>{props.link.title}</a>
      }
    </div>
  );
};

Alert.defaultProps = {
  isLink: true
}

export default Alert;
