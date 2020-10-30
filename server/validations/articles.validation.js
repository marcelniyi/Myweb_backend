import joi from 'joi'

export const validArticle = (body) => {
    const articleSchema = joi.object({
        title: joi.string().required(),
        descriptions: joi.string().required(),
        image: joi.string().required(),
    })
    return articleSchema.validate(body)
}
