import { useEffect } from "react";
import { useSelector } from "react-redux";
import SearchModal from "../components/modal/SearrchModal";
import OptionListDrawer from "../components/drawer/OptionListDrawer";
import { reverseArray } from "../utils/helper";

const data = [
  { name: "Anom", age: 19, gender: "Male" },
  { name: "Megha", age: 19, gender: "Female" },
  { name: "Subham", age: 25, gender: "Male" },
];

export default function Home() {
  const { isLoggedIn, uid, susertoken } = useSelector((state) => state.auth);
  const { optionChain, cols } = useSelector((state) => state.socket);

  return (
    <>
      <div className="App">
        <div className="buttons">
          <SearchModal />
          <OptionListDrawer />
        </div>
        <div className="tables">
          <table>
            <thead>
              <tr>
                {reverseArray(cols, "BANKNIFTY").map((i) => (
                  <th key={i}>{i}</th>
                ))}
                <th className="strike_price">Banknifty</th>
                {cols.BANKNIFTY.map((i) => (
                  <th key={i}>{i}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {optionChain?.BANKNIFTY &&
                Object.keys(optionChain?.BANKNIFTY).map((sp, i) => {
                  let ce = optionChain.BANKNIFTY[sp]["ce"];
                  let pe = optionChain.BANKNIFTY[sp]["pe"];
                  return (
                    <tr key={i}>
                      {reverseArray(cols, "BANKNIFTY").map(i => (
                        <td key={i}>{ce?.[i]}</td>
                      ))}
                      <td className="strike_price">{sp}</td>
                      {cols.BANKNIFTY.map(i => (
                        <td key={i}>{pe?.[i]}</td>  
                      ))}
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                {reverseArray(cols, "NIFTY").map((i) => (
                  <th key={i}>{i}</th>
                ))}
                <th className="strike_price">Nifty</th>
                {cols.NIFTY.map((i) => (
                  <th key={i}>{i}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {optionChain?.NIFTY &&
                Object.keys(optionChain?.NIFTY).map((sp, i) => {
                  let ce = optionChain.NIFTY[sp]["ce"];
                  let pe = optionChain.NIFTY[sp]["pe"];
                  return (
                    <tr key={i}>
                      {reverseArray(cols, "NIFTY").map(i => (
                        <td key={i}>{ce?.[i]}</td>
                      ))}
                      <td className="strike_price">{sp}</td>
                      {cols.NIFTY.map(i => (
                        <td key={i}>{pe?.[i]}</td>  
                      ))}
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                {reverseArray(cols, "FINNIFTY").map((i) => (
                  <th key={i}>{i}</th>
                ))}
                <th className="strike_price">Finnifty</th>
                {cols.FINNIFTY.map((i) => (
                  <th key={i}>{i}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {optionChain?.FINNIFTY &&
                Object.keys(optionChain?.FINNIFTY).map((sp, i) => {
                  let ce = optionChain.FINNIFTY[sp]["ce"];
                  let pe = optionChain.FINNIFTY[sp]["pe"];
                  return (
                    <tr key={i}>
                      {reverseArray(cols, "FINNIFTY").map(i => (
                        <td key={i}>{ce?.[i]}</td>
                      ))}
                      <td className="strike_price">{sp}</td>
                      {cols.FINNIFTY.map(i => (
                        <td key={i}>{pe?.[i]}</td>  
                      ))}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
