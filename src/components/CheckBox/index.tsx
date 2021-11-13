import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {StyledCheckBox, StyledCheckBoxWrapper} from './style';

interface IProps {
  isChecked: boolean;
  onPress: () => void;
}

const CheackBox: FC<IProps> = ({isChecked, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <StyledCheckBoxWrapper>
        <StyledCheckBox isChecked={isChecked} />
      </StyledCheckBoxWrapper>
    </TouchableOpacity>
  );
};

export default CheackBox;
