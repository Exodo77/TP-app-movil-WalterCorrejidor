import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

const OPCIONES_MEDIDA = ['Unidad', 'Kilo'];

export default function FormularioProducto({
  nombreProducto,
  setNombreProducto,
  cantidad,
  setCantidad,
  tipoMedida,
  setTipoMedida,
  negocio,
  setNegocio,
  precio,
  setPrecio,
  sugerenciasProductos = [],
  sugerenciasNegocios = [],
  onSeleccionarProductoSugerido,
  onAgregar,
  onEditar,
  onCancelarEdicion,
  modoEdicion,
  deshabilitado,
}) {
  const [mostrarListaMedida, setMostrarListaMedida] = useState(false);

  const manejarElegirMedida = (opcion) => {
    setTipoMedida(opcion);
    setMostrarListaMedida(false);
  };

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
                onPress={() =>
                  onSeleccionarProductoSugerido
                    ? onSeleccionarProductoSugerido(sugerencia)
                    : setNombreProducto(sugerencia)
                }
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

      <View style={styles.filaCantidad}>
        <TextInput
          style={[styles.input, styles.inputCantidad]}
          placeholder="Cantidad (ej: 1)"
          value={cantidad}
          onChangeText={setCantidad}
          keyboardType="decimal-pad"
        />

        <View style={styles.contenedorSelector}>
          <Pressable
            style={styles.botonSelector}
            onPress={() => setMostrarListaMedida(!mostrarListaMedida)}
          >
            <Text style={styles.textoSelector}>
              {tipoMedida}
            </Text>
            <Text style={styles.flechaSelector}>
              {mostrarListaMedida ? '▲' : '▼'}
            </Text>
          </Pressable>

          {mostrarListaMedida && (
            <View style={styles.listaDesplegable}>
              {OPCIONES_MEDIDA.map((opcion) => {
                const activo = opcion === tipoMedida;

                return (
                  <Pressable
                    key={opcion}
                    style={[
                      styles.itemDesplegable,
                      activo && styles.itemDesplegableActivo,
                    ]}
                    onPress={() => manejarElegirMedida(opcion)}
                  >
                    <Text
                      style={[
                        styles.textoItemDesplegable,
                        activo && styles.textoItemDesplegableActivo,
                      ]}
                    >
                      {opcion}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>
      </View>

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
  filaCantidad: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
  },
  inputCantidad: {
    flex: 1,
    marginBottom: 0,
  },
  contenedorSelector: {
    width: 130,
  },
  botonSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  textoSelector: {
    fontSize: 15,
    color: '#1E293B',
    fontWeight: '600',
  },
  flechaSelector: {
    fontSize: 12,
    color: '#64748B',
  },
  listaDesplegable: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  itemDesplegable: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  itemDesplegableActivo: {
    backgroundColor: '#DBEAFE',
  },
  textoItemDesplegable: {
    fontSize: 14,
    color: '#1E293B',
  },
  textoItemDesplegableActivo: {
    color: '#1D4ED8',
    fontWeight: 'bold',
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
