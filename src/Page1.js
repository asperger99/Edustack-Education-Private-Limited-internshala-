import React,{useState,useEffect} from 'react'
import { UseStateValue } from "./StateProvider";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import "./Page1.css"
import {chapterName} from "./utils"
import { Button} from '@material-ui/core';
import {Link} from "react-router-dom"
import axios from "./axios"




const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function Page1() {

    const [{ user,data,globalChapter }, dispatch] = UseStateValue();
    const classes = useStyles();
    const [board, setBoard] = useState('');
    const [classs, setClass] = useState('');
    const [subject,setSubject] = useState('');
    const [chapter,setChapter] = useState('');
    const [file,setFile]=useState('')
    
      // console.log("data ",data)
      useEffect(() => {
        //console.log("useEffect",chapter)
        dispatch({
          type:"UPDATE_CHAPTER",
          item:chapter,
        })
      }, [chapter])
      
    const send = (e) => {
      // e.preventDefault()
      // console.log("inside send")
         const data = new FormData();
         data.append("file",file);

         axios.post("/upload",data).then(res => {
         //  console.log(res.data)
         //  console.log(typeof(res.data))
          dispatch({
            type: "UPDATE_DATA",
            item: res.data,
          });
         });
    }
  //console.log(data)
    
     
    return (
        <div className="page1">
            <h1 className="page1__username">{user.displayName}</h1>
          
    <div className="page1__dropdowns">
      <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="board-select-label">Board</InputLabel>
        <Select
          labelId="board-select-label"
          id="board"
          value={board}
          onChange={(event)=>setBoard(event.target.value)}
        >
          <MenuItem value={"CBSE"}>CBSE</MenuItem>
          <MenuItem value={"ICSE"}>ICSE</MenuItem>
           </Select>
      </FormControl>
      </div>

     <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="class-select-label">Class</InputLabel>
        <Select
          labelId="class-select-label"
          id="class"
          value={classs}
          onChange={(event)=>setClass(event.target.value)}
        >
          <MenuItem value={"X"}>X</MenuItem>
          <MenuItem value={"XII"}>XII</MenuItem>
           </Select>
      </FormControl>
      </div>

      <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="subject-select-label">Subject</InputLabel>
        <Select
          labelId="subject-select-label"
          id="subject"
          value={subject}
          onChange={(event)=>setSubject(event.target.value)}
        >
          <MenuItem value={"Maths"}>Maths</MenuItem>
           </Select>
      </FormControl>
      </div>
      <div >
      <FormControl className={classes.formControl}>
        <InputLabel id="chapter-select-label">Chapter</InputLabel>
        <Select
          labelId="chapter-select-label"
          id="chapter"
          value={chapter}
          onChange={(event)=>setChapter(event.target.value)}
        >{
          chapterName.map(chapter => <MenuItem value={chapter}>{chapter}</MenuItem>)
        }
          
           </Select>
      </FormControl>
      </div>
      <form action='#'>
            <div className="page1__inputFile__container">
                <input className="page1__inputFile" type="file" accept=".csv" id="file" onChange={e => setFile(e.target.files[0])}/>
            </div>
      {/* <Button type="submit" variant="contained" color="primary" disabled={chapter==="" || board ==="" || classs==="" || subject==""} onClick={e => send}>Proceed</Button>
      */}

      <Link style={{textDecoration:"none"}} to="/page2">
      <Button type="submit" variant="contained" color="primary" disabled={chapter==="" || board ==="" || classs==="" || subject==="" ||file===""} onClick={send}>Proceed</Button>
      </Link>
      </form>
     




      </div>
    
        </div>
        
    )
}

export {Page1}