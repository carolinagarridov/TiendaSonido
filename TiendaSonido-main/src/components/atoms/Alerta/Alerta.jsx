import { Alert } from 'react-bootstrap'

/**
 * Átomo: Componente visual de alerta o mensaje de estado/error.
 *
 * @param {object} props
 * @param {'success'|'danger'|'warning'|'info'|'primary'|'secondary'} [props.variant='info']
 * @param {boolean} [props.dismissible=false]
 * @param {Function} [props.onClose]
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 */
export default function Alerta({
  variant = 'info',
  dismissible = false,
  onClose,
  children,
  className = '',
  ...props
}) {
  if (!children) return null

  return (
    <Alert
      variant={variant}
      dismissible={dismissible}
      onClose={onClose}
      className={className}
      {...props}
    >
      {children}
    </Alert>
  )
}

