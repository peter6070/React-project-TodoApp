import { useReducer, createContext, useContext, useRef } from "react";

const initialTodos = [
  {
    id: 1,
    text: "리액트로 사이트 제작",
    done: true,
  },
  {
    id: 2,
    text: "게임 컨텐츠 기획",
    done: false,
  },
  {
    id: 3,
    text: "리액트, 스프링 연동",
    done: false,
  },
  {
    id: 4,
    text: "유니티 깃허브 연동",
    done: true,
  },
];

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo); //concat: 기존 배열에 원소 또는 배열을 추가하여 새 배열 생성(state 배열에 action.todo를 추가)
    case "TOGGLE":
      return state.map(
        //map: 콜백함수의 리턴을 모아서 새로운 배열 생성. 요소를 일괄적으로 변경하는데 효과적임
        (todo) => (todo.id === action.id ? { ...todo, done: !todo.done } : todo)
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id); // filter: 콜백함수의 리턴을 모아서 새로운 배열 생성. 요소들을 걸러내기 위한 목적
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  return useContext(TodoStateContext);
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext);
}
export function useTodoNextId() {
  return useContext(TodoNextIdContext);
}
