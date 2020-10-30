import joi from 'joi'

export const validQuery = (body) => {
    const querySchema = joi.object({
        names: joi.string().required(),
        email: joi.string().required(),
        message: joi.string().required(),
    })
    return querySchema.validate(body)
}
