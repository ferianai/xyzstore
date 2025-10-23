"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/api/products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      const response = await getProducts();
      if (response.status === "success" && response.data) {
        setProducts(response.data);
        setError(null);
      } else {
        setError(response.message);
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    } finally {
      setLoading(false);
    }
  }

  async function addProduct(data: Product) {
    try {
      await createProduct(data);
      await load();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    }
  }

  async function editProduct(id: number, data: Product) {
    try {
      await updateProduct(id, data);
      await load();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    }
  }

  async function removeProduct(id: number) {
    try {
      await deleteProduct(id);
      await load();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { products, loading, error, addProduct, editProduct, removeProduct };
}
