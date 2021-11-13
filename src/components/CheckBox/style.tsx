import styled from 'styled-components';

export const StyledCheckBoxWrapper = styled.View`
  margin: 0 8px;
  width: 24px;
  height: 24px;
  border-radius: 50px;
  /* background-color: #bbb; */
  border-width: 2px;
  border-color: #aaa;
  justify-content: center;
  align-items: center;
`;

export const StyledCheckBox = styled.View`
  /* margin: 0 8px; */
  width: 18px;
  height: 18px;
  border-radius: 50px;
  background-color: ${props => (props?.isChecked ? '#aaa' : '#fff')};
`;
