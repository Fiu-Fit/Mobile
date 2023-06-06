import UserProfile from '../../components/userProfile';
import { observer } from 'mobx-react';

const MyProfileScreen = ({ navigation }: any) => {
  return <UserProfile navigation={navigation} myProfile />;
};

export default observer(MyProfileScreen);
