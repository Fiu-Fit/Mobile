import { Share, View, Button, Alert, ShareContent } from 'react-native';
import LoggerFactory from '../../utils/logger-utility';

const logger = LoggerFactory('social-share');

const SocialShare = ({ content }: { content: ShareContent }) => {
  const onShare = async () => {
    try {
      const result = await Share.share(content);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          logger.info(`Shared with ${result.activityType}: `, result);
        } else {
          // shared
          logger.info('Shared with result: ', result);
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        logger.info('Shared dismissed: ', result);
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  return (
    <View style={{ marginTop: 50 }}>
      <Button onPress={onShare} title='Share' />
    </View>
  );
};

export default SocialShare;
