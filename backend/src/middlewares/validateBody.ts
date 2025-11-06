import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const validateBody = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map((d) => ({ message: d.message, path: d.path })),
      });
    }
    req.body = value;
    next();
  };
};

export default validateBody;
