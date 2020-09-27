import React, { useState } from 'react';
import { Animated } from 'react-native';

export default function ImageLoader({ style, ...rest }) {
  const [opacity] = useState(new Animated.Value(0));

  const onLoad = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.Image
      onLoad={onLoad}
      {...rest}
      style={[
        { opacity },
        style,
      ]}
    />
  );
}
