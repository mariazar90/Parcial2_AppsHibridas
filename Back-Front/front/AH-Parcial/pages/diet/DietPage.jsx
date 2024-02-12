import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { updateProfile } from "../../services/profile/profile.services.js"
import { getDietById } from "../../services/diet/dieta.services"
import { useSession } from '../../context/session.context';
import './DietPage.css'

function DietPage(){
  const { updateProfileContext } = useSession();
    const [diet, setDiet] = useState ({})
    const [role, setRole] = useState ('ADMIN')
    const {idDiet} = useParams()
    const navigate = useNavigate();
    const agregarDieta = () => {
      updateProfile({diet: diet._id})
      .then(user => {
        updateProfileContext(newProfile)
        navigate('/', {replace:true});
      })
    }

    useEffect(() => {
      if(idDiet){
        getDietById(idDiet)
          .then(data => {
            setDiet(data)
          })
      }
    }, [idDiet])

    return (
        <div className='diet-page'>
          <div className='diet-page__header'>
            <img className="dieta-page__img" src={`https://picsum.photos/200/200?random=${diet._id}`} />
            <h1 className="diet-page__title">{diet.name}</h1>
          </div>
          <p className="diet-page__calories"><span>Calorías:</span> {diet.calories}</p>
          <p className="diet-page__description"><span>Descripción:</span> {diet.description}</p>
          <div className='diet-page__action'>
            <button className="diet-page__button" onClick={agregarDieta}><a href="/">Agregar dieta</a></button>
            {role == 'ADMIN' && <button className="diet-page__button"><a href={`/diet/new?diet=${diet._id}`}>Editar</a></button>}
          </div>
        </div>
    )
}

export default DietPage