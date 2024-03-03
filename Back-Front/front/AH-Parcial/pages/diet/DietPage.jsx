import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { updateProfile } from "../../services/profile/profile.services.js"
import { getDietById } from "../../services/diet/dieta.services"
import { useSession } from '../../context/session.context';
import ModalComponent from '../../components/Modal/ModalComponent';
import CreateFormDietComponent from "../../components/CreateForm/Diet/CreateFormDiet.component";

import { setSnackbar } from "../../context/snackbar.context.jsx";
import './DietPage.css'

function DietPage(){
    const { updateProfileContext, profile } = useSession();
    const openSnackbar = setSnackbar();
    const [diet, setDiet] = useState ({})
    const [role, setRole] = useState ('ADMIN')
    const [modal, setModal] = useState (false);
    const {idDiet} = useParams()
    const navigate = useNavigate();

    const agregarDieta = useCallback(() => {
      updateProfile({diet: diet._id})
      .then(user => {
        if(user.error){
          openSnackbar(user.error.message, 'error')
        }else{
          updateProfileContext({diet: diet._id})
          navigate('/', {replace:true});
        }
      })
    }, [navigate, diet])

    const desasignarDieta = useCallback(() => {
      updateProfile({diet: ''})
      .then(user => {
        if(user.error){
          openSnackbar(user.error.message, 'error')
        }else{
          updateProfileContext({diet: ''})
          navigate('/', {replace:true});
        }
      })
    }, [navigate])

    const changeShow = useCallback((value) => {
      setModal(value)
    }, [setModal])
    
    const handleConfirm = useCallback(() => {
        changeShow();
        navigate('/diet', {replace:true});
    }, [navigate])

    useEffect(() => {
      if(idDiet){
        getDietById(idDiet)
          .then(data => {
            if(data.error){
              openSnackbar(data.error.message, 'error')
            }else{
            setDiet(data)
            }
          }).catch((error)=>{
            
            openSnackbar(error.message, 'error')
          })
      }
    }, [idDiet])

    return (
      <>
        <div className='diet-page'>
          <div className='diet-page__header'>
            <img className="dieta-page__img" src={`https://picsum.photos/200/200?random=${diet._id}`} />
            <h1 className="diet-page__title">{diet.name}</h1>
          </div>
          <p className="diet-page__calories"><span>Calorías:</span> {diet.calories}</p>
          <p className="diet-page__description"><span>Descripción:</span> {diet.description}</p>
          <div className='diet-page__action'>
            {profile?.diet == idDiet ? 
            (<button className="diet-page__button" onClick={desasignarDieta}><a href="/">Desasignar dieta</a></button>)
            :(<button className="diet-page__button" onClick={agregarDieta}><a href="/">Asignar dieta</a></button>)
            }
            {role == 'ADMIN' && <button className="diet-page__button" onClick={() => changeShow(true)}>Editar</button>}
          </div>
        </div>
        
        <ModalComponent show={modal} closeModal={() => changeShow(false)}>
          <CreateFormDietComponent diet={diet} closeForm={() => changeShow(false)} confirmForm={handleConfirm}/>
        </ModalComponent>
      </>
    )
}

export default DietPage