import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_ERROR,
  AGREGAR_PRODUCTO_EXITO,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_ERROR,
  DESCARGA_PRODUCTOS_EXITO,
  OBTERNER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_ERROR,
  PRODUCTO_ELIMINADO_EXITO,
  OBTERNER_PRODUCTO_EDITAR,
  PRODUCTO_EDITADO_ERROR,
  PRODUCTO_EDITADO_EXITO,
  COMENZAR_EDICION_PRODUCTO,
} from "../types";

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

//Crear nuevos productos
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());
    try {
      //insertar en la API
      await clienteAxios.post("/productos", producto);
      //si todo sale bien, actualizar el state
      dispatch(agregarProductoExito(producto));
      //alerta
      Swal.fire("correcto", "El produco se agrego correctamente", "success");
    } catch (error) {
      console.log(error);
      //si hay un error, cambiar el state
      dispatch(agregarProductoError(true));
      //alerta de errror
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
  };
}
const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

//Si el producot se guarda en la base de datos
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

//si hubo un error
const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});

//Funcion que descarga los productos de la base de datos
export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos);
    try {
      const respuesta = await clienteAxios.get("/productos");
      dispatch(descargaProductosExitos(respuesta.data));
    } catch (error) {
      dispatch(descargaProductosError(error));
    }
  };
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});

const descargaProductosExitos = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});
const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true,
});

//Selecciona y elimina el producto
export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));
    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());
      //Si eliminar mostrar alerta
      Swal.fire("Eliminado!", "El producto se eliminó exitosamente", "success");
    } catch (error) {
      dispatch(eliminarProductoError());
    }
  };
}

const obtenerProductoEliminar = (id) => ({
  type: OBTERNER_PRODUCTO_ELIMINAR,
  payload: id,
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO,
});

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true,
});

export function obtenerProductoEditar(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoEditarAction(producto));
  };
}

const obtenerProductoEditarAction = (producto) => ({
  type: OBTERNER_PRODUCTO_EDITAR,
  payload: producto,
});

//Edita un registro en l api y state

export function editarProductoAction(producto) {
  return async (dispatch) => {
    dispatch(editarProducto());
    try {
      await clienteAxios.put(`productos/${producto.id}`);
      dispatch(editarProductoExito(producto));
    } catch (error) {
      dispatch(editarProductoError());
    }
  };
}
const editarProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO,
});

const editarProductoExito = (producto) => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto,
});

const editarProductoError = () => ({
  type: PRODUCTO_EDITADO_ERROR,
  payload: true,
});
