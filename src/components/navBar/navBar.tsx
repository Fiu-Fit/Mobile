import React from 'react';
import { Appbar, TextInput } from 'react-native-paper';
import AddButton from '../addButton';

const NavBar = () => {
  const [filterText, setFilterText] = React.useState('');
  const onChangeSearch = (userInput: string): void => setFilterText(userInput);
  return (
    <Appbar.Header>
      <AddButton />
      <TextInput
        placeholder='Search'
        value={filterText}
        onChangeText={onChangeSearch}
        style={{ flex: 2, marginLeft: 16, marginRight: 16 }}
      />
    </Appbar.Header>
  );
};

export default NavBar;
