import { FlatList } from 'react-native';
import ItemCard from '../itemCard';
import { observer } from 'mobx-react';
import {
  HomeScreenNavigationProp,
  RootStackParamList,
  WorkoutsScreenNavigationProp,
} from '../../navigation/navigation-props';
import { ICard } from '../../utils/custom-types';

interface ItemListProps {
  items: ICard[];
  navigation: WorkoutsScreenNavigationProp | HomeScreenNavigationProp;
  screen: string;
}
const ItemCardList = ({ items, navigation, screen }: ItemListProps) => {
  return (
    <>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onPress={() =>
              navigation.push(screen as keyof RootStackParamList, {
                itemId: item.id,
              })
            }
          />
        )}
      />
    </>
  );
};

export default observer(ItemCardList);
