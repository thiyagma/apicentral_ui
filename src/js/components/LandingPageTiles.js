import React, {Component, PropTypes} from 'react';
import Heading from 'grommet/components/Heading';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';

const CLASS_ROOT = "lp-tiles";
class LandingPageTiles extends Component {
  render() {
    const {data} = this.props;
    let tile = data.map((d, i)=> 
    {
      return (
        <Tile className={CLASS_ROOT + "_tile"} key={d.label + i} selected={false}>
          <Heading className="value"> {d.value }</Heading>
          <p className="label"> {d.label} </p>
        </Tile>
      );
    }, this);

    return (
      <Hero background={<Image src='/img/number-of-apis.jpg' full="horizontal" fit="contain"/>} backgroundColorIndex='dark' size="small">
        <Tiles fill={true} flush={true} selectable={false}>
          {tile}
        </Tiles>
      </Hero>
    );
  }
}

LandingPageTiles.propTypes = {
  data: PropTypes.array
};

LandingPageTiles.defaultProps = {
  data: [{label: "PUBLIC APIS", value: 6000}, {label: "PRIVATE APIS", value: 1200}, {label: "DEVELOPERS", value: 180}]
}
export default LandingPageTiles;
