import _ from 'lodash';

const initialState = {
    UserAccount: "",
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_USER_ACCOUNT':
            return _.assign({}, state, { UserAccount: action.payload });
        default:
          return state;
    }
};