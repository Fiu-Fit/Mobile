import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

interface WorkoutCardListProps {
  title: string;
  backgroundColor?: string;
  onPress?: () => void;
}

const WorkoutCardList = ({title, onPress = () => {}}: WorkoutCardListProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="bg-primary-color h-12 w-full justify-center items-center mt-10 mb-5 rounded-md">
      <Text className="text-white text-lg text-bold">{title}</Text>
    </TouchableOpacity>
  );
};

export default WorkoutCardList;
