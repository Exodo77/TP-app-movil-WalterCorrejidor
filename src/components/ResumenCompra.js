import { View, Text, Button, StyleSheet } from 'react-native';
import {
  calcularCompraPorNegocio,
  obtenerPrecioMasBajo,
} from '../models/Producto';

export default function ResumenCompra({
  productosSeleccionados,
  onLimpiarCompra,
}) {
  if (productosSeleccionados.length === 0) {
    return null;
  }

  const totalesPorNegocio = calcularCompraPorNegocio(
    productosSeleccionados
  );

  const listaParaComparar = totalesPorNegocio.map((item) => ({
    negocio: item.negocio,
    precio: item.total,
  }));

  const negocioMasBarato = obtenerPrecioMasBajo(listaParaComparar);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>
        Comparar compra completa ({productosSeleccionados.length}{' '}
        {productosSeleccionados.length === 1 ? 'producto' : 'productos'})
      </Text>

      <Text style={styles.listaNombres}>
        Compra:{' '}
        {productosSeleccionados.map((p) => p.nombre).join(', ')}
      </Text>

      {totalesPorNegocio.map((item) => {
        const esMejorTotal =
          negocioMasBarato &&
          item.negocio === negocioMasBarato.negocio;

        return (
          <View
            key={item.negocio}
            style={[
              styles.filaTotal,
              esMejorTotal && styles.filaTotalGanadora,
            ]}
          >
            <Text style={styles.nombreNegocio}>
              {item.negocio}
            </Text>
            <Text
              style={[
                styles.montoTotal,
                esMejorTotal && styles.montoTotalGanador,
              ]}
            >
              ${item.total.toLocaleString('es-AR')}
            </Text>
          </View>
        );
      })}

      {negocioMasBarato && (
        <Text style={styles.recomendacion}>
          Conviene comprar todo en {negocioMasBarato.negocio} ($
          {negocioMasBarato.precio.toLocaleString('es-AR')})
        </Text>
      )}

      <View style={styles.contenedorBoton}>
        <Button
          title="Vaciar selección de compra"
          color="#53745B"
          onPress={onLimpiarCompra}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#53745B',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  listaNombres: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 12,
  },
  filaTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 4,
  },
  filaTotalGanadora: {
    backgroundColor: '#E7EFE8',
  },
  nombreNegocio: {
    fontSize: 15,
    color: '#333333',
  },
  montoTotal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333333',
  },
  montoTotalGanador: {
    color: '#53745B',
  },
  recomendacion: {
    marginTop: 8,
    marginBottom: 12,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#53745B',
    textAlign: 'center',
  },
  contenedorBoton: {
    marginTop: 4,
  },
});

