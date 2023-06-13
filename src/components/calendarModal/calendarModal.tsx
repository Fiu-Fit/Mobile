import { SafeAreaView, StyleSheet } from 'react-native';
import { Modal, Portal, Text } from 'react-native-paper';
import { useAppTheme } from '../../App';
import COLORS from '../../constants/colors';
import DateRangePicker from 'react-native-daterange-picker';
import moment from 'moment';

type CalendarModalProps = {
  onDismiss: () => void;
  setDates: (dates: any) => void;
  dates: any;
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
          className='flex-1 justify-center'
          style={{ borderRadius: 20 }}>
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
            range>
            <Text>Click me</Text>
          </DateRangePicker>
        </SafeAreaView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 50,
  },
  selectedDateContainerStyle: {
    height: 35,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.blue,
  },
  selectedDateStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CalendarModal;
