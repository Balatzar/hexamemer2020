import "../styles/index.css";
import DarkModeToggle from "../components/darkModeToggle";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Hexamemer 2020</title>
        <meta
          name="description"
          content="Votez pour élire le ou la meilleur/e Memer de 2020"
        />
        <meta property="og:title" content="Hexamemer 2020" key="ogtitle" />
        <meta
          property="og:description"
          content="Votez pour élire le ou la meilleur/e Memer de 2020"
          key="ogdesc"
        />
        <meta
          property="og:url"
          content="https://hexamemer2020.vercel.app"
          key="ogurl"
        />
        <meta
          property="og:site_name"
          content="Hexamemer 2020"
          key="ogsitename"
        />
        <script
          async
          defer
          data-domain="hexamemer2020.vercel.app"
          src="https://plausible.io/js/plausible.js"
        ></script>
      </Head>
      <DarkModeToggle />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
