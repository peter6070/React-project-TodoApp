import React from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";
import { useTodoDispatch } from "../TodoContext";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* flex 컨테이너 내부의 flex 아이템을 수평 방향으로 정렬하는 방법을 지정 */
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  opacity: 0;
  &:hover {
    color: #ff6b6b;
  }
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      opacity: 1;
    }
  }
`;
// TodoItemBlock 위에 커서가 있을 때, Remove 컴포넌트를 보여주라는 의미
// &:hover{} >> div::hover{} 과 같은 의미

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;
//props.done이 true인 경우 해당 요소에 테두리와 텍스트 색상이 #38d9a9로 적용
// props: 컴포넌트로 전달되는 속성(props) 객체
// props.done: 해당 속성 객체에서 done이라는 속성을 참조하는 것을 의미
// 따라서, 해당 컴포넌트에서 done 속성이 true로 전달되면 스타일이 적용
// &&(조건부 렌더링): 리액트에서 사용되는 간단한 if문 표현
// a && b 일때 a가 true면 b를 호출하고 a가 false면 아무것도 실행되지 않음

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

function TodoItem({ id, done, text }) {
  const dispatch = useTodoDispatch();
  const onToggle = () => dispatch({ type: "TOGGLE", id });
  const onRemove = () => dispatch({ type: "REMOVE", id });
  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);
//React.memo(): 다른 항목이 업데이트 될 때, 불필요한 리렌더링을 방지하게 되어 성능을 최적화
