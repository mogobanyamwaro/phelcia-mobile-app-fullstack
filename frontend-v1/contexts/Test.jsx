import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';

export default function Test() {
  return (
    <NativeBaseProvider>
      <Box>Hello Douglas </Box>
    </NativeBaseProvider>
  );
}
