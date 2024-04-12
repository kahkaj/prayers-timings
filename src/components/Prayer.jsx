import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Badge from '@mui/material/Badge';
import moment from "moment";
import "moment/dist/locale/ar-dz";

export default function Prayer({ image, name, time, timeInterval, status, badge}) {  
  let bagdeColor
  switch (badge) {
    case'primary':
      bagdeColor = "#1976d2";
      break;
    case 'warning':
      bagdeColor = "#ed6c02";
      break;
    default:
      bagdeColor = "#636b74";
  }
  return (
    <Card style={{marginTop:'10px', marginBottom:'10px', border:`1px solid ${bagdeColor}`, borderRadius:'10px', overflow:'hidden', boxShadow: `${bagdeColor} 0px 22px 70px 4px`}}>  
      <CardActionArea style={{display:'flex', flexDirection:'row', justifyContent:'space-around', padding:'5px', width:'300px', backgroundColor:'#FAF5EA'}}>
        <div>
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt={name}
            style={{width:"140px", borderRadius:'10px'}}
          />
        </div>
        <CardContent style={{display:'flex', flexDirection:'column', justifyContent:'space-between', flex:'1', padding:'10px', height:'120px'}}> 
          <Typography style={{fontFamily: '"Marhey", sans-serif', margin:'0'}} gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography style={{fontFamily: '"Marhey", sans-serif', margin:'0'}} variant="h4" color="text.secondary">
            {time}
          </Typography>
          {status !== null ? (<Badge
            style={{marginRight:'5px', border:`2px solid ${bagdeColor}`, borderRadius:'10px'}}
            badgeContent=""
            color={badge}
            size="sm"
            variant="solid"
            >
            <Typography style={{fontFamily: '"Marhey", sans-serif', margin:'0', display:'flex', justifyContent:'center', padding:'4px'}} color={bagdeColor}>
              {status}
            </Typography>         
          </Badge>) :
          <Typography style={{fontFamily: '"Marhey", sans-serif', margin:'0', display:'flex', justifyContent:'center', padding:'4px'}} color={bagdeColor}>
          {status}
        </Typography>}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}