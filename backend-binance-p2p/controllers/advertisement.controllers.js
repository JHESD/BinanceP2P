const { Ad, Currency, User, Wallet } = require('../models');

const createAd = async (req, res) => {
    try {
        const {
        type,
        pricePerUnit,
        quantity,
        description,
        currencyId
        } = req.body;

        const userId = req.user.userId;

        const paymentImage = req.file ? req.file.filename : null;

        const wallet = await Wallet.findOne({
        where: {
            userId,
            currencyId
        }
        });

        if (!wallet) {
        return res.status(400).json({ message: 'El usuario no tiene una billetera para esta moneda.' });
        }

        const newAd = await Ad.create({
        type,
        pricePerUnit,
        quantity,
        description,
        currencyId,
        userId,
        walletId: wallet.id,
        paymentImage
        });

        return res.status(201).json(newAd);
    } catch (error) {
        console.error('Error al crear anuncio:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};


const getAdsByCurrencyAndType = async (req, res) => {
    try {
        const { currencyId, type, status } = req.query;

        const where = {};
        if (currencyId) where.currencyId = currencyId;
        if (type) where.type = type;
        if (!where.status) where.status = 'activo';


        const ads = await Ad.findAll({
        where,
        include: [
            { model: Currency, attributes: ['id', 'name'] },
            { model: User, attributes: ['id', 'username'] },
            { model: Wallet, as: 'wallet', attributes: ['id', 'balance'] }
        ],
        order: [['createdAt', 'DESC']]
        });

        return res.status(200).json(ads);
    } catch (error) {
        console.error('Error al obtener anuncios:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getAdById = async (req, res) => {
    try {
        const { id } = req.params;

        const ad = await Ad.findByPk(id, {
        include: [
            { model: Currency, attributes: ['id', 'name'] },
            { model: User, attributes: ['id', 'username'] }
        ]
        });

        if (!ad) {
        return res.status(404).json({ message: 'Anuncio no encontrado' });
        }

        return res.status(200).json(ad);
    } catch (error) {
        console.error('Error al obtener el anuncio:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const updateAdStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = ['activo', 'inactivo', 'completado', 'cancelado'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Estado no permitido' });
        }

        const ad = await Ad.findByPk(id);
        if (!ad) {
            return res.status(404).json({ message: 'Anuncio no encontrado' });
        }

        ad.status = status;
        await ad.save();

        return res.status(200).json({ message: 'Estado actualizado correctamente', ad });
    } catch (error) {
        console.error('Error al actualizar estado del anuncio:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};


module.exports = {
    createAd,
    getAdsByCurrencyAndType,
    getAdById,
    updateAdStatus
};