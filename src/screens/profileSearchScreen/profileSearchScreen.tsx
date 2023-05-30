import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { Appbar, Searchbar, Text } from 'react-native-paper';
import { useAppTheme } from '../../App';
import { observer } from 'mobx-react';
import { searchStore } from '../../stores/userSearch.store';
import UserCard from '../../components/userCard';
import ItemCardList from '../../components/itemCardList';
import LoggerFactory from '../../utils/logger-utility';
import { useFocusEffect } from '@react-navigation/native';

const logger = LoggerFactory('profile-search-screen');
const ProfileSearchScreen = () => {
  const appTheme = useAppTheme();

  useFocusEffect(() => {
    // searchStore.search();
  });

  const handleSearch = (query: string) => {
    searchStore.setSearchQuery(query);
    // searchStore.search();
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: appTheme.colors.primary }}>
        <Appbar.Content title='Profile Search' />
      </Appbar.Header>
      <Searchbar
        placeholder='Search'
        onChangeText={handleSearch}
        value={searchStore.searchQuery}
        style={styles.searchBar}
      />
      {searchStore.isLoading ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : (
        // <Text>hola</Text>
        <ItemCardList
          items={searchStore.cardsInfo ?? []}
          onPress={item => logger.info('clicked on:', item.id)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    margin: 16,
  },
});

export default observer(ProfileSearchScreen);
