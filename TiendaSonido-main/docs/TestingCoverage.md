# Informe de Cobertura de Pruebas Unitarias - Sonido Vivo

## Resumen Ejecutivo
Este documento detalla el plan y la ejecución de las pruebas unitarias del proyecto SPA **Sonido Vivo** desarrollado en React + Vite.

## Herramientas Utilizadas
- **Vitest**: Framework para la ejecución de pruebas unitarias en React.
- **Testing Library / Mocks**: Simulación de datos de componentes y catálogo.

## Suites de Pruebas Implementadas
1. **Validaciones (`validaciones.test.js`)**: Cobertura de funciones de validación de entradas en formularios (formato correo y largo de RUT).
2. **Carrito de Compras (`carrito.test.js`)**: Pruebas sobre cálculo de subtotales, totales y verificación de existencia de ítems.
3. **Catálogo de Productos (`productos.test.js`)**: Pruebas de integración usando datos simulados (**Mocks**).

## Resultado de Cobertura
- **Efectividad**: 100% de los tests definidos superan las validaciones requeridas para el hito Evaluativo 2.