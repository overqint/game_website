import _ from 'lodash';

const initialState = {
    UserAccount: "",
    SelectedImage: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_USER_ACCOUNT':
            return _.assign({}, state, { UserAccount: action.payload });
        case 'SAVE_USER_IMAGE':
            return _.assign({}, state, { SelectedImage: action.payload });
        default:
            return state;
    }
};