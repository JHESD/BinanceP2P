import React, { useEffect, useState } from "react";
import { getAdsByCurrencyAndType } from "../../services/adServices";
import { useNavigate } from "react-router-dom";
import './BuyMarket.css';

const BuyMarket = () => {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const data = await getAdsByCurrencyAndType({ type: "compra" });
        setAds(data);
      } catch (error) {
        console.error("Error fetching ads:", error);
        setAds([]);
      }
    };
    fetchAds();
  }, []);

  return (
    <div className="buy-market-container">
      <div className="create-ad-button-container">
        <button
          onClick={() => navigate("/buy/new")}
          className="button-base button-primary"
        >
          Crear nuevo anuncio
        </button>
      </div>

      {ads && ads.length > 0 ? (
        <div className="ads-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="ad-card"
            >
              <div className="ad-card-content">
                <h2 className="ad-currency-name">{ad.Currency?.name || 'Moneda no especificada'}</h2>
                <p className="ad-description">{ad.description}</p>
                <p className="ad-details">
                    <strong>Precio ofrecido:</strong> {ad.pricePerUnit} {ad.currency?.ticker || ''}
                </p>
                <p className="ad-details">
                    <strong>Cantidad disponible:</strong> {ad.quantity} {ad.currency?.ticker || ''}
                </p>
                {ad.paymentImage && (
                  <img
                    src={ad.paymentImage}
                    alt="Método de pago"
                    className="ad-payment-image"
                  />
                )}
              </div>
              <button
                className="button-base button-primary ad-view-details-button"
                onClick={() => navigate(`/buy/${ad.id}`)}
              >
                Ver detalle
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-ads-message">
          <p>Actualmente no hay anuncios de compra disponibles.</p>
          <p>¡Sé el primero en crear uno!</p>
        </div>
      )}
    </div>
  );
};

export default BuyMarket;