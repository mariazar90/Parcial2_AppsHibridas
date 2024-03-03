import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import ModalComponent from '../../components/Modal/ModalComponent';
import CreateFormExerciseComponent from "../../components/CreateForm/Exercise/CreateFormExercise.component";

import './ExercisePage.css'

function ExercisePage(){
    const [exercise, setExercise] = useState ({})
    const [role, setRole] = useState ('ADMIN');
    const [modal, setModal] = useState (false);
    const {idExercise} = useParams()
    const navigate = useNavigate();
    
    const changeShow = useCallback((value) => {
        setModal(value)
      }, [setModal])
      
    const handleConfirm = useCallback(async () => {
          changeShow();
          navigate('/exercises', {replace:true});
    },[navigate])

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
        <>
            <div className="exercise-page">
                <div className='exercise-page__header'>
                    <img className="exercise-page__img" src={`https://picsum.photos/200/200?random=${exercise._id}`}/>
                    <h1 className="exercise-page__title">{exercise.name}</h1>
                </div>
                <p className="exercise-page__description">{exercise.description}</p>
                {role == 'ADMIN' && <button className="exercise-page__button" onClick={() => changeShow(true)}>Editar</button>}
            </div>
            
            <ModalComponent show={modal} closeModal={() => changeShow(false)}>
                <CreateFormExerciseComponent exercise={exercise} closeForm={() => changeShow(false)} confirmForm={handleConfirm}/>
            </ModalComponent>
        </>
    )
}

export default ExercisePage
