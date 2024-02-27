import ItemComponent from "./Item/ItemComponent"
import PropTypes from 'prop-types'
import './ListaComponent.css'
import { useEffect, useState } from "react"
import { Container } from "@mui/material"

function ListaComponent({listado, ruta, entidad, deleteFunction, createFunction}){

    const [lista, setLista] = useState(listado)

    const onChangeFiltro = (event) => {
      const filtro = event.target.value.toLowerCase()
        const listaDieta = listado.filter(item => item.name.toLowerCase().includes(filtro))
        setLista(listaDieta)
    }

    useEffect(() => {
      setLista(listado)
    }, [listado])

   return (
    <div className="list_container">
      <div className="header">
        <form className="list__form">
              Filtrar por: <input className="list__filter" type="text" onChange={onChangeFiltro}></input>
        </form>
        <button className="list__create__button" onClick={createFunction}>Crear {entidad}</button>
            
      </div>
      <ul>
          {lista.map(item => <ItemComponent key={item._id} item={item} ruta={ruta} deleteFunction={deleteFunction}></ItemComponent>)}
      </ul>
    </div>
   )
}

export default ListaComponent