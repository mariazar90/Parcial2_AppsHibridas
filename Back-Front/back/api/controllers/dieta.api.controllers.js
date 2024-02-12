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

function editDiet(req, res){
    const idDiet = req.params.idDiet;
    const diet = {
        name: req.body.name,
        description: req.body.description,
        calories: req.body.calories
    };
    service.editDiet(idDiet,diet)
        .then(function (newDiet){
            if(newDiet){
                res.status(200).json(newDiet)
            }else{
                res.status(404).json({error: {message:`Dieta id ${idDiet} no encontrada` }});
            }
        })
}

function createDiet(req, res){
    const diet = {
        name: req.body.name,
        description: req.body.description,
        calories: req.body.calories
    };
    service.createDiet(diet)
        .then(function (newDiet){
            res.status(201).json(newDiet)
        })
}

function deleteDiet(req, res){
    const idDiet = req.params.idDiet;
    service.deleteDiet(idDiet)
    .then(async function (diet){
        if(diet){
            res.status(200).json(diet)
        }else{
            res.status(404).json({error: {message:`Dieta id ${idDiet} no encontrado` }});
        }
    })
}

export {
    getDiet,
    getDietbyId,
    editDiet,
    createDiet,
    deleteDiet
}