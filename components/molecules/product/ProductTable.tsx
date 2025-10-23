"use client";
import { useState } from "react";
import { Product } from "@/types/product";
import ProductForm from "./ProductForm";

interface Props {
  products: Product[];
  onAdd: (data: Product) => Promise<void>;
  onEdit: (id: number, data: Product) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function ProductTable({ products, onAdd, onEdit, onDelete }: Props) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAdd = async (data: Product) => {
    // Calculate auto fields
    const hargaBeliPcs = data.Harga_Beli_SM / data.Isi;
    const hargaJualDus = data.Harga_Beli_SM + 2000; // Laba_Dus = 2000
    const persenLabaEcer = 0.05;
    const basePrice = hargaBeliPcs + (hargaBeliPcs * persenLabaEcer);
    const hargaJualEcer = basePrice < 10000
      ? Math.ceil(basePrice / 500) * 500
      : Math.ceil(basePrice / 1000) * 1000;

    const newProduct: Product = {
      ...data,
      id: Math.max(0, ...products.map(p => p.id)) + 1, // Auto increment ID
      Harga_Beli_Pcs: hargaBeliPcs,
      Harga_Jual_Dus: hargaJualDus,
      Harga_Jual_Ecer: hargaJualEcer,
      Persen_Laba_Ecer: persenLabaEcer,
      Laba_Dus: 2000,
    };

    await onAdd(newProduct);
    setShowAddModal(false);
  };

  const handleEdit = async (data: Product) => {
    if (!editingProduct) return;

    // Recalculate auto fields
    const hargaBeliPcs = data.Harga_Beli_SM / data.Isi;
    const hargaJualDus = data.Harga_Beli_SM + 2000;
    const persenLabaEcer = 0.05;
    const basePrice = hargaBeliPcs + (hargaBeliPcs * persenLabaEcer);
    const hargaJualEcer = basePrice < 10000
      ? Math.ceil(basePrice / 500) * 500
      : Math.ceil(basePrice / 1000) * 1000;

    const updatedProduct: Product = {
      ...data,
      Harga_Beli_Pcs: hargaBeliPcs,
      Harga_Jual_Dus: hargaJualDus,
      Harga_Jual_Ecer: hargaJualEcer,
      Persen_Laba_Ecer: persenLabaEcer,
      Laba_Dus: 2000,
    };

    await onEdit(editingProduct.id, updatedProduct);
    setShowEditModal(false);
    setEditingProduct(null);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      await onDelete(id);
    }
  };

  if (!products.length) return <p>Tidak ada data.</p>;

  return (
    <>
      <button
        onClick={() => setShowAddModal(true)}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        + Tambah Produk
      </button>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1 text-left">ID</th>
            {Object.keys(products[0])
              .filter((key) => key !== "id")
              .map((key) => (
                <th key={key} className="border px-2 py-1 text-left">
                  {key.replace(/_/g, " ")}
                </th>
              ))}
            <th className="border px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td className="border px-2 py-1">{item.id}</td>
              {Object.entries(item)
                .filter(([key]) => key !== "id")
                .map(([key, value]) => (
                  <td key={key} className="border px-2 py-1">
                    {String(value)}
                  </td>
                ))}
              <td className="border px-2 py-1">
                <button
                  onClick={() => {
                    setEditingProduct(item);
                    setShowEditModal(true);
                  }}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Add Produk</h2>
            <ProductForm
              onSubmit={handleAdd}
              buttonLabel="Tambah"
            />
            <button
              onClick={() => setShowAddModal(false)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edit Produk</h2>
            <ProductForm
              initialData={editingProduct}
              onSubmit={handleEdit}
              buttonLabel="Update"
            />
            <button
              onClick={() => {
                setShowEditModal(false);
                setEditingProduct(null);
              }}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </>
  );
}
