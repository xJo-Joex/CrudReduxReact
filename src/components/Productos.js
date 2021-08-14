import React, { useEffect } from "react";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { obtenerProductosAction } from "../actions/productoActions";
import Producto from "./Producto";

const Productos = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //consultar la api
    const cargarProductos = () => dispatch(obtenerProductosAction());
    cargarProductos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Obtener el state
  const productos = useSelector((state) => state.productos.productos);
  const error = useSelector((state) => state.productos.error);
  const cargando = useSelector((state) => state.productos.loading);

  return (
    <>
      <h2 className="text-center my-5">Listado de Productos</h2>
      {error ? (
        <p className="font-weight-bold alert alert-danger text-center mt-4">
          Hubo un error
        </p>
      ) : null}
      {cargando ? <p className="text-center">Carganddo...</p> : null}
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Aciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">
                {"No Hay Productos"}
              </td>
            </tr>
          ) : (
            productos.map((producto) => (
              <Producto key={producto.id} producto={producto} />
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default Productos;
