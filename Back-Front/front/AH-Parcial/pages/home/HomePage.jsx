import { useContext, useEffect, useState } from "react";
import { getDietById } from "../../services/diet/dieta.services";
import ItemComponent from "../../components/Lista/Item/ItemComponent";
import * as accountServices from '../../services/account/account.services.js';
import { getRoutineById } from "../../services/routines/routines.services";
import { useProfile } from '../../context/session.context';
import './HomePage.css'
function HomePage(){
    const profile = useProfile();
    const [diet, setDiet] = useState(null)
    const [routine, setRoutine] = useState(null)

    useEffect(()=>{
        if(profile?.diet){
            getDietById(profile.diet).then((dieta)=>{
                setDiet(dieta)
            })
        }
        if(profile?.routine){
            getRoutineById(profile.routine).then((rutina)=>{
                setRoutine(rutina)
            })
        }
    },[profile])

    return(
        <div className="home-page">
        <h1 className="home-section__h1">Mis planes</h1>
        <div className="home-section">
        <h2>Dietas</h2>
        {
            diet ? (<ItemComponent item={diet} ruta="diet" entidad="dieta"/>)
            : (
            <div>
                <p className="home-section__p">No posee dietas</p>
                <div className="home-section__button__container">
                    <a className="home-section__button" href="/diet">Seleccionar una</a>
                </div>
            </div>
            )
        }
        </div>

        <div className="home-section">
        <h2>Rutina</h2>
        {
            routine ? (<ItemComponent item={routine} ruta="routine" entidad="rutina"/>)
            : (
            <div>
                <p className="home-section__p">No posee rutinas</p>
                <div className="home-section__button__container">
                    <a className="home-section__button"href="/routines">Seleccionar una </a>
                    <a className="home-section__button" href="/routines">Crear una</a>
                </div>
            </div>
            )
        }
        </div>
        </div>
    )
}

export default HomePage