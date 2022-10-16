import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Score from './Score';
import ClipLoader from "react-spinners/ClipLoader";
import Button from '@mui/material/Button';
import he from 'he';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import ProgressBar from "@ramonak/react-progress-bar";




export default function Quiz() {
  const {username, difficulty} = useParams();
  const [baseUrl, setBaseUrl] = useState('https://opentdb.com/api.php');
  const [data, setData]= useState([]);
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [answered, setAnswered]= useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  let [i, setI] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const navigate = useNavigate();
  
  function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }
  
  const d_quiz = () => {            //For taking input the user answers
    while(i < answered.length){
      if(answered[i] == false){
        return(
          <div key = {i} style={{marginTop: "50px", backgroundColor: "blanchedalmond", fontFamily: " Poppins, sans-serif"}}>
            <ProgressBar completed={i*10} maxCompleted="100"/>
            <p style={{maxWidth:window.innerWidth/5.2, marginLeft: "20px", fontSize: 20, textTransform: "uppercase"}}>
              {question[i]}</p>
            {answers[i].map((option, index) => {
              return <Button 
                key = {index}
                onClick = {(event) => {
                  answered[i] = true;
                  setUserAnswers([...userAnswers, option]);
                  if(option===correctAnswers[i]){
                    console.log("Correct Answer");
                    toast.success(`Q${i+1}.Correct Answer!`, {
                      position: toast.POSITION.TOP_RIGHT
                  });                    
                  }
                  else{
                    console.log("InCorrect Answer");
                    toast.error(`Q${i+1}.InCorrect Answer!`, {
                      position: toast.POSITION.TOP_RIGHT
                  });
                  }
                }}
                variant="outlined"
                sx={{display:"flex", flexDirection:"column", backgroundColor:"orange", width: window.innerWidth/5, margin: "10px", alignItems: "center", justifyContent: "center"}}>
                  {index + 1}. {option}</Button>
            })}
          </div>
        )
      }
      else {
        i += 1;
      }
    }

    if(i === answered.length){
      let x = 999;
      x=data ?
        <Score corr_answers = {correctAnswers} answered = {userAnswers} username={username}/> 
      : <ClipLoader/>;
      return x;
    }
  }
  
  useEffect(() => {
    axios.get(`${baseUrl}?amount=10&category=9&difficulty=${difficulty}&type=multiple`)
    .then((res) => {
      console.log(res.data.results);
      console.log("Hello");
      setData(res.data.results);
        let cA = [];        //correct answers
        let f=[];           //for answered array test
        let q = [];         //questions
        let a = [];         //both correct and incorrect answers
        
        res.data.results.map((obj, index) => {
          q.push(he.decode(obj.question));
          a.push(obj.incorrect_answers.concat([he.decode(obj.correct_answer)]));
          cA.push(he.decode(obj.correct_answer));
          f.push(false);
        });

        if(q && a && cA){
          for(let i=0; i<a.length; i++)
          {
            for(let j=0; j<a[i].length; j++)
            {
              a[i][j]=he.decode(a[i][j]);
            }
          }
          setQuestion(prev => q);
          setAnswers(prev => a);
          setCorrectAnswers(prev => cA);
          setAnswered(prev=> f);
        } 
        else {
          console.log("Go home");
        }
    })
    .catch((err)=>{
      console.log(err);
    });
  }, []);

  if(answers.length > 0){
    for(let i=0; i<answers.length; i++){
      shuffleArray(answers[i]);
    }
  }

  return (
      <div style={{alignItems:"center", justifyContent:"center", display:"flex", flexDirection:"column"}}>
        { data? d_quiz() : <ClipLoader/>}
        <ToastContainer />

      </div>
      
  );
};