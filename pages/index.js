import { fetchMemes } from "../services/airtable";
import Link from "next/link";

export async function getStaticProps() {
  const allMemes = await fetchMemes();
  const firstMeme = allMemes[0];
  return {
    props: {
      firstMeme,
    },
  };
}

export default function IndexPage({ firstMeme }) {
  return (
    <div>
      <div className="p-20">
        <h1 className="text-5xl text-center text-gray-700 dark:text-gray-100">
          Hexamemer 2020
        </h1>
        <p className="dark:text-gray-100 mt-5">
          Bienvenue ! Vous allez pouvoir voter pour élire le ou la meilleur/e
          Memer de 2020 ! Le vote est entièrement anonyme, veuillez ne voter
          qu'une fois s'il vous plaît.
        </p>
        <Link href={`/memes/${firstMeme.id}`}>
          <a
            className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-purple-700 hover:bg-purple-700 dark:text-gray-100 text-gray-700 hover:text-white font-normal py-2 px-4 rounded block text-center"
            style={{ margin: "30px auto", width: "150px" }}
          >
            Commencer
          </a>
        </Link>
      </div>
    </div>
  );
}
