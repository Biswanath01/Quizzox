import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Score({corr_answers, answered, username}) {
  let i=0;
  let final_score=0;
  const navigate= useNavigate();
  while(i<corr_answers.length)
  {
    if(corr_answers[i]===answered[i])
    {
      final_score+=10;
    }
    i+=1;
  }
  const show_result = ()=> {
    let a=""
    if(final_score>80)
      a="EXCELLENT!";
    else if(final_score>60)
      a="GOOD!";
    else if(final_score>40)
      a="MODERATE";
    else
      a="TOO BAD!";

    return <Typography  sx={{fontSize: 20, marginTop: "10px"}}>{a}</Typography>;
  }
  
  return (
    
    <Card sx={{ minWidth: 275, marginTop: "80px", backgroundColor: "blanchedalmond", borderRadius: 5 }}>
      <CardContent>
        <Typography sx={{ fontSize: 20, textAlign: "center" }} color="red" gutterBottom>
        <CircularProgressbar value={final_score} maxValue={100} text={`${final_score}%`}/>
        <div style={{marginTop: "20px"}}>{username}'s Quiz Result:</div>
        {show_result()}
        </Typography>
      </CardContent>
      <CardActions sx={{ fontSize: "20px", display:"flex", alignItems: "center", justifyContent: "center" }}>
        <Button size="small"  onClick={(event)=>{
            navigate('/');
        }}>Not Satisfied? ReDo Quiz</Button>
      </CardActions>
    </Card>
    
  );
};