// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, {Component, PropTypes} from 'react';
// import {Image} from '../grommet';
const CLASS_ROOT = 'logo-icon';
class Logo extends Component {
  render() {
    const {busy, className} = this.props; //colorIndex, size
    let classes = [CLASS_ROOT];
    if (busy) {
      classes.push(`${CLASS_ROOT}--busy`);
    }

    if (className) {
      classes.push(className);
    }

    // return (
    //   <Image className={CLASS_ROOT} size="small" src="/img/api-consumer-white.png" />
    // );
    let textcolor = this.props.TextColor == "black" ? "#333" : "#fff";
    
    return (
      
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="110px" height="60px" viewBox="0 0 375.857 216.667" enableBackground="new 0 0 375.857 216.667" xmlSpace="preserve">
      <image overflow="visible" width="160" height="175" id="Layer_6_xA0_Image_2_" xlinkHref="data:image/png;base64,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
      wAA2uSyM2qEwLAAAAABJRU5ErkJggg==" transform="matrix(0.8887 0 0 0.8887 26.0801 35.2632)" />

    <text transform="matrix(1.0629 0 0 1 191.1104 125.7544)">
      <tspan x="0" y="0" fill={textcolor} fontFamily="'Metric'" fontSize="109.9346" letterSpacing="2.822">A</tspan>
      <tspan x="68.606" y="0" fill={textcolor} fontFamily="'Metric'" fontSize="109.9346" letterSpacing="2.822">P</tspan>
      <tspan x="130.627" y="0" fill={textcolor} fontFamily="'Metric'" fontSize="109.9346" letterSpacing="1.882">I</tspan>
      <tspan x="0" y="44.604" fill={textcolor} fontFamily="'Metric'" fontSize="37.1708">C</tspan>
      <tspan x="20.686" y="44.604" fill={textcolor} fontFamily="'Metric'" fontSize="37.1708" letterSpacing="0.941">A</tspan>
      <tspan x="44.196" y="44.604" fill={textcolor} fontFamily="'Metric'" fontSize="37.1708">T</tspan>
      <tspan x="65.823" y="44.604" fill={textcolor} fontFamily="'Metric'" fontSize="37.1708" letterSpacing="0.941">A</tspan>
      <tspan x="89.332" y="44.604" fill={textcolor} fontFamily="'Metric'" fontSize="37.1708" letterSpacing="0.941">L</tspan>
      <tspan x="109.078" y="44.604" fill={textcolor} fontFamily="'Metric'" fontSize="37.1708" letterSpacing="0.941">O</tspan>
      <tspan x="133.528" y="44.604" fill={textcolor} fontFamily="'Metric'" fontSize="37.1708">G</tspan></text>
      <image overflow="visible" width="175" height="192" id="Shape_1_copy_14_xA0_Image_2_" xlinkHref="data:image/png;base64,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
      SvVsAAAAAElFTkSuQmCC" transform="matrix(0.8887 0 0 0.8887 19.8608 28.1543)" />
    <g id="Shape_4_1_">
      <g>
        <path fill="#4EC2BF" d="M133.982,87.318l-23.945-15.75c-1.1-0.725-3.555-0.976-5.479-0.561l-41.805,9.021
          c-1.924,0.416-2.589,1.34-1.486,2.064l23.942,15.75c1.103,0.725,3.555,0.976,5.478,0.561l41.805-9.021
          C134.416,88.968,135.085,88.044,133.982,87.318z"/>
      </g>
    </g>
    <g id="Shape_4_copy_1_">
      <g>
        <path fill="#08AA83" d="M133.982,116.083l-23.945-15.749c-1.1-0.725-3.555-0.977-5.479-0.561l-41.805,9.021
          c-1.924,0.416-2.589,1.339-1.486,2.064l23.942,15.751c1.103,0.724,3.555,0.974,5.478,0.561l41.805-9.021
          C134.416,117.732,135.085,116.81,133.982,116.083z"/>
      </g>
    </g>
    <g id="Shape_4_copy_2_1_">
      <g>
        <path fill="#F68C6F" d="M133.982,144.848l-23.945-15.751c-1.1-0.724-3.555-0.977-5.479-0.561l-41.805,9.022
          c-1.924,0.415-2.589,1.338-1.486,2.064l23.942,15.748c1.103,0.727,3.555,0.976,5.478,0.56l41.805-9.018
          C134.416,146.498,135.085,145.572,133.982,144.848z"/>
      </g>
    </g>
    <path fill="none" stroke="#4EC1BF" strokeWidth="2.3144" strokeMiterlimit="10" d="M155.698,64.764l-46.005-26.563
      c-3.415-1.971-7.915-2.956-12.416-2.956s-9.002,0.985-12.417,2.956L38.856,64.764c-6.83,3.942-12.417,13.62-12.417,21.505v53.123
      c0,7.887,5.587,17.562,12.417,21.506l46.003,26.562c3.416,1.972,7.917,2.956,12.417,2.956s9.001-0.984,12.416-2.956l46.005-26.56
      c6.829-3.942,12.416-13.621,12.416-21.505V86.27C168.114,78.384,162.526,68.707,155.698,64.764z"/>
    </svg>);
  }

}

Logo.propTypes = {
  busy: PropTypes.bool,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['medium', 'large'])
};

Logo.defaultProps = {
  colorIndex: 'brand'
};

export default Logo;
