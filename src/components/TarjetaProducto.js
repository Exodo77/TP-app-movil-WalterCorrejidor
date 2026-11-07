import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

import { obtenerPrecioMasBajo } from '../models/Producto';

export default function TarjetaProducto({
  producto,
  seleccionadoEnCompra,
  onAlternarCompra,
  onEditarPrecio,
  onEliminarProducto,
}) {
  const mejorOpcion = obtenerPrecioMasBajo(producto.precios);

  return (
    <View style={styles.tarjeta}>
      <View style={styles.encabezado}>
        <Text style={styles.nombreProducto}>
          Producto: {producto.nombre}
        </Text>

        <Pressable
          style={[
            styles.botonCompra,
            seleccionadoEnCompra && styles.botonCompraActivo,
          ]}
          onPress={onAlternarCompra}
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
    marginBottom: 12,
  },
  nombreProducto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
    marginRight: 8,
  },
  botonCompra: {
    backgroundColor: '#E7EFE8',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  botonCompraActivo: {
    backgroundColor: '#53745B',
  },
  textoBotonCompra: {
    color: '#53745B',
    fontSize: 13,
    fontWeight: '600',
  },
  textoBotonCompraActivo: {
    color: '#FFFFFF',
  },
  listaPrecios: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
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
    backgroundColor: '#F2F7F3',
  },
  infoNegocio: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 12,
  },
  nombreNegocio: {
    fontSize: 15,
    color: '#444444',
  },
  precioNegocio: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
  },
  precioMasBajoTexto: {
    color: '#53745B',
    fontWeight: 'bold',
  },
  botonEditar: {
    backgroundColor: '#E7EFE8',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  textoEditar: {
    color: '#53745B',
    fontSize: 12,
    fontWeight: '600',
  },
  destacadoMenorPrecio: {
    backgroundColor: '#E7EFE8',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  tituloMenorPrecio: {
    fontSize: 13,
    color: '#53745B',
    fontWeight: '600',
  },
  negocioGanador: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 2,
  },
  montoGanador: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#53745B',
    marginTop: 2,
  },
  pieTarjeta: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  botonEliminar: {
    backgroundColor: '#FBE9E7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  textoEliminar: {
    color: '#B3261E',
    fontSize: 12,
    fontWeight: '600',
  },
});

