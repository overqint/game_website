import { Link } from 'react-router-dom';

import './index.scss';

const Alert = (props) => {

  return (
    <div className={`alert ${props.status} ${props.show ? 'show' : ''}`}>
      <span className="msg">
        {props.msg ? props.msg : 'Somethins wrong!'}
      </span>
      {props.link &&
        <Link to={props.link.to}>{props.link.title}</Link>
      }
    </div>
  );
};

export default Alert;
