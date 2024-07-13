import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useSearchScripsMutation } from "../../redux/services/shoonya.api";
import { useState } from "react";
import SearchResult from "./SearchResult";

export default function SearchModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { uid, susertoken } = JSON.parse(localStorage.getItem("userinfo"))
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([])
  const [searchScrips, { isLoading }] = useSearchScripsMutation();

  async function handleSearchScrip() {
    try {
      const res = await searchScrips({
        data: JSON.stringify({
          uid: uid,
          stext: search,
          exch: "NFO"
        }),
        key: susertoken
      })
      if(res?.data.stat == "Ok") {
        setSearchResult(res?.data?.values)
      }
    } catch (error) {
      setSearchResult([])
      alert(error.message)
    }
  }

  return (
    <>
      <Button className="absolute bottom-0 right-0" onClick={onOpen}>Search</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center">Search Option Chain</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="search_box_o_c">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Option Chian"
              />
              <button onClick={handleSearchScrip} className="bg-green-700 hover:bg-green-900 text-white font-bold px-3 py-1 rounded-lg">
                Search
              </button>
            </div>
            <div className="search_results">
              <SearchResult loading={isLoading} searchResult={searchResult} />
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
