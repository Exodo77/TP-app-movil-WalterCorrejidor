export function crearPrecioNegocio(negocio, precio) {
  return {
    negocio: negocio.trim(),
    precio: Number(precio),
  };
}

export function crearProducto(nombre, negocio, precio) {
  return {
    id: Date.now().toString(),
    nombre: nombre.trim(),
    precios: [crearPrecioNegocio(negocio, precio)],
  };
}

export function validarDatosPrecio(nombreProducto, negocio, precio) {
  if (!nombreProducto.trim() || !negocio.trim() || !precio) {
    return 'Completá el producto, el negocio y el precio.';
  }

  if (!Number.isFinite(Number(precio)) || Number(precio) <= 0) {
    return 'Ingresá un precio válido mayor que cero.';
  }

  return null;
}

export function obtenerPrecioMasBajo(precios) {
  if (!precios || precios.length === 0) {
    return null;
  }

  let menor = precios[0];

  for (let i = 1; i < precios.length; i++) {
    if (precios[i].precio < menor.precio) {
      menor = precios[i];
    }
  }

  return menor;
}

export function calcularCompraPorNegocio(productosSeleccionados) {
  if (!productosSeleccionados || productosSeleccionados.length === 0) {
    return [];
  }

  const mapaNegocios = {};

  productosSeleccionados.forEach((producto) => {
    producto.precios.forEach((item) => {
      if (!mapaNegocios[item.negocio]) {
        mapaNegocios[item.negocio] = {
          negocio: item.negocio,
          total: 0,
          cantidadProductos: 0,
        };
      }

      mapaNegocios[item.negocio].total += item.precio;
      mapaNegocios[item.negocio].cantidadProductos += 1;
    });
  });

  return Object.values(mapaNegocios);
}

