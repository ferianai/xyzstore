"use client";

import { useProducts } from "@/hooks/useProducts";
import ProductTable from "@/components/molecules/product/ProductTable";

export default function ProductsPage() {
  const { products, loading, error, addProduct, editProduct, removeProduct } = useProducts();

  if (loading) return <p className="p-6">Memuat data...</p>;

  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>
      <ProductTable
        products={products}
        onAdd={addProduct}
        onEdit={editProduct}
        onDelete={removeProduct}
      />
    </main>
  );
}
