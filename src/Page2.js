import React,{useState,useEffect} from 'react'
import "./Page2.css"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button} from '@material-ui/core';
import { UseStateValue } from "./StateProvider";
import {Link} from "react-router-dom"
import { db } from "./firebase";
import {givenTopics} from './utils';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


function Page2() {
  const [{ user,data,globalChapter,updatedData }, dispatch] = UseStateValue();
  const [dataIndex,setDataIndex]=useState(1);
  const classes = useStyles();
  const [rating,setRating]=useState(1)
  const [topics,setTopics]=useState([])
  const theme = useTheme();

 //console.log("globalChapter",globalChapter)
  const handleChange = (event) => {
    setTopics(event.target.value);
  };

  const nextButton = () => {
    ///push in db
    db.collection("collection1")
    .add({
      question_tag: data[dataIndex]?.question_tag,
      answer_tag:data[dataIndex]?.answer_tag,
      ratings:rating,
      topics:topics,
      chapter_name:globalChapter,
    })
    ///store updated data locally
    dispatch({
      type:"UPDATE_UPDATEDDATA",
      item:{
          id:dataIndex,
          question_tag:data[dataIndex]?.question_tag,
          answer_tage:data[dataIndex]?.answer_tag,
          chapter_name:globalChapter,
          topics:topics,
          ratings:rating,

      },
    })

     //console.log("currentdata",updatedData)
    ///change question
    if(dataIndex< data.length){
      setDataIndex(dataIndex+2)
    }
    setTopics([])
    setRating(1)
  }
 
 let count=[1,2,3,4,5,6,7,8,9,10]; 
  // console.log("page2",data)  
  return (
    <div className="page2">
        <div className="page2__QandA">
           <div className="page2__question">
           <div dangerouslySetInnerHTML = {{__html:data[dataIndex]?.question_tag}}></div>
       
          </div>
          <div className="page2__answer">
          <div dangerouslySetInnerHTML = {{__html:data[dataIndex]?.answer_tag}}></div>
                 
          </div>

          <div className="page2__ratingAndNext">
         {
        dataIndex<data.length-1? <>

        <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Topics</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={topics}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {givenTopics.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, topics, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>



        {/* <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-name-label">Topics</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          multiple
          value={topics}
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {givenTopics?.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={topics.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}




        <FormControl className={classes.formControl}>
        <InputLabel id="rating-select-label">Rating</InputLabel>
        <Select
          labelId="rating-select-label"
          id="rating"
          value={rating}
          onChange={(event)=>setRating(event.target.value)}
        >
        {
         count.map( c => 
            (<MenuItem value={c}>{c}</MenuItem>)
         )
        }
          
           </Select>
      </FormControl>
        <Button variant="contained" color="primary" onClick={nextButton}>Next</Button> </>:
        <Link to="/Page3" style={{textDecoration:"none"}}> <Button variant="contained" color="secondary" >Finish</Button></Link>
      }
     
          </div>
          </div>
       
    </div>
    
    )
}

export default Page2
