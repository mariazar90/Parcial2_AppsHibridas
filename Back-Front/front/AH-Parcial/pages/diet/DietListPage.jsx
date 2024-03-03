import { useEffect, useState } from "react" 
import ListaComponent from "../../components/Lista/ListaComponent";
import ModalComponent from '../../components/Modal/ModalComponent';
import CreateFormDietComponent from "../../components/CreateForm/Diet/CreateFormDiet.component";

import {deleteDiet, getAllDiets} from "../../services/diet/dieta.services.js"
import { useLoading } from "../../context/loading.context";
import { setSnackbar } from "../../context/snackbar.context";

function DietListPage(){
  
    const { setLoading } = useLoading();
    const openSnackbar = setSnackbar(); 
    const [dietas, setDietas] = useState([])
    const [modal, setModal] = useState (false);

    const handleDelete = (id) => {
      deleteDiet(id).then(() => {
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
      setLoading(true)
      getAllDiets().then(data => {
        if(data.error){
          openSnackbar(data.error.message, 'error');
        }else{
          setDietas(data)
        }
        setLoading(false)
      }).catch(error => {
        setLoading(false)
        openSnackbar(error.message, 'error')
      })
    }

    useEffect(() => {
      init()
    }, [])
  
 return (
    <>
      <ListaComponent listado={dietas} ruta="diet"  entidad="dieta" createFunction={() => changeShow(true)} deleteFunction={(id)=>handleDelete(id)}/>

      <ModalComponent show={modal} closeModal={() => changeShow(false)}>
        <CreateFormDietComponent closeForm={() => changeShow(false)} confirmForm={handleConfirm}/>
      </ModalComponent>
    </>
 )
}

export default DietListPage