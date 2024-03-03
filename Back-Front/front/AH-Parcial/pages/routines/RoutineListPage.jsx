import ListaComponent from "../../components/Lista/ListaComponent";
import TabsComponent from "../../components/Tabs/TabsComponent.jsx";
import {getRoutines, deleteRoutine} from "../../services/routines/routines.services.js"
import { useProfile } from '../../context/session.context';

import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback, useMemo } from "react" 
import { useLoading } from "../../context/loading.context";
import { setSnackbar } from "../../context/snackbar.context";

function RoutineListPage(){
    const profile = useProfile();
    
    const openSnackbar = setSnackbar();
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const [rutinas, setRutinas] = useState([])
    const [misRutinas, setMisRutinas] = useState([])

    const handleDelete = (id) => {
        deleteRoutine(id).then(() => {
            getRoutines().then(data => {
                setRutinas(data)
            })
        });
      }
    
    const handleCreate = useCallback(() => {

        navigate('/routine/new', {replace:true});
    },[navigate])

    useEffect(() => {
        setLoading(true)
        getRoutines().then((response) => {
            if(response.error){
                openSnackbar(response.error.message, 'error')
            }else{
                setRutinas(response);
            }
            setLoading(false)
        }).catch(error => {
            setLoading(false);
            openSnackbar(error.message, 'error')

        });
    }, [])

    useEffect(() => {
        if(profile._id && rutinas.length > 0){
            setMisRutinas(rutinas.filter(elem => elem.user_id === profile._id))
        }
    }, [profile, rutinas])
    
    const children1 = useMemo(() => {
        return (<ListaComponent listado={rutinas} ruta="routine" entidad="rutina" createFunction={handleCreate}/>)
    }, [rutinas, handleCreate])

    const children2 = useMemo(() => {
        return (<ListaComponent listado={misRutinas} ruta="routine" entidad="rutina" createFunction={handleCreate} deleteFunction={(id)=>handleDelete(id)}/>)
    }, [misRutinas, handleCreate, handleDelete])

    return (
        <TabsComponent 
            label1="Todas"
            children1={children1} 
            label2="Mis Rutinas"
            children2={children2} 
        />
    )
}

export default RoutineListPage