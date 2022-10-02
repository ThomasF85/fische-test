import { useRouter } from "next/router";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]";
import ProductForm from "../../../components/ProductForm";
import { getAllCategories } from "../../../services/categoryService";
import { getProductById } from "../../../services/productService";
import { useSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const product = await getProductById(id);
  const categories = await getAllCategories();

  return {
    props: {
      product,
      categories,
      session: await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
      ),
    },
  };
}

export default function Product({ product, categories }) {
  const router = useRouter();
  const { data: session } = useSession();

  async function handleSubmit(data) {
    const response = await fetch(`/api/products/${product.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    await response.json();

    router.push(`/products/${product.id}`);
  }

  if (session) {
    return (
      <>
        <h1>Produkt bearbeiten</h1>
        <ProductForm
          onSubmit={handleSubmit}
          categories={categories}
          product={product}
          buttonLabel="bearbeiten"
        />
      </>
    );
  }

  return <p>Access Denied</p>;
}
