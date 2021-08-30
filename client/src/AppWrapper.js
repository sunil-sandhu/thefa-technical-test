import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store/configureStore";
import { PersistGate } from "redux-persist/integration/react";

// const store = configureStore();

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default AppWrapper;
