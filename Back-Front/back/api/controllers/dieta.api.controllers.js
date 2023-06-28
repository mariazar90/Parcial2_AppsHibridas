import * as service from '../../services/diet.services.js'

function getDiet(req,res){
    service.getDiet({deleted:true})
        .then(function(dietS){
            res.status(200).json(dietS)
        })
}

function getDietbyId(req,res){
    const idDiet = req.params.idDiet

    service.getDietbyId(idDiet)
        .then(function(diet){
            if(diet){
                res.status(200).json(diet)
            }
            else{
                res.status(400).json({error:{message:'No se encontró la dieta'}})
            }
        })
}

export {
    getDiet,
    getDietbyId
}