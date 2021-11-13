import {Dimensions} from 'react-native';
import styled from 'styled-components';

const {width, height} = Dimensions.get('screen');

export const TodoListSafeAreaView = styled.SafeAreaView`
  flex: 1;
  position: relative;
`;

export const TodoListTitleBox = styled.View`
  padding: 8px;
  align-items: center;
`;

export const TodoListTitleText = styled.Text`
  font-size: 24px;
`;

export const TodoListInputBox = styled.View`
    width;
    height: 56px;
    background-color:#eee;
    // justifyContent: 'flex',
    flex-direction: row;
    align-items: center;
`;

export const TodoListInput = styled.TextInput`
  font-size: 18px;
  text-align: center;
  padding-left: 18px;
  padding-right: 18px;
`;

export const TabsContainer = styled.View`
  flex-direction: row;
  border-bottom-color: #eee;
  /* border-bottom-width: 2px; */
  margin-bottom: 8px;
  /* align-items: center; */
  align-items: flex-end;
  height: 50px;
`;

export const TabBox = styled.View`
  padding: 12px 12px 4px 12px;
  margin-left: 8px;
  border-bottom-width: ${props => (props.isSelected ? '3px' : '0px')};
  border-bottom-color: #aaa;
`;

export const TabTitle = styled.Text`
  font-size: 18px;
  font-weight: ${props => (props.isSelected ? 'bold' : 'normal')};
  color: ${props => (props.isSelected ? 'black' : '#ccc')};
`;

export const TodoBox = styled.View`
  /* width: ${width + 'px'}; */
  background-color: white;
  flex-direction: row;
  height: 50px;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 18px;
  /* align-items: space-between; */
`;
