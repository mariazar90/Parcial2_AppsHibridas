import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './ItemComponent.css'
import { useProfile } from '../../../context/session.context'

function ItemComponent({item, ruta, deleteFunction}){
    const profile = useProfile()

    return(
        <li className="list-item">
        <img className="list-item__img" src={`https://picsum.photos/200/200?random=${item._id}`} />
        <div className="list-item__detail">
          <h2 className="list-item__name">{item.name}</h2>
          <p className="list-item__description">{item.description}</p>
          <div className="list-item__action">
            <Link className="list-item__button" to={`/${ruta}/${item._id}`}>Ver</Link>
            
            {deleteFunction &&
                <button className="list-item__button" variant="text" onClick={()=>deleteFunction(item._id)}>Eliminar</button>
            }
          </div>
        </div>
      </li>
    )
}

ItemComponent.prototype = {
  item: PropTypes.object.isRequired,
  ruta: PropTypes.array.isRequired
}

export default ItemComponent