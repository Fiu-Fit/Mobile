import {
  StyleSheet,
  View,
  ActivityIndicator,
  Switch,
  Text,
} from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import { useAppTheme, useUserContext } from '../../App';
import { observer } from 'mobx-react';
import { searchStore } from '../../stores/userSearch.store';
import ItemCardList from '../../components/itemCardList';
import { useState } from 'react';
import { UserSearchScreenNavigationProp } from '../../navigation/navigation-props';

const ProfileSearchScreen = ({
  navigation,
}: {
  navigation: UserSearchScreenNavigationProp;
}) => {
  const appTheme = useAppTheme();
  const { currentUser } = useUserContext();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
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
        <Appbar.Content title='Búsqueda de perfiles' />
      </Appbar.Header>
      <Text>Buscar por cercanía:</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor='#3e3e3e'
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      {isEnabled ? (
        <Searchbar
          placeholder='Distancia'
          onChangeText={handleSearchByDistance}
          value={searchStore.distance ? `${searchStore.distance}` : ''}
          style={styles.searchBar}
          keyboardType='numeric'
          inputMode='numeric'
        />
      ) : (
        <Searchbar
          placeholder='Nombre'
          onChangeText={handleSearchByName}
          value={searchStore.query}
          style={styles.searchBar}
        />
      )}
      {searchStore.isLoading ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : (
        <ItemCardList
          items={searchStore.cardsInfo ?? []}
          keyPrefix='profileSearch-user'
          onPress={item => {
            navigation.push('UserProfileScreen', {
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
