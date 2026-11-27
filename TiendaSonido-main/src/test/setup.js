import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Cada prueba parte con el DOM y el localStorage limpios
afterEach(() => {
  cleanup()
  localStorage.clear()
})
