import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./components/Loading";

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default AppWrapper;
