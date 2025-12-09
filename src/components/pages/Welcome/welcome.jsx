import { useState, useEffect} from "react";
import './welcome.css';
import Start from '../../atoms/Start';
import { Link } from "react-router-dom";
const createWordElement = (text, props) => (
    <div style={{
        ...props,
        position: "absolute",
        left: `${Math.random()*100}vw`,
        top: `${Math.random()*100}vh`
    }}>
        <p className="words">
            {text}
        </p>
    </div>
    
);

function Welcome() {
    const wordList = ["Charles I","Parker","Hobbes","Locke","Molesworth","Trenchard & Gordon","Montesquieu","Hume","Bolingbroke","Apthorp","Mayhew","Otis","Adams","Whately","Hopkins","Howard"];
    const [words, setWords] = useState(wordList.map((word) => ({
        text: word,
        key: Math.random(),
        left: `${Math.random()*100}vw`,
        top: `${100}vh`
    }))); 
    const animationEnds = (index) => {
        setWords((words) => {
            const newWords = [...words];        
            newWords[index] = {
                text: words[index].text,
                key: Math.random(),
                left: `${Math.random()*100}vw`,
                top: `${100}vh`
            };
            return newWords;
        });
    };
    return(
      <div className="welcome">
        <h1>Passage identification quiz for Gov1074: <br></br>12/09: Updated for final exam!</h1>
        <h2>Made by Colin Williams, '29</h2>
        <Link to="/Quiz"><Start /></Link>
        
        <div className="carousel">
            {words.map((word, index) => (
                <div key = {word.key}style={{position: "absolute", left: word.left, top: word.top}}>
                    <p
                        className="words"
                        onAnimationEnd={() => animationEnds(index)}
                        style={{animationDelay: `${-1*Math.random()*5000}ms`}}>
                        {word.text}
                    </p>
                </div>
            ))}
        </div>
      </div>
    );
}
export default Welcome;