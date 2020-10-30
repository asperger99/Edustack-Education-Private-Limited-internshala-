import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import "./LandingPage.css"
import axios from "./axios"
import { UseStateValue } from "./StateProvider";
import { auth } from "./firebase";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    //backgroundColor: theme.palette.background.paper,
    background: "rgb(238,174,202)",
    background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(91,134,186,1) 100%)",
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function LandingPage() {

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [openSignIn, setOpenSignIn] = useState(false)
  const [{ user }, dispatch] = UseStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //console.log("yoo", authUser);
        dispatch({
          type: "UPDATE_USER",
          item: authUser,
        });
      } else {
        dispatch({
          type: "UPDATE_USER",
          item: null,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);




  const signUp = (event) => {
     event.preventDefault();
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          return authUser.user.updateProfile({
            displayName: username,
          });
        })
        .catch((error) => alert(error.message));
    
  };


  const signIn = (event) => {
     event.preventDefault();
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));

  }


  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}

      >
        <div style={modalStyle} className={classes.paper}>
          <form className="landingPage__signup">


            
            <Input
            required
              placeholder="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <Input
            required
              placeholder="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
            required
              placeholder="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button variant="outlined" type="submit" onClick={signUp}>Sign Up</Button>


          </form>
        </div>
      </Modal>




      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}

      >
        <div style={modalStyle} className={classes.paper}>
          <form className="landingPage__signup">


            
            <Input
              required
              placeholder="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
            required
              placeholder="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button variant="outlined" type="submit" onClick={signIn}>Sign In</Button>


          </form>
        </div>
      </Modal>
      
      <div className="landingPage">
         
          {/* user ? (<Button varient="outlined" color="primary">LogOut</Button>) : */}
            <div >
             
              <Button className="landingPage__button" variant="outlined" color="primary" onClick={() => setOpenSignIn(true)}>Sign In</Button>
              <Button className="landingPage__button" variant="contained" color="primary"  onClick={() => setOpen(true)}>Sign Up</Button>
            </div>
        
      </div>
      
    </div>
  )
}

export default LandingPage
