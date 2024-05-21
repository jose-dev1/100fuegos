import { useState } from 'react';
import Logo from './assets/img/100_fuegos-removebg-preview.png';
import { Stack, TextField, MenuItem, Fab } from '@mui/material';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function App() {
  const [numProductos, setNumProductos] = useState("");
  const [productos, setProductos] = useState([]);

  const handleAgregarProducto = () => {
    const newProductos = [];
    for (let i = 0; i < numProductos; i++) {
      newProductos.push({ tipo: '', cantidad: 1 });
    }
    setProductos(newProductos);
  };

  const handleQuitarProducto = (index) => {
    const newProductos = [...productos];
    if (newProductos[index].cantidad > 1) {
      newProductos[index].cantidad--;
    }
    setProductos(newProductos);
  };

  const handleTipoProductoChange = (index, event) => {
    const newProductos = [...productos];
    newProductos[index].tipo = event.target.value;
    setProductos(newProductos);
  };

  const handleCantidadChange = (index, operacion) => {
    const newProductos = [...productos];
    if (operacion === 'incrementar') {
      newProductos[index].cantidad++;
    } else if (operacion === 'decrementar' && newProductos[index].cantidad > 0) {
      newProductos[index].cantidad--;
    }
    setProductos(newProductos);
  };

  return (
    <>
      <nav className='bg-blue-900 p-1'>
        <div className='flex justify-center'>
          <img src={Logo} alt='100 fuegos' className='w-20' />
        </div>
      </nav>

      <div className='flex flex-col md:flex-row items-start p-4'>
        <h1 className='px-4 py-4 text-xl text-gray-500 font-inter font-semibold'>
          Describe la información de la venta
        </h1>
      </div>

      <div className='w-full px-8 md:w-1/2'>
        <Stack spacing={2}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField label="Nombre" variant="outlined" fullWidth sx={{ borderRadius: 1 }} />
            <TextField label="N° Documento" variant="outlined" fullWidth sx={{ borderRadius: 1 }} />
            <TextField label="Teléfono" variant="outlined" fullWidth sx={{ borderRadius: 1 }} />
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField label="Dirección" variant="outlined" fullWidth sx={{ borderRadius: 1 }} />
            <TextField
              label="Tipo de hogar"
              variant="outlined"
              select
              fullWidth
              sx={{ borderRadius: 1 }}
            >
              <MenuItem value="casa">Casa</MenuItem>
              <MenuItem value="apartamento">Apartamento</MenuItem>
              <MenuItem value="otro">Otro</MenuItem>
            </TextField>
            <TextField label="Referencia" variant="outlined" fullWidth sx={{ borderRadius: 1 }} />
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              label="N° Productos"
              variant="outlined"
              fullWidth
              sx={{ borderRadius: 1, width: '50%' }}
              value={numProductos}
              onChange={(e) => setNumProductos(e.target.value)}
            />
            <button className='flex items-center justify-center w-full px-4 py-2 bg-green-500 text-white rounded-md shadow-lg hover:bg-green-600 transition duration-300 font-bold' onClick={handleAgregarProducto}>
              <AddTaskOutlinedIcon sx={{ marginRight: '0.5rem' }} /> GENERAR
            </button>
          </Stack>
        </Stack>
      </div>

      <div className='flex flex-col md:flex-row items-start p-4'>
        <h1 className=' px-4 text-xl text-gray-500 font-inter font-semibold'>
          Informacion de los productos
        </h1>
      </div>

      <div className='w-full px-8 md:w-1/2'>
        {productos.map((producto, index) => (
          <div>
            <Stack key={index} direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                label="Tipo de producto"
                variant="outlined"
                select
                value={producto.tipo}
                onChange={(e) => handleTipoProductoChange(index, e)}
                sx={{ borderRadius: 1, width: '40%' }}
              >
                <MenuItem value="producto1">Producto 1</MenuItem>
                <MenuItem value="producto2">Producto 2</MenuItem>
                <MenuItem value="producto3">Producto 3</MenuItem>
              </TextField>
            </Stack>
            <div className='flex mt-2 mb-4 flex-col md:flex-row items-start'>
              <h1 className='text-gray-500 font-inter font-semibold'>
                Unidades
              </h1>
            </div>
            <Fab size="medium" color="error" aria-label="quitar" onClick={() => handleQuitarProducto(index)}>
              <RemoveIcon />
            </Fab>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '0.25rem' }}>{producto.cantidad}</span>
            <Fab size="medium" color="success" aria-label="agregar" onClick={() => handleCantidadChange(index, 'incrementar')}>
              <AddIcon />
            </Fab>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
