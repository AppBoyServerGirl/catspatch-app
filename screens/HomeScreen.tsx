import React, {useState, useEffect, useRef, useMemo} from 'react';
import * as Notifications from 'expo-notifications';
import {Box, HStack, Input, Pressable, ScrollView, Text, useColorMode, View} from 'native-base';
import {RootTabScreenProps} from '../types';
// import CalendarPicker from 'react-native-calendar-picker';
import CalendarPicker from '../components/CalendarPicker';
import moment from "moment";
import {Feather, SimpleLineIcons} from "@expo/vector-icons";
import {registerForPushNotificationsAsync} from "../components/Utils";
import {Alert, SafeAreaView, useColorScheme} from "react-native";
import axios from "axios";
import {HOST} from "../constants/Api";
import Emotion from "../components/Emotion";
import {useThemeColor} from "../components/Themed";

export default function HomeScreen({navigation}: RootTabScreenProps<'Home'>) {
  const [selectedMonth, setSelectedMonth] = React.useState(0);
  const [selectedDate, setSelectedDate] = React.useState(moment());
  const selectedDateString = useMemo(() => selectedDate.format('YYYY-MM-DD'), [selectedDate]);
  const [customDatesStyles, setCustomDatesStyles] = React.useState<{ [key: string]: any }>([]);
  const dummyDiaries = [
    {date: '2022-06-01', emotion: 5, content: '오늘은 좋은날입니다1.'},
    {date: '2022-06-02', emotion: 4, content: '오늘은 좋은날입니다2.'},
    {date: '2022-06-03', emotion: 3, content: '오늘은 좋은날입니다3.'},
    {date: '2022-06-05', emotion: 2, content: '오늘은 좋은날입니다4.'},
  ];
  const [diaries, setDiaries] = useState<{ [key: string]: any }>({});

  const convertDiariesToJson = (diaries) => {
    const json = {};
    diaries.forEach(diary => {
      json[diary.date] = {emotion: diary.emotion, content: diary.content};
    })
    return json;
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

  const [expoPushToken, setExpoPushToken] = useState('');
  useEffect(() => {
    if(expoPushToken){
      console.log('token :', expoPushToken)
    }
  }, [expoPushToken])

  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {

      setExpoPushToken(token);
    });

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
    if (moment(selectedDateString).isSameOrBefore(moment())) {
      navigation.navigate('MemoModal', {
        date: selectedDateString,
        emotion: diaries[selectedDateString]?.emotion,
        content: diaries[selectedDateString]?.content,
      });
    }
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
        {
          text: "삭제",
          onPress: () => console.log("OK Pressed"),
          style: "destructive"
        }
      ]
    );
  }

  const colorScheme = useColorScheme();
  const themeTextColor = useMemo(() => colorScheme === 'light' ? 'black' : 'white', [colorScheme]);
  const themeTextStyle = useMemo(() => ({color: themeTextColor}), [themeTextColor])

  return (
    <SafeAreaView style={{flex: 1}}>
      {!!expoPushToken && <Input value={expoPushToken || ''}/>}
      <ScrollView>
        <CalendarPicker
          // startFromMonday={true}

          onMonthChange={(month) => {
            setSelectedMonth(moment(month).month() + 1)
          }}
          onDateChange={setSelectedDate}
          nextComponent={<SimpleLineIcons name="arrow-right" size={20} color={themeTextColor}/>}
          previousComponent={<SimpleLineIcons name="arrow-left" size={20} color={themeTextColor}/>}
          months={['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']}
          weekdays={['일', '월', '화', '수', '목', '금', '토',]}
          dayLabelsWrapper={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#e3e3e3',
            backgroundColor: 'transparent',
            padding: 10,
            margin: 10,
          }}
          textStyle={themeTextStyle}

          selectedDayColor={'transparent'}
          selectedDayTextStyle={{
            ...themeTextStyle,
            fontWeight: 'bold',
          }}
          dayWrapper={{
            height: 100,
          }}

          todayBackgroundColor={'transparent'}
          todayTextStyle={{color: 'hotpink', fontWeight: 'bold',}}

          customDatesStyles={customDatesStyles}

          // showDayStragglers={true}
          // maxDate={new Date()}
        />
        <Box p={'16px'}>
          <HStack justifyContent={'space-between'}>
            <Text>
              {selectedDate.format('YYYY-MM-DD')}
            </Text>

            <HStack space={'18px'}>
              <Pressable onPress={onPressEdit}>
                <Feather name="edit" size={20} color={themeTextColor}/>
              </Pressable>
              <Pressable onPress={onPressDelete}>
                <Feather name="trash-2" size={20} color={themeTextColor}/>
              </Pressable>
            </HStack>
          </HStack>

          <HStack space={'12px'} mt={'12px'}>
            <Emotion emotion={diaries[selectedDateString]?.emotion} size={60}/>
            <Text>
              {diaries[selectedDateString]?.content}
            </Text>
          </HStack>
        </Box>


      </ScrollView>
    </SafeAreaView>
  );
}

