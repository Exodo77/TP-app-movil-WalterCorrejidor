import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_PRODUCTOS = 'productos_comparador';

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

export async function obtenerProductos() {
  const datosGuardados = await AsyncStorage.getItem(CLAVE_PRODUCTOS);

  if (datosGuardados !== null) {
    return JSON.parse(datosGuardados);
  }

  await guardarProductos(productosIniciales);

  return productosIniciales;
}

export async function guardarProductos(productos) {
  await AsyncStorage.setItem(
    CLAVE_PRODUCTOS,
    JSON.stringify(productos)
  );
}
