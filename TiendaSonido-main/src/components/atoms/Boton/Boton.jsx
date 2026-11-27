import { Button } from 'react-bootstrap'

/**
 * Átomo: Botón reutilizable con variantes y tamaños de Bootstrap.
 *
 * @param {object} props
 * @param {'primary'|'secondary'|'success'|'danger'|'warning'|'outline-secondary'|'outline-danger'|'outline-success'|'link'} [props.variant='primary']
 * @param {'sm'|'lg'} [props.size]
 * @param {'button'|'submit'|'reset'} [props.type='button']
 * @param {boolean} [props.disabled=false]
 * @param {Function} [props.onClick]
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 */
export default function Boton({
  variant = 'primary',
  size,
  type = 'button',
  disabled = false,
  onClick,
  children,
  className = '',
  as,
  ...props
}) {
  return (
    <Button
      variant={variant}
      size={size}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
      as={as}
      {...props}
    >
      {children}
    </Button>
  )
}

