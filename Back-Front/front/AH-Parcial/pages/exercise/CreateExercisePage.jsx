import { useEffect, useState } from "react"
import { useParams, useNavigate, useSearchParams } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { setSnackbar } from '../../context/snackbar.context.jsx';
import { createExercises, getExercisesById, editExercise } from "../../services/exercise/exercise.services.js"


function CreateExercisePage(){
    const openSnackbar = setSnackbar();
    const navigate = useNavigate();
    
    let [searchParams, setSearchParams] = useSearchParams();
    const [typeAction, setTypeAction] = useState('Crear')
    const [exerciseForm, setExerciseForm] = useState ({
        name: '',
        description: ''
    });
    const handleChange = ({value, name}) => {
        setExerciseForm({...exerciseForm, [name]:value})
    }
    const handleClick = () => {
        if(typeAction=='Editar'){
            editExercise(exerciseForm).then((resp)=>{
                if(resp.error)
                    openSnackbar(resp.error.message, 'error')
                
                navigate('/exercises', {replace:true});
            })
        }else{
            createExercises(exerciseForm).then((resp)=>{
                if(resp.error)
                openSnackbar(resp.error.message, 'error')
            
                navigate('/exercises', {replace:true});
            })
        }
    }
    
    useEffect(() => {
        const exercise = searchParams.get('exercise');
        if(exercise){
            setTypeAction('Editar')
            getExercisesById(exercise).then((selectedExercise) => {
                setExerciseForm(selectedExercise)
            })
        }
    }, [])

    return (<>
        <TextField id="outlined-basic" name="name" label="Nombre" variant="outlined" value={exerciseForm.name} onChange={(e)=>handleChange(e.target)}/>
        <TextField 
            id="filled-basic" 
            label="Descripcion" 
            variant="outlined" 
            name="description"
            multiline
            maxRows={4}
            value={exerciseForm.description}
            onChange={(e)=>handleChange(e.target)}
        />
        <Button variant="contained" onClick={handleClick}>{typeAction}</Button>
    </>)
}
export default CreateExercisePage