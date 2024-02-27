import { useEffect, useState } from "react" 
import ListaComponent from "../../components/Lista/ListaComponent";
import ModalComponent from '../../components/Modal/ModalComponent';
import CreateFormDietComponent from "../../components/CreateForm/Diet/CreateFormDiet.component";

import {deleteDiet, getAllDiets} from "../../services/diet/dieta.services.js"

function DietListPage(){
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
      getAllDiets().then(data => {
        setDietas(data)
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