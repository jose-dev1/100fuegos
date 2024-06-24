import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LOGO from '../assets/img/100_fuegos-removebg-preview.png';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAh59eJqJ_hazs_7hiTRSE9jHbXjO-sYPI",
    authDomain: "fuegos-app.firebaseapp.com",
    projectId: "fuegos-app",
    storageBucket: "fuegos-app.appspot.com",
    messagingSenderId: "613725237362",
    appId: "1:613725237362:web:d11e7ff1fb7643a19412eb"
};

const app = initializeApp(firebaseConfig);

export default function HistorialCompras() {
    const [historialCompras, setHistorialCompras] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchHistorialCompras = async () => {
            const db = getFirestore(app);
            const historialCollection = collection(db, 'pedidos');
            const historialSnapshot = await getDocs(historialCollection);
            const historialData = historialSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setHistorialCompras(historialData);
        };

        fetchHistorialCompras();
    }, [historialCompras]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const getRandomColor = () => {
        const colors = ['#FF6347'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const filteredCompras = historialCompras.filter(compra =>
        compra.documento.includes(searchTerm)
    );

    const generatePDF = (compra) => {
        const ventanaImpresion = window.open('', '_blank');
        const content = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Factura Electrónica</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f0f0f0;
                        }
                        .container {
                            max-width: 600px;
                            margin: auto;
                            padding: 20px;
                            border: 2px solid #000;
                            border-radius: 10px;
                            background-color: #fff;
                        }
                        .logo {
                            display: block;
                            margin: 0 auto;
                            max-width: 200px;
                            height: auto;
                            margin-bottom: 20px;
                        }
                        .title {
                            font-size: 24px;
                            font-weight: bold;
                            margin-bottom: 20px;
                            text-align: center;
                        }
                        .info {
                            margin-bottom: 20px;
                            padding-bottom: 10px;
                            border-bottom: 2px solid #000;
                        }
                        .info p {
                            margin: 5px 0;
                        }
                        .productos {
                            margin-top: 20px;
                        }
                        .producto {
                            margin-bottom: 10px;
                        }
                        .total {
                            font-size: 18px;
                            font-weight: bold;
                            text-align: right;
                            margin-top: 20px;
                        }
                        .producto {
                            padding: 10px;
                            background-color: #f2f2f2;
                            border-radius: 5px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <img class="logo" src="/src/assets/img/100_fuegos-removebg-preview.png" alt="Logo de la Empresa">
                        <div class="title">Factura Electrónica</div>
                        <div class="info">
                            <p><strong>Número de Documento:</strong> ${compra.documento}</p>
                            <p><strong>Cliente:</strong> ${compra.nombre}</p>
                            <p><strong>Telefono:</strong> ${compra.telefono}</p>
                            <p><strong>Dirección:</strong> ${compra.direccion}</p>
                            <p><strong>Tipo de Hogar:</strong> ${compra.tipoHogar}</p>
                            <p><strong>Referencia:</strong> ${compra.referencia}</p>
                        </div>
                        <div class="productos">
                            <div class="title">Productos:</div>
                            ${compra.productos.map((producto, index) => `
                                <div class="producto">
                                    <p>${index + 1}. <strong>${producto.tipo}</strong> - ${producto.cantidad} unidades</p>
                                </div>
                            `).join('')}
                        </div>
                        <div class="total">
                            <p><strong>Total:</strong> $${compra.precioTotal}</p>
                            <p><strong>Fecha y Hora:</strong> ${new Date().toLocaleString()}</p>
                            <p>El precio del domicilio ya esta incluido en la compra</p>
                        </div>
                    </div>
                </body>
            </html>
        `;

        ventanaImpresion.document.write(content);
        ventanaImpresion.print();
        ventanaImpresion.close();
    };

    const generateWordDocument = (compra) => {
        const ventanaImpresion = window.open('', '_blank');
        const content = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Factura Electrónica</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f0f0f0;
                        }
                        .container {
                            max-width: 600px;
                            margin: auto;
                            padding: 20px;
                            border: 2px solid #000;
                            border-radius: 10px;
                            background-color: #fff;
                        }
                        .logo {
                            display: block;
                            margin: 0 auto;
                            max-width: 200px;
                            height: auto;
                            margin-bottom: 20px;
                        }
                        .title {
                            font-size: 24px;
                            font-weight: bold;
                            margin-bottom: 20px;
                            text-align: center;
                        }
                        .info {
                            margin-bottom: 20px;
                            padding-bottom: 10px;
                            border-bottom: 2px solid #000;
                        }
                        .info p {
                            margin: 5px 0;
                        }
                        .productos {
                            margin-top: 20px;
                        }
                        .producto {
                            margin-bottom: 10px;
                        }
                        .total {
                            font-size: 18px;
                            font-weight: bold;
                            text-align: right;
                            margin-top: 20px;
                        }
                        .producto {
                            padding: 10px;
                            background-color: #f2f2f2;
                            border-radius: 5px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <img class="logo" src="/src/assets/img/100_fuegos-removebg-preview.png" alt="Logo de la Empresa">
                        <div class="title">Factura Electrónica</div>
                        <div class="info">
                            <p><strong>Número de Documento:</strong> ${compra.documento}</p>
                            <p><strong>Cliente:</strong> ${compra.nombre}</p>
                            <p><strong>Telefono:</strong> ${compra.telefono}</p>
                            <p><strong>Dirección:</strong> ${compra.direccion}</p>
                            <p><strong>Tipo de Hogar:</strong> ${compra.tipoHogar}</p>
                            <p><strong>Referencia:</strong> ${compra.referencia}</p>
                        </div>
                        <div class="productos">
                            <div class="title">Productos:</div>
                            ${compra.productos.map((producto, index) => `
                                <div class="producto">
                                    <p>${index + 1}. <strong>${producto.tipo}</strong> - ${producto.cantidad} unidades</p>
                                </div>
                            `).join('')}
                        </div>
                        <div class="total">
                            <p><strong>Total:</strong> $${compra.precioTotal}</p>
                            <p><strong>Fecha y Hora:</strong> ${new Date().toLocaleString()}</p>
                            <p>El precio del domicilio ya esta incluido en la compra</p>
                        </div>
                    </div>
                </body>
            </html>
        `;

        ventanaImpresion.document.write(content);
        ventanaImpresion.print();
        ventanaImpresion.close();
    };



    return (
        <div className="historial-compras">
            <div className="max-w-md mx-auto my-4">
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Buscar por número de documento"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            {filteredCompras.map((compra) => (
                <div key={compra.id} className="relative max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 transform transition duration-500 hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-r opacity-75 clip-path-triangle"></div>
                    <div className="absolute z-10 mr-2 inset-0 m-auto w-40 h-40" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25))' }}>
                        <img src={LOGO} alt="Logo" style={{ opacity: 0.5 }} />
                    </div>
                    <div className="md:flex p-6 relative z-10">
                        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full text-white text-lg font-bold" style={{ backgroundColor: getRandomColor() }}>
                                {compra.nombre.split(" ")[0]}
                                {compra.nombre.split(" ")[1] ? compra.nombre.split(" ")[1].charAt(0) : ''}
                            </div>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div>
                                <div className="uppercase tracking-wide text-sm font-semibold">
                                    {compra.nombre}
                                </div>
                                <p className="mt-2">
                                    {compra.productos.map((producto, index) => (
                                        <span key={index}>
                                            {producto.tipo} - {producto.cantidad} unidades<br />
                                        </span>
                                    ))}
                                </p>
                            </div>
                            <div className="mt-4">
                                <button
                                    className="px-4 py-2 mr-2 bg-orange-500 text-white rounded-xl shadow-xl hover:bg-orange-600 transition duration-300 font-bold"
                                    onClick={() => generatePDF(compra)}
                                >
                                    <PictureAsPdfIcon sx={{ marginRight: '0.5rem' }} /> Descarga en PDF
                                </button>

                                <button className="px-4 py-2 bg-blue-800 text-white rounded-xl shadow-xl hover:bg-blue-600 transition duration-300 font-bold"
                                    onClick={() => generateWordDocument(compra)}
                                >
                                    <DescriptionIcon sx={{ marginRight: '0.5rem' }} /> Descarga Word
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
