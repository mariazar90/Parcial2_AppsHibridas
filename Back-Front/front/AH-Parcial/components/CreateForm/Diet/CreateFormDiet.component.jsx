import { createDiet, editDiet } from "../../../services/diet/dieta.services.js"
import { useEffect, useState } from "react" 
import TextField from '@mui/material/TextField';
import './CreateFormDiet.component.css'
import { useLoading } from "../../../context/loading.context.jsx";
import { setSnackbar } from "../../../context/snackbar.context.jsx";
function CreateFormDietComponent({closeForm, confirmForm, diet}){
    
    const { loading, setLoading } = useLoading();
    const openSnackbar = setSnackbar();
    const [dietForm, setDietForm] = useState ({
        name: '',
        description: '',
        calories: 0
    });
        
    const handleChange = ({value, name}) => {
        setDietForm({...dietForm, [name]:value})
    }

    const handleClick = async () => {
        try {
            setLoading(true);
            if(diet){
                const resp = await editDiet(dietForm)
                if(resp.error)  openSnackbar(resp.error.message, 'error')
                else openSnackbar('Editado correctamente!', 'success')
            }else{
                const resp = await createDiet(dietForm)
                if(resp.error)  openSnackbar(resp.error.message, 'error')
                else openSnackbar('Creado correctamente!', 'success')
            }
            setLoading(false);
            setDietForm({
                name: '',
                description: '',
                calories: 0
            })
            confirmForm();
        } catch (error) {
            if(error)openSnackbar(error.message, 'error')
            setLoading(false);
            closeForm()
        }
    }
    
    useEffect(()=>{
        if(diet){
            setDietForm({...diet})
        }
    },[diet])

    return (<>
        <div className="new-diet__container">
            <h1>Nueva Dieta</h1>
            <div>
            
                <TextField disabled={loading} className="new-diet__text-field" id="outlined-basic" name="name" label="Nombre" variant="outlined" value={dietForm.name} onChange={(e)=>handleChange(e.target)}/>
            </div>
            <div>
                <TextField 
                    disabled={loading}
                    className="new-diet__text-field"
                    id="filled-basic" 
                    label="Descripcion" 
                    variant="outlined" 
                    name="description"
                    multiline
                    maxRows={3}
                    value={dietForm.description}
                    onChange={(e)=>handleChange(e.target)}
                />
            </div>
            <div>
                <TextField 
                    disabled={loading}
                    className="new-diet__text-field"
                    id="outlined-basic"
                    name="calories"
                    type="number"
                    label="Calorias"
                    variant="outlined"
                    value={dietForm.calories} onChange={(e)=>handleChange(e.target)}/>
            </div>
            
            <button disabled={loading} className="new-diet__button" color="secondary" variant="contained" onClick={handleClick}>{diet?'Editar':'Crear'}</button>
        </div>
    </>)
}

export default CreateFormDietComponent