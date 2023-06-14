import * as actionTypes from "./ActionType";

const initialState = {
  todos: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case actionTypes.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
      case actionTypes.EDIT_TODO:
        const updatedTodo = state.todos.map((todo) => {
          if (todo.id === action.payload.todoId) {
            return {
              ...todo,
              text: action.payload.newText,
            };
          }
          return todo;
        });
  
        return {
          ...state,
          todos: updatedTodo,
        };
    case actionTypes.CLEAR_ALL_TODO:
      return {
        ...state,
        todos: [],
      };
    case actionTypes.COMPLETED_TODO:
      // Implement your logic for marking a todo as completed
      return state;
      case actionTypes.TOGGLE_TODO_STATUS:
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });

      return {
        ...state,
        todos: updatedTodos,
      };
    default:
      return state;
  }
};

export default reducer;
