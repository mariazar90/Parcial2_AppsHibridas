import ItemComponent from "./Item/ItemComponent"
import PropTypes from 'prop-types'
import './ListaComponent.css'
import { useEffect, useMemo, useState } from "react"
import { Container } from "@mui/material"
import SkeletonList from "../Skeleton/Skeleton.list"
import { useLoading } from "../../context/loading.context"
import ModalComponent from "../Modal/ModalComponent"
import { useProfile } from "../../context/session.context"
function ListaComponent({listado, ruta, entidad, deleteFunction, createFunction}){
    const profile = useProfile()
    const [lista, setLista] = useState(listado)
    const { loading } = useLoading();
    const [modal, setModal] = useState (false);
    const [itemID, setItemID] = useState(null)

    const changeShow = (value) => {
      setModal(value)
    }

    const handleDelete = (id) => {
      setItemID(id)
      changeShow(true)
    }

    const callDeleteFunction = () => {
      changeShow(false)
      deleteFunction(itemID)
    }

    const onChangeFiltro = (event) => {
      const filtro = event.target.value.toLowerCase()
        const listaFiltrada = listado.filter(item => item.name.toLowerCase().includes(filtro))
        setLista(listaFiltrada)
    }

    useEffect(() => {
      setLista(listado)
    }, [listado])

    const puedeBorrar = useMemo(()=>{
      return (profile.role == 'admin' || entidad =='rutina') && deleteFunction
    },[deleteFunction, profile, entidad])

   return (
    <>
      <div className="list_container">
        <div className="header">deleteFunction
          <form className="list__form">
                Filtrar por: <input className="list__filter" type="text" onChange={onChangeFiltro}></input>
          </form>
          {(profile.role == 'admin' || entidad =='rutina') && <button disabled={loading} className="list__create__button" onClick={createFunction}>Crear {entidad}</button>}
              
        </div>
        <ul>
            {!loading ?
              lista.map(item => <ItemComponent key={item._id} item={item} ruta={ruta} deleteFunction={puedeBorrar?()=>handleDelete(item._id):null}></ItemComponent>)
              : <SkeletonList list={['0','1']}></SkeletonList>
            }
        </ul>
      </div>
      
      <ModalComponent show={modal} closeModal={() => changeShow(false)}>
          <div className="modal-item-container">
              <h2>Eliminar</h2>
              <h3>Esta seguro de que desea eliminar el Item?</h3>
              <div className="modal-item-action">
                <button onClick={callDeleteFunction}>Aceptar</button>
                <button onClick={() => changeShow(false)}>Cancelar</button>
              </div>
          </div>
              

      </ModalComponent>
    </>
   )
}

export default ListaComponent