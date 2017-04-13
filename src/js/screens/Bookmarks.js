import React from 'react';
import MyBook from '../components/MyBookmarks';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

  const MyBookmarks = () => {
    return (
      <Box full={true} pad="medium">
        <Heading tag="h3" strong={true}> My BookMarks's </Heading>
        <MyBook/>
      </Box>
    );
  };

export default MyBookmarks;
//<MyBook/> title="My BookMarks's" type="MyBook"/>*/