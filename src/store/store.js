import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
// or use import loggerMiddleware from './middleware/logger';
import thunk from 'redux-thunk';


import { rootReducer } from './root-reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//prevents redux logger when its not in development mode
const middleWares = [process.env.NODE_ENV !== 'production' && logger, 
    thunk
].filter(Boolean);


// const composeEnhancer = (process.env.NODE_ENV !== 'production' 
//     && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = 
    createStore(
        persistedReducer, 
        undefined, 
        composedEnhancers
    );

export const persistor = persistStore(store);


