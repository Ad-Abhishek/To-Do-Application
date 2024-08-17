import { body } from 'express-validator';

const taskReqValidator = [
  body('title')
    .notEmpty()
    .withMessage("Title can't be Empty")
    .isLength({ min: 3 })
    .withMessage('Title should be of minimum 3 characters.'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('status')
    .optional()
    .isIn(['pending', 'completed'])
    .withMessage('Invalid status'),
];

export default taskReqValidator;
