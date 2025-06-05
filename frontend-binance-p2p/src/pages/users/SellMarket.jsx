import React, { useEffect, useState } from "react";
import { getAdsByCurrencyAndType } from "../../services/adServices";
import { useNavigate } from "react-router-dom";
import './SellMarket.css';

const SellMarket = () => {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const data = await getAdsByCurrencyAndType({ type: "venta" });
        setAds(data);
      } catch (error) {
        console.error("Error fetching sell ads:", error);
        setAds([]);
      }
    };
    fetchAds();
  }, []);

  const handleViewDetails = (adId) => {
    navigate(`/sell/${adId}`);
  };


  return (
    <div className="sell-market-container">
      <div className="create-ad-button-container">
        <button
          onClick={() => navigate("/sell/new")}
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
                    <strong>Precio solicitado:</strong> {ad.pricePerUnit} {ad.currency?.ticker || ''}
                </p>
                <p className="ad-details">
                    <strong>Cantidad a vender:</strong> {ad.quantity} {ad.currency?.ticker || ''}
                </p>
              </div>
              <button
                className="button-base button-primary ad-view-details-button"
                onClick={() => handleViewDetails(ad.id)}
              >
                Ver detalle
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-ads-message">
          <p>Actualmente no hay anuncios de venta disponibles.</p>
          <p>¡Anímate a crear el tuyo!</p>
        </div>
      )}
    </div>
  );
};

export default SellMarket;