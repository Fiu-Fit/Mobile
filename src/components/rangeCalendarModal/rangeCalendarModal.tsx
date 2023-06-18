import { SafeAreaView } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { useAppTheme } from '../../App';
import DateRangePicker from 'react-native-daterange-picker';
import moment from 'moment';
import { progressStore } from '../../stores/progress.store';
import { observer } from 'mobx-react';

type RangeCalendarModalProps = {
  onDismiss: () => void;
};

const RangeCalendarModal = ({ onDismiss }: RangeCalendarModalProps) => {
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
              progressStore.startDate =
                'startDate' in newDates
                  ? new Date(newDates.startDate)
                  : progressStore.startDate;

              progressStore.endDate =
                'endDate' in newDates
                  ? new Date(newDates.endDate)
                  : progressStore.endDate;

              progressStore.displayedDate =
                'displayedDate' in newDates
                  ? moment(newDates.displayedDate)
                  : progressStore.displayedDate;
            }}
            endDate={progressStore.endDate}
            startDate={progressStore.startDate}
            displayedDate={progressStore.displayedDate}
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

export default observer(RangeCalendarModal);
