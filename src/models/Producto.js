export function crearPrecioNegocio(negocio, precio) {
  return {
    negocio: negocio.trim(),
    precio: Number(precio),
  };
}

export function crearProducto(
  nombre,
  cantidad,
  tipoMedida,
  negocio,
  precio
) {
  return {
    id: Date.now().toString(),
    nombre: nombre.trim(),
    cantidad: Number(cantidad),
    tipoMedida: tipoMedida || 'Unidad',
    precios: [crearPrecioNegocio(negocio, precio)],
  };
}

export function validarDatosPrecio(
  nombreProducto,
  cantidad,
  negocio,
  precio
) {
  if (
    !nombreProducto.trim() ||
    !cantidad ||
    !negocio.trim() ||
    !precio
  ) {
    return 'Completá el producto, la cantidad, el negocio y el precio.';
  }

  if (!Number.isFinite(Number(cantidad)) || Number(cantidad) <= 0) {
    return 'Ingresá una cantidad válida mayor que cero.';
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
    const cantidadBase = Number(producto.cantidad) || 1;
    const cantidadElegida =
      Number(producto.cantidadCompra) || cantidadBase;
    const multiplicador = cantidadElegida / cantidadBase;

    producto.precios.forEach((item) => {
      if (!mapaNegocios[item.negocio]) {
        mapaNegocios[item.negocio] = {
          negocio: item.negocio,
          total: 0,
          cantidadProductos: 0,
        };
      }

      mapaNegocios[item.negocio].total += Math.round(
        item.precio * multiplicador
      );
      mapaNegocios[item.negocio].cantidadProductos += 1;
    });
  });

  return Object.values(mapaNegocios);
}
