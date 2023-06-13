import { SafeAreaView } from 'react-native';
import { Modal, Portal, Text } from 'react-native-paper';
import { useAppTheme } from '../../App';
import DateRangePicker from 'react-native-daterange-picker';
import moment from 'moment';
import { DatesState } from '../../utils/custom-types';

type CalendarModalProps = {
  onDismiss: () => void;
  setDates: (dates: DatesState) => void;
  dates: DatesState;
};

const CalendarModal = ({ onDismiss, setDates, dates }: CalendarModalProps) => {
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
            onChange={(newDates: any) => {
              setDates({
                startDate:
                  'startDate' in newDates
                    ? new Date(newDates.startDate)
                    : dates?.startDate,
                endDate:
                  'endDate' in newDates
                    ? new Date(newDates.endDate)
                    : dates?.endDate,
                displayedDate:
                  'displayedDate' in newDates
                    ? moment(newDates.displayedDate)
                    : dates?.displayedDate,
              });
            }}
            endDate={dates?.endDate}
            startDate={dates?.startDate}
            displayedDate={dates?.displayedDate}
            range
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
