import Joi from 'joi';

export const createBookingSchema = Joi.object({
  // IDs are integers now
  roomId: Joi.number().integer().required(),
  start: Joi.date().iso().required(),
  end: Joi.date().iso().greater(Joi.ref('start')).required(),
  description: Joi.string().max(500).allow('', null),
});

export const updateBookingSchema = Joi.object({
  start: Joi.date().iso(),
  end: Joi.date().iso().greater(Joi.ref('start')),
  description: Joi.string().max(500).allow('', null),
}).min(1);
