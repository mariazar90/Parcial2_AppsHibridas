import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './ExercisePage.css'

function ExercisePage(){
    const [exercise, setExercise] = useState ({})
    const [role, setRole] = useState ('ADMIN')
    const {idExercise} = useParams()

    useEffect(() => {
        fetch(`http://localhost:2023/api/exercises/${idExercise}`,{
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
          setExercise(data)
        })
    }, [idExercise])

    return (
        <div className="exercise-page">
            <div className='exercise-page__header'>
                <img className="exercise-page__img" src={`https://picsum.photos/200/200?random=${exercise._id}`}/>
                <h1 className="exercise-page__title">{exercise.name}</h1>
            </div>
            <p className="exercise-page__description">{exercise.description}</p>
            {role == 'ADMIN' && <button className="exercise-page__button"><a href={`/exercises/new?exercise=${exercise._id}`}>Editar</a></button>}
        </div>
    )
}

export default ExercisePage
