import Link from "next/link";

export default function IndexPage() {
  return (
    <div>
      <div className="p-20">
        <h1 className="text-5xl text-center text-gray-700 dark:text-gray-100">
          Hexamemer 2020 - Résultats
        </h1>
        <p className="dark:text-gray-100 mt-5 mb-5">
          Merci d'avoir voté pour le concours Hexamemer 2020 ! Voici tous les
          memes classés par note moyenne :
        </p>
        <iframe
          className="airtable-embed"
          src="https://airtable.com/embed/shr90vL0biaEQA9z8?backgroundColor=blue"
          frameborder="0"
          onmousewheel=""
          width="100%"
          height="533"
          style={{ background: "transparent", border: "1px solid #ccc" }}
        ></iframe>
      </div>
    </div>
  );
}
