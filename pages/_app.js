import "../styles/index.css";
import DarkModeToggle from "../components/darkModeToggle";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <DarkModeToggle />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
