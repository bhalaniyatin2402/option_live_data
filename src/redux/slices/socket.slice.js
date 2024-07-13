import { createSlice } from "@reduxjs/toolkit";
import { deleteObjectKey, extractOptionSymbol } from "../../utils/helper";

let cols = JSON.stringify(localStorage.getItem("cols"))

const sampleOptionChainObject = {
  exch: "", // exchange
  token: "",
  tsym: "", // trading symbol
  cname: "", // company name
  symbool: "",
  lp: "",
  v: "", // volume
  o: "", // open price
  h: "", // high price
  l: "", // low price
  c: "", // close price
  oi: "", // open interest
  poi: "", // previous day closing open interest
  toi: "", // total open interest
};

const initialState = {
  socketUrl: "wss://api.shoonya.com/NorenWSTP/",
  isConnected: false,
  send: {
    t: "t",
    k: ""
  },
  optionChain: {
    BANKNIFTY: {},
    NIFTY: {},
    FINNIFTY: {},
  },
  cols: {
    BANKNIFTY: cols.BANKNIFTY || [],
    NIFTY: cols.NIFTY || [],
    FINNIFTY: cols.FINNIFTY || []
  }
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnectionState(state, action) {
      state.isConnected = action.payload;
    },
    setInitialOptionChain(state, action) {
      state.optionChain = action.payload;
    },
    setOptionData(state, action) {
      if (action.payload.t !== "tk") return;
      let { sm, oc, sp } = extractOptionSymbol(action?.payload?.ts);
      state.optionChain[sm][sp][oc] = action.payload;
    },
    setOptionChain(state, action) {
      const { sm, oc, sp } = action.payload;
      state.optionChain[sm][sp] = {};
    },
    removeOptionChain(state, action) {
      const { optionChain, sm, sp, oc } = action.payload
      if(Object.keys(optionChain[sm][sp]).length == 2) {
        state.optionChain[sm][sp] = {
          [oc == "ce" ? "pe" : "ce"]: {}
        }
      } else {
        const newOcList = deleteObjectKey(optionChain, sm, sp, oc)
        state.optionChain = newOcList
        localStorage.setItem("ocl", JSON.stringify(newOcList))
      }
    },
    setInitialSend(state, action) {
      state.send.k = action.payload
    },
    addToSend(state, action) {
      state.send.k = action.payload
    },
    setInitialCols(state, action) {
      state.cols = action.payload
    }
  },
});

export default socketSlice.reducer; 
export const {
  setConnectionState,
  setOptionData,
  setOptionChain,
  removeOptionChain,
  setInitialOptionChain,
  setInitialSend,
  addToSend,
  removeFromSend,
  setInitialCols
} = socketSlice.actions;
