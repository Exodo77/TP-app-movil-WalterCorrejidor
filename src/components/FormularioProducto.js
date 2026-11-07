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
  sugerenciasProductos = [],
  sugerenciasNegocios = [],
  onAgregar,
  onEditar,
  onCancelarEdicion,
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

      {sugerenciasProductos.length > 0 && (
        <View style={styles.contenedorSugerencias}>
          {sugerenciasProductos.map((sugerencia) => {
            const seleccionado =
              sugerencia.toLowerCase() ===
              nombreProducto.trim().toLowerCase();

            return (
              <Pressable
                key={sugerencia}
                style={[
                  styles.chipSugerencia,
                  seleccionado && styles.chipSeleccionado,
                ]}
                onPress={() => setNombreProducto(sugerencia)}
              >
                <Text
                  style={[
                    styles.textoSugerencia,
                    seleccionado && styles.textoChipSeleccionado,
                  ]}
                >
                  {sugerencia}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Negocio (ej: Almacén Don José)"
        value={negocio}
        onChangeText={setNegocio}
      />

      {sugerenciasNegocios.length > 0 && (
        <View style={styles.contenedorSugerencias}>
          {sugerenciasNegocios.map((sugerencia) => {
            const seleccionado =
              sugerencia.toLowerCase() ===
              negocio.trim().toLowerCase();

            return (
              <Pressable
                key={sugerencia}
                style={[
                  styles.chipSugerencia,
                  seleccionado && styles.chipSeleccionado,
                ]}
                onPress={() => setNegocio(sugerencia)}
              >
                <Text
                  style={[
                    styles.textoSugerencia,
                    seleccionado && styles.textoChipSeleccionado,
                  ]}
                >
                  {sugerencia}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}

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
        <>
          <Pressable
            style={[
              styles.botonCancelar,
              deshabilitado && styles.botonDeshabilitado,
            ]}
            onPress={onCancelarEdicion}
            disabled={deshabilitado}
          >
            <Text style={styles.textoBotonCancelar}>
              Cancelar edición
            </Text>
          </Pressable>

          <Text style={styles.textoEdicion}>
            Estás editando el precio de un producto existente.
          </Text>
        </>
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
    marginBottom: 8,
    fontSize: 15,
    color: '#1E293B',
  },
  contenedorSugerencias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  chipSugerencia: {
    backgroundColor: '#DBEAFE',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  chipSeleccionado: {
    backgroundColor: '#2563EB',
  },
  textoSugerencia: {
    color: '#1D4ED8',
    fontSize: 13,
    fontWeight: '600',
  },
  textoChipSeleccionado: {
    color: '#FFFFFF',
  },
  boton: {
    backgroundColor: '#16A34A',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonCancelar: {
    backgroundColor: '#DC2626',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botonDeshabilitado: {
    opacity: 0.5,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoBotonCancelar: {
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
