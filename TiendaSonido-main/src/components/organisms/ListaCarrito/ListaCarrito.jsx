import { Button, ListGroup } from 'react-bootstrap'
import ItemCarrito from '../../molecules/ItemCarrito/ItemCarrito'

/**
 * Organismo: Lista de productos en el carrito con botón para vaciarlo.
 *
 * @param {object} props
 * @param {Array} props.items
 * @param {Function} props.onCambiarCantidad
 * @param {Function} props.onQuitar
 * @param {Function} props.onVaciar
 */
export default function ListaCarrito({
  items = [],
  onCambiarCantidad,
  onQuitar,
  onVaciar,
}) {
  return (
    <>
      <ListGroup>
        {items.map((item) => (
          <ItemCarrito
            key={item.codigo}
            item={item}
            onCambiarCantidad={onCambiarCantidad}
            onQuitar={onQuitar}
          />
        ))}
      </ListGroup>
      <Button variant="outline-danger" className="mt-3" onClick={onVaciar}>
        Vaciar carrito
      </Button>
    </>
  )
}

