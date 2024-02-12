import ListaComponent from "../../components/Lista/ListaComponent";
import {getExercises, deleteExercise} from "../../services/exercise/exercise.services.js"
import { useEffect, useState } from "react" 

function ExerciseListPage(){
    const [ejercicios, setEjercicios] = useState([])

    const handleDelete = (id) => {
      
      deleteExercise(id).then(() => {
        getExercises().then((exercises) => {
          setEjercicios(exercises);
        });
      });
    }

    useEffect(() => {
      getExercises().then((exercises) => {
        setEjercicios(exercises);
      });
    }, [])
  
    useEffect(() =>{
     
    }, [ejercicios])
  
 return <ListaComponent listado={ejercicios} ruta="exercises"  entidad="ejercicio" deleteFunction={(id)=>handleDelete(id)}/>
}

export default ExerciseListPage