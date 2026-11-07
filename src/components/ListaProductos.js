import { View, Text, Pressable, StyleSheet } from 'react-native';
import TarjetaProducto from './TarjetaProducto';

export default function ListaProductos({
  productos,
  idsEnCompra,
  onAlternarCompra,
  onEditarPrecio,
  onEliminarProducto,
  onRestaurarProductos,
  mostrarBotonRestaurar,
}) {
  if (productos.length === 0) {
    return (
      <View style={styles.contenedorVacio}>
        <Text style={styles.vacio}>
          No se encontraron productos para mostrar.
        </Text>

        {mostrarBotonRestaurar && (
          <Pressable
            style={styles.botonRestaurar}
            onPress={onRestaurarProductos}
          >
            <Text style={styles.textoRestaurar}>
              Restaurar productos iniciales
            </Text>
          </Pressable>
        )}
      </View>
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
  contenedorVacio: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  vacio: {
    textAlign: 'center',
    color: '#64748B',
    marginBottom: 12,
  },
  botonRestaurar: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  textoRestaurar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
