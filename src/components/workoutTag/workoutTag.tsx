import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

interface WorkoutTagProps {
  title: string;
  backgroundColor?: string;
  onPress?: () => void;
}

const WorkoutTag = ({title, onPress = () => {}}: WorkoutTagProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="bg-primary-color h-12 w-full justify-center items-center mt-10 mb-5 rounded-md">
      <Text className="text-white text-lg text-bold">{title}</Text>
    </TouchableOpacity>
  );
};

export default WorkoutTag;
