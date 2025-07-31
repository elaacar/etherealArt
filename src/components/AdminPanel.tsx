import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface Props {
  onAdd: (newProduct: {
    name: string;
    description: string;
    size: string;
    price: number;
    image: string;
  }) => void;
  onDelete?: (id: string) => Promise<void>;
  onUpdatePrice?: (id: string, price: number) => Promise<void>;
}

const AdminPanel: React.FC<Props> = ({ onAdd, onDelete, onUpdatePrice }) => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: '',
    description: '',
    size: '',
    price: '',
    image: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name: form.name,
      description: form.description,
      size: form.size,
      price: parseFloat(form.price),
      image: form.image
    });
    setForm({ name: '', description: '', size: '', price: '', image: '' });
  };

  if (!user || user.id !== '2') return null;

  return (
    <div className="mt-10 p-4 border rounded bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Yeni Görsel Ekle</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Görsel Adı" className="p-2 border rounded" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Açıklama" className="p-2 border rounded" required />
        <input name="size" value={form.size} onChange={handleChange} placeholder="Boyut (örneğin 30x40)" className="p-2 border rounded" required />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Fiyat (₺)" className="p-2 border rounded" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Görsel URL" className="p-2 border rounded" required />
        <button type="submit" className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 col-span-full">
          Ekle
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
