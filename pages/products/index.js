import Head from "next/head";
import Link from "next/link";
import Anchor from "../../components/Anchor";
import GridList from "../../components/GridList";
import { useSession } from "next-auth/react";
import { getAllProducts } from "../../services/productService";

export async function getServerSideProps() {
  const products = await getAllProducts();

  return {
    props: { products },
  };
}

export default function Products({ products }) {
  const { status } = useSession();

  return (
    <>
      <Head>
        <title>Alle Produkte</title>
      </Head>
      <h1>Produkte</h1>
      <p>Alle Produkte</p>
      <GridList>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </GridList>
      {status === "authenticated" && (
        <Link href={`/products/create`} passHref>
          <Anchor>Produkt hinzufügen</Anchor>
        </Link>
      )}
    </>
  );
}
