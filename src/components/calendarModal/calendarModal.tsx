import { SafeAreaView } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { useAppTheme } from '../../App';
import DateRangePicker from 'react-native-daterange-picker';
import moment from 'moment';
import { DateState } from '../../utils/custom-types';

type CalendarModalProps = {
  onDismiss: () => void;
  setDate: (dates: DateState) => void;
  date: DateState;
};

const CalendarModal = ({ onDismiss, setDate, date }: CalendarModalProps) => {
  const appTheme = useAppTheme();

  const containerStyle = {
    backgroundColor: appTheme.colors.surface,
    marginHorizontal: '5%',
    width: '90%',
    height: '60%',
    borderRadius: 20,
  };

  return (
    <Portal>
      <Modal
        visible={true}
        onDismiss={onDismiss}
        contentContainerStyle={containerStyle}>
        <SafeAreaView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <DateRangePicker
            onChange={(newDate: any) => {
              setDate({
                selectedDate:
                  'date' in newDate
                    ? new Date(newDate.date)
                    : date?.selectedDate,
                displayedDate:
                  'displayedDate' in newDate
                    ? moment(newDate.displayedDate)
                    : date?.displayedDate,
              });
            }}
            displayedDate={date?.displayedDate}
            date={date?.selectedDate}
            open={true}
            containerStyle={{
              backgroundColor: appTheme.colors.surface,
            }}
            headerStyle={{ backgroundColor: 'yellow' }}
            headerTextStyle={{ color: 'white' }}
            dayTextStyle={{ color: 'white' }}
            backdropStyle={{
              height: 'auto',
              width: 'auto',
              backgroundColor: appTheme.colors.surface,
            }}
          />
        </SafeAreaView>
      </Modal>
    </Portal>
  );
};

export default CalendarModal;
