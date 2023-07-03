import { FlatList } from 'react-native';
import ItemCard from '../itemCard';
import { observer } from 'mobx-react';
import { CardInfo } from '../../utils/custom-types';

interface ItemListProps<T extends CardInfo> {
  items: T[];
  profileCard?: boolean;
  keyPrefix?: string;
  onPress: (item: T) => void;
}
const ItemCardList = <T extends CardInfo>({
  items,
  onPress,
  profileCard = false,
  keyPrefix,
}: ItemListProps<T>) => {
  return (
    <>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ItemCard
            keyPrefix={`${keyPrefix}-itemCardList`}
            key={`itemCard-${item.id}`}
            item={item}
            profileCard={profileCard}
            onPress={() => onPress(item)}
          />
        )}
      />
    </>
  );
};

export default observer(ItemCardList);
