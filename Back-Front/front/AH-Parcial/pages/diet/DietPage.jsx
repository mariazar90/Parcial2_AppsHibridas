import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { updateUser } from "../../services/account/account.services"
import { getDietById } from "../../services/diet/dieta.services"
import './DietPage.css'

function DietPage(){
    const [diet, setDiet] = useState ({})
    const {idDiet} = useParams()
    const navigate = useNavigate();
    const agregarDieta = () => {
      updateUser({diet: diet._id})
      .then(user => {
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
            <img className="dieta-list-item__img" src={`https://picsum.photos/200/200?random=${diet._id}`} />
            <h1 className="diet-page__title">{diet.name}</h1>
            <p className="diet-page__calories"><span>Calorías:</span> {diet.calories}</p>
            <p className="diet-page__description"><span>Descripción:</span> {diet.description}</p>
            <button className="diet-page__button" onClick={agregarDieta}><a href="/">Agregar dieta</a></button>
        </div>
    )
}

export default DietPage