import React, { useEffect, useState } from "react";
import { getCurrencies } from "../../services/walletService";
import { createAd } from "../../services/adServices";
import { useNavigate } from "react-router-dom";
import './CreateBuyAd.css';

const CreateBuyAd = () => {
  const [form, setForm] = useState({
    pricePerUnit: "",
    quantity: "",
    description: "",
    currencyId: "",
    paymentImage: null,
  });
  const [currencies, setCurrencies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const data = await getCurrencies();
        setCurrencies(data);
      } catch {
        setCurrencies([]);
      }
    };
    fetchCurrencies();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "paymentImage") {
      setForm({ ...form, paymentImage: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      await createAd({
        ...form,
        userId,
        type: "compra",
      });
      navigate("/buy", { replace: true });
    } catch {
      alert("Error creando anuncio");
    }
  };

  return (
    <div className="create-buy-form">
      <h2 className="text-lg font-semibold mb-4">Crear anuncio de compra</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Moneda</label>
          <select
            name="currencyId"
            value={form.currencyId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Selecciona una moneda</option>
            {currencies.map((currency) => (
              <option key={currency.id} value={currency.id}>
                {currency.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Precio ofrecido</label>
          <input
            type="number"
            name="pricePerUnit"
            value={form.pricePerUnit}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Cantidad</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Descripción del método de pago</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Imagen (opcional)</label>
          <input
            type="file"
            name="paymentImage"
            accept="image/*"
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 transition"
        >
          Publicar anuncio
        </button>
      </form>
    </div>
  );
};

export default CreateBuyAd;
