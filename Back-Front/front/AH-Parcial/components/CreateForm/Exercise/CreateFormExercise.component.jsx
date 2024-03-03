import { createExercises, editExercise } from "../../../services/exercise/exercise.services.js"
import { useEffect, useState } from "react" 

import TextField from '@mui/material/TextField';
import './CreateFormExercise.component.css'
import { useLoading } from "../../../context/loading.context.jsx";
import { setSnackbar } from "../../../context/snackbar.context.jsx";
function CreateFormExerciseComponent({confirmForm, closeForm, exercise}){
    
    const { loading, setLoading } = useLoading();
    const openSnackbar = setSnackbar();
    const [exerciseForm, setExerciseForm] = useState ({
        name: '',
        description: ''
    });
        
    const handleChange = ({value, name}) => {
        setExerciseForm({...exerciseForm, [name]:value})
    }

    const handleClick = async () => {
        try {
            setLoading(true)
            if(exercise){
                const resp = await editExercise(exerciseForm);
                if(resp.error)  openSnackbar(resp.error.message, 'error')
                else openSnackbar('Editado correctamente!', 'success')
            }else{
                const resp = await createExercises(exerciseForm);
                if(resp.error)  openSnackbar(resp.error.message, 'error')
                else openSnackbar('Creado correctamente!', 'success')
            }
            setLoading(false)
            setExerciseForm({
                name: '',
                description: ''
            })
            confirmForm();
        } catch (error) {
            if(error)openSnackbar(error.message, 'error')
            closeForm();
            setLoading(false)
            
        }
    }
    
    useEffect(()=>{
        if(exercise){
            setExerciseForm({...exercise})
        }
    },[exercise])
    
    
    return (<>
        <div className="new-exercise__container">
            <h1>Nuevo Ejercicio</h1>
            <div>
            
                <TextField disabled={loading} className="new-exercise-field" id="outlined-basic" name="name" label="Nombre" variant="outlined" value={exerciseForm.name} onChange={(e)=>handleChange(e.target)}/>
            </div>
            <div>
                <TextField 
                    className="new-exercise-field"
                    id="outlined-basic"
                    name="description"
                    type="string"
                    multiline
                    maxRows={3}
                    label="Descripción"
                    variant="outlined"
                    disabled={loading}
                    value={exerciseForm.description} onChange={(e)=>handleChange(e.target)}/>
            </div>
            
            <button disabled={loading} className="new-exercise__button" variant="contained" onClick={handleClick}>{exercise?'Editar':'Crear'}</button>
        </div>
    </>)
}

export default CreateFormExerciseComponent;