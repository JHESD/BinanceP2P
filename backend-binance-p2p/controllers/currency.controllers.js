const Currency = require('../models/currency.models');

const createCurrency = async (req, res) => {
    try {
      const { name, valueInSus } = req.body;
      const newCurrency = await Currency.create({ name, valueInSus });
      res.status(201).json(newCurrency);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear moneda', error });
    }
};

const getAllCurrencies = async (req, res) => {
    try {
      const currencies = await Currency.findAll();
      res.status(200).json(currencies);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener monedas', error });
    }
};

const updateCurrency = async (req, res) => {
  try {
    const currency = await Currency.findByPk(req.params.id);
    if (!currency) return res.status(404).json({ message: 'Moneda no encontrada' });

    const { name, valueInSus } = req.body;
    currency.name = name || currency.name;
    currency.valueInSus = valueInSus || currency.valueInSus;
    await currency.save();

    res.status(200).json(currency);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar moneda', error });
  }
};

const deleteCurrency = async (req, res) => {
  try {
    const currency = await Currency.findByPk(req.params.id);
    if (!currency) return res.status(404).json({ message: 'Moneda no encontrada' });

    await currency.destroy();
    res.status(200).json({ message: 'Moneda eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar moneda', error });
  }
};

const convertCurrency = async (req, res) => {
  try {
    const { fromCurrencyId, toCurrencyId, amount } = req.body;

    const from = await Currency.findByPk(fromCurrencyId);
    const to = await Currency.findByPk(toCurrencyId);

    if (!from || !to) {
      return res.status(404).json({ message: 'Una o ambas monedas no existen' });
    }

    const valueInSus = amount * from.valueInSus;
    const convertedAmount = valueInSus / to.valueInSus;

    res.status(200).json({
      from: from.name,
      to: to.name,
      originalAmount: amount,
      convertedAmount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al convertir moneda', error });
  }
};

module.exports = {
  createCurrency,
  getAllCurrencies,
  updateCurrency,
  deleteCurrency,
  convertCurrency
};