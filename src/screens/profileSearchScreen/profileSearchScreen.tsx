import { StyleSheet, View, ActivityIndicator, Switch } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import { useAppTheme, useUserContext } from '../../App';
import { observer } from 'mobx-react';
import { searchStore } from '../../stores/userSearch.store';
import ItemCardList from '../../components/itemCardList';
import { useFocusEffect } from '@react-navigation/native';
import { UserSearchNavigationProp } from '../../navigation/navigation-props';
import { useState } from 'react';

const ProfileSearchScreen = ({
  navigation,
}: {
  navigation: UserSearchNavigationProp;
}) => {
  const appTheme = useAppTheme();

  // useFocusEffect(() => {
  //   searchStore.searchByName();
  // });

  const { currentUser } = useUserContext();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    searchStore.switchSearchCriteria(isEnabled ? 'distance' : 'name');
  };

  const handleSearchByName = (query: string) => {
    searchStore.setSearchQuery(query);
    searchStore.searchByName();
  };
  const handleSearchByDistance = (distance: string) => {
    searchStore.setDistanceSearch(Number(distance));
    searchStore.searchByDistance(currentUser.id);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: appTheme.colors.primary }}>
        <Appbar.Content title='Profile Search' />
      </Appbar.Header>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
        { isEnabled ? (<Searchbar
          placeholder='Distance'
          onChangeText={handleSearchByDistance}
          value={searchStore.query}
          style={styles.searchBar}
        />) :
      (<Searchbar
        placeholder='Name'
        onChangeText={handleSearchByName}
        value={searchStore.query}
        style={styles.searchBar}
      />)}
      {searchStore.isLoading ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : (
        <ItemCardList
          items={searchStore.cardsInfo ?? []}
          onPress={item => {
            navigation.getParent()?.navigate('SearchedProfile', {
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

