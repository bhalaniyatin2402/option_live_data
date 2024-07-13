import { useDispatch } from "react-redux";
import { addNewToken, extractOptionSymbol } from "../../utils/helper";
import { addToSend, setOptionChain } from "../../redux/slices/socket.slice";

export default function SearchResultOption({ option, optionList }) {
  const dispatch = useDispatch()
  const ocl = JSON.parse(localStorage.getItem("ocl"))
  let tokens = localStorage.getItem("tokens")
  
  function handleOptionClick(option) {
    let obj = ocl;
    if(optionList?.includes(option.token)) {
      alert("option already added to list")
    }
    const { sm, oc, sp } = extractOptionSymbol(option?.tsym)

    // Add into local storage
    if(!obj[sm][sp]) {
      obj[sm] = {
        ...obj[sm],
        [sp]: {}
      }
    }
    localStorage.setItem("ocl", JSON.stringify(obj))
    // add into socket state
    dispatch(setOptionChain({ sm, oc, sp }))

    // add into send message of socket
    tokens = addNewToken(tokens, option.token)
    dispatch(addToSend(tokens))
    localStorage.setItem("tokens", tokens)
  }

  return (
    <>
      <li className="flex justify-between items-center mb-2">
        <p className="">{option?.dname}</p>
        {optionList?.includes(option.token) ? (
          <button
            onClick={() => handleOptionClick(option)}
            className="px-3 bg-green-400 rounded-md font-semibold opacity-70"
          >
            Added
          </button>
        ) : (
          <button
            onClick={() => handleOptionClick(option)}
            className="px-3 bg-green-400 rounded-md font-semibold"
          >
            Add
          </button>
        )}
      </li>
    </>
  );
}
