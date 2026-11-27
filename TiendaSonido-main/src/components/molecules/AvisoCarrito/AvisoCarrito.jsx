import { Toast, ToastContainer } from 'react-bootstrap'

/**
 * Molecule presentacional: aviso emergente (Toast) del carrito.
 *
 * Recibe los datos del aviso y el callback de cierre via props.
 * No accede a ningún contexto global, lo que permite probarla
 * de forma aislada pasando únicamente props.
 *
 * @param {object|null} aviso  - { id, texto, tipo } o null si no hay aviso.
 * @param {Function}    onCerrar - Callback invocado al cerrar el toast.
 */
export default function AvisoCarrito({ aviso, onCerrar }) {
  return (
    <ToastContainer position="bottom-end" className="p-3 position-fixed">
      <Toast
        key={aviso?.id}
        show={!!aviso}
        onClose={onCerrar}
        delay={2500}
        autohide
        bg={aviso?.tipo}
      >
        <Toast.Body className={aviso?.tipo === 'success' ? 'text-white' : ''}>{aviso?.texto}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}
