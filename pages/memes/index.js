import { fetchMemes } from "../../services/airtable";
import Image from "next/image";
import Link from "next/link";

export async function getStaticProps() {
  const allMemes = await fetchMemes();
  return {
    props: {
      allMemes,
    },
  };
}

export default function Index({ allMemes }) {
  return (
    <div>
      <div>
        <h1 className="text-5xl text-center text-gray-700 dark:text-gray-100">
          Le cru 2020
        </h1>
        {allMemes.map((meme) => {
          const { width, height, url } = meme.image[0].thumbnails.large;
          return (
            <div key={meme.id}>
              <Image src={url} width={width} height={height} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
