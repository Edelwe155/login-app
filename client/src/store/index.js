import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSaga";

//getDefaultMiddleware

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: () => {
    return [sagaMiddleware];
  },
  devTools: true,
});

const persistor = persistStore(store);

// Unсomment this line to clear the cache
// persistor.purge();

sagaMiddleware.run(rootSaga);

export { store, persistor };
