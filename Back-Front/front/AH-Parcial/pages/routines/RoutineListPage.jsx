import ListaComponent from "../../components/Lista/ListaComponent";
import TabsComponent from "../../components/Tabs/TabsComponent.jsx";
import {getRoutines, deleteRoutine} from "../../services/routines/routines.services.js"
import { useProfile } from '../../context/session.context';
import { useEffect, useState } from "react" 

function RoutineListPage(){
    const profile = useProfile();
    const [rutinas, setRutinas] = useState([])
    const [misRutinas, setMisRutinas] = useState([])

    const handleDelete = (id) => {
        deleteRoutine(id).then(() => {
            getRoutines().then(data => {
                setRutinas(data)
            })
        });
      }

    useEffect(() => {
        getRoutines().then((response) => {
            setRutinas(response);
        });
    }, [])

    useEffect(() => {
        if(profile._id && rutinas.length > 0){
            setMisRutinas(rutinas.filter(elem => elem.user_id === profile._id))
        }
    }, [profile, rutinas])
    
    const children1 = <ListaComponent listado={rutinas} ruta="routine" entidad="rutina" />
    const children2 = <ListaComponent listado={misRutinas} ruta="routine" entidad="rutina" deleteFunction={(id)=>handleDelete(id)}/>

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