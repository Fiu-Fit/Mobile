import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useUserContext } from '../../App';
import { User } from '../../utils/custom-types';
import { axiosClient } from '../../utils/constants';
import LoggerFactory from '../../utils/logger-utility';

const logger = LoggerFactory('chat-screen');

type ChatScreenProps = {
  route: {
    params: {
      user: User;
    };
  };
};

const ChatScreen = ({
  route: {
    params: { user },
  },
}: ChatScreenProps) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  logger.debug('User is: ', user);

  const { currentUser } = useUserContext();
  logger.info('entering chat screen');

  const getAllMessages = () => {
    const uid = user.uid;
    const chatId =
      uid > currentUser.uid
        ? currentUser.uid + '-' + uid
        : uid + '-' + currentUser.uid;

    return firestore()
      .collection('Chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(doc => {
        if (doc) {
          setMessages(
            doc.docs.map(docSanp => {
              return {
                ...(docSanp.data() as IMessage),
                createdAt: docSanp.data().createdAt?.toDate(),
              };
            }),
          );
        }
      });
  };

  useEffect(() => {
    return getAllMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSend = async (newMessages: IMessage[]) => {
    const [msg] = newMessages;

    const uid = user.uid;
    const userMsg = {
      ...msg,
      sentBy: currentUser.uid,
      sentTo: uid,
      createdAt: new Date(),
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, [msg]));
    const chatId =
      uid > currentUser.uid
        ? currentUser.uid + '-' + uid
        : uid + '-' + currentUser.uid;
    try {
      await firestore()
        .collection('Chats')
        .doc(chatId)
        .collection('messages')
        .add({ ...userMsg, createdAt: firestore.FieldValue.serverTimestamp() });

      logger.info('message sent: ', msg);
      await createMessageNotification();
    } catch (err) {
      logger.error('Error while sending chat message:', { err });
    }
  };

  const createMessageNotification = async () => {
    logger.debug('Creating message notification..');
    try {
      const notification = await axiosClient.post('/notifications/messages', {
        userId: user.id,
        senderId: currentUser.id,
        senderName: currentUser.firstName + ' ' + currentUser.lastName,
      });
      logger.info('message notification: ', notification.data);
    } catch (err) {
      logger.error('Error while creating message notification:', { err });
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={text => onSend(text)}
      user={{
        _id: currentUser.uid,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
      }}
    />
  );
};

export default ChatScreen;
