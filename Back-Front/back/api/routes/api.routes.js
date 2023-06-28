import {Router} from 'express'
import * as dietController from '../controllers/dieta.api.controllers.js'
import * as exercisesController from '../controllers/exercises.api.controllers.js'
import * as routinesController from '../controllers/routines.api.controllers.js';
import { validateAccount } from '../../middlewares/account.validate.middleware.js';
import * as accountControllers from '../controllers/account.api.controllers.js';
import { tokenVerify } from '../../middlewares/token.validate.middleware.js';

const route = Router()

route.get('/account', [tokenVerify], accountControllers.getAccount);
route.post('/account', [validateAccount], accountControllers.createAccount);
route.patch('/account', [tokenVerify], accountControllers.updateUser);
route.post('/session', [validateAccount], accountControllers.login);
route.delete('/session', [tokenVerify], accountControllers.logout);

route.use('/diet', tokenVerify);
route.get('/diet', dietController.getDiet)

route.get('/diet/:idDiet', dietController.getDietbyId)

route.use('/exercises', tokenVerify);
route.get('/exercises', exercisesController.getExercises)

route.get('/exercises/:idExercise', exercisesController.getExercisebyId)

route.use('/routines', tokenVerify);
route.get('/routines', routinesController.getRoutines);
route.get('/routines/:idRoutine', routinesController.getRoutineById);
route.post('/routines', routinesController.createRoutines);
route.put('/routines/:idRoutine', routinesController.replaceRoutines);
route.delete('/routines/:idRoutine', routinesController.deleteRoutines);

export default route