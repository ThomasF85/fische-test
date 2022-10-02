import dbConnect from "../../../lib/dbConnect";
import Product from "../../../models/Product";
import { getProductById } from "../../../services/productService";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  const { id } = request.query;
  await dbConnect();

  switch (request.method) {
    case "GET":
      const product = await getProductById(id);
      return response.status(200).json(product);
    case "PUT":
      if (!(await unstable_getServerSession(request, response, authOptions))) {
        return response.status(401).json({
          error: "You must be signed in to update products.",
        });
      }
      const data = JSON.parse(request.body);
      const updatedProduct = await Product.findByIdAndUpdate(id, data);
      return response
        .status(200)
        .json({ message: "Product updated", updatedProduct: updatedProduct });
    case "DELETE":
      if (!(await unstable_getServerSession(request, response, authOptions))) {
        return response.status(401).json({
          error: "You must be signed in to delete products.",
        });
      }
      await Product.findByIdAndDelete(id);
      return response
        .status(200)
        .json({ message: "Product deleted", deletedId: id });
    default:
      return response
        .status(405)
        .json({ message: "HTTP method is not allowed" });
  }
}
