import React from 'react';
import MyTeams from '../components/MyTeams';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

const MyTeamScreen = () => {
  return (
    <Box full={true} pad="medium">
      <Heading tag="h3" strong={true}> My Teams </Heading>
      <MyTeams/>
    </Box>
      
  );
}

export default MyTeamScreen;

