import ListaComponent from "../../components/Lista/ListaComponent";
import ModalComponent from '../../components/Modal/ModalComponent'

import {getExercises, deleteExercise} from "../../services/exercise/exercise.services.js"
import { useEffect, useState, useCallback } from "react" 
import CreateFormExerciseComponent from "../../components/CreateForm/Exercise/CreateFormExercise.component";
import { setSnackbar } from "../../context/snackbar.context";
import { useLoading } from "../../context/loading.context";

function ExerciseListPage(){
    const openSnackbar = setSnackbar();
    const { setLoading } = useLoading(); 
    const [ejercicios, setEjercicios] = useState([])
    const [modal, setModal] = useState (false);
    
    const init = useCallback(() => {
      setLoading(true);
      getExercises().then((response) => {
        if(response.error){
          openSnackbar(response.error.message, 'error');
        }else{
          setEjercicios(response);
        }
        setLoading(false);
      }).catch(error => {
        setLoading(false);
        openSnackbar(error.message, 'error');
      });
    }, [setEjercicios])

    const handleDelete = useCallback((id) => {
      deleteExercise(id).then(() => {
        init()
      });
    },[init])
    
    const changeShow = useCallback((value) => {
      setModal(value)
    }, [setModal])

    const handleConfirm = useCallback(async () => {
      await init();
      changeShow();
    }, [init, changeShow]);

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