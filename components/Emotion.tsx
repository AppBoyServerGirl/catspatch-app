import {Circle, Image} from "native-base";
import React from "react";

const EMOTIONS = [
  {
    image: require('../assets/images/emotions/emotion_0.png'),
    color: 'gray.100',
  },
  {
    image: require('../assets/images/emotions/emotion_1.png'),
    color: 'gray.400',
  },
  {
    image: require('../assets/images/emotions/emotion_2.png'),
    color: 'rose.400',
  },
  {
    image: require('../assets/images/emotions/emotion_3.png'),
    color: 'yellow.500',
  },
  {
    image: require('../assets/images/emotions/emotion_4.png'),
    color: 'lime.200',
  },
  {
    image: require('../assets/images/emotions/emotion_5.png'),
    color: 'green.400',
  },
];

const Emotion = ({emotion}: { emotion: number }) => {
  const index = emotion;
  return (
    <Circle
      opacity={emotion === 0 ? 0.5 : 1}
      size={'40px'} overflow={'hidden'} alignSelf={'center'}
                  mt={'4px'} bg={EMOTIONS[index]?.color}
    >
    <Image
      source={EMOTIONS[index]?.image}
      alt={'emotion'}
      w={'80%'} h={'80%'}
    />
  </Circle>
  )
}

export default Emotion;