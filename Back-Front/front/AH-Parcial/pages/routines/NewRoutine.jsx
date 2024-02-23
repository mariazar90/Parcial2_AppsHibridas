import { useEffect, useState } from "react"
import { useParams, useNavigate, useSearchParams } from "react-router-dom"

import ModalComponent from '../../components/Modal/ModalComponent'
import Bloque from '../../components/Bloque/BloqueComponent'
import TablaComponent from '../../components/Tabla/TablaComponent.jsx';

import './NewRoutine.css'

import {getExercises} from "../../services/exercise/exercise.services.js"
import { createRoutines, editRoutines } from "../../services/routines/routines.services.js"
import { getRoutineById } from "../../services/routines/routines.services.js"


import { useTheme } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
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
    const [selectedDay, setSelectedDay] = useState();
    const [allExercises, setAllExercise] = useState({});
    const [exercise, setExercise] = useState({});
    const [table, setTable] = useState({
        lunes: null,
        martes: null,
        miercoles: null,
        jueves: null,
        viernes: null,
        sabado: null,
        domingo: null
    }); 
    const [nuevaRutina, setNuevaRutina] = useState({name: '', description: '', routine:[]}) 
    
    const changeShow = (value) => {
        setModal(value)
    }
  
    const handleChangeDay = (day) => {
      
      setSelectedDay(day);
      let filteredExercises = allExercises
      if(table[day]) filteredExercises = allExercises.filter(ex1 => 
        table[day].every(ex2 => ex2._id != ex1._id)
      )
      setEjercicios(filteredExercises)
      changeShow(true)
    };
  
    const handleChangeExercise = (event) => {
      const {
        target: { value },
      } = event;
      setExercise(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    const handleClickBloque = () => {
        const routine = {...table}
        if(routine[selectedDay])
            routine[selectedDay].push(exercise)
        else routine[selectedDay] = [exercise]
        setTable(routine)
        setExercise({});
        setSelectedDay(null);
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
            setAllExercise(exercises);
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
                        <label htmlFor="routine">Bloque de ejercicios:</label>
                        
                    </div>
                    {Object.keys(table).map(day=>
                        (
                            <div key={day}>
                                <div className="new-routine-page__routine">
                                    <h2>{day}</h2>
                                    <IconButton color="primary" aria-label="add to shopping cart" onClick={() => handleChangeDay(day)}>
                                        <AddIcon />
                                    </IconButton>
                                </div>
                                {table[day] && 
                                <TablaComponent exercises={table[day]} editable={true}/>
                                }
                            </div>
                        )
                    )}
                    <button type="button" onClick={createRoutine}>{typeAction}</button>
                </form>
            </div>
            <ModalComponent show={modal} closeModal={() => changeShow(false)}>
                <form className="new-routine-form-bloque">
                    <h2>Ejercicio:</h2>
                    <Select
                        labelId="routine-exercise-label"
                        id="routine-exercise"
                        value={exercise}
                        onChange={handleChangeExercise}
                        input={<OutlinedInput label="exercise" />}
                    >
                    {ejercicios.map((exercise) => (
                        <MenuItem
                            key={exercise._id}
                            value={exercise}
                            style={getStyles(exercise._id, allExercises, theme)}
                        >
                            {exercise.name}
                        </MenuItem>
                    ))}
                    </Select>
                    <TextField
                        required
                        id="outlined-series"
                        label="Series"
                        type="number"
                    />
                    <TextField
                        required
                        id="outlined-repeticiones"
                        label="Repeticiones"
                        type="number"
                    />
                    <TextField
                        required
                        id="outlined-descanso"
                        label="Descanso"
                        type="number"
                    />
                    <button type="button" onClick={handleClickBloque}>Agregar Ejercicio</button>
                </form>
            </ModalComponent>
        </div>
    )
}

export default NewRoutine