import Link from "next/link";

export default function IndexPage() {
  return (
    <div>
      <div className="p-20">
        <h1 className="text-5xl text-center text-gray-700 dark:text-gray-100">
          Hexamemer 2020
        </h1>
        <p className="dark:text-gray-100 mt-5">
          Merci d'avoir voté pour le concours Hexamemer 2020 ! Vous retrouverez
          les résultats dans quelques jours dans votre gazette préférée.
        </p>
        <p className="dark:text-gray-100 mt-5">
          Si vous voulez vous pouvez accéder à une galerie de tous les memes de
          cette année{" "}
          <Link href={`/memes`}>
            <a className="underline">ici</a>
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
