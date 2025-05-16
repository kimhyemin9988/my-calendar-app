import BigCalendarComponent from '../components/Calender/BigCalendarComponent';
import CustomDayPicker from '../components/DayPicker/CustomDayPicker';
import styles from './Page.module.scss';

const CalendarPage = () => {
    return (
        <div className={styles.mainLayout}>
            <CustomDayPicker />
            <BigCalendarComponent />
        </div>
    );
  };
  
  export default CalendarPage;
