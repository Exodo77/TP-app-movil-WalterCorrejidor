import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';

import { obtenerPrecioMasBajo } from '../models/Producto';

export default function TarjetaProducto({
  producto,
  seleccionadoEnCompra,
  cantidadEnCompra,
  onAlternarCompra,
  onCambiarCantidadCompra,
  onEditarPrecio,
  onEliminarProducto,
}) {
  const mejorOpcion = obtenerPrecioMasBajo(producto.precios);
  const cantidadBase = producto.cantidad || 1;
  const tipoMedida = producto.tipoMedida || 'Unidad';

  const [cantidadTexto, setCantidadTexto] = useState(
    String(cantidadEnCompra || cantidadBase)
  );

  const obtenerNumeroActual = () => {
    const num = Number(cantidadTexto);
    return Number.isFinite(num) && num > 0 ? num : cantidadBase;
  };

  const manejarTextoCantidad = (texto) => {
    setCantidadTexto(texto);
    const num = Number(texto);
    if (Number.isFinite(num) && num > 0) {
      onCambiarCantidadCompra(num);
    }
  };

  const manejarIncrementar = () => {
    const nuevoValor = obtenerNumeroActual() + 1;
    setCantidadTexto(String(nuevoValor));
    onCambiarCantidadCompra(nuevoValor);
  };

  const manejarDecrementar = () => {
    const actual = obtenerNumeroActual();
    const nuevoValor = actual > 1 ? actual - 1 : 1;
    setCantidadTexto(String(nuevoValor));
    onCambiarCantidadCompra(nuevoValor);
  };

  const pluralMedida =
    obtenerNumeroActual() === 1
      ? tipoMedida
      : tipoMedida === 'Unidad'
      ? 'Unidades'
      : 'Kilos';

  return (
    <View style={styles.tarjeta}>
      <View style={styles.encabezado}>
        <View style={styles.tituloContainer}>
          <Text style={styles.nombreProducto}>
            Producto: {producto.nombre}
          </Text>
          <Text style={styles.detalleCantidad}>
            Precio por: {cantidadBase} {tipoMedida}
          </Text>
        </View>

        <Pressable
          style={[
            styles.botonCompra,
            seleccionadoEnCompra && styles.botonCompraActivo,
          ]}
          onPress={() => onAlternarCompra(obtenerNumeroActual())}
        >
          <Text
            style={[
              styles.textoBotonCompra,
              seleccionadoEnCompra && styles.textoBotonCompraActivo,
            ]}
          >
            {seleccionadoEnCompra ? '✓ En mi compra' : '+ Sumar a compra'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.selectorCompraRow}>
        <Text style={styles.etiquetaLlevar}>
          Cantidad a comprar:
        </Text>

        <View style={styles.controlesCantidad}>
          <Pressable
            style={styles.botonMasMenos}
            onPress={manejarDecrementar}
          >
            <Text style={styles.textoMasMenos}>−</Text>
          </Pressable>

          <TextInput
            style={styles.inputCantidadCompra}
            value={cantidadTexto}
            onChangeText={manejarTextoCantidad}
            keyboardType="decimal-pad"
          />

          <Pressable
            style={styles.botonMasMenos}
            onPress={manejarIncrementar}
          >
            <Text style={styles.textoMasMenos}>+</Text>
          </Pressable>

          <Text style={styles.unidadCompraTexto}>
            {pluralMedida}
          </Text>
        </View>
      </View>

      <View style={styles.listaPrecios}>
        {producto.precios.map((item) => {
          const esElMasBajo =
            mejorOpcion && item.precio === mejorOpcion.precio;

          return (
            <View
              key={item.negocio}
              style={[
                styles.filaNegocio,
                esElMasBajo && styles.filaMasBaja,
              ]}
            >
              <View style={styles.infoNegocio}>
                <Text style={styles.nombreNegocio}>
                  {item.negocio}
                </Text>
                <Text
                  style={[
                    styles.precioNegocio,
                    esElMasBajo && styles.precioMasBajoTexto,
                  ]}
                >
                  ${item.precio.toLocaleString('es-AR')}
                </Text>
              </View>

              <Pressable
                style={styles.botonEditar}
                onPress={() => onEditarPrecio(producto, item)}
              >
                <Text style={styles.textoEditar}>Editar</Text>
              </Pressable>
            </View>
          );
        })}
      </View>

      {mejorOpcion && (
        <View style={styles.destacadoMenorPrecio}>
          <Text style={styles.tituloMenorPrecio}>
            Precio más bajo:
          </Text>
          <Text style={styles.negocioGanador}>
            {mejorOpcion.negocio}
          </Text>
          <Text style={styles.montoGanador}>
            ${mejorOpcion.precio.toLocaleString('es-AR')}
          </Text>
        </View>
      )}

      <View style={styles.pieTarjeta}>
        <Pressable
          style={styles.botonEliminar}
          onPress={onEliminarProducto}
        >
          <Text style={styles.textoEliminar}>
            Eliminar producto
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tituloContainer: {
    flex: 1,
    marginRight: 8,
  },
  nombreProducto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  detalleCantidad: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  selectorCompraRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FED7AA',
    marginBottom: 10,
  },
  etiquetaLlevar: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9A3412',
  },
  controlesCantidad: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  botonMasMenos: {
    backgroundColor: '#EA580C',
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoMasMenos: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputCantidadCompra: {
    borderWidth: 1,
    borderColor: '#FDBA74',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 8,
    minWidth: 42,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  unidadCompraTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9A3412',
    marginLeft: 2,
  },
  botonCompra: {
    backgroundColor: '#FFF3E0',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDBA74',
  },
  botonCompraActivo: {
    backgroundColor: '#EA580C',
    borderColor: '#EA580C',
  },
  textoBotonCompra: {
    color: '#EA580C',
    fontSize: 13,
    fontWeight: '600',
  },
  textoBotonCompraActivo: {
    color: '#FFFFFF',
  },
  listaPrecios: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 8,
  },
  filaNegocio: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  filaMasBaja: {
    backgroundColor: '#EFF6FF',
  },
  infoNegocio: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 12,
  },
  nombreNegocio: {
    fontSize: 15,
    color: '#475569',
  },
  precioNegocio: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  precioMasBajoTexto: {
    color: '#1D4ED8',
    fontWeight: 'bold',
  },
  botonEditar: {
    backgroundColor: '#2563EB',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  textoEditar: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  destacadoMenorPrecio: {
    backgroundColor: '#DBEAFE',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  tituloMenorPrecio: {
    fontSize: 13,
    color: '#1D4ED8',
    fontWeight: '600',
  },
  negocioGanador: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 2,
  },
  montoGanador: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D4ED8',
    marginTop: 2,
  },
  pieTarjeta: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  botonEliminar: {
    backgroundColor: '#DC2626',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  textoEliminar: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
