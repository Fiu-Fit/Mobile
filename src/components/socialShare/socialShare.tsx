import { View, Button } from 'react-native';
import Share from 'react-native-share';
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
      const customTitle = `Meta ${title} cumplida en FiuFit!`;
      const customMessage = `Terminé mi meta ${title} en FiuFit, ${message}!`;
      logger.info('Sharing content:', customMessage);
      Share.open({
        message: customMessage,
        title: customTitle,
        subject: customTitle,
        failOnCancel: false,
        showAppsToView: true,
        isNewTask: true,
      });
    } catch (err: any) {
      logger.error('Error while sharing:', { err });
    }
  };
  return (
    <View>
      <Button onPress={onShare} title='Share' />
    </View>
  );
};

export default SocialShare;
