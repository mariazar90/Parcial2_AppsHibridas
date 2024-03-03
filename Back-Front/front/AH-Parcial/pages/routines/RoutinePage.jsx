import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { updateProfile } from "../../services/profile/profile.services.js"
import { getRoutineById } from "../../services/routines/routines.services.js"
import { useSession } from '../../context/session.context';
import TablaComponent from '../../components/Tabla/TablaComponent.jsx';

import './RoutinePage.css'

function RoutinePage(){
    const { profile, updateProfileContext } = useSession();
    const [routine, setRoutine] = useState ({})
    const {idRoutine} = useParams();
    const [table, setTable] = useState({
        lunes: null,
        martes: null,
        miercoles: null,
        jueves: null,
        viernes: null,
        sabado: null,
        domingo: null
    }); 
    const navigate = useNavigate();

    const agregarRutina = useCallback(() => {
      updateProfile({routine: routine._id})
      .then(newProfile => {
        updateProfileContext({routine: routine._id})
        navigate('/', {replace:true});
      })
    },[navigate, routine])

    

    const desasignarRutina = useCallback(() => {
        updateProfile({routine: ''})
        .then(user => {
          if(user.error){
            openSnackbar(user.error.message, 'error')
          }else{
            updateProfileContext({routine: ''})
            navigate('/', {replace:true});
          }
        })
      }, [navigate])
    
    useEffect(() => {
        if(routine && routine.routine){
            const newTable = {...table}
            for (let i = 0; i < routine.routine.length; i++) {
                const bloque = routine.routine[i];
                const day = bloque.day;
                newTable[day.toLowerCase()] = bloque.exercises;
            }
            setTable(newTable);
        }
    },[routine])

    useEffect(() => {
        if(idRoutine){
            getRoutineById(idRoutine).then((selectedRoutine) => {
                setRoutine(selectedRoutine)
            })
        }
    }, [idRoutine])

    return (
        <div className='routine-page'>
            <div className="routine-page__header">
                <img className="routine-page__img" src={`https://picsum.photos/200/200?random=${routine._id}`} />
                <div className="routine-page__textbox">
                    <h1 className="routine-page__title">{routine.name}</h1>
                    <p className="routine-page__description">{routine.description}</p>
                </div>
                <div className="routine-page__action">
                    {profile?.routine == idRoutine ? 
                    <button className="routine-page__button" onClick={desasignarRutina}>Desasignar</button>
                    :<button className="routine-page__button" onClick={agregarRutina}>Asignar</button>
                    }
                    {routine.user_id == profile._id && <button className="routine-page__button"><a href={`/routine/new?routine=${routine._id}`}>Editar</a></button>}
                </div>
            </div>
            {Object.keys(table).map(day=>
                (
                    table[day] && 
                <div key={day}>
                    <h2 className="routine-page__h2">{day}</h2>
                    <TablaComponent exercises={table[day]}/>
                </div>
                )
            )}
        </div>
    )
}

export default RoutinePage