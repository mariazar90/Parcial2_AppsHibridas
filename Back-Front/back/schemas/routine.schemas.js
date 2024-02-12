import yup from 'yup';
import * as exercisesScheme from './exercises.schemas.js'

const itemRoutine = yup.object({
    days: yup.array().of(yup.string()),
    exercises: yup.array().of(exercisesScheme.exercises)
})

const routine = yup.object({
    description: yup.string().required(),
    name: yup.string(),
    routine: yup.array().of(itemRoutine)
})

export {
    routine
}