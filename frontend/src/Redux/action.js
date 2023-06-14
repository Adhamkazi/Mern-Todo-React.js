import { ADD_TODO,DELETE_TODO,EDIT_TODO,CLEAR_ALL_TODO,COMPLETED_TODO, TOGGLE_TODO_STATUS } from "./ActionType";



export const addTodo  = (todo)=>{
return {
    type:ADD_TODO,
    payload:{
        title:todo.title,
        description:todo.description
    },
};
};


export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: id,
  };
};

export const editTodo = (id) => {
  return {
    type: EDIT_TODO,
    payload: id,
  };
};

// export const updateTodo = (todo) => {
//   return {
//     type: UPDATE_TODO,
//     payload: todo,
//   };
// };

export const clearAllTodo = () => {
  return {
    type:CLEAR_ALL_TODO,
  };
};

export const completeTodo = (id) => {
  return {
    type: COMPLETED_TODO,
    payload: id,
  };
};

export const toggleTodoStatus = (id) => {
    return {
      type: TOGGLE_TODO_STATUS,
      payload: id,
    };
  };



  