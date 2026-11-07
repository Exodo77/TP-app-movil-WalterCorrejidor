import {
  obtenerProductos,
  guardarProductos,
} from '../repositories/ProductosRepository';

import {
  crearProducto,
  crearPrecioNegocio,
  validarDatosPrecio,
} from '../models/Producto';

export function cargarProductos() {
  return obtenerProductos();
}

export function agregarOActualizarPrecio(
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
  const nuevoRegistroPrecio = crearPrecioNegocio(negocioLimpio, precio);

  const productoExistente = productosActuales.find(
    (producto) =>
      producto.nombre.toLowerCase() === nombreLimpio.toLowerCase()
  );

  let nuevosProductos;

  if (productoExistente) {
    nuevosProductos = productosActuales.map((producto) => {
      if (producto.id !== productoExistente.id) {
        return producto;
      }

      const existeNegocio = producto.precios.some(
        (item) =>
          item.negocio.toLowerCase() === negocioLimpio.toLowerCase()
      );

      const nuevosPrecios = existeNegocio
        ? producto.precios.map((item) =>
            item.negocio.toLowerCase() === negocioLimpio.toLowerCase()
              ? nuevoRegistroPrecio
              : item
          )
        : [...producto.precios, nuevoRegistroPrecio];

      return {
        ...producto,
        nombre: nombreLimpio,
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

  guardarProductos(nuevosProductos);
  return nuevosProductos;
}

export function editarPrecioNegocio(
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

  guardarProductos(nuevosProductos);
  return nuevosProductos;
}

export function eliminarProducto(productosActuales, id) {
  const nuevosProductos = productosActuales.filter(
    (producto) => producto.id !== id
  );

  guardarProductos(nuevosProductos);
  return nuevosProductos;
}

export function filtrarProductos(productos, busqueda) {
  const termino = busqueda.trim().toLowerCase();

  if (!termino) {
    return productos;
  }

  return productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(termino)
  );
}

