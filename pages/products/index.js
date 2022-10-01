import Link from "next/link";
import GridList from "../../components/GridList";

export default function Products() {
  return (
    <>
      <h1>Produkte</h1>
      <p>Liste aller Produkte</p>
      <GridList>
        <li>
          <Link href="/products/guppy">Guppy</Link>
        </li>
        <li>
          <Link href="/products/regenbogenfisch">Regenbogenfisch</Link>
        </li>
      </GridList>
    </>
  );
}
