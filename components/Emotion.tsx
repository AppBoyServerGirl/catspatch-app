import {Circle, Text} from "native-base";
import React, {useMemo} from "react";
import {Image} from "react-native";

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

const Emotion = ({emotion, size=40}: { emotion: number, size?: number }) => {
  const index = useMemo(() => emotion || 0, [emotion]);
  const image = useMemo(() => EMOTIONS[index].image, [index]);
  // const image = require('public/emotion_5.png')

  return (
    <Circle
      opacity={index === 0 ? 0.3 : 1}
      size={`${size}px`} overflow={'hidden'} alignSelf={'center'}
                  mt={'4px'} bg={EMOTIONS[index].color}
    >
      <Image
        source={image}
        style={{width: '80%', height: '80%'}}
        // alt={'emotion'}
        // w={'80%'} h={'80%'}
      />
  </Circle>
  )
}

export default Emotion;