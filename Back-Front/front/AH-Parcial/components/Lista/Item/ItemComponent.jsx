import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './ItemComponent.css'

function ItemComponent({item, ruta, entidad}){
    return(
        <li className="list-item">
        <img className="list-item__img" src={`https://picsum.photos/200/200?random=${item._id}`} />
        <div className="list-item__detail">
          <h2 className="list-item__name">{item.name}</h2>
          <p className="list-item__description">{item.description}</p>
          <div className="list-item__button">
            <Link className="list-item__full" to={`/${ruta}/${item._id}`}>Ver {entidad}</Link>
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