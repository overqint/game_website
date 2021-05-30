import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import localForage from 'localforage';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const persistConfig = {
	key: 'root',
	storage: localForage,
	whitelist: ['appReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(initialState) {
	const middleware = [thunk];
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	let store = createStore(persistedReducer, initialState, composeEnhancers(applyMiddleware(...middleware), f => f));
	let persistor = persistStore(store);
	return { store, persistor }
}