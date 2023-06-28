import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { updateUser } from "../../services/account/account.services.js"
import { getRoutineById } from "../../services/routines/routines.services.js"

function RoutinePage(){
    const [routine, setRoutine] = useState ({})
    const {idRoutine} = useParams()
    const navigate = useNavigate();

    const agregarRutina = () => {
      updateUser({routine: routine._id})
      .then(user => {
        navigate('/', {replace:true});
      })
    }

    useEffect(() => {
        if(idRoutine){
            getRoutineById(idRoutine).then((selectedRoutine) => {
                setRoutine(selectedRoutine)
            })
        }
    }, [idRoutine])

    return (
        <div className='diet-page'>
            <img className="dieta-list-item__img" src={`https://picsum.photos/200/200?random=${routine._id}`} />
            <h1 className="diet-page__title">{routine.name}</h1>
            <p className="diet-page__description"><span>Descripción:</span> {routine.description}</p>
            <button className="diet-page__button" onClick={agregarRutina}><a href="/">Agregar rutina</a></button>
        </div>
    )
}

export default RoutinePage