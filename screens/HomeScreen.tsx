import React, {useState, useEffect, useRef} from 'react';
import * as Notifications from 'expo-notifications';
import {Box, HStack, Pressable, ScrollView, Text, View} from 'native-base';
import {RootTabScreenProps} from '../types';
// import CalendarPicker from 'react-native-calendar-picker';
import CalendarPicker from '../components/CalendarPicker';
import moment from "moment";
import {Feather, SimpleLineIcons} from "@expo/vector-icons";
import {registerForPushNotificationsAsync} from "../components/Utils";
import {Alert, SafeAreaView} from "react-native";
import axios from "axios";
import {HOST} from "../constants/Api";

export default function HomeScreen({navigation}: RootTabScreenProps<'Home'>) {
  const [selectedMonth, setSelectedMonth] = React.useState(0);
  const [selectedDate, setSelectedDate] = React.useState(moment());
  const [customDatesStyles, setCustomDatesStyles] = React.useState<{ [key: string]: any }>([]);
  const dummyDiaries = [
    {date: '2022-06-01', emotion: 5, memo: '오늘은 좋은날입니다1.'},
    {date: '2022-06-02', emotion: 4, memo: '오늘은 좋은날입니다2.'},
    {date: '2022-06-03', emotion: 3, memo: '오늘은 좋은날입니다3.'},
    {date: '2022-06-04', emotion: 2, memo: '오늘은 좋은날입니다4.'},
  ];
  const [diaries, setDiaries] = useState<{ [key: string]: any }>({});

  const convertDiariesToJson = (diaries) => {
    return diaries.map(diary => ({
      [diary.date]: {
        emotion: diary.emotion,
        memo: diary.memo,
      }
    }))
  }
  const getDates = async () => {
    // const res = await axios.get(HOST + '/api/dates');
    const diaryList = dummyDiaries;

    const jsonDiaries = convertDiariesToJson(diaryList);
    setDiaries(jsonDiaries);
    setCustomDatesStyles(diaryList)
  }

  useEffect(() => {
    getDates();
  }, [selectedMonth])

  // useEffect(() => {
  //   let today = moment();
  //   let day = today.clone().startOf('month');
  //   let _customDatesStyles = [];
  //   while (day.isSame(today, 'month')) {
  //     _customDatesStyles.push({
  //       date: day.clone(),
  //       // textStyle: {color: 'black'}, // sets the font color
  //       // containerStyle: [{marginVertical: 16,}], // extra styling for day container
  //       allowDisabled: true, // allow custom style to apply to disabled dates
  //       emotion: day.date() % 5 + 1,
  //     });
  //
  //     day.add(1, 'day')
  //   }
  //   setCustomDatesStyles(_customDatesStyles);
  //
  // }, [selectedMonth]);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('addNotificationResponseReceivedListener :', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const onPressEdit = () => {
    navigation.navigate('MemoModal', {date: selectedDate.format('YYYY-MM-DD')});
  }
  const onPressDelete = () => {
    Alert.alert(
      "삭제",
      "삭제하시겠습니까?",
      [
        {
          text: "취소",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {text: "삭제", onPress: () => console.log("OK Pressed"), style: "destructive"}
      ]
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <CalendarPicker
          // startFromMonday={true}
          onMonthChange={(month) => {
            setSelectedMonth(moment(month).month() + 1)
          }}
          onDateChange={setSelectedDate}
          nextComponent={<SimpleLineIcons name="arrow-right" size={20} color="black"/>}
          previousComponent={<SimpleLineIcons name="arrow-left" size={20} color="black"/>}
          months={['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']}
          weekdays={['일', '월', '화', '수', '목', '금', '토',]}
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
          todayTextStyle={{color: 'hotpink'}}

          customDatesStyles={customDatesStyles}

          // showDayStragglers={true}
          // maxDate={new Date()}
        />
        <Box p={'16px'}>
          <HStack justifyContent={'space-between'}>
            <Text>
              {selectedDate.format('YYYY-MM-DD')}
            </Text>

            <HStack space={'12px'}>
              <Pressable onPress={onPressEdit}>
                <Feather name="edit" size={16} color="black"/>
              </Pressable>
              <Pressable onPress={onPressDelete}>
                <Feather name="trash-2" size={16} color="black"/>
              </Pressable>
            </HStack>
          </HStack>

          <Text>
            {selectedDate.format('YYYY-MM-DD')}의 내용
            {/*{selectedDate.date()}*/}
          </Text>
        </Box>

      </ScrollView>
    </SafeAreaView>
  );
}

