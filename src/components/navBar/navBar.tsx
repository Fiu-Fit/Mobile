import React from 'react';
import {Appbar, TextInput} from 'react-native-paper';

const NavBar = () => {
  const [filterText, setFilterText] = React.useState('');
  const onChangeSearch = userInput => setFilterText(userInput);
  return (
    <Appbar.Header>
      <Appbar.Content title="filter" />
      <TextInput
        placeholder="Search"
        value={filterText}
        onChangeText={onChangeSearch}
        style={{flex: 2, marginLeft: 16, marginRight: 16}}
      />
    </Appbar.Header>
  );
};

export default NavBar;
