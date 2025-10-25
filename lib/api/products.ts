import { ApiResponse } from "@/types/api";
import { Product } from "@/types/product";
import { fetchWithError } from "@/lib/api/fetchHelper";

const BASE_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_API as string;

// ✅ GET — ambil semua produk
export async function getProducts(): Promise<ApiResponse<Product[]>> {
  const data = await fetchWithError<Product[]>(BASE_URL);

  return {
    status: "success",
    data,
    message: "Products fetched successfully",
  };
}

// ✅ POST — buat produk baru
export async function createProduct(data: Product): Promise<ApiResponse<Product>> {
  const result = await fetchWithError<Product>(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return {
    status: "success",
    data: result,
    message: "Product created successfully",
  };
}

// ✅ PUT — update produk
export async function updateProduct(id: number, data: Product): Promise<ApiResponse<Product>> {
  const result = await fetchWithError<Product>(BASE_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return {
    status: "success",
    data: result,
    message: "Product updated successfully",
  };
}

// ✅ DELETE — hapus produk
export async function deleteProduct(id: number): Promise<ApiResponse<null>> {
  const result = await fetchWithError<null>(BASE_URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  return {
    status: "success",
    data: result,
    message: "Product deleted successfully",
  };
}
