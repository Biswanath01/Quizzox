import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Details(){
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const navigate = useNavigate();
  const handleDetailsSubmit = (event) => {
    event.preventDefault();
    navigate(`/${name}/${difficulty}`);
  }

  return (
    <div style={{ width: window.innerWidth, height: window.innerHeight, display: "flex", flexDirection: 'column', backgroundColor: "blanchedalmond" }}>
        <form style={{ display: "flex", marginTop:"20px", flexDirection:"column",
        alignItems:"center", justifyContent: "center"  
      } }
            onSubmit = {handleDetailsSubmit}
        >     
            <TextField  id="outlined-basic" label="Name..." variant="outlined" onChange={(e) => setName(prev => e.target.value)} 
            sx={{width:window.innerWidth/4}}/>
            <Select label="Choose A Difficulty" onChange={(e) => setDifficulty(prev => e.target.value)} 
            sx={{width:window.innerWidth/4, margin:window.innerHeight/200}} >
                <MenuItem disabled selected>- Choose A Difficulty -</MenuItem>
                <MenuItem value="easy">Easy😊</MenuItem>
                <MenuItem value="medium">Moderate😎</MenuItem>
                <MenuItem value="hard">Difficult😈</MenuItem>
            </Select>
            <Button type='submit' variant="contained" >Start Quiz</Button>
        </form>
    </div>
  );
};