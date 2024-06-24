import React from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';

const WordDocument = ({ compras }) => {
    const generateDocument = () => {
        const doc = new Document();
        doc.addSection({
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun("Historial de compras"),
                    ],
                }),
                ...compras.map((compra, index) => (
                    new Paragraph({
                        children: [
                            new TextRun(`Nombre: ${compra.nombre}`),
                            new TextRun(`Documento: ${compra.documento}`),
                            new TextRun(`Productos: ${compra.productos.map(producto => producto.tipo).join(', ')}`),
                        ],
                    })
                )),
            ],
        });

        return doc;
    };

    const handleDownloadWord = () => {
        const document = generateDocument();
        Packer.toBlob(document).then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'historial_compras.docx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        });
    };

    return (
        <button onClick={handleDownloadWord} className="px-4 py-2 bg-blue-800 text-white rounded-xl shadow-xl hover:bg-blue-600 transition duration-300 font-bold">
            Descarga en Word
        </button>
    );
};

export default WordDocument;
