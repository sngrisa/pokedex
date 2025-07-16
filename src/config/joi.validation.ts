import * as Joi from "joi";

export const JoiValidationSchema = Joi.object({
    MONGODB: [Joi.required(), Joi.string()],
    PORT: [Joi.number().default(4100)],
    DEFAULT_LIMIT: [Joi.number().default(10)],
    DEFAULT_OFFSET: [Joi.number().default(0)],
})

