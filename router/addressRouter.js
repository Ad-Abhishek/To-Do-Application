import express from 'express';
import addressController from '../controller/addressController.js';
import jwtVerify from '../middleware/jwtVerify.js';
import addressReqValidator from '../middleware/address/adressReqValidator.js';
import expressValidator from '../middleware/expressValidator.js';

const addressRouter = express.Router();

/**
 * @usage : Create Address
 * @url : http://localhost:7070/addresses/new/
 * @params : street, city, state, zipcode, country
 * @method : POST
 * @access : PRIVATE
 */

addressRouter.post(
  '/new',
  jwtVerify,
  addressReqValidator,
  expressValidator,
  addressController.createAddress
);

/**
 * @usage : Get Address
 * @url : http://localhost:7070/addresses/me/
 * @params : none
 * @method : GET
 * @access : PRIVATE
 */

addressRouter.get('/me', jwtVerify, addressController.getAddress);

/**
 * @usage : Delete Address
 * @url : http://localhost:7070/addresses/delete/
 * @params : none
 * @method : DELETE
 * @access : PRIVATE
 */

addressRouter.delete('/delete', jwtVerify, addressController.deleteAddress);

export default addressRouter;
