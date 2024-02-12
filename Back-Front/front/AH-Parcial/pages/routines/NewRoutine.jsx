import { useEffect, useState } from "react"
import { useParams, useNavigate, useSearchParams } from "react-router-dom"

import ModalComponent from '../../components/Modal/ModalComponent'
import Bloque from '../../components/Bloque/BloqueComponent'

import './NewRoutine.css'

import {getExercises} from "../../services/exercise/exercise.services.js"
import { createRoutines, editRoutines } from "../../services/routines/routines.services.js"
import { getRoutineById } from "../../services/routines/routines.services.js"


import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DIAS_TOTALES = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

function NewRoutine(){
    const theme = useTheme();
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const {idDiet} = useParams()
    const [typeAction, setTypeAction] = useState('Crear')
    const [modal, setModal] = useState (false);
    const [ejercicios, setEjercicios] = useState([]);
    const [bloques, setBloques] = useState ([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [nuevaRutina, setNuevaRutina] = useState({name: '', description: '', routine:[]}) 
    
    const changeShow = (value) => {
        setModal(value)
    }
  
    const handleChangeDays = (event) => {
      const {
        target: { value },
      } = event;
      setSelectedDays(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
  
    const handleChangeExercises = (event) => {
      const {
        target: { value },
      } = event;
      setSelectedExercises(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    const handleClickBloque = () => {
        setBloques([
                ...bloques,
                {
                    days: selectedDays,
                    exercises: selectedExercises
                }
            ]
        )
        setSelectedExercises([]);
        setSelectedDays([]);
        setModal(false);
    }

    const onChangeInput = (event) => {
        setNuevaRutina({
            ...nuevaRutina,
            [event.target.name]: event.target.value
        })
    }

    const createRoutine = () => {
        if(typeAction == 'Editar'){
            editRoutines(nuevaRutina).then((response) => {
                navigate('/routines', {replace:true});
            })
        }else{
            createRoutines(nuevaRutina).then((response) => {
                navigate('/routines', {replace:true});
            })
        }
    }

    useEffect(() => {
        const routine = searchParams.get('routine');
        let currentExercises = []
        getExercises().then((exercises) => {
            currentExercises = [...exercises]
            setEjercicios(exercises);
        });

        if(routine){
            setTypeAction('Editar')
            getRoutineById(routine).then((selectedRoutine) => {
                setNuevaRutina(selectedRoutine)
                setBloques(selectedRoutine.routine)
                selectedRoutine.routine.forEach((elem)=>{
                    const filtered = currentExercises.filter(exercise => !elem.exercises.some(exerciseRoutine => exercise._id == exerciseRoutine._id))
                })
            })

        }
    }, [])

    const deleteItem = (index) => {
        const nuevoBloques = bloques;
        const elem = nuevoBloques.splice(index, 1)[0];

        console.log("nuevoBloques:", nuevoBloques);
        setBloques([...nuevoBloques])
    }
    const editItem = (index) => {
        setSelectedExercises(bloques[index].exercises)
        setSelectedDays(bloques[index].days)
        setModal(true);
    }
    
    useEffect(() => {
        if(bloques) {
            setNuevaRutina({
                ...nuevaRutina,
                routine: bloques
            })
        }
    }, [bloques])

    return (
        <div className="new-routine">
            <h1 className="new-routine-section__h1">Nueva Rutina</h1>
            <div className="new-routine-section">
                <form className="new-routine-form">
                    <div>
                        <label htmlFor="name">Nombre:</label>
                        <input name="name" type="text" onChange={onChangeInput} value={nuevaRutina.name}/>
                    </div>
                    <div>
                        <label htmlFor="description">Descripción:</label>
                        <input name="description" type="text" onChange={onChangeInput} value={nuevaRutina.description}/>
                    </div>
                    <div>
                        <label htmlFor="routine">Bloque de ejercicios:</label>
                        <button type="button" onClick={() => changeShow(true)}>+</button>
                    </div>
                    <ul>
                        {bloques.map((item, index) => (
                            <Bloque item={item} index={index} key={index} deleteItem={()=>deleteItem(index)} editItem={()=>editItem(index)}/>
                        ))}
                    </ul>
                    <button type="button" onClick={createRoutine}>{typeAction}</button>
                </form>
            </div>
            <ModalComponent show={modal} closeModal={() => changeShow(false)}>
                <form className="new-routine-form-bloque">
                    <Select
                        labelId="routine-day-label"
                        id="routine-days"
                        multiple
                        value={selectedDays}
                        onChange={handleChangeDays}
                        input={<OutlinedInput label="day" />}
                    >
                    {DIAS_TOTALES.map((day) => (
                        
                        <MenuItem
                            key={day}
                            value={day}
                            style={getStyles(day, selectedDays, theme)}
                        >
                            {day}
                        </MenuItem>
                    ))}
                    </Select>
                    <Select
                        labelId="routine-exercise-label"
                        id="routine-exercise"
                        multiple
                        value={selectedExercises}
                        onChange={handleChangeExercises}
                        input={<OutlinedInput label="exercise" />}
                    >
                    {ejercicios.map((exercise) => (
                        <MenuItem
                            key={exercise._id}
                            value={exercise}
                            style={getStyles(exercise._id, selectedExercises, theme)}
                        >
                            {exercise.name}
                        </MenuItem>
                    ))}
                    </Select>
                    <button type="button" onClick={handleClickBloque}>Agregar bloque</button>
                </form>
            </ModalComponent>
        </div>
    )
}

export default NewRoutine