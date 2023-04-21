import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

interface AddButtonProps {
  descriptive?: boolean;
  onPress?: () => void;
}

const AddButton = ({
  descriptive = false,
  onPress = () => {},
}: AddButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="bg-red-700 h-12 w-full justify-center items-center mt-10 mb-5 rounded-md">
      <Text className="text-white text-lg text-bold">
        {descriptive ? 'Add' : '+'}
      </Text>
    </TouchableOpacity>
  );
};

export default AddButton;
