import { ApiResponse } from "@/types/api";
import { Product } from "@/types/product";
import { fetchWithError } from "@/lib/api/fetchHelper";

const BASE_URL = "/xyzstore/api/products";

export async function getProducts(): Promise<ApiResponse<Product[]>> {
  return fetchWithError(fetch(BASE_URL));
}

export async function createProduct(data: Product): Promise<ApiResponse<Product>> {
  return fetchWithError(
    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  );
}

export async function updateProduct(id: number, data: Product): Promise<ApiResponse<Product>> {
  return fetchWithError(
    fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  );
}

export async function deleteProduct(id: number): Promise<ApiResponse<null>> {
  return fetchWithError(
    fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
  );
}
