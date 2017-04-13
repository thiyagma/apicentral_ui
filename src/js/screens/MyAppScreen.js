import React from 'react';
import MyApplication from '../components/MyApplication';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

const MyAppScreen = () => {
  return (
    <Box full={true} pad="medium">
      <Heading tag="h3" strong={true}>  My Applications </Heading>
      <MyApplication/>
    </Box>
      
  );
}

export default MyAppScreen;
