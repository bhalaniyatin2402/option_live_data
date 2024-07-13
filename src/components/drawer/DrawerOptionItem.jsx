import { useDispatch, useSelector } from "react-redux";
import { extractOptionSymbol, removeTokenFromTokens } from "../../utils/helper";
import { addToSend, removeOptionChain } from "../../redux/slices/socket.slice";

export default function DrawerOptionItem({ option }) {
  const dispatch = useDispatch()
  const { send: { k }, optionChain } = useSelector(state => state.socket)

  function handleRemoveOptionChain() {
    const { sm, oc, sp } = extractOptionSymbol(option.ts)

    // remove token from token listoption
    const tokens = removeTokenFromTokens(k, option?.tk)

    // remove option chain from socket slice
    dispatch(removeOptionChain({ optionChain, sm, sp, oc }))

    // remove token from socket slice
    dispatch(addToSend(tokens))

    // remove token from local storage
    localStorage.setItem("tokens", tokens)
  }

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <p className="">{option?.ts}</p>
        <button
          // onClick={() => handleRemoveOptionChain(option)}
          onClick={handleRemoveOptionChain}
          className="px-2 py-1 rounded-lg text-[14px] font-semibold tracking-wider bg-red-700  hover:bg-red-800 text-white"
        >
          Remove
        </button>
      </div>
    </>
  );
}
