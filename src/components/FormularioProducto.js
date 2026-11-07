import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function FormularioProducto({
  nombreProducto,
  setNombreProducto,
  negocio,
  setNegocio,
  precio,
  setPrecio,
  onAgregar,
  onEditar,
  modoEdicion,
  deshabilitado,
}) {
  return (
    <View style={styles.formulario}>
      <Text style={styles.tituloSeccion}>
        {modoEdicion ? 'Editar precio en negocio' : 'Cargar producto o precio'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Producto (ej: Yerba, Leche)"
        value={nombreProducto}
        onChangeText={setNombreProducto}
      />

      <TextInput
        style={styles.input}
        placeholder="Negocio (ej: Almacén Don José)"
        value={negocio}
        onChangeText={setNegocio}
      />

      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="decimal-pad"
      />

      <Pressable
        style={[
          styles.boton,
          deshabilitado && styles.botonDeshabilitado,
        ]}
        onPress={modoEdicion ? onEditar : onAgregar}
        disabled={deshabilitado}
      >
        <Text style={styles.textoBoton}>
          {modoEdicion ? 'Guardar cambios' : 'Guardar precio'}
        </Text>
      </Pressable>

      {modoEdicion && (
        <Text style={styles.textoEdicion}>
          Estás editando el precio de un producto existente.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  tituloSeccion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 15,
    color: '#1E293B',
  },
  boton: {
    backgroundColor: '#16A34A',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonDeshabilitado: {
    opacity: 0.5,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoEdicion: {
    color: '#64748B',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
  },
});

