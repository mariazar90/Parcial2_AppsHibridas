import {Router} from 'express'
import * as dietController from '../controllers/dieta.api.controllers.js'
import * as exercisesController from '../controllers/exercises.api.controllers.js'
import * as routinesController from '../controllers/routines.api.controllers.js';
import * as accountControllers from '../controllers/account.api.controllers.js';
import { validateAccount, validateProfile, validateUpdateProfile } from '../../middlewares/account.validate.middleware.js';
import { validateRoutine } from '../../middlewares/routines.validate.middleware.js';
import { tokenVerify, roleVerify } from '../../middlewares/token.validate.middleware.js';
import { validateDiet } from '../../middlewares/diet.validate.middleware.js';
import { validateExercises } from '../../middlewares/exercises.validate.middleware.js';

const route = Router()

route.get('/account', [tokenVerify], accountControllers.getAccount);
route.post('/account', [validateAccount], accountControllers.createAccount);
route.patch('/account', [tokenVerify], accountControllers.updateUser);
route.post('/session', [validateAccount], accountControllers.login);
route.delete('/session', [tokenVerify], accountControllers.logout);
route.post('/profile', [tokenVerify, validateProfile], accountControllers.createProfile);
route.get('/profile', [tokenVerify], accountControllers.getProfile);
route.patch('/profile', [tokenVerify, validateUpdateProfile], accountControllers.updateProfile);


route.use('/diet', tokenVerify);
route.get('/diet', dietController.getDiet)
route.get('/diet/:idDiet', dietController.getDietbyId)
route.put('/diet/:idDiet', [roleVerify, validateDiet], dietController.editDiet);
route.post('/diet', [roleVerify, validateDiet], dietController.createDiet)
route.delete('/diet/:idDiet', [roleVerify], dietController.deleteDiet);

route.use('/exercises', tokenVerify);
route.get('/exercises', exercisesController.getExercises)
route.get('/exercises/:idExercise', exercisesController.getExercisebyId)
route.put('/exercises/:idExercise', [roleVerify, validateExercises], exercisesController.editExercise);
route.post('/exercises', [roleVerify, validateExercises], exercisesController.createExercise)
route.delete('/exercises/:idExercise', [roleVerify], exercisesController.deleteExercise);

route.use('/routines', tokenVerify);
route.get('/routines', routinesController.getRoutines);
route.get('/routines/:idRoutine', routinesController.getRoutineById);
route.post('/routines', [validateRoutine], routinesController.createRoutines);
route.put('/routines/:idRoutine', [validateRoutine], routinesController.replaceRoutines);
route.delete('/routines/:idRoutine', routinesController.deleteRoutines);

export default route