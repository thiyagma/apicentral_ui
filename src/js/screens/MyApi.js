import React from 'react';
import MyFavApi from '../components/MyFavApi';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
  
const MyApp = () => {
  return (
    <Box full={true} pad="medium">
      <Heading tag="h3" strong={true}> My Api's </Heading>
      <MyFavApi/>
    </Box>
    
  );
};

export default MyApp;
