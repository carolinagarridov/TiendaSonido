import { Toast, ToastContainer } from 'react-bootstrap'
import { useCarrito } from '../context/CarritoContext'

export default function AvisoCarrito() {
  const { aviso, cerrarAviso } = useCarrito()

  return (
    <ToastContainer position="bottom-end" className="p-3 position-fixed">
      <Toast
        key={aviso?.id}
        show={!!aviso}
        onClose={cerrarAviso}
        delay={2500}
        autohide
        bg={aviso?.tipo}
      >
        <Toast.Body className={aviso?.tipo === 'success' ? 'text-white' : ''}>{aviso?.texto}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}
