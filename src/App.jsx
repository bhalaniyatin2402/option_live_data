import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';

import CustomRoutes from "./routes/CustomRoutes"
import { setConnectionState, setInitialCols, setInitialOptionChain, setInitialSend, setOptionData } from './redux/slices/socket.slice';
import './App.scss'

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userinfo = JSON.parse(localStorage.getItem("userinfo"))
  const ocl = JSON.parse(localStorage.getItem("ocl"))
  const tokens = localStorage.getItem("tokens")
  const cols = JSON.parse(localStorage.getItem("cols"))
  const { socketUrl, isConnected, send, optionChain } = useSelector(state => state.socket)

  // connect to web server
  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => {
      console.log("connect shoonya web socket");
      dispatch(setConnectionState(true))
      if(!userinfo?.uid || !userinfo?.susertoken) {
        navigate("/login")
      }
      sendJsonMessage({
        t: "c",
        uid: userinfo?.uid,
        susertoken: userinfo?.susertoken,
        actid: userinfo?.uid,
        source: "API"
      })
    },
    onClose: () => {
      dispatch(setConnectionState(true))
      console.log("web socket connection closed")
    },
    onMessage: (event) => {
      const message = JSON.parse(event.data)
      dispatch(setOptionData(message))
    }
  })

  useEffect(() => { 
    let intervel;
    if(isConnected) {
      // intervel = setInterval(() => {
      //   sendJsonMessage(send)
      // }, 1000);
      intervel = setTimeout(() => {
        sendJsonMessage(send)   
      }, 1000);
    }
    // return () => clearInterval(intervel)
    return () => clearTimeout(intervel)
  }, [isConnected, send])

  useEffect(() => {
    if(ocl == null || !ocl) {
      localStorage.setItem("ocl", JSON.stringify(optionChain))
    } else {
      dispatch(setInitialOptionChain(ocl))
    }

    if(tokens) {
      dispatch(setInitialSend(tokens))
    } else {
      localStorage.setItem("tokens", "")
    }

    if(cols) {
      dispatch(setInitialCols(cols))
    } else {
      localStorage.setItem("cols", JSON.stringify({
        BANKNIFTY: ["lp"],
        NIFTY: ["lp"],
        FINNIFTY: ["lp"]
      }))
    }
  },[])

  return (
    <>
      <CustomRoutes />
    </> 
  )
}

export default App
