import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import { useAppTheme } from '../../App';
import { observer } from 'mobx-react';
import { searchStore } from '../../stores/userSearch.store';
import ItemCardList from '../../components/itemCardList';
import { useFocusEffect } from '@react-navigation/native';
import { UserSearchNavigationProp } from '../../navigation/navigation-props';

// const logger = LoggerFactory('profile-search-screen');
const ProfileSearchScreen = ({
  navigation,
}: {
  navigation: UserSearchNavigationProp;
}) => {
  const appTheme = useAppTheme();

  useFocusEffect(() => {
    searchStore.search();
  });

  const handleSearch = (query: string) => {
    searchStore.setSearchQuery(query);
    searchStore.search();
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: appTheme.colors.primary }}>
        <Appbar.Content title='Profile Search' />
      </Appbar.Header>
      <Searchbar
        placeholder='Search'
        onChangeText={handleSearch}
        value={searchStore.query}
        style={styles.searchBar}
      />
      {searchStore.isLoading ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : (
        <ItemCardList
          items={searchStore.cardsInfo ?? []}
          onPress={item => {
            navigation.getParent()?.navigate('Profile', {
              givenUserId: Number(item.id),
              canEdit: false,
            });
          }}
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
