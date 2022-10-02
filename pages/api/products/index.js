import dbConnect from "../../../lib/dbConnect";
import Product from "../../../models/Product";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

  switch (request.method) {
    case "GET":
      const products = await getAllProducts();
      return response.status(200).json(products);
    case "POST":
      if (!(await unstable_getServerSession(request, response, authOptions))) {
        return response.status(401).json({
          error: "You must be signed in to create products.",
        });
      }
      const postData = JSON.parse(request.body);
      const newProduct = await Product.create(postData);
      return response
        .status(201)
        .json({ message: "Product created", createdId: newProduct.id });
    default:
      return response
        .status(405)
        .json({ message: "HTTP method is not allowed" });
  }
}
