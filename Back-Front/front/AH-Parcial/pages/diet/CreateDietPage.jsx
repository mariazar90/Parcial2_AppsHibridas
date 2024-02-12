import { useEffect, useState } from "react"
import { useParams, useNavigate, useSearchParams } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createDiet, getDietById, editDiet } from "../../services/diet/dieta.services.js"

function CreateDietPage(){
    const navigate = useNavigate();
    
    let [searchParams, setSearchParams] = useSearchParams();
    const [typeAction, setTypeAction] = useState('Crear')
    const [dietForm, setDietForm] = useState ({
        name: '',
        description: '',
        calories: 0
    });
    const handleChange = ({value, name}) => {
        setDietForm({...dietForm, [name]:value})
    }
    const handleClick = () => {
        if(typeAction=='Editar'){
            editDiet(dietForm).then((resp)=>{
                navigate('/diet', {replace:true});
            })
        }else{
            createDiet(dietForm).then((resp)=>{
                navigate('/diet', {replace:true});
            })
        }
    }
    
    useEffect(() => {
        const diet = searchParams.get('diet');
        if(diet){
            setTypeAction('Editar')
            getDietById(diet).then((selectedDiet) => {
                setDietForm(selectedDiet)
            })
        }
    }, [])

    return (<>
        <TextField id="outlined-basic" name="name" label="Nombre" variant="outlined" value={dietForm.name} onChange={(e)=>handleChange(e.target)}/>
        <TextField 
            id="filled-basic" 
            label="Descripcion" 
            variant="outlined" 
            name="description"
            multiline
            maxRows={4}
            value={dietForm.description}
            onChange={(e)=>handleChange(e.target)}
        />
        <TextField id="outlined-basic" name="calories" type="number" label="Nombre" variant="outlined" value={dietForm.calories} onChange={(e)=>handleChange(e.target)}/>
        
        <Button variant="contained" onClick={handleClick}>{typeAction}</Button>
    </>)
}
export default CreateDietPage