import ListaComponent from "../../components/Lista/ListaComponent";
import ModalComponent from '../../components/Modal/ModalComponent'

import {getExercises, deleteExercise} from "../../services/exercise/exercise.services.js"
import { useEffect, useState } from "react" 
import CreateFormExerciseComponent from "../../components/CreateForm/Exercise/CreateFormExercise.component";

function ExerciseListPage(){
    const [ejercicios, setEjercicios] = useState([])
    const [modal, setModal] = useState (false);
    
    const handleDelete = (id) => {
      
      deleteExercise(id).then(() => {
        init()
      });
    }
    
    const changeShow = (value) => {
      setModal(value)
    }

    const handleConfirm = async () => {
      await init();
      changeShow();
    }

    const init = () => {
      getExercises().then((exercises) => {
        setEjercicios(exercises);
      });
    }

    useEffect(() => {
      init()
    }, [])
  
 return (
  <>
    <ListaComponent listado={ejercicios} ruta="exercises"  entidad="ejercicio" createFunction={() => changeShow(true)} deleteFunction={(id)=>handleDelete(id)}/>
    
    <ModalComponent show={modal} closeModal={() => changeShow(false)}>
      <CreateFormExerciseComponent confirmForm={handleConfirm} closeForm={() => changeShow(false)}/>
    </ModalComponent>
  </>
 )
}

export default ExerciseListPage