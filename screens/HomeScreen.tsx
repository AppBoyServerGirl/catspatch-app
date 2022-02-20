import React from 'react';
import {StyleSheet} from 'react-native';

import {Box, Text, View} from 'native-base';
import {RootTabScreenProps} from '../types';
// import CalendarPicker from 'react-native-calendar-picker';
import CalendarPicker from '../components/CalendarPicker';
import moment from "moment";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {SimpleLineIcons} from "@expo/vector-icons";

export default function HomeScreen({navigation}: RootTabScreenProps<'Home'>) {
  const [selectedDate, setSelectedDate] = React.useState(moment());
  const {top} = useSafeAreaInsets();

  let today = moment();
  let day = today.clone().startOf('month');
  let customDatesStyles = [];
  while (day.isSame(today, 'month')) {
    console.log(day.clone().date(), day.clone().date() % 5)
    customDatesStyles.push({
      date: day.clone(),
      // Random colors
      // style: {backgroundColor: '#' + ('#00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6) + '50'},
      textStyle: {color: 'black'}, // sets the font color
      // containerStyle: [{marginVertical: 16,}], // extra styling for day container
      allowDisabled: true, // allow custom style to apply to disabled dates
      // imageSource: require('../assets/images/emotions/emotion_1.jpg'),
      emotion: day.date() % 5,
    });

    day.add(1, 'day')
  }

  return (
    <View pt={`${top}px`} flex={1}>
      <CalendarPicker
        startFromMonday={true}
        onDateChange={setSelectedDate}
        nextComponent={<SimpleLineIcons name="arrow-right" size={20} color="black"/>}
        previousComponent={<SimpleLineIcons name="arrow-left" size={20} color="black"/>}
        months={['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']}
        weekdays={['월', '화', '수', '목', '금', '토', '일']}
        dayLabelsWrapper={{
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#e3e3e3',
          backgroundColor: '#fff',
          padding: 10,
          margin: 10,
        }}
        textStyle={{
          color: '#000',
          // fontSize: 18,
          // fontWeight: 'bold',
        }}
        // selectedDayStyle={{
        //   width: 50,
        //   height: 50,
        // }}
        selectedDayColor={'transparent'}
        selectedDayTextStyle={{
          fontWeight: 'bold',
        }}
        dayWrapper={{
          height: 100,
        }}

        todayBackgroundColor={'transparent'}

        customDatesStyles={customDatesStyles}

        // showDayStragglers={true}
        // maxDate={new Date()}
      />
      <Box p={'16px'}>
        <Text>
          {selectedDate.format('YYYY-MM-DD')}
        </Text>

        <Text>
          {selectedDate.format('YYYY-MM-DD')}의 내용
        </Text>
      </Box>
    </View>
  );
}

