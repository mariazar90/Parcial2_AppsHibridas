import ItemComponent from "./Item/ItemComponent"
import PropTypes from 'prop-types'
import './ListaComponent.css'
import { useEffect, useState } from "react"

function ListaComponent({listado, ruta, entidad}){
   const [lista, setLista] = useState(listado)

    const onChangeFiltro = (event) => {
        const filtro = event.target.value.toLowerCase()
        const listaDieta = actividad.filter(item => item.name.toLowerCase().includes(filtro))
        setDietas(listaDieta)
    }

    useEffect(() => {
      setLista(listado)
    }, [listado])

   return (
    <div className="list">
        <form className="list__form">
            Filtrar por: <input className="list__filter" type="text" onChange={onChangeFiltro}></input>
        </form>
    <ul>
        {lista.map(item => <ItemComponent key={item._id} item={item} ruta={ruta} entidad={entidad}></ItemComponent>)}
    </ul>
    </div>
   )
}

ListaComponent.prototype = {
  listado: PropTypes.array.isRequired,
  ruta: PropTypes.array.isRequired
}

export default ListaComponent