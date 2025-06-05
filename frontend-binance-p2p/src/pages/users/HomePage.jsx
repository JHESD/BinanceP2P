import './HomePage.css';

const HomePage = () => {
  const monedas = [
    { nombre: 'Bitcoin', ticker: 'BTC', valor: 69123, variacion: '+1.7%', compras: 14, ventas: 10 },
    { nombre: 'Ethereum', ticker: 'ETH', valor: 4215, variacion: '-0.5%', compras: 9, ventas: 12 },
    { nombre: 'USDT', ticker: 'USDT', valor: 6.95, variacion: '+0.0%', compras: 24, ventas: 18 },
    { nombre: 'Solana', ticker: 'SOL', valor: 850, variacion: '+3.2%', compras: 7, ventas: 6 },
    { nombre: 'Dogecoin', ticker: 'DOGE', valor: 0.42, variacion: '-1.9%', compras: 5, ventas: 3 },
  ];

  return (
    <div className="homepage-container p-6 space-y-10">
      <h1 className="homepage-title text-2xl font-bold">Panel Principal</h1>

      <section className="market-section">
        <h2 className="section-title text-xl font-semibold mb-4">📈 Estado del mercado</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {monedas.map((m, i) => (
            <div key={i} className="market-card border rounded-lg shadow p-4">
              <h3 className="coin-name text-lg font-bold">{m.nombre} <span className="coin-ticker">({m.ticker})</span></h3>
              <p className="coin-value text-gray-700">Valor en Bs: <strong>{m.valor.toFixed(2)}</strong></p>
              <p className={`coin-variation ${m.variacion.startsWith('+') ? 'text-positive' : 'text-negative'}`}>
                Variación semanal: {m.variacion}
              </p>
              <div className="coin-stats mt-2 text-sm text-gray-600">
                <p>📥 Compras: <strong>{m.compras}</strong></p>
                <p>📤 Ventas: <strong>{m.ventas}</strong></p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="advice-section">
        <h2 className="section-title text-xl font-semibold mb-4">📘 Consejos de uso</h2>
        <ul className="advice-list list-disc list-inside space-y-1">
          <li>Verifica los comprobantes de pago antes de aprobar o finalizar una transacción.</li>
          <li>Recuerda que los valores pueden cambiar minuto a minuto.</li>
          <li>Solo puedes operar monedas que tienes en billeteras activas.</li>
          <li>Las transferencias entre diferentes monedas aplican conversión automática.</li>
          <li>Ante cualquier duda, consulta con un administrador.</li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;