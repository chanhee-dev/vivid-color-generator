import React, { useEffect, useState } from 'react';
import concepts from './concepts';
import util from './utils';
import {Tooltip} from '@mui/material';
import {styled} from '@mui/material/styles';

const StyledDiv = styled('div')`
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 1px 1px 5px #CCC;
  cursor: pointer;
  box-sizing: border-box;
  &:hover {
    background-color: red;
    border: 2px solid red;
  }
`;

const HSLDiv = ({concept, rgb, idx, setColorSet}) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState('white');

  useEffect(() => {
    setPos({
      x: Math.round(100 * Math.cos(Math.PI * idx / 6)),
      y: Math.round(100 * Math.sin(Math.PI * idx / 6))
    });
  }, [idx]);

  useEffect(() => {
    const cur = concepts[concept];
    const H = util.getHueFromRGB(rgb[0], rgb[1], rgb[2]);
    const S = util.getRandomBetweenValue(cur.saturation.min, cur.saturation.max);
    const L = util.getRandomBetweenValue(cur.lightness.min, cur.lightness.max);
    
    setColor(util.getHslStr(H, S, L));
  }, [rgb, concept]);

  useEffect(() => {
    setColorSet(previous => {
      return {...previous, [concept]: color}
    })
  }, [concept, color, setColorSet]);

  const placement = util.getTooltipPlacement(idx / 6);
  
  return (
    <Tooltip title={util.getVisibleName(concept)} placement={placement}>
      <StyledDiv style={{
        top: pos.x + 63,
        left: pos.y + 63,
        backgroundColor: rgb ? color : "transparent",
      }}/>
    </Tooltip>
  )
};

export default HSLDiv;