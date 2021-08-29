import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./redux/store/configureStore";
const store = configureStore();

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
