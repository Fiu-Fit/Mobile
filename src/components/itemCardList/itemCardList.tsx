import { FlatList } from 'react-native';
import ItemCard from '../itemCard';
import { observer } from 'mobx-react';
import { CardInfo } from '../../utils/custom-types';

interface ItemListProps<T extends CardInfo> {
  items: T[];
  onPress: (item: T) => void;
}
const ItemCardList = <T extends CardInfo>({
  items,
  onPress,
}: ItemListProps<T>) => {
  return (
    <>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ItemCard item={item} onPress={() => onPress(item)} />
        )}
      />
    </>
  );
};

export default observer(ItemCardList);
