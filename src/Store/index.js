import { createStore, applyMiddleware } from 'redux';
import Reducer from '../Reducers';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
// const store = createStore(Reducer);

// export default store;
const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, Reducer)
export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
);
export const persistor = persistStore(store)