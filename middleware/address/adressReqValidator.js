import { body } from 'express-validator';

const addressReqValidator = [
  body('street')
    .notEmpty()
    .withMessage('Street is required')
    .isLength({ min: 3 })
    .withMessage('Street must be at least 3 characters long'),

  body('city')
    .notEmpty()
    .withMessage('City is required')
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage('City must contain only alphabetical characters'),

  body('state')
    .notEmpty()
    .withMessage('State is required')
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage('State must contain only alphabetical characters'),

  body('zipcode')
    .notEmpty()
    .withMessage('Zipcode is required')
    .isPostalCode('any')
    .withMessage('Zipcode must be a valid postal code'),

  body('country')
    .notEmpty()
    .withMessage('Country is required')
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage('Country must contain only alphabetical characters'),
];

export default addressReqValidator;
