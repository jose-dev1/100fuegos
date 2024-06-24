import { useState } from 'react';
import Logo from './assets/img/100_fuegos-removebg-preview.png';
import { Stack, TextField, MenuItem, Fab, Card, CardContent } from '@mui/material';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ToastContainer, toast } from 'react-toastify';
import HistorialCompras from './components/historial_component';
import 'react-toastify/dist/ReactToastify.css';
import productosData from './api/datos_model';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAh59eJqJ_hazs_7hiTRSE9jHbXjO-sYPI",
  authDomain: "fuegos-app.firebaseapp.com",
  projectId: "fuegos-app",
  storageBucket: "fuegos-app.appspot.com",
  messagingSenderId: "613725237362",
  appId: "1:613725237362:web:d11e7ff1fb7643a19412eb"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [numProductos, setNumProductos] = useState("");
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [tipoHogar, setTipoHogar] = useState("");
  const [referencia, setReferencia] = useState("");

  const handleAgregarProducto = () => {
    if (!nombre || !documento || !telefono || !direccion || !tipoHogar || !referencia || !numProductos) {
      toast.error("Por favor, complete todos los campos antes de generar productos.");
      return;
    }

    const newProductos = [];
    for (let i = 0; i < numProductos; i++) {
      newProductos.push({ tipo: '', cantidad: 1 });
    }
    setProductos(newProductos);
    toast.success(`${numProductos} producto(s) generado(s)`);
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

  const guardarPedidoEnFirebase = () => {
    const pedido = {
      nombre: nombre,
      documento: documento,
      telefono: telefono,
      direccion: direccion,
      tipoHogar: tipoHogar,
      referencia: referencia,
      productos: productos,
      precioTotal: calcularPrecioTotal()
    };

    addDoc(collection(db, "pedidos"), pedido)
      .then(() => {
        toast.success("Pedido agendado", { position: "bottom-center" });
        setNombre("");
        setDocumento("");
        setTelefono("");
        setDireccion("");
        setTipoHogar("");
        setReferencia("");
        setNumProductos("");
        setProductos([]);
      })
      .catch((error) => {
        toast.error("Error al agendar el pedido", { position: "bottom-center" });
        console.error("Error al guardar el pedido: ", error);
      });
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

  const calcularPrecioTotal = () => {
    let precioTotal = productos.reduce((total, producto) => {
      const productoInfo = productosData.find(p => p.producto === producto.tipo);
      const precioUnitario = productoInfo ? productoInfo.precio : 0;
      return total + producto.cantidad * precioUnitario;
    }, 0);

    precioTotal += 5000;

    return precioTotal.toFixed(2);
  };

  return (
    <>
      <ToastContainer />
      <nav className='bg-blue-900 p-1'>
        <div className='flex justify-center'>
          <img src={Logo} alt='100 fuegos' className='w-20' />
        </div>
      </nav>
      <div className='flex flex-col md:flex-row items-start p-4'>
        <div className='w-full px-8 md:w-1/2'>
          <h1 className='py-1 text-lg text-gray-500 font-inter font-semibold'>
            Describe la información de la venta
          </h1>
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                label="Nombre y apellido"
                variant="outlined"
                fullWidth
                sx={{ borderRadius: 1 }}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <TextField
                label="N° Documento"
                variant="outlined"
                fullWidth
                sx={{ borderRadius: 1 }}
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
              />
              <TextField
                label="Teléfono"
                variant="outlined"
                fullWidth
                sx={{ borderRadius: 1 }}
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                label="Dirección"
                variant="outlined"
                fullWidth
                sx={{ borderRadius: 1 }}
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
              <TextField
                label="Tipo de hogar"
                variant="outlined"
                select
                fullWidth
                sx={{ borderRadius: 1 }}
                value={tipoHogar}
                onChange={(e) => setTipoHogar(e.target.value)}
              >
                <MenuItem value="casa">Casa</MenuItem>
                <MenuItem value="apartamento">Apartamento</MenuItem>
                <MenuItem value="otro">Otro</MenuItem>
              </TextField>
              <TextField
                label="Referencia"
                variant="outlined"
                fullWidth
                sx={{ borderRadius: 1 }}
                value={referencia}
                onChange={(e) => setReferencia(e.target.value)}
              />
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
              <button className='flex items-center justify-center w-full px-4 py-4 bg-green-500 text-white rounded-xl shadow-xl hover:bg-green-600 transition duration-300 font-bold' onClick={handleAgregarProducto}>
                <AddTaskOutlinedIcon sx={{ marginRight: '0.5rem' }} /> GENERAR
              </button>
            </Stack>
          </Stack>
          <div className='flex flex-col md:flex-row items-start p-4 '>
            <h1 className=' text-lg text-gray-500 font-inter font-semibold'>
              Información de los productos
            </h1>
          </div>
          <div className='overflow-x-scroll max-h-[200px]'>
            {productos.map((producto, index) => {
              const productoInfo = productosData.find(p => p.producto === producto.tipo);
              return (
                <Card key={index} sx={{ mb: 4, boxShadow: '0 1px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius: 4 }}>
                  <CardContent>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                      <TextField
                        label="Tipo de producto"
                        variant="outlined"
                        select
                        value={producto.tipo}
                        onChange={(e) => handleTipoProductoChange(index, e)}
                        sx={{ borderRadius: 1, width: '40%' }}
                      >
                        {productosData.map((productoData, i) => (
                          <MenuItem key={i} value={productoData.producto}>
                            {productoData.producto}
                          </MenuItem>
                        ))}
                      </TextField>
                      {productoInfo && (
                        <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <h2 className='text-orange-500 font-inter font-semibold' style={{ textAlign: 'center' }}>{productoInfo.producto}</h2>
                          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <img className='w-20 h-20 ml-4' src={productoInfo.img_link} alt={productoInfo.producto} />
                            <div style={{ marginLeft: '20px' }}>
                              <p className='text-gray-500'>{productoInfo.descripcion}</p>
                            </div>
                          </div>
                          <p className=' ml-80 text-orange-500 font-semibold'>Precio: ${productoInfo.precio.toLocaleString()} COP</p>
                        </div>
                      )}
                    </Stack>
                    <div className='flex mt-2 mb-4 flex-col md:flex-row items-start'>
                      <h1 className='text-gray-500 font-inter font-semibold'>
                        Unidades
                      </h1>
                    </div>
                    <Fab size="medium" color="error" aria-label="quitar" onClick={() => handleQuitarProducto(index)}>
                      <RemoveIcon />
                    </Fab>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '5px', marginLeft: '20px', marginRight: '20px' }}>{producto.cantidad}</span>
                    <Fab size="medium" color="success" aria-label="agregar" onClick={() => handleCantidadChange(index, 'incrementar')}>
                      <AddIcon />
                    </Fab>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {productos.length > 0 && (
            <>
              <hr className="my-4 border-gray-300" />
              <div className="flex justify-end items-center pr-4">
                <span className="text-2xl font-bold text-gray-700">Total: ${calcularPrecioTotal()}</span>
              </div>
              <div className="flex justify-end items-center pr-4">
                <p className=" text-lg text-gray-500 font-inter font-semibold">Precio total incluyendo IVA + domicilio</p>
              </div>
              <button className='flex items-center justify-center w-full h-full mt-4 px-4 py-4 bg-orange-500 text-white rounded-xl shadow-xl hover:bg-orange-600 transition duration-300 font-bold' onClick={guardarPedidoEnFirebase}>
                REALIZAR PEDIDO  <AddShoppingCartIcon sx={{ marginRight: '0.5rem' }} />
              </button>
            </>
          )}
        </div>
        <div className='w-full px-8 md:w-1/2'>
          <div className='flex flex-col md:flex-row items-start py-1'>
            <h1 className='px-4 text-lg  text-gray-500 font-inter font-semibold'>
              Historial de compras
            </h1>
          </div>
          <div className='overflow-x-scroll max-h-[598px]'>
            <HistorialCompras />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
