import _ from 'lodash';

const initialState = {
    UserAccount: "",
    SelectedImage1: null,
    SelectedImage: null,
    SelectedImage2: null,
    Loader: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_USER_ACCOUNT':
            return _.assign({}, state, { UserAccount: action.payload });
        case 'SAVE_USER_IMAGE_1':
            return _.assign({}, state, { SelectedImage1: action.payload, SelectedImage: action.payload });
        case 'SAVE_USER_IMAGE_2':
            return _.assign({}, state, { SelectedImage2: action.payload });
        case 'SET_LOADER':
            return _.assign({}, state, { Loader: action.payload });
        default:
            return state;
    }
};