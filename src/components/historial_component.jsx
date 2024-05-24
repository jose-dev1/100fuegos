import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LOGO from '../assets/img/100_fuegos-removebg-preview.png';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';

export default function HistorialCompras() {
    const historialCompras = [
        { id: 1, nombre: "Juan Pérez", documento: "12345678", producto: "Producto 1", unidades: 2 },
        { id: 2, nombre: "María García", documento: "87654321", producto: "Producto 2", unidades: 1 },
        { id: 3, nombre: "Carlos Martínez", documento: "11223344", producto: "Producto 3", unidades: 3 },
        { id: 4, nombre: "Ana López", documento: "33445566", producto: "Producto 4", unidades: 1 },
        { id: 5, nombre: "Luis González", documento: "99887766", producto: "Producto 5", unidades: 2 }
    ];

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const getRandomColor = () => {
        const colors = ['#FFD700', '#FFA500', '#FF6347'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const filteredCompras = historialCompras.filter(compra =>
        compra.documento.includes(searchTerm)
    );

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
                                {`${compra.nombre.charAt(0)}${compra.nombre.split(" ")[1].charAt(0)}`}
                            </div>
                        </div>
                        <div className="flex flex-col justify-between">
                            <div>
                                <div className="uppercase tracking-wide text-sm font-semibold">
                                    {compra.nombre}
                                </div>
                                <p className="mt-2">
                                    {compra.producto} - {compra.unidades} unidades
                                </p>
                            </div>
                            <div className="mt-4">
                                <button className="px-4 py-2 mr-2 bg-orange-500 text-white rounded-xl shadow-lg hover:bg-orange-600 transition duration-300 font-bold">
                                    <PictureAsPdfIcon sx={{ marginRight: '0.5rem' }} /> Descarga en PDF
                                </button>
                                <button className="px-4 py-2 bg-blue-800 text-white rounded-xl shadow-lg hover:bg-blue-600 transition duration-300 font-bold">
                                    <DescriptionIcon sx={{ marginRight: '0.5rem' }} /> Descarga en Word
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
