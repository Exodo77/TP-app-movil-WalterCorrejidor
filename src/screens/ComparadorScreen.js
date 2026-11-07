import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
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
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  const [nombreProducto, setNombreProducto] = useState('');
  const [negocio, setNegocio] = useState('');
  const [precio, setPrecio] = useState('');

  const [edicionActual, setEdicionActual] = useState(null);
  const [idsEnCompra, setIdsEnCompra] = useState(['1', '2']);

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const modoEdicion = edicionActual !== null;

  useEffect(() => {
    async function iniciar() {
      try {
        const datos = await cargarProductos();
        setProductos(datos);
      } catch (error) {
        Alert.alert(
          'Error',
          'No se pudieron cargar los productos.'
        );
      } finally {
        setCargando(false);
      }
    }

    iniciar();
  }, []);

  const limpiarFormulario = () => {
    setNombreProducto('');
    setNegocio('');
    setPrecio('');
    setEdicionActual(null);
  };

  const manejarAgregar = async () => {
    if (guardando || cargando) {
      return;
    }

    try {
      setGuardando(true);

      const nuevosProductos = await agregarOActualizarPrecio(
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
    } finally {
      setGuardando(false);
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

  const manejarGuardarEdicion = async () => {
    if (guardando || cargando || !edicionActual) {
      return;
    }

    try {
      setGuardando(true);

      const nuevosProductos = await editarPrecioNegocio(
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
    } finally {
      setGuardando(false);
    }
  };

  const manejarEliminarProducto = async (id) => {
    if (guardando || cargando) {
      return;
    }

    try {
      setGuardando(true);

      const nuevosProductos = await eliminarProducto(productos, id);
      setProductos(nuevosProductos);
      setIdsEnCompra(
        idsEnCompra.filter((idCompra) => idCompra !== id)
      );

      if (edicionActual && edicionActual.idProducto === id) {
        limpiarFormulario();
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo eliminar el producto.'
      );
    } finally {
      setGuardando(false);
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

  if (cargando) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.textoCargando}>
          Cargando productos...
        </Text>
      </View>
    );
  }

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
        deshabilitado={guardando}
      />

      {modoEdicion && (
        <Pressable
          style={styles.botonCancelar}
          onPress={limpiarFormulario}
          disabled={guardando}
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
    backgroundColor: '#EEF2F6',
  },
  contenido: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  subtitulo: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 4,
    marginBottom: 16,
  },
  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF2F6',
  },
  textoCargando: {
    marginTop: 12,
    color: '#64748B',
  },
  buscadorContainer: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  inputBusqueda: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    color: '#1E293B',
  },
  botonCancelar: {
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  textoCancelar: {
    color: '#64748B',
    fontWeight: '600',
  },
});
