import React, {useState} from 'react';
import useComputeHash from "./ComputeHash";
import Footer from "./Footer";
import useHeader from "./Header";
import useSearchResults from "./SearchResults";
import useWriteHash from "./WriteHash";

function App() {
    const {setErrorMessage, provider, render: renderHeader} = useHeader()

    const [searchVisible, setSearchVisible] = useState(false);
    const [writeHashVisible, setWriteHashVisible] = useState(false);

    const invalidatedHash = async () => {
        setSearchVisible(false);
        setWriteHashVisible(false);
    }

    const searchHandler = async (event: any) =>  {
        event.preventDefault();
        setSearchVisible(true)
        setWriteHashVisible(false)
        search();
    }

    const writeHandler = async (event: any) =>  {
        event.preventDefault();
        setWriteHashVisible(true)
        write();
    }

    const writeCompleteHandler = async () =>  {
        search();
    }


    const {render: renderComputeHash, hashValue} = useComputeHash(searchHandler, invalidatedHash)
    const {render: renderSearchResults, search} = useSearchResults(hashValue, writeHandler)
    const {render: renderWriteHash, write} = useWriteHash(hashValue, writeCompleteHandler)

    return (
        <div className="App">
            {renderHeader}
            <div className="grid grid-rows-3 gap-y-5 pt-6 round">
                { renderComputeHash }
                { searchVisible == true && renderSearchResults }
                { writeHashVisible == true && renderWriteHash }
            </div>
            <Footer/>
        </div>
    );
}

export default App;
