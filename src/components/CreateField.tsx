import styled from "styled-components";
import {useState} from "react";

export function CreateField(){

    let [getInvisible, setInvisible] = useState(0);
    const [getTableWidth, setTableWidth] = useState(13);
    const [getTableHeight, setTableHeight] = useState(13);
    const [getUpdateTableWidth, setUpdateTableWidth] = useState(getTableHeight);
    const [getUpdateTableHeight, setUpdateTableHeight] = useState(getTableHeight);
    const [getMinesToGenerate, setMinesToGenerate] = useState(30);
    const [getDisplayedMines, setDisplayedMines] = useState(getMinesToGenerate);
    let [getGameStarted, setGameStarted] = useState(0);
    let [getGameLoss, setGameLoss] = useState(0);
    let [getMines, setMines] = useState<number[]>([]);
    let [getMineField, setMineField] = useState<any[][]>(Array(getTableHeight).fill(null).map(() => Array(getTableWidth).fill(0)));
    let [getShownMineField, setShownMineField] = useState<any[][]>(Array(getTableHeight).fill(null).map(() => Array(getTableWidth).fill("")));

    const createMineField = (rowIndex: number, colIndex: number) => {

        let fieldClicked = ((rowIndex*getTableWidth)+ colIndex);

        const mines = [...getMines];

        let minesToGenerate = getMinesToGenerate;

        if(getMinesToGenerate > (getTableWidth*getTableHeight-9)){
            setMinesToGenerate(getTableWidth*getTableHeight-9);
            minesToGenerate = getTableWidth*getTableHeight-9;
        }

        if(mines.length < minesToGenerate){
            for(let n = 0; n < minesToGenerate; n++){
                let randNumber = Math.floor(Math.random() * (getTableHeight * getTableWidth));
                if (!mines.includes(randNumber) && randNumber !== fieldClicked && randNumber !== fieldClicked-1 && randNumber !== fieldClicked+1 && randNumber !== fieldClicked-getTableWidth && randNumber !== (fieldClicked-getTableWidth)-1 && randNumber !== (fieldClicked-getTableWidth)+1 && randNumber !== fieldClicked+getTableWidth && randNumber !== (fieldClicked+getTableWidth)-1 && randNumber !== (fieldClicked+getTableWidth)+1) {
                    mines.push(randNumber);
                } else {
                    n--;
                }
            }
        }
        setMines(mines);

        console.log(mines);

        let countMinePlacements = 0;
        const newMineField = getMineField.map(row => [...row]);
        for(let n = 0; n < getTableHeight; n++){
            for(let i = 0; i < getTableWidth; i++){
                if(mines.includes(countMinePlacements)){
                    newMineField[n][i] = "*";
                }
                countMinePlacements++;
            }
        }

        let countIterations = 0;
        let maxHeight = getTableHeight - 1;
        let maxWidth = getTableWidth - 1;

        for(let n = 0; n < getTableHeight; n++){
            for(let i = 0; i < getTableWidth; i++){

                if(newMineField[n][i] === "*"){
                    if(i !== 0 && newMineField[n][i-1] !== "*") newMineField[n][i-1] += 1;
                    if(i !== maxWidth && newMineField[n][i+1] !== "*") newMineField[n][i+1] += 1;

                    if(n !== 0){
                        if(i !== 0 && n !== 0 && newMineField[n-1][i-1] !== "*") newMineField[n-1][i-1] += 1;
                        if(i !== maxWidth && n !== 0 && newMineField[n-1][i+1] !== "*") newMineField[n-1][i+1] += 1;
                        if(n !== 0 && newMineField[n-1][i] !== "*") newMineField[n-1][i] += 1;
                    }

                    if(n !== maxHeight){
                        if(i !== 0 && n !== maxHeight && newMineField[n+1][i-1] !== "*") newMineField[n+1][i-1] += 1;
                        if(i !== maxWidth && n !== maxHeight && newMineField[n+1][i+1] !== "*") newMineField[n+1][i+1] += 1;
                        if( n !== maxHeight && newMineField[n+1][i] !== "*") newMineField[n+1][i] += 1;
                    }
                }

                countIterations++;
                if(getMines.length === countIterations) break;
            }
        }
        setMineField(newMineField);
        setShownMineField(Array(getTableHeight).fill(null).map(() => Array(getTableWidth).fill(" ")));
        console.log(newMineField);

        uncoverField(newMineField, rowIndex, colIndex);

        setGameStarted(1);
    }

    const uncoverField = (newMineField: number[][], rowIndex: number, colIndex: number) => {

        const updatedMineField = getShownMineField.map(row => [...row]);

        let MineField = newMineField;

        if(newMineField === getShownMineField){
            MineField = getMineField;
        }

        if(updatedMineField[rowIndex][colIndex] === "F"){
            return;
        }

        updatedMineField[rowIndex][colIndex] = MineField[rowIndex][colIndex];

        if(updatedMineField[rowIndex][colIndex] === "*"){
            handleGameLoss();

            let lossMineField= [...getShownMineField];

            for(let n = 0; n < getTableHeight; n++){
                for(let i = 0; i < getTableWidth; i++){
                    if(getMineField[n][i] === "*"){
                        lossMineField[n][i] = "*";
                    }
                }
            }

            setShownMineField(lossMineField);
            return;
        }

        showAllEmpty(updatedMineField, MineField);
        setShownMineField(updatedMineField);

        checkGameWon(updatedMineField);
    }

    const showAllEmpty = (updatedMineField: any[][], MineField: number[][]) => {

        let maxHeight = getTableHeight - 1;
        let loop = true;

        while (loop){
            loop = false;
            for(let n = 0; n < getTableHeight; n++){
                for(let i = 0; i < getTableWidth; i++){
                    if(updatedMineField[n][i] === 0){
                        if(updatedMineField[n][i-1] !== 0 && MineField[n][i-1] === 0) loop = true;
                        if(i !== 0 && updatedMineField[n][i-1] !== "F") updatedMineField[n][i-1] = MineField[n][i-1];
                        if(updatedMineField[n][i+1] !== 0 && MineField[n][i+1] === 0) loop = true;
                        if(i !== maxHeight && updatedMineField[n][i+1] !== "F") updatedMineField[n][i+1] = MineField[n][i+1];

                        if(n !== 0) {
                            if(updatedMineField[n - 1][i - 1] !== 0 && MineField[n - 1][i - 1] === 0) loop = true;
                            if(i !== 0 && updatedMineField[n-1][i-1] !== "F") updatedMineField[n - 1][i - 1] = MineField[n - 1][i - 1];
                            if(updatedMineField[n - 1][i] !== 0 && MineField[n - 1][i] === 0) loop = true;
                            if(updatedMineField[n-1][i] !== "F") updatedMineField[n - 1][i] = MineField[n - 1][i];
                            if(updatedMineField[n - 1][i + 1] !== 0 && MineField[n - 1][i + 1] === 0) loop = true;
                            if(i !== maxHeight && updatedMineField[n-1][i+1] !== "F") updatedMineField[n - 1][i + 1] = MineField[n - 1][i + 1];
                        }

                        if(n !== maxHeight){
                            if(updatedMineField[n+1][i-1] !== 0 && MineField[n+1][i-1] === 0) loop = true;
                            if(i !== 0 && updatedMineField[n+1][i-1] !== "F") updatedMineField[n+1][i-1] = MineField[n+1][i-1];
                            if(updatedMineField[n+1][i] !== 0 && MineField[n+1][i] === 0) loop = true;
                            if(updatedMineField[n+1][i] !== "F") updatedMineField[n+1][i] = MineField[n+1][i];
                            if(updatedMineField[n+1][i+1] !== 0 && MineField[n+1][i+1] === 0) loop = true;
                            if(i !== maxHeight && updatedMineField[n+1][i+1] !== "F") updatedMineField[n+1][i+1] = MineField[n+1][i+1];
                        }
                    }
                }
            }
        }
    }

    const handleRightClick = (event: any, rowIndex: number, colIndex: number) => {
        event.preventDefault();

        let displayMines = getDisplayedMines;

        let updateShowMine = [...getShownMineField];

        if(updateShowMine[rowIndex][colIndex] === "F"){
            updateShowMine[rowIndex][colIndex] = "";
            displayMines++;
        } else {
            updateShowMine[rowIndex][colIndex] = "F";
            displayMines--;
        }

        setDisplayedMines(displayMines);
        setShownMineField(updateShowMine);
    };

    const checkGameWon = (updatedMineField: any[][]) => {

        let openedFieldCounter = 0;

        for(let n = 0; n < getTableHeight; n++){
            for(let i = 0; i < getTableWidth; i++){

                if(updatedMineField[n][i] !== "" && updatedMineField[n][i] !== "F"){
                    openedFieldCounter++;
                }
            }
        }

        if(openedFieldCounter === (getTableHeight*getTableWidth)-getMinesToGenerate){
            handleGameWon();

            let wonMineField= [...getMineField];

            for(let n = 0; n < getTableHeight; n++){
                for(let i = 0; i < getTableWidth; i++){
                    if(getMineField[n][i] === "*"){
                        wonMineField[n][i] = "F";
                    }
                }
            }

            setShownMineField(wonMineField);
        }
    }

    const handleGameWon = () => {
        alert("congrats!");
        setGameLoss(1);
        setGameStarted(0);
    }

    const handleGameLoss = () => {
        setGameLoss(1);
        setGameStarted(0);
    }

    const handleGameRestart = () => {
        setGameLoss(1);
        setGameStarted(0);
        setGameLoss(0);
        setMines([]);
        setDisplayedMines(getMinesToGenerate);
        setTableWidth(getUpdateTableWidth);
        setTableHeight(getUpdateTableHeight);
        setMineField(Array(getUpdateTableHeight).fill(null).map(() => Array(getUpdateTableWidth).fill(0)));
        setShownMineField(Array(getUpdateTableHeight).fill(null).map(() => Array(getUpdateTableWidth).fill("")));
    }

    const invisible = () => {
        if(getInvisible === 1){
            setInvisible(0);
        } else {
            setInvisible(1);
        }
    }

    const getColor = (symbol: any) => {

        switch(symbol){
            case "*": return "black";
                break;
            case 1: return "blue";
                break;
            case 2: return "green";
                break;
            case 3: return "red";
                break;
            case 4: return "darkblue";
                break;
            case 5: return "darkred";
                break;
            case 6: return "#008B8B";
                break;
            case 7: return "black";
                break;
            case 8: return "gray";
                break;
            case "F": return "darkred";
                break;
            default: return "gray";
        }
    }

    const renderTable = () => {

        return Array.from({ length: getTableHeight }).map((_, rowIndex) => (
            <tr key={rowIndex}>
                {Array.from({ length: getTableWidth }).map((_, colIndex) => (
                    <td key={colIndex}>
                        <MineButton name={getMineField[rowIndex][colIndex]} disabled={(getShownMineField[rowIndex][colIndex] !== "" || getGameLoss === 1) && getShownMineField[rowIndex][colIndex] !== "F"} style={{ color: getColor(getShownMineField[rowIndex][colIndex]), fontWeight: "bold"}}
                                    onClick={getGameStarted == 0 ? () => createMineField(rowIndex, colIndex) : () => uncoverField(getShownMineField, rowIndex, colIndex)} onContextMenu={(event) => handleRightClick(event, rowIndex, colIndex)}
                        >{getInvisible === 1 ? getMineField[rowIndex][colIndex] : getShownMineField[rowIndex][colIndex]}</MineButton>
                    </td>
                ))}
            </tr>
        ));
    }

    return(
        <>

            <label>Table Width</label>
            <input type={"number"} value={getUpdateTableWidth}
                   onChange={e => setUpdateTableWidth(e.target.valueAsNumber)}></input>
            <label>Table Height</label>
            <input type={"number"} value={getUpdateTableHeight}
                   onChange={e => setUpdateTableHeight(e.target.valueAsNumber)}></input>
            <label>Mines in the Game</label>
            <input type={"number"} value={getMinesToGenerate}
                   onChange={e => setMinesToGenerate(e.target.valueAsNumber)}></input>
            <button onClick={handleGameRestart}>Restart Game</button>


            <button hidden={true} onClick={invisible}>invisible mode</button>

            <input disabled={true} value={getDisplayedMines}/>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <table style={{border: "1px solid gray"}}>
                    <tbody>
                    {renderTable()}
                    </tbody>
                </table>
            </div>
        </>
    );
}

const MineButton = styled('button')`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;