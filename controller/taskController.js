import Tasks from '../schema/TaskSchema.js';
import Users from '../schema/UserSchema.js';
import catchErrors from '../util/errorUtil.js';
import { APP_CONSTANTS } from '../util/constants.js';

const createTask = async (req, res) => {
  try {
    let { title, description, status } = req.body;

    let { id } = req.headers['theUser'];

    let user = await Users.findById(id);

    if (!user) {
      throw new Error('User Not Found');
    }

    const newTask = new Tasks({
      title,
      description,
      status,
      user_Obj: user._id,
    });

    let task = await newTask.save();

    if (!task) {
      throw new Error('Task Creation Failed');
    }

    res.status(201).json({
      status: APP_CONSTANTS.OPERATION_SUCCESS,
      data: task,
    });
  } catch (error) {
    return catchErrors(error, res);
  }
};

const getTask = async (req, res) => {
  let { id } = req.headers['theUser'];

  let user = await Users.findById(id);

  if (!user) {
    throw new Error('User not found');
  }

  try {
    let tasks = await Tasks.find({ user_Obj: user._id });

    if (!tasks) {
      throw new Error('Task not found.');
    }

    res.status(200).json({
      status: APP_CONSTANTS.OPERATION_SUCCESS,
      data: tasks,
    });
  } catch (error) {
    return catchErrors(error, res);
  }
};

const updateTask = async (req, res) => {
  try {
    //check if user exists
    let { id } = req.headers['theUser'];

    let user = await Users.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    //read the taskId from params
    let { taskId } = req.params;

    //check if the task exists
    let task = await Tasks.findById(taskId);

    if (!task) {
      throw new Error('Task Not Found');
    }

    //create new task with data from req body
    let { title, description, status } = req.body;

    let updatedData = {
      title,
      description,
      status,
      user_Obj: user._id,
    };

    //find by id and update
    let updatedTask = await Tasks.findByIdAndUpdate(taskId, updatedData, {
      new: true,
    });

    if (!updatedTask) {
      throw new Error('Task Update Failed');
    }

    return res.status(200).json({
      status: APP_CONSTANTS.OPERATION_SUCCESS,
      data: updatedTask,
    });
  } catch (error) {
    return catchErrors(error, res);
  }
};

const deleteTask = async (req, res) => {
  try {
    let { id } = req.headers['theUser'];

    const user = await Users.findById(id);

    if (!user) {
      throw new Error('No user found');
    }

    let { taskId } = req.params;

    const isDeleted = await Tasks.findByIdAndDelete(taskId);

    if (isDeleted) {
      return res.status(202).json({
        status: APP_CONSTANTS.OPERATION_SUCCESS,
        msg: 'Task Deleted',
      });
    }
  } catch (error) {
    return catchErrors(error, res);
  }
};

const getAllTasksAdmin = async (req, res) => {
  //check if user exits
  try {
    let { id } = req.headers['theUser'];

    let user = await Users.findById(id);

    if (!user || !user.isAdmin) {
      throw new Error('Not an Admin');
    }
    //if user exits, check if its an admin
    if (user.isAdmin) {
      let allTasks = await Tasks.find().populate({
        path: 'user_Obj',
        strictPopulate: false,
      });

      return res.status(200).json({
        status: APP_CONSTANTS.OPERATION_SUCCESS,
        data: allTasks,
      });
    }
    //get all tasks and return
  } catch (error) {
    return catchErrors(error, res);
  }
};

export default {
  createTask,
  getTask,
  deleteTask,
  updateTask,
  getAllTasksAdmin,
};
