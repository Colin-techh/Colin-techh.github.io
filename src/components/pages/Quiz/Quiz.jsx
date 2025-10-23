
import "./Quiz.css";
import Passage from "../../atoms/Passage";
import ButtonBar from "../../molecules/ButtonBar";
import { useState, useEffect} from "react";
import Head from "../../atoms/Head";
async function loadPassageUrl(listOfFileNames) {
    
    let indexOfFileName = Math.floor(Math.random() * listOfFileNames.length) 
    
    return listOfFileNames[indexOfFileName];
}
async function loadFileNames(signal) {
    return fetch("https://raw.githubusercontent.com/cwilliams2-cmd/Gov1074Quiz/refs/heads/main/fileNames.json", { signal })
            .then(res => res.json())
            .then(json => json["textNames"])
            .catch(err => {
                if(err.name == "AbortError") {
                    return;
                }
                alert("Failed to load passage");
            });
    
}
function Quiz() {
    
    const [author, setAuthor] = useState("");
    const [guess, setGuess] = useState("");
    const [list, setList] = useState("");
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        loadFileNames(signal).then(response => {
            if(signal.aborted){
                return;
            }
            setList(response);
            return loadPassageUrl(response);
        })
        .then(res => {
            setAuthor(res);  
        })
        .catch(err => {console.log(err);});
        return () => controller.abort();
    }, []);
    
    const clicksSubmit = () => {
        if(author == guess) {
            alert("Correct! Answer was " + author);
        } else {
            alert("Incorrect, answer was " + author);
        }
    }

    const nextPassage = () => {
        loadPassageUrl(list).then(res => {
            setAuthor(res);
        });
    }

    return(
        <div>
            <Head></Head>
            <Passage passageAuthor={author}/>
            <ButtonBar onGuess={clicksSubmit} onChange={setGuess} list = {list} nextPassage={nextPassage}/>

        </div>
    )
}
export default Quiz;