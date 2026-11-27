import { Badge } from 'react-bootstrap'

/**
 * Átomo: Badge/etiqueta para estados, stock, roles o identificadores.
 *
 * @param {object} props
 * @param {string} [props.bg='secondary']
 * @param {boolean} [props.pill=false]
 * @param {string} [props.text]
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 */
export default function BadgeEstado({
  bg = 'secondary',
  pill = false,
  text,
  children,
  className = '',
  ...props
}) {
  return (
    <Badge bg={bg} pill={pill} text={text} className={className} {...props}>
      {children}
    </Badge>
  )
}

