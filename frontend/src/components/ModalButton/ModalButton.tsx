import styled from "styled-components";
import { ModalButtonProps } from "../../utils/GlobalInterfaces";

export const ModalButton = styled.button<ModalButtonProps>`
  margin-top: 12px;
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  padding: 12px;
  height: ${(props) => `${props.height}px`};
  color: ${(props) => props.fontcolor};
  border: ${(props) =>
    props.bodercolor ? `solid 1px ${props.bodercolor}` : "none"};
  border-radius: ${(props) => `${props.height / 2}px`};
  background-color: ${(props) => props.backgroundcolor};
  font-weight: ${(props) => props.fontweight};
  font-size: ${(props) => `${props.fontsize}px`};
  &:hover {
    cursor: ${(props) => (props.active ? "pointer" : "auto")};
    background-color: ${(props) =>
      props.active
        ? `rgba(${props.hoverbackgound.r},${props.hoverbackgound.g},${props.hoverbackgound.b},${props.hoverbackgound.a})`
        : props.backgroundcolor};
    border: ${(props) =>
      props.hoverborder && props.active
        ? `solid 1px rgba(${props.hoverborder.r},${props.hoverborder.g},${props.hoverborder.b},${props.hoverborder.a})`
        : "none"};
  }
`;
