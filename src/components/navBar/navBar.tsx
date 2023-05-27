import React from 'react';
import { Appbar, TextInput } from 'react-native-paper';
import SearchButton from '../searchButton';
import { useAppTheme } from '../../App';
import { View } from 'react-native';

const NavBar = () => {
  const appTheme = useAppTheme();
  const [filterText, setFilterText] = React.useState('');
  const onChangeSearch = (userInput: string): void => setFilterText(userInput);

  return (
    <View
      className='flex-row justify-center items-center'
      style={{ flex: 0.1, backgroundColor: appTheme.colors.scrim }}>
      <TextInput
        placeholder='Filtrar por tipo'
        value={filterText}
        onChangeText={onChangeSearch}
        className='my-2 mx-2 w-9/12'
      />
      <SearchButton />
    </View>
  );
};

export default NavBar;
