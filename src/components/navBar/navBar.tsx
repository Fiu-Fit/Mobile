import React from 'react';
import { Appbar, TextInput, Avatar, TouchableRipple } from 'react-native-paper';
import SearchButton from '../searchButton';
import { Image } from 'react-native';

const NavBar = ({ navigation }) => {
  const [filterText, setFilterText] = React.useState('');
  const onChangeSearch = (userInput: string): void => setFilterText(userInput);
  const onProfilePress = () => navigation.navigate('Profile');
  const generateImg = () => {
    return (
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
        }}
        resizeMode='cover'
      />
    );
  };
  return (
    <Appbar.Header>
      <TouchableRipple onPress={onProfilePress}>
        <Avatar.Image size={40} source={generateImg} />
      </TouchableRipple>
      <TextInput
        placeholder='Search'
        value={filterText}
        onChangeText={onChangeSearch}
        style={{ flex: 2, marginLeft: 16, marginRight: 16 }}
      />
      <SearchButton />
    </Appbar.Header>
  );
};

export default NavBar;
