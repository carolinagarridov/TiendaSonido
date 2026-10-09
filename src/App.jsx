import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Navigation from './components/Navigation';
import ProductoCard from './components/ProductoCard';
import CarritoView from './components/CarritoView';
import AdminView from './components/AdminView';
import { baseDatosProductos } from './data/productos';

function App() {
  const [vista, setVista] = useState('tienda');
  const [productos, setProductos] = useState(() => {
    const saved = localStorage.getItem('db_productos');
    return saved ? JSON.parse(saved) : baseDatosProductos;
  });
  
  const [carrito, setCarrito] = useState(() => {
    const saved = localStorage.getItem('carrito');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('db_productos', JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (prod) => {
    const existe = carrito.find(item => item.codigo === prod.codigo);
    if (existe) {
      setCarrito(carrito.map(item => 
        item.codigo === prod.codigo ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...prod, cantidad: 1 }]);
    }
    alert(`"${prod.nombre}" añadido al carrito.`);
  };

  const vaciarCarrito = () => setCarrito([]);

  const agregarProducto = (nuevo) => {
    if (productos.some(p => p.codigo === nuevo.codigo)) {
      alert("El código ya existe.");
      return;
    }
    setProductos([...productos, nuevo]);
  };

  const eliminarProducto = (codigo) => {
    setProductos(productos.filter(p => p.codigo !== codigo));
  };

  const totalCartCount = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <>
      <Navigation cartCount={totalCartCount} setVista={setVista} />
      
      {vista === 'tienda' && (
        <Container>
          <h2 className="mb-4">Catálogo de Instrumentos</h2>
          <Row>
            {productos.map(p => (
              <ProductoCard key={p.codigo} producto={p} agregarAlCarrito={agregarAlCarrito} />
            ))}
          </Row>
        </Container>
      )}

      {vista === 'carrito' && (
        <CarritoView carrito={carrito} vaciarCarrito={vaciarCarrito} />
      )}

      {vista === 'admin' && (
        <AdminView productos={productos} agregarProducto={agregarProducto} eliminarProducto={eliminarProducto} />
      )}
    </>
  );
}

export default App;