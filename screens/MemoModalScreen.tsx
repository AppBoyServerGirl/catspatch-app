import {StatusBar} from 'expo-status-bar';
import {Platform, StyleSheet} from 'react-native';
import {useState} from "react";

import {Box, HStack, Input, Pressable, View, Text, Center} from "native-base";
import Emotion from "../components/Emotion";


export default function MemoModalScreen({navigation, route}) {
  const {date} = route.params;
  const [selectedEmotion, setSelectedEmotion] = useState(route.params?.emotion || 0);
  const [memo, setMemo] = useState(route.params?.memo || '');
  const onPressSave = () => {
    navigation.goBack();
  }

  return (
    <Center flex={1}>
      <Text bold>
        {date}
      </Text>

      <HStack
        mt={'12px'}
        w={'100%'} py={'12px'} px={'16px'}
        alignItems={'center'} justifyContent={'space-around'}
      >
        {[5, 4, 3, 2, 1].map(emotion => (
          <Pressable onPress={() => setSelectedEmotion(emotion)}>
            <Box opacity={selectedEmotion === emotion ? 1 : 0.5}>
              <Emotion emotion={emotion}/>
            </Box>
          </Pressable>
        ))}
      </HStack>

      <Box mt={'24px'} mb={'48px'} w={'100%'} px={'16px'}>
      <Input
        placeholder="메모를 입력하세요"
        value={memo}
        onChangeText={text => setMemo(text)}
        height={'100px'}
        multiline={true}
      />
      </Box>

      <Box w={'100%'} px={'16px'}>
        <Pressable
          onPress={onPressSave}
          w={'100%'}
          bg={'pink.200'}
          p={'16px'}
          borderRadius={'24px'}
        >
          <Center>
            <Text color={'white'} bold fontSize={'16px'}>저장</Text>
          </Center>
        </Pressable>
      </Box>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
    </Center>
  );
}

