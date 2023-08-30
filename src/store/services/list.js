import {data} from "../reducers/register";
const basePath = "https://backend/backend";//here you may use backend url

export const signupregister = (addTask,deleteTask,editTask,clearTasks) => async (dispatch) => {
  try {

    // console.log("email,name,password,obj,arr", email, name, password,obj,arr)
    dispatch(data({editingTaskId:{addTask,deleteTask,editTask,clearTasks}}));
      // console.log("password")
    return {
      success: 'success',
    };
  } catch (err) {
    return {
      error: err,
    };
  }
};

