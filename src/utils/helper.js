// BANKNIFTY28AUG24C53000
// BANKNIFTY28AUG24P53000
// BANKNIFTY28AUG24C53100
// BANKNIFTY28AUG24P53100
// BANKNIFTY28AUG24C52900
// BANKNIFTY28AUG24P52900

export function extractOptionSymbol(tsym) {
  try {
    let sm = "";
    let oc = "";
    let sp = tsym?.slice(-5);
  
    if (tsym?.includes("BANKNIFTY")) {
      sm = "BANKNIFTY";
    } else if (tsym?.includes("FINNIFTY")) {
      sm = "FINNIFTY";
    } else if (tsym?.includes("NIFTY")) {
      sm = "NIFTY";
    }
  
    tsym
      ?.split("")
      .reverse()
      .map((i) => {
        if (i == "C") {
          return (oc = "ce");
        }
        if (i == "P") {
          return (oc = "pe");
        }
      });
    
    if(!sm || !oc || !sp) {
      return alert("please select option chain")
    }
    
    return { sm, oc, sp };
  } catch (error) {
    return alert("please select option chain")
  }
}

export function deleteObjectKey(obj, sm, sp, oc) {
  let newObj;
  if(Object.keys(obj[sm][sp]).length == 2) {
    return obj
  }
  newObj = {
    ...obj,
    [sm]: {}
  }

  let arr = Object.keys(obj[sm]).filter(i => i !== sp)
  arr.map(i => {
    newObj[sm][i] = {}
  })
  return newObj
}

export function removeTokenFromTokens(tokens, token) {
  return tokens
    .replace(/NFO\|/g, "")
    .split("#")
    .filter((j) => j !== token)
    .map((j) => `NFO|${j}`)
    .join("#");
}

export function addNewToken(tokens, token) {
  if(!tokens) {
    return `NFO|${token}`
  } else {
    return tokens.concat(`#NFO|${token}`)
  }
}

export function reverseArray(cols, sm) {
  let newArr = []
  cols[sm].map(i => newArr.unshift(i))
  console.log(newArr);
  return newArr
}
