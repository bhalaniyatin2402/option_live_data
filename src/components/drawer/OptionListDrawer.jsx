import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DrawerOptionItem from "./DrawerOptionItem";
import { setInitialCols } from "../../redux/slices/socket.slice";

export default function OptionListDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { optionChain, cols } = useSelector((state) => state.socket);
  const [currSm, setCurrSm] = useState("BANKNIFTY");
  const btnRef = useRef();

  function handleColumn(col) {
    let cols = JSON.parse(localStorage.getItem("cols"));
    if (!cols[currSm].includes(col)) {
      cols[currSm].push(col);
    } else {
      if(cols[currSm].length == 1) {
        return alert("atleast select on column")
      }
      cols[currSm] = cols[currSm].filter((i) => i != col);
    }
    dispatch(setInitialCols(cols));
    localStorage.setItem("cols", JSON.stringify(cols));
  }

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Option Chains
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="sm"
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Option Chain</DrawerHeader>

          <DrawerBody>
            <div className="drawer_oc_buttons">
              {["Banknifty", "Nifty", "Finnifty"].map((e) => (
                <button
                  className={`select_oc_view ${
                    currSm == e.toUpperCase() ? "bg-[#90ee90]" : "bg-[#2de42d]"
                  }`}
                  key={e}
                  onClick={() => setCurrSm(e.toUpperCase())}
                >
                  {e}
                </button>
              ))}
            </div>
            <div className="selected_cols">
              {["lp", "oi", "poi", "toi", "o"].map((col) => (
                <button
                  key={col}
                  className={`col_item ${
                    cols[currSm].includes(col)
                      ? "bg-[lightpink]"
                      : "bg-[lightsalmon]"
                  }`}
                  onClick={() => handleColumn(col)}
                >
                  {col.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="oc_list mt-5">
              {optionChain[currSm] &&
                Object.keys(optionChain[currSm]).map((sp, i) => {
                  let ce = optionChain[currSm][sp]["ce"];
                  let pe = optionChain[currSm][sp]["pe"];
                  return (
                    <>
                      {ce?.ts && <DrawerOptionItem option={ce} />}
                      {pe?.ts && <DrawerOptionItem option={pe} />}
                    </>
                  );
                })}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
