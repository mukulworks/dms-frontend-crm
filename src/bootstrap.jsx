import ReactDOM from "react-dom";
import App from "./container/App";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

const store = configureStore();
const mount = (el, { id }) => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById(id)
  );
};
if (process.env.NODE_ENV == "development") {
  const devRoot = document.querySelector("#_crm-root");
  if (devRoot) {
    mount(devRoot, { id: "_crm-root" });
  }
}
export { mount };
