import { validationResult } from 'express-validator';
import Address from '../schema/addressSchema.js';
import Users from '../schema/UserSchema.js';
import catchErrors from '../util/errorUtil.js';
import { APP_CONSTANTS } from '../util/constants.js';

const createAddress = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    let { street, city, state, zipcode, country } = req.body;

    let { id } = req.headers['theUser'];

    if (!id) {
      throw new Error('Invalid User Request');
    }

    const userObj = await Users.findById(id);
    if (!userObj) {
      throw new Error('Invalid User Request');
    }

    const addrObj = await Address.findOne({ user_Obj: id });

    // Delete if id of the user already present in address collection
    if (addrObj) {
      await Address.deleteOne({ user_Obj: id });
    }

    let newAddress = {
      street,
      city,
      state,
      zipcode,
      country,
      user_Obj: userObj._id,
    };

    let address = await Address(newAddress).save();

    if (!address) {
      throw new Error('Address Creation failed');
    }

    return res.status(200).json({
      msg: 'Address Added!',
      status: APP_CONSTANTS.OPERATION_SUCCESS,
      data: address,
    });
  } catch (error) {
    return catchErrors(error, res);
  }
};

const getAddress = async (req, res) => {
  try {
    let { id } = req.headers['theUser'];

    const addrObj = await Address.findOne({ user_Obj: id });

    if (!addrObj) {
      throw new Error('Address Creation failed');
    }
    return res.status(200).json({
      status: APP_CONSTANTS.OPERATION_SUCCESS,
      data: addrObj,
    });
  } catch (error) {
    return catchErrors(error, res);
  }
};

const deleteAddress = async (req, res) => {
  try {
    let { id } = req.headers['theUser'];

    const addrObj = await Address.findOne({ user_Obj: id });

    if (!addrObj) {
      throw new Error('No address found to delete');
    }

    const isDeleted = await Address.deleteOne({ user_Obj: id });

    if (isDeleted) {
      return res.status(202).json({
        status: APP_CONSTANTS.OPERATION_SUCCESS,
        msg: 'Address Deleted',
      });
    }
  } catch (error) {
    return catchErrors(error, res);
  }
};

export default {
  createAddress,
  getAddress,
  deleteAddress,
};
