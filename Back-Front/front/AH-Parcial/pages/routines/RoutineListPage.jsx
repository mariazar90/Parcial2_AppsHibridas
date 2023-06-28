import ListaComponent from "../../components/Lista/ListaComponent";
import {getRoutines} from "../../services/routines/routines.services.js"
import { useEffect, useState } from "react" 

function RoutineListPage(){
    const [rutinas, setRutinas] = useState([])

    useEffect(() => {
        getRoutines().then((response) => {
            setRutinas(response);
        });
    }, [])
  
 return <ListaComponent listado={rutinas} ruta="routine" entidad="rutina" />
}

export default RoutineListPage