import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAdById } from "../../services/adServices";
import { MessageCircle } from "lucide-react";
import './BuyAdDetail.css';

const BuyAdDetail = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAd = async () => {
      setLoading(true);
      try {
        const data = await getAdById(id);
        setAd(data);
      } catch (err) {
        console.error("Error al obtener el anuncio:", err);
        setAd(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAd();
  }, [id]);

  if (loading) {
    return (
      <div className="ad-detail-status-container">
        Cargando anuncio...
      </div>
    );
  }

  if (!ad) {
    return (
      <div className="ad-detail-status-container">
        <p className="ad-detail-error-message">Anuncio no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="ad-detail-container">
      <h2 className="ad-detail-title">Detalle del Anuncio</h2>

      <div className="ad-info-section">
        <p className="ad-info-item"><strong>Moneda:</strong> <span>{ad.Currency?.name || 'N/A'}</span></p>
        <p className="ad-info-item"><strong>Precio ofrecido:</strong> <span>{ad.pricePerUnit} {ad.Currency?.ticker || ''}</span></p>
        <p className="ad-info-item"><strong>Cantidad:</strong> <span>{ad.quantity} {ad.Currency?.ticker || ''}</span></p>
        <p className="ad-info-item"><strong>Descripción:</strong> <span>{ad.description || 'No hay descripción.'}</span></p>
        <p className="ad-info-item"><strong>Estado:</strong> <span>{ad.status || 'N/A'}</span></p>
        <p className="ad-info-item"><strong>Publicado por:</strong> <span>{ad.User?.username || 'Usuario desconocido'}</span></p>

        {ad.paymentImage && (
          <div className="ad-payment-image-section">
            <p className="ad-payment-image-label">Imagen del método de pago:</p>
            <img
              src={`http://localhost:3000/uploads/payment/${ad.paymentImage}`}
              alt="Método de pago"
              className="ad-payment-image-display"
            />
          </div>
        )}

        <div className="ad-chat-button-section">
          <button
            onClick={() => alert(`Aquí iniciaría el chat con ${ad.User?.username || 'el anunciante'}`)}
            className="button-base button-primary ad-chat-button"
          >
            <MessageCircle className="lucide" />
            Chatear con {ad.User?.username || 'el anunciante'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyAdDetail;