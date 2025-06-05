import { useState, useEffect } from "react";
import { getCurrencies } from "../../services/walletService";
import { createAd } from "../../services/adServices";
import { useNavigate } from "react-router-dom";
import './CreateSellAd.css';

export default function CreateSellAd() {
  const [currencies, setCurrencies] = useState([]);
  const [formData, setFormData] = useState({
    pricePerUnit: "",
    quantity: "",
    description: "",
    currencyId: "",
    paymentImage: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    getCurrencies().then(setCurrencies);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAd({ ...formData, type: "venta" });
      navigate("/sell", { replace: true });
    } catch {
      alert("Error al crear el anuncio.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-sell-form">
      <h2 className="text-xl font-semibold">Crear anuncio de venta</h2>

      <select name="currencyId" onChange={handleChange} required className="w-full">
        <option value="">Selecciona una moneda</option>
        {currencies.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input type="number" name="pricePerUnit" placeholder="Precio por unidad" onChange={handleChange} required className="w-full" />
      <input type="number" name="quantity" placeholder="Cantidad a vender" onChange={handleChange} required className="w-full" />
      <textarea name="description" placeholder="Descripción o condiciones de pago" onChange={handleChange} required className="w-full" />
      <input type="file" name="paymentImage" accept="image/*" onChange={handleChange} className="w-full" />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Crear anuncio</button>
    </form>
  );
}
