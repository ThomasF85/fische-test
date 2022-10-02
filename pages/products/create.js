import { useRouter } from "next/router";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import ProductForm from "../../components/ProductForm";
import { getAllCategories } from "../../services/categoryService";
import { useSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const categories = await getAllCategories();

  return {
    props: {
      categories,
      session: await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
      ),
    },
  };
}

export default function CreateProduct({ categories }) {
  const router = useRouter();
  const { data: session } = useSession();

  async function handleSubmit(data) {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      router.push(`/products/${result.createdId}`);
    } catch (error) {
      console.error(error);
    }
  }

  if (session) {
    return (
      <>
        <h1>Produkt hinzufügen</h1>
        <ProductForm
          onSubmit={handleSubmit}
          categories={categories}
          buttonLabel="hinzufügen"
        />
      </>
    );
  }

  return <p>Access Denied</p>;
}
