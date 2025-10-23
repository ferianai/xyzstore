"use client";

import { useState } from "react";
import { Product } from "@/types/product";

interface Props {
  initialData?: Product;
  onSubmit: (data: Product) => Promise<void>;
  buttonLabel: string;
}

const defaultProduct: Product = {
  id: 0,
  Nama_Produk: "",
  Harga_Beli_Sales: 0,
  Harga_Beli_SM: 0,
  Isi: 0,
  Harga_Beli_Pcs: 0,
  Harga_Jual_Dus: 0,
  Harga_Jual_Ecer: 0,
  Kategori: "",
  Persen_Laba_Ecer: 0.05,
  Laba_Dus: 2000,
};

export default function ProductForm({ initialData, onSubmit, buttonLabel }: Props) {
  const [form, setForm] = useState<Product>(initialData || defaultProduct);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "Harga_Beli_Sales" ||
        name === "Harga_Beli_SM" ||
        name === "Isi" ||
        name === "Harga_Beli_Pcs" ||
        name === "Harga_Jual_Dus" ||
        name === "Harga_Jual_Ecer" ||
        name === "Persen_Laba_Ecer" ||
        name === "Laba_Dus"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-3">
      <div>
        <label className="block text-sm font-medium">Nama Produk</label>
        <input
          type="text"
          name="Nama_Produk"
          value={form.Nama_Produk}
          onChange={handleChange}
          className="border w-full px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Harga Beli Sales</label>
        <input
          type="number"
          name="Harga_Beli_Sales"
          value={form.Harga_Beli_Sales}
          onChange={handleChange}
          className="border w-full px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Harga Beli SM</label>
        <input
          type="number"
          name="Harga_Beli_SM"
          value={form.Harga_Beli_SM}
          onChange={handleChange}
          className="border w-full px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Isi</label>
        <input
          type="number"
          name="Isi"
          value={form.Isi}
          onChange={handleChange}
          className="border w-full px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Kategori</label>
        <select
          name="Kategori"
          value={form.Kategori}
          onChange={handleChange}
          className="border w-full px-2 py-1"
          required
        >
          <option value="">Pilih Kategori</option>
          <option value="Lain-lain">Lain-lain</option>
          <option value="Makanan">Makanan</option>
          <option value="Minuman">Minuman</option>
          <option value="Pembersih">Pembersih</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
