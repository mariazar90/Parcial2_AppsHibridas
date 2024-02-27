import yup from 'yup';
import * as exercisesScheme from './exercises.schemas.js'

const itemExercise = yup.object({
    exercise: exercisesScheme.exercises.required(),
    series: yup.number().required(),
    repeticiones: yup.number().required(),
    descanso: yup.number().required()
})

const itemRoutine = yup.object({
    day: yup.string().required(),
    exercises: yup.array().of(itemExercise).required()
})

const routine = yup.object({
    description: yup.string().required(),
    name: yup.string().required(),
    routine: yup.array().of(itemRoutine)
})

export {
    routine
}