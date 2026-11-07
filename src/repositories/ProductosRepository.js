const productosIniciales = [
  {
    id: '1',
    nombre: 'Yerba',
    precios: [
      { negocio: 'Despensa María', precio: 4800 },
      { negocio: 'Supermercado Norte', precio: 5200 },
      { negocio: 'Almacén Don José', precio: 4500 },
    ],
  },
  {
    id: '2',
    nombre: 'Leche',
    precios: [
      { negocio: 'Despensa María', precio: 1500 },
      { negocio: 'Supermercado Norte', precio: 1700 },
      { negocio: 'Almacén Don José', precio: 1600 },
    ],
  },
  {
    id: '3',
    nombre: 'Pan',
    precios: [
      { negocio: 'Despensa María', precio: 2200 },
      { negocio: 'Supermercado Norte', precio: 2400 },
      { negocio: 'Almacén Don José', precio: 2000 },
    ],
  },
  {
    id: '4',
    nombre: 'Azúcar',
    precios: [
      { negocio: 'Despensa María', precio: 1400 },
      { negocio: 'Supermercado Norte', precio: 1500 },
      { negocio: 'Almacén Don José', precio: 1350 },
    ],
  },
];

let productosGuardados = [...productosIniciales];

export function obtenerProductos() {
  return productosGuardados;
}

export function guardarProductos(nuevosProductos) {
  productosGuardados = nuevosProductos;
  return productosGuardados;
}

