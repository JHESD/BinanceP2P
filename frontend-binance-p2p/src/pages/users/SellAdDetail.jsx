import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAdById } from "../../services/adServices";
import "./SellAdDetail.css";

export default function SellAdDetail() {
  const { id } = useParams();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    getAdById(id)
      .then(setAd)
      .catch(() => alert("No se pudo cargar el anuncio."));
  }, [id]);

  if (!ad) {
    return (
      <div className="ad-detail-status-container">
        <p>Cargando anuncio...</p>
      </div>
    );
  }

  return (
    <div className="sell-detail-container">
      <h2 className="sell-detail-title">Detalles del anuncio</h2>

      <div className="sell-info-item">
        <strong>Precio por unidad:</strong>
        <span>{ad.pricePerUnit} USDT</span>
      </div>
      <div className="sell-info-item">
        <strong>Cantidad:</strong>
        <span>{ad.quantity}</span>
      </div>
      {ad.description && (
        <div className="sell-info-item">
          <strong>Descripción:</strong>
          <span>{ad.description}</span>
        </div>
      )}

      {ad.paymentImage && (
        <div className="sell-payment-image-section">
          <p className="sell-info-item">
            <strong>Imagen de pago sugerido:</strong>
          </p>
          <img
            src={`http://localhost:3000/uploads/payment/${ad.paymentImage}`}
            alt="Método de pago"
          />
        </div>
      )}

      <form className="sell-receipt-form">
        <h3>Sube el comprobante de pago</h3>
        <input type="file" name="receiptImage" accept="image/*" />
        <button type="submit">Confirmar pago</button>
      </form>
    </div>
  );
}
