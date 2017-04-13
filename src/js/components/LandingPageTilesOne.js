import React, {Component} from 'react';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Columns from 'grommet/components/Columns';
import Anchor from 'grommet/components/Anchor';

const CLASS_ROOT = "lp-tilesone";
class LandingPageBoxsOne extends Component {
  render() {
    return (

<Box  align="center" direction="row" full="horizontal">

  <Box className={CLASS_ROOT + "_box left-box-bg"} size="full">

     <Box align='center' className="h-bg-l">
      <Image src='/img/icon_publisher_features.png' size='small'/>
       <Heading tag="h4" className="p-t-12">PUBLISHER FEATURES</Heading>
     </Box>
      <ul> 
          <li>Easy publication of APIs including HPE specific meta-information.</li>
          <li>API life cycle management including versioning.</li>
          <li>Seamless integration with GCS Oauth 2.0 Token Service when publishing APIs.</li>
          <li>API Metrics for publishers showing all consumption.</li>
      </ul>
     </Box>

    <Box className={CLASS_ROOT + "_box right-box-bg"} size="full">
          <Box align='center' className="h-bg-2">
            <Image src='/img/icon_consumer_features.png' size='small'/>
            <Heading tag="h4" className="p-t-12">Consumer Features</Heading>
          </Box>
          <ul> 
              <li>Rich API documentation including interactive trying of API methods.</li>
              <li>Self service client application registration to consume APIs. Zero Interlock!!</li>
              <li>Seamless integration with Cyber Security Oauth 2.0 Token Service.</li>
              <li>Consumer’s view of his API Metrics.</li>
          </ul>
    </Box>

</Box>
    );
  }
}

export default LandingPageBoxsOne;
