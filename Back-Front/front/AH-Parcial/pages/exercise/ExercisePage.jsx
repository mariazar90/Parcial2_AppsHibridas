import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './ExercisePage.css'

function ExercisePage(){
    const [exercise, setExercise] = useState ({})
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
            <img className="exercise-list-item__img" src={`https://picsum.photos/200/200?random=${exercise._id}`}/>
            <h1 className="exercise-page__title">{exercise.name}</h1>
            <p className="exercise-page__description">{exercise.description}</p>
        </div>
    )
}

export default ExercisePage
