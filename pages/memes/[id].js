import { fetchMemes } from "../../services/airtable";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const allMemes = await fetchMemes();
  return {
    paths: allMemes.map(({ id }) => `/memes/${id}`),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allMemes = await fetchMemes();
  const findMeme = ({ id }) => id === params.id;
  const meme = allMemes.find(findMeme);
  const index = allMemes.findIndex(findMeme);
  const count = allMemes.length;
  const nextMeme = allMemes[index + 1] || null;
  return {
    props: {
      meme,
      index,
      count,
      nextMeme,
    },
  };
}

export default function Show({ meme, index, count, nextMeme }) {
  const [vote, setVote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);
  const router = useRouter();
  const { width, height, url } = meme.image[0].thumbnails.large;

  useEffect(() => {
    setVote(null);
    setLoading(false);
    setLoadingImage(true);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [index]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [vote]);

  const saveVote = async (e) => {
    e.preventDefault();
    if (vote === null) return;
    setLoading(true);

    const body = { id: meme.id, vote };

    const query = {
      method: "POST",
      body: JSON.stringify(body),
    };

    const res = await fetch(`/api/memes`, query);
    const data = await res.json();

    if (res.status === 200) {
      const url = nextMeme ? `/memes/${nextMeme.id}` : `/end`;
      setTimeout(() => {
        router.push(url);
      }, 1000);
    } else {
      console.warn(data);
      setLoading(false);
      alert(
        "Impossible de sauvegarder votre vote. Consultez la console JS pour plus d'information."
      );
    }
  };

  return (
    <div>
      <div className="py-10">
        <h1 className="text-4xl text-center text-gray-700 dark:text-gray-100">
          {index + 1}/{count}
        </h1>
        <div className="mx-auto my-0" style={{ width }}>
          <div style={loadingImage ? { opacity: 0 } : {}}>
            <Image
              src={url}
              width={width}
              height={height}
              onLoad={() => {
                setLoadingImage(false);
              }}
            />
          </div>
        </div>
        <div
          className="flex justify-between mx-auto my-0"
          style={{ width: "300px" }}
        >
          {[...Array(6).keys()].map((note) => {
            return (
              <div key={note} className="py-2">
                <input
                  type="radio"
                  id={`vote_${note}`}
                  name="vote"
                  value={note}
                  onChange={(e) => setVote(note)}
                  checked={vote === note}
                />
                <label
                  className="dark:text-gray-100 ml-2"
                  htmlFor={`vote_${note}`}
                >
                  {note}
                </label>
              </div>
            );
          })}
        </div>
        {vote === null ? null : loading ? (
          <a
            className="btn-outline-primary border border-grey-700 dark:text-gray-100 text-gray-700 hover:text-white font-normal py-2 px-4 rounded block text-center cursor-wait"
            style={{ margin: "30px auto", width: "150px" }}
          >
            Chargement...
          </a>
        ) : (
          <a
            onClick={saveVote}
            className="btn-outline-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-purple-700 hover:bg-purple-700 dark:text-gray-100 text-gray-700 hover:text-white font-normal py-2 px-4 rounded block text-center cursor-pointer"
            style={{ margin: "30px auto", width: "150px" }}
          >
            {nextMeme ? "Suivant" : "Terminer"}
          </a>
        )}
      </div>
    </div>
  );
}
