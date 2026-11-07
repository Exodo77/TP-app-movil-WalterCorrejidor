import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_PRODUCTOS = 'productos_comparador_v2';

const productosIniciales = [
  {
    id: '1',
    nombre: 'Yerba',
    precios: [
      { negocio: 'Despensa María', precio: 4800 },
      { negocio: 'Supermercado Norte', precio: 5200 },
      { negocio: 'Almacén Don José', precio: 4500 },
      { negocio: 'Autoservicio El Sol', precio: 4650 },
      { negocio: 'Minimercado Central', precio: 4900 },
    ],
  },
  {
    id: '2',
    nombre: 'Leche',
    precios: [
      { negocio: 'Despensa María', precio: 1500 },
      { negocio: 'Supermercado Norte', precio: 1700 },
      { negocio: 'Almacén Don José', precio: 1600 },
      { negocio: 'Autoservicio El Sol', precio: 1450 },
      { negocio: 'Minimercado Central', precio: 1550 },
    ],
  },
  {
    id: '3',
    nombre: 'Pan',
    precios: [
      { negocio: 'Despensa María', precio: 2200 },
      { negocio: 'Supermercado Norte', precio: 2400 },
      { negocio: 'Almacén Don José', precio: 2000 },
      { negocio: 'Autoservicio El Sol', precio: 2150 },
      { negocio: 'Minimercado Central', precio: 2100 },
    ],
  },
  {
    id: '4',
    nombre: 'Azúcar',
    precios: [
      { negocio: 'Despensa María', precio: 1400 },
      { negocio: 'Supermercado Norte', precio: 1500 },
      { negocio: 'Almacén Don José', precio: 1350 },
      { negocio: 'Autoservicio El Sol', precio: 1380 },
      { negocio: 'Minimercado Central', precio: 1450 },
    ],
  },
  {
    id: '5',
    nombre: 'Arroz',
    precios: [
      { negocio: 'Despensa María', precio: 1900 },
      { negocio: 'Supermercado Norte', precio: 2100 },
      { negocio: 'Almacén Don José', precio: 1850 },
      { negocio: 'Autoservicio El Sol', precio: 1800 },
      { negocio: 'Minimercado Central', precio: 1950 },
    ],
  },
  {
    id: '6',
    nombre: 'Fideos',
    precios: [
      { negocio: 'Despensa María', precio: 1600 },
      { negocio: 'Supermercado Norte', precio: 1750 },
      { negocio: 'Almacén Don José', precio: 1550 },
      { negocio: 'Autoservicio El Sol', precio: 1650 },
      { negocio: 'Minimercado Central', precio: 1500 },
    ],
  },
  {
    id: '7',
    nombre: 'Aceite',
    precios: [
      { negocio: 'Despensa María', precio: 3200 },
      { negocio: 'Supermercado Norte', precio: 3400 },
      { negocio: 'Almacén Don José', precio: 3100 },
      { negocio: 'Autoservicio El Sol', precio: 2950 },
      { negocio: 'Minimercado Central', precio: 3150 },
    ],
  },
  {
    id: '8',
    nombre: 'Harina',
    precios: [
      { negocio: 'Despensa María', precio: 1300 },
      { negocio: 'Supermercado Norte', precio: 1450 },
      { negocio: 'Almacén Don José', precio: 1250 },
      { negocio: 'Autoservicio El Sol', precio: 1280 },
      { negocio: 'Minimercado Central', precio: 1200 },
    ],
  },
];

export async function obtenerProductos() {
  const datosGuardados = await AsyncStorage.getItem(CLAVE_PRODUCTOS);

  if (datosGuardados !== null) {
    const productosParseados = JSON.parse(datosGuardados);

    if (productosParseados.length > 0) {
      return productosParseados;
    }
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

export async function restaurarProductos() {
  await guardarProductos(productosIniciales);
  return productosIniciales;
}
