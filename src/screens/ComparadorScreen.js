import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  Pressable,
} from 'react-native';

import {
  cargarProductos,
  agregarOActualizarPrecio,
  editarPrecioNegocio,
  eliminarProducto,
  filtrarProductos,
} from '../controllers/ProductosController';

import FormularioProducto from '../components/FormularioProducto';
import ListaProductos from '../components/ListaProductos';
import ResumenCompra from '../components/ResumenCompra';

export default function ComparadorScreen() {
  const [productos, setProductos] = useState(cargarProductos());
  const [busqueda, setBusqueda] = useState('');

  const [nombreProducto, setNombreProducto] = useState('');
  const [negocio, setNegocio] = useState('');
  const [precio, setPrecio] = useState('');

  const [edicionActual, setEdicionActual] = useState(null);
  const [idsEnCompra, setIdsEnCompra] = useState(['1', '2']);

  const modoEdicion = edicionActual !== null;

  const limpiarFormulario = () => {
    setNombreProducto('');
    setNegocio('');
    setPrecio('');
    setEdicionActual(null);
  };

  const manejarAgregar = () => {
    try {
      const nuevosProductos = agregarOActualizarPrecio(
        productos,
        nombreProducto,
        negocio,
        precio
      );

      setProductos(nuevosProductos);
      limpiarFormulario();
    } catch (error) {
      Alert.alert(
        'No se pudo guardar el precio',
        error.message || 'Ocurrió un error inesperado.'
      );
    }
  };

  const manejarIniciarEdicion = (producto, itemPrecio) => {
    setEdicionActual({
      idProducto: producto.id,
      negocioOriginal: itemPrecio.negocio,
    });
    setNombreProducto(producto.nombre);
    setNegocio(itemPrecio.negocio);
    setPrecio(String(itemPrecio.precio));
  };

  const manejarGuardarEdicion = () => {
    if (!edicionActual) {
      return;
    }

    try {
      const nuevosProductos = editarPrecioNegocio(
        productos,
        edicionActual.idProducto,
        edicionActual.negocioOriginal,
        nombreProducto,
        negocio,
        precio
      );

      setProductos(nuevosProductos);
      limpiarFormulario();
    } catch (error) {
      Alert.alert(
        'No se pudieron guardar los cambios',
        error.message || 'Ocurrió un error inesperado.'
      );
    }
  };

  const manejarEliminarProducto = (id) => {
    const nuevosProductos = eliminarProducto(productos, id);
    setProductos(nuevosProductos);
    setIdsEnCompra(
      idsEnCompra.filter((idCompra) => idCompra !== id)
    );

    if (edicionActual && edicionActual.idProducto === id) {
      limpiarFormulario();
    }
  };

  const manejarAlternarCompra = (idProducto) => {
    if (idsEnCompra.includes(idProducto)) {
      setIdsEnCompra(
        idsEnCompra.filter((id) => id !== idProducto)
      );
    } else {
      setIdsEnCompra([...idsEnCompra, idProducto]);
    }
  };

  const productosFiltrados = filtrarProductos(productos, busqueda);

  const productosEnCompra = productos.filter((producto) =>
    idsEnCompra.includes(producto.id)
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contenido}
    >
      <Text style={styles.titulo}>Comparador de Precios</Text>
      <Text style={styles.subtitulo}>
        Negocios de barrio — encontrá el precio más bajo
      </Text>

      <View style={styles.buscadorContainer}>
        <TextInput
          style={styles.inputBusqueda}
          placeholder="Buscar producto (ej: Yerba, Leche)..."
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      <ResumenCompra
        productosSeleccionados={productosEnCompra}
        onLimpiarCompra={() => setIdsEnCompra([])}
      />

      <FormularioProducto
        nombreProducto={nombreProducto}
        setNombreProducto={setNombreProducto}
        negocio={negocio}
        setNegocio={setNegocio}
        precio={precio}
        setPrecio={setPrecio}
        onAgregar={manejarAgregar}
        onEditar={manejarGuardarEdicion}
        modoEdicion={modoEdicion}
      />

      {modoEdicion && (
        <Pressable
          style={styles.botonCancelar}
          onPress={limpiarFormulario}
        >
          <Text style={styles.textoCancelar}>
            Cancelar edición
          </Text>
        </Pressable>
      )}

      <ListaProductos
        productos={productosFiltrados}
        idsEnCompra={idsEnCompra}
        onAlternarCompra={manejarAlternarCompra}
        onEditarPrecio={manejarIniciarEdicion}
        onEliminarProducto={manejarEliminarProducto}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EF',
  },
  contenido: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333333',
  },
  subtitulo: {
    fontSize: 15,
    color: '#777777',
    marginTop: 4,
    marginBottom: 16,
  },
  buscadorContainer: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  inputBusqueda: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
  botonCancelar: {
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  textoCancelar: {
    color: '#777777',
    fontWeight: '600',
  },
});

