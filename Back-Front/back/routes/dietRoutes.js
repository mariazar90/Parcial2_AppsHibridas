import express from 'express'
import * as dietController from '../controllers/diet.controllers.js'
import * as exercisesController from '../controllers/exercises.controllers.js'

const route = express.Router()

route.get('/diet', dietController.getDiet)
route.get('/exercises', exercisesController.getExercises)


route.get('/diet/new', dietController.createDietFormPage) //Prueba
route.post('/diet/new', dietController.createDiet) //Prueba

route.get('/diet/:idDiet/edit', dietController.editDietForm) 
route.post('/diet/:idDiet/edit', dietController.editDiet) 

route.get('/diet/:idDiet/delete', dietController.deleteDietPage) 
route.post('/diet/:idDiet/delete', dietController.deleteDiet) 

route.get('/diet/:idDiet', dietController.getDietbyId)
route.get('/exercises/:idExercise', exercisesController.getExercisebyId)

export default route