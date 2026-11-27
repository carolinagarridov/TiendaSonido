import { Dropdown, Form } from 'react-bootstrap'

/**
 * Molécula: Barra de búsqueda y filtro por categoría para catálogo de productos.
 *
 * @param {object} props
 * @param {string} props.busqueda - Término de búsqueda actual.
 * @param {Function} props.onBusquedaChange - Callback al cambiar texto de búsqueda.
 * @param {string} props.categoria - Categoría actualmente seleccionada.
 * @param {Function} props.onCategoriaChange - Callback al cambiar categoría.
 * @param {string[]} props.categorias - Lista de categorías disponibles.
 */
export default function FiltroBusqueda({
  busqueda,
  onBusquedaChange,
  categoria,
  onCategoriaChange,
  categorias = [],
}) {
  return (
    <div className="d-flex flex-column flex-sm-row gap-2">
      <Form.Control
        type="search"
        placeholder="Buscar por nombre, marca o modelo"
        aria-label="Buscar productos"
        value={busqueda}
        onChange={(e) => onBusquedaChange(e.target.value)}
      />
      <Dropdown onSelect={(valor) => onCategoriaChange(valor)}>
        <Dropdown.Toggle variant="primary" id="filtro-categoria" className="w-100 text-nowrap">
          &#9776; {categoria === 'Todas' ? 'Categorías' : categoria}
        </Dropdown.Toggle>
        <Dropdown.Menu align="end">
          <Dropdown.Item eventKey="Todas" active={categoria === 'Todas'}>
            Todas las categorías
          </Dropdown.Item>
          <Dropdown.Divider />
          {categorias.map((c) => (
            <Dropdown.Item key={c} eventKey={c} active={categoria === c}>
              {c}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

