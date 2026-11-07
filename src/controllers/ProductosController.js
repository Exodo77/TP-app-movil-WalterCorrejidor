import {
  obtenerProductos,
  guardarProductos,
} from '../repositories/ProductosRepository';

import {
  crearProducto,
  crearPrecioNegocio,
  validarDatosPrecio,
} from '../models/Producto';

function normalizarTexto(texto) {
  return texto
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export async function cargarProductos() {
  return await obtenerProductos();
}

export async function agregarOActualizarPrecio(
  productosActuales,
  nombreProducto,
  negocio,
  precio
) {
  const error = validarDatosPrecio(nombreProducto, negocio, precio);

  if (error) {
    throw new Error(error);
  }

  const nombreLimpio = nombreProducto.trim();
  const negocioLimpio = negocio.trim();
  const nombreNormalizado = normalizarTexto(nombreLimpio);
  const negocioNormalizado = normalizarTexto(negocioLimpio);
  const nuevoRegistroPrecio = crearPrecioNegocio(negocioLimpio, precio);

  const productoExistente = productosActuales.find(
    (producto) =>
      normalizarTexto(producto.nombre) === nombreNormalizado
  );

  let nuevosProductos;

  if (productoExistente) {
    nuevosProductos = productosActuales.map((producto) => {
      if (producto.id !== productoExistente.id) {
        return producto;
      }

      const existeNegocio = producto.precios.some(
        (item) =>
          normalizarTexto(item.negocio) === negocioNormalizado
      );

      const nuevosPrecios = existeNegocio
        ? producto.precios.map((item) =>
            normalizarTexto(item.negocio) === negocioNormalizado
              ? { ...nuevoRegistroPrecio, negocio: item.negocio }
              : item
          )
        : [...producto.precios, nuevoRegistroPrecio];

      return {
        ...producto,
        precios: nuevosPrecios,
      };
    });
  } else {
    const nuevoProducto = crearProducto(
      nombreLimpio,
      negocioLimpio,
      precio
    );
    nuevosProductos = [...productosActuales, nuevoProducto];
  }

  await guardarProductos(nuevosProductos);
  return nuevosProductos;
}

export async function editarPrecioNegocio(
  productosActuales,
  idProducto,
  negocioOriginal,
  nombreProducto,
  negocioNuevo,
  precio
) {
  const error = validarDatosPrecio(nombreProducto, negocioNuevo, precio);

  if (error) {
    throw new Error(error);
  }

  const nuevosProductos = productosActuales.map((producto) => {
    if (producto.id !== idProducto) {
      return producto;
    }

    const nuevosPrecios = producto.precios.map((item) =>
      item.negocio === negocioOriginal
        ? crearPrecioNegocio(negocioNuevo, precio)
        : item
    );

    return {
      ...producto,
      nombre: nombreProducto.trim(),
      precios: nuevosPrecios,
    };
  });

  await guardarProductos(nuevosProductos);
  return nuevosProductos;
}

export async function eliminarProducto(productosActuales, id) {
  const nuevosProductos = productosActuales.filter(
    (producto) => producto.id !== id
  );

  await guardarProductos(nuevosProductos);
  return nuevosProductos;
}

export function filtrarProductos(productos, busqueda) {
  const termino = normalizarTexto(busqueda);

  if (!termino) {
    return productos;
  }

  return productos.filter((producto) =>
    normalizarTexto(producto.nombre).includes(termino)
  );
}
