import { View, Text, StyleSheet } from 'react-native';
import TarjetaProducto from './TarjetaProducto';

export default function ListaProductos({
  productos,
  idsEnCompra,
  onAlternarCompra,
  onEditarPrecio,
  onEliminarProducto,
}) {
  if (productos.length === 0) {
    return (
      <Text style={styles.vacio}>
        No se encontraron productos para mostrar.
      </Text>
    );
  }

  return (
    <View>
      {productos.map((producto) => (
        <TarjetaProducto
          key={producto.id}
          producto={producto}
          seleccionadoEnCompra={idsEnCompra.includes(producto.id)}
          onAlternarCompra={() => onAlternarCompra(producto.id)}
          onEditarPrecio={onEditarPrecio}
          onEliminarProducto={() => onEliminarProducto(producto.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  vacio: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#777777',
  },
});

