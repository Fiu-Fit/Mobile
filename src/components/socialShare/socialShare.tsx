import { Share, View, Button, Alert } from 'react-native';
import LoggerFactory from '../../utils/logger-utility';

const logger = LoggerFactory('social-share');

export type ShareTypedContent = {
  title: string;
  message: string;
  type: string;
};

const SocialShare = ({ content }: { content: ShareTypedContent }) => {
  const onShare = async () => {
    try {
      const { title, message } = content;
      const customMessage = `Terminé mi meta en FiuFit! ${title}: ${message}`;
      logger.info('Sharing content:', customMessage);
      const result = await Share.share({
        title,
        message: customMessage,
      });
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
    <View>
      <Button onPress={onShare} title='Share' />
    </View>
  );
};

export default SocialShare;
