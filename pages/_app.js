import { Provider } from "react-redux";
import "../styles/globals.css";
import { store } from "../redux/store";
import AuthWrapper from "../components/AuthWrapper";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </Provider>
  );
}

export default MyApp;
