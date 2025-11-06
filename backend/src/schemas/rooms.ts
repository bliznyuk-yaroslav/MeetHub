import Joi from 'joi';

export const createRoomSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(500).allow('', null),
});

export const updateRoomSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  description: Joi.string().max(500).allow('', null),
}).min(1);

export const addMemberSchema = Joi.object({
  email: Joi.string().email().required(),
  role: Joi.string().valid('Admin', 'User').required(),
});
