import Submit from "../atoms/Submit";
import Back from "../atoms/Back";
import { Link } from "react-router-dom";
import Dropdown from "../atoms/Dropdown";
import './ButtonBar.css';
import Next from "../atoms/Next";
function ButtonBar({onGuess, onChange, list, nextPassage}) {
    
    return(
        <div className="button-bar">
            <Submit onGuess={onGuess}/>
            <Link to="/"><Back /></Link>
            <Dropdown onChange={onChange} list={list}/>
            <Next nextPassage={nextPassage}></Next>
        </div>
    )
}
export default ButtonBar;