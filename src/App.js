import './App.css';
import concepts from './concepts';
import util, {quantization} from './utils';
import { useEffect, useState, useRef } from 'react';
import HSLDiv from './HSLDiv';
import {TextField, Stack, Box, Button, Typography} from '@mui/material';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dracula} from 'react-syntax-highlighter/dist/esm/styles/prism';

function App() {
  const canvasRef = useRef();
  const [rgb, setRgb] = useState(util.randomRGBValue());
  const [colorSet, setColorSet] = useState({});
  const [hex, setHex] = useState('');
  const [hsl, setHsl] = useState('');
  const [hsv, setHsv] = useState('');
  const [averageColor, setAverageColor] = useState([]);

  useEffect(() => {
    const converted = util.convertFromRgb(rgb[0], rgb[1], rgb[2]);
    setHex(converted.hex);
    setHsl(converted.hsl);
    setHsv(converted.hsv);
  }, [rgb]);

  const handleClick = () => {
    setRgb(util.randomRGBValue());
  }

  const handleFileUpload = (e) => {
    const imageFile = e.target.files[0];
    const image = new Image();
    const fileReader = new FileReader();
    // fileReader.readAsDataURL(imageFile);
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = () => {
      // image의 width / height 값을 가져오기 위하여 new Image 인스턴스 생성 및 src 지정
      // fileReader로 읽었을 때 직접 width / height값을 가져올 수는 없는가?
      image.src = fileReader.result;
      image.onload = () => {
        const ctx = canvasRef.current.getContext("2d");
        // canvas의 width / height를 가져오기 위하여 ctx에 접근하고 있음
        // canvasRef.current를 통하여 직접 제어할 수는 없는가?
        ctx.canvas.width = image.width;
        ctx.canvas.height = image.height;
        // 일단 이미지를 그린 후에야 imageData를 가져올 수 있음
        // 꼭 canvas에 이미지를 rendering시키는 과정이 필요한가?
        ctx.drawImage(image, 0, 0);
        const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        const result = util.buildRgb(imageData.data);
        const colors = quantization(result, 0);
        setAverageColor(colors);
      }
      
    }
  };

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
        <Box sx={{display: 'flex', flexWrap: 'wrap' }}>
          {
            averageColor.map(item => {
              const rgbColor = `rgb(${item.r}, ${item.g}, ${item.b})`;
              return (
                <Box sx={{width: '48px', height: '48px', backgroundColor: rgbColor}} />
              )
            })
          }
        </Box>
      </Stack>
      <canvas ref={canvasRef} id="file-upload" style={{backgroundColor: '#CCC'}} />
      <input type="file" onChange={handleFileUpload} accept="image/*"/>
    </>
  );
}

export default App;