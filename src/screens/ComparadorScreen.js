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
  Keyboard,
} from 'react-native';

import {
  cargarProductos,
  recargarProductosIniciales,
  agregarOActualizarPrecio,
  editarPrecioNegocio,
  eliminarProducto,
  filtrarProductos,
  obtenerSugerenciasProductos,
  obtenerSugerenciasNegocios,
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

  const manejarEliminarProducto = (id) => {
    if (guardando || cargando) {
      return;
    }

    Alert.alert(
      'Eliminar producto',
      '¿Estás seguro de que querés eliminar este producto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            if (guardando) {
              return;
            }

            try {
              setGuardando(true);

              const nuevosProductos = await eliminarProducto(
                productos,
                id
              );
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
          },
        },
      ]
    );
  };

  const manejarRestaurarProductos = async () => {
    try {
      setGuardando(true);
      const iniciales = await recargarProductosIniciales();
      setProductos(iniciales);
      setIdsEnCompra(['1', '2']);
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudieron restaurar los productos iniciales.'
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

  const sugerenciasProductos = obtenerSugerenciasProductos(
    productos,
    nombreProducto
  );

  const sugerenciasNegocios = obtenerSugerenciasNegocios(
    productos,
    negocio
  );

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
        <View style={styles.filaBuscador}>
          <TextInput
            style={styles.inputBusqueda}
            placeholder="Buscar producto (ej: Yerba, Leche)..."
            value={busqueda}
            onChangeText={setBusqueda}
            returnKeyType="search"
            onSubmitEditing={() => Keyboard.dismiss()}
          />

          <Pressable
            style={styles.botonLupa}
            onPress={() => Keyboard.dismiss()}
          >
            <Text style={styles.textoLupa}>🔍 Buscar</Text>
          </Pressable>
        </View>

        {busqueda.trim().length > 0 && (
          <View style={styles.estadoBusqueda}>
            <Text style={styles.textoEstadoBusqueda}>
              Resultados para "{busqueda.trim()}":{' '}
              {productosFiltrados.length}
            </Text>

            <Pressable onPress={() => setBusqueda('')}>
              <Text style={styles.textoLimpiarBusqueda}>
                Limpiar
              </Text>
            </Pressable>
          </View>
        )}
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
        sugerenciasProductos={sugerenciasProductos}
        sugerenciasNegocios={sugerenciasNegocios}
        onAgregar={manejarAgregar}
        onEditar={manejarGuardarEdicion}
        onCancelarEdicion={limpiarFormulario}
        modoEdicion={modoEdicion}
        deshabilitado={guardando}
      />

      <ListaProductos
        productos={productosFiltrados}
        idsEnCompra={idsEnCompra}
        onAlternarCompra={manejarAlternarCompra}
        onEditarPrecio={manejarIniciarEdicion}
        onEliminarProducto={manejarEliminarProducto}
        onRestaurarProductos={manejarRestaurarProductos}
        mostrarBotonRestaurar={productos.length === 0}
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
  filaBuscador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputBusqueda: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    color: '#1E293B',
  },
  botonLupa: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoLupa: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  estadoBusqueda: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  textoEstadoBusqueda: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },
  textoLimpiarBusqueda: {
    fontSize: 13,
    color: '#DC2626',
    fontWeight: 'bold',
  },
});
