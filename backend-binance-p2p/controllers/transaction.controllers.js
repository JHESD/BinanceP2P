const { Transaction, Ad, Wallet,Currency } = require('../models');

const createPurchaseTransaction = async (req, res) => {
    const { adId, buyerWalletId } = req.body;
    try {
        const ad = await Ad.findByPk(adId, {
        include: [{ model: Wallet, as: 'wallet' }]
        });

        if (!ad || ad.status !== 'activo') {
        return res.status(400).json({ message: 'Anuncio no disponible' });
        }

        const amount = ad.quantity * ad.pricePerUnit;

        const transaction = await Transaction.create({
        type: 'compra',
        amount,
        adId,
        walletFromId: buyerWalletId,
        walletToId: ad.walletId,
        status: 'pendiente'
        });

        ad.status = 'inactivo';
        await ad.save();

        return res.status(201).json(transaction);
    } catch (error) {
        console.error('Error al iniciar compra:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const uploadReceipt = async (req, res) => {
    const { transactionId } = req.params;
    const receiptImage = req.file ? req.file.filename : null;

    try {
        const transaction = await Transaction.findByPk(transactionId);
        if (!transaction || transaction.status !== 'pendiente') {
        return res.status(400).json({ message: 'Transacción inválida' });
        }

        transaction.receiptImage = receiptImage;
        await transaction.save();

        return res.status(200).json({ message: 'Comprobante subido exitosamente', transaction });
    } catch (error) {
        console.error('Error al subir comprobante:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const finalizeTransaction = async (req, res) => {
    const { transactionId } = req.params;

    try {
        const transaction = await Transaction.findByPk(transactionId, {
        include: [
            { model: Wallet, as: 'fromWallet' },
            { model: Wallet, as: 'toWallet' }
        ]
        });

        if (!transaction || transaction.status !== 'pendiente') {
        return res.status(400).json({ message: 'Transacción no válida' });
        }

        if (transaction.fromWallet.balance < transaction.amount) {
        return res.status(400).json({ message: 'Saldo insuficiente del comprador' });
        }

        transaction.fromWallet.balance -= transaction.amount;
        transaction.toWallet.balance += transaction.amount;

        await transaction.fromWallet.save();
        await transaction.toWallet.save();

        transaction.status = 'finalizada';
        await transaction.save();

        return res.status(200).json({ message: 'Transacción finalizada con éxito', transaction });
    } catch (error) {
        console.error('Error al finalizar la transacción:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const cancelTransaction = async (req, res) => {
    const { transactionId } = req.params;

    try {
        const transaction = await Transaction.findByPk(transactionId);
        if (!transaction || transaction.status !== 'pendiente') {
        return res.status(400).json({ message: 'No se puede cancelar esta transacción' });
        }

        transaction.status = 'cancelada';
        await transaction.save();

        const ad = await Ad.findByPk(transaction.adId);
        if (ad) {
        ad.status = 'activo';
        await ad.save();
        }

        return res.status(200).json({ message: 'Transacción cancelada', transaction });
    } catch (error) {
        console.error('Error al cancelar la transacción:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const transferBetweenWallets = async (req, res) => {
    console.log('Contenido de req.user:', req.user);
    const { walletFromId, walletToId, amount, description } = req.body;
    const userId = req.user.userId; // del middleware auth
    console.log('Datos de la transferencia:', { walletFromId, walletToId, amount, description, userId });

    if (!walletFromId || !walletToId || isNaN(amount) || Number(amount) <= 0) {
        return res.status(400).json({ message: 'Parámetros inválidos' });
    }

    if (walletFromId === walletToId) {
        return res.status(400).json({ message: 'Las billeteras deben ser diferentes' });
    }

    try {
        const fromWallet = await Wallet.findOne({ where: { id: walletFromId, userId } });
        const toWallet = await Wallet.findOne({ where: { id: walletToId, userId } });

        if (!fromWallet || !toWallet) {
            return res.status(404).json({ message: 'Billetera no encontrada o no autorizada' });
        }

        if (fromWallet.currencyId !== toWallet.currencyId) {
            const fromCurrency = await Currency.findByPk(fromWallet.currencyId);
            const toCurrency = await Currency.findByPk(toWallet.currencyId);

            const amountInSus = Number(amount) * fromCurrency.valueEnSus;
            const convertedAmount = amountInSus / toCurrency.valueEnSus;

            if (fromWallet.balance < Number(amount)) {
                return res.status(400).json({ message: 'Saldo insuficiente' });
            }

            fromWallet.balance -= Number(amount);
            toWallet.balance += convertedAmount;
        } else {
            if (fromWallet.balance < Number(amount)) {
                return res.status(400).json({ message: 'Saldo insuficiente' });
            }

            fromWallet.balance -= Number(amount);
            toWallet.balance += Number(amount);
        }

        await fromWallet.save();
        await toWallet.save();

        const transaction = await Transaction.create({
            type: 'transferencia',
            amount: Number(amount),
            description: description || 'Transferencia entre billeteras',
            walletFromId,
            walletToId,
            status: 'finalizada'
        });

        return res.status(201).json({ message: 'Transferencia realizada', transaction });
    } catch (error) {
        console.error('Error en la transferencia:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};


const createSellTransaction = async (req, res) => {
    const { adId, sellerWalletId } = req.body;
    try {
        const ad = await Ad.findByPk(adId, {
        include: [{ model: Wallet, as: 'wallet' }]
        });

        if (!ad || ad.type !== 'compra' || ad.status !== 'activo') {
        return res.status(400).json({ message: 'Anuncio de compra no disponible' });
        }

        const amount = ad.quantity * ad.pricePerUnit;

        const sellerWallet = await Wallet.findByPk(sellerWalletId);
        if (!sellerWallet || sellerWallet.balance < amount) {
        return res.status(400).json({ message: 'Saldo insuficiente del vendedor' });
        }

        const transaction = await Transaction.create({
        type: 'venta',
        amount,
        adId,
        walletFromId: sellerWalletId,
        walletToId: ad.walletId,
        status: 'pendiente'
        });

        ad.status = 'inactivo';
        await ad.save();

        return res.status(201).json(transaction);
    } catch (error) {
        console.error('Error al iniciar venta:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};


module.exports = {
    createPurchaseTransaction,
    uploadReceipt,
    finalizeTransaction,
    cancelTransaction,
    transferBetweenWallets,
    createSellTransaction
};