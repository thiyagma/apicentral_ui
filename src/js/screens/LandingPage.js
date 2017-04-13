import React, { Component, PropTypes } from 'react';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Header from 'grommet/components/Header';
import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
import Video from 'grommet/components/Video';

import ApiPanel from '../components/ApiPanel';
import LandingPageTiles from '../components/LandingPageTiles';
import LandingPageTilesOne from '../components/LandingPageTilesOne';


const CLASS_ROOT ="landing-page";
class LandingPage extends Component {
  constructor(props) {
    super(props);
    this._onExporeApi = ()=> {};
    this._onAddApi = ()=> {};
  }

  render() {
    return (
      <Article className={CLASS_ROOT} pad="none">
        <Hero background={<Image src='/img/hero-background-1.jpg' fit='cover' full={true} />} backgroundColorIndex='dark'>
          <Section className={CLASS_ROOT + "_row1"}> 
            <Headline>
              HPE API CENTRAL
            </Headline>
            <p>API Publication & Consumption made easy.</p>
            <Box direction="row"> 
              <Button onClick={this._onExporeApi}>
                <Box pad='small' colorIndex='brand' align='center'>Explore APIS</Box>
              </Button>
            </Box>
          </Section>
        </Hero>
        <Box className={CLASS_ROOT + "_row2"} align="center" colorIndex='light-2' > 
          <HeadLineBar summary="API Portal for API publishers and consumer to interact without any interlock">How it works</HeadLineBar>
          <LandingPageTilesOne />
        </Box>
        <Box className={CLASS_ROOT + "_row3"} align="center" pad={{vertical: "small"}} > 
          <HeadLineBar>
            HOW TO GET STARTED
          </HeadLineBar>
          <Box className={CLASS_ROOT + "_row4"} direction="row" align="center" justify="center" pad="medium" full="horizontal">
            <Box className="col1"> 
                <ol> 
                  <li> 
                    <Headline size="small">SIGN UP</Headline>
                    <p>you can Sign up by clicking on the top right coner on "Sign Up" button or you can just click on or button that says " Try it for free".</p>
                  </li>
                  <li> 
                    <Headline size="small">DOWNLOAD OUR SOFTWARE</Headline>
                    <p>After registration you will be automatically downloaded our system in which you will have to log with all of your information.</p>
                  </li>
                  <li> 
                    <Headline size="small">CONNETION</Headline>
                    <p>Now you can connect your bank account debit card or any other account for which you want to keep track of you are done!</p>
                  </li>
                </ol>
            </Box>
            <Box className="col2" pad="medium" align="center"> 
              <Video> 
                <source src='/video/test.mp4' type='video/mp4' />
              </Video>
            </Box>
          </Box>
        </Box>
        <LandingPageTiles />
      </Article>
    );
  }
}

LandingPage.propTypes = {

};

export default LandingPage;


const SecondHeadLineBar = (props) => (
  <Heading className="grommetux-color-index-light-2" align='center' tag={props.tag || 'h5'} strong={props.strong || false}>
    {props.children}
  </Heading>
);

const HeadLineBar = (props) =>
  <Box pad={{vertical: "medium"}}> 
  <Heading className="grommetux-color-index-neutral-1-t" align='center' tag={props.tag || 'h3'} strong={props.strong || true}>
    {props.children}
  </Heading>
  <Heading className="grommetux-color-index-light-2" align='center' tag='h5' strong={false}>
    {props.summary}
  </Heading>
  </Box>
  ;
