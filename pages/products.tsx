// app/pages/products.tsx (Pages Router)
import ProductTable from "@/components/molecules/product/ProductTable";
import { Product } from "@/types/product";
import { getProducts } from "@/lib/api/products"; // versi fetch helper biasa

type Props = {
  products: Product[];
};

export default function ProductsPage({ products }: Props) {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>
      <ProductTable
        products={products}
        onAdd={async () => alert("Tambah produk hanya tersedia di Vercel")}
        onEdit={async () => alert("Edit produk hanya tersedia di Vercel")}
        onDelete={async () => alert("Hapus produk hanya tersedia di Vercel")}
      />
    </main>
  );
}

// Build time static generation
export async function getStaticProps() {
  try {
    const { data } = await getProducts();
    return { props: { products: data } };
  } catch (err) {
    console.error(err);
    return { props: { products: [] } };
  }
}
