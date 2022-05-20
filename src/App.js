import './App.css';
import concepts from './concepts';
import util from './utils';
import { useEffect, useState } from 'react';
import HSLDiv from './HSLDiv';
import {TextField, Stack, Box, Button, Typography} from '@mui/material';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dracula} from 'react-syntax-highlighter/dist/esm/styles/prism';

function App() {
  const [rgb, setRgb] = useState(util.randomRGBValue());
  const [colorSet, setColorSet] = useState({});
  const [hex, setHex] = useState('');
  const [hsl, setHsl] = useState('');
  const [hsv, setHsv] = useState('');

  useEffect(() => {
    const converted = util.convertFromRgb(rgb[0], rgb[1], rgb[2]);
    setHex(converted.hex);
    setHsl(converted.hsl);
    setHsv(converted.hsv);
  }, [rgb]);

  const handleClick = () => {
    setRgb(util.randomRGBValue());
  }

  return (
    <>
      <Stack sx={{
        display: 'flex',
        flexDirection: "row",
        padding: "80px",
        alignItems: "center",
      }}>
        <Stack direction={"column"} spacing={3} width="250px">
          <TextField 
            value={util.getRgbStr(rgb[0], rgb[1], rgb[2])} 
            label="RGB" 
            disabled 
          />
          <TextField 
            value={util.getHexStr(hex)} 
            label="HEX" 
            disabled 
          />
          <TextField 
            value={util.getHslStr(hsl[0], hsl[1], hsl[2])} 
            label="HSL" 
            disabled 
          />
          <TextField 
            value={util.getHsvStr(hsv[0], hsv[1], hsv[2])}
            label="HSV" 
            disabled 
          />
          <Button variant='contained' onClick={handleClick}>Random Color</Button>
        </Stack>
        <Box sx={{width: "max-content", padding: '100px'}}>
          <div style={{
            position: "relative",
            width: '150px',
            height: '150px',
            borderRadius: "50%",
            backgroundColor: rgb ? util.getRgbStr(rgb[0], rgb[1], rgb[2]) : "transparent"
          }}>
          {
            Object.keys(concepts).map((concept, index) => {
              return <HSLDiv concept={concept} rgb={rgb} angle={30 * index} idx={index} setColorSet={setColorSet}/>
            })
          }
          </div>
        </Box>
        <Box width="500px">
          <SyntaxHighlighter language='javascript' style={dracula}>
            {JSON.stringify(colorSet, null, 2)}
          </SyntaxHighlighter>
        </Box>
      </Stack>
      <Box width="100%">
        <Typography>스트롱(strong : 강한)</Typography>
        <Typography>
        비비드 톤에 중간 명도의 회색을 약간 섞은 색감으로 다소 탁하며 비비드 컬러보다 진하다 혹은 강하다는 느낌을 주는 컬러 톤이다. 비비드에 비해 다소 선명함이 낮고 탁한 느낌의 강한 원색이 주를 이루며 색감이 강하므로 선명하고 적극적이며 화려하다는 이미지를 갖는다.
        </Typography>

      </Box>
    </>
  );
}

export default App;