const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes/index.routes');
require('dotenv').config();
const path = require('path');
const sequelize = require('./config/database');

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
    .then(() => {
        console.log('🔄 Base de datos sincronizada correctamente');
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Error al sincronizar la base de datos:', err);
    });
