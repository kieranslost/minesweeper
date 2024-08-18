import styled from "styled-components";
import {useState} from "react";

export function CreateField(){

    let [getInvisible, setInvisible] = useState(1);
    const [tableWidth, setTableWidth] = useState(10);
    const [tableHeight, setTableHeight] = useState(10);
    let [getMines, setMines] = useState<number[]>([]);
    let [getMineField, setMineField] = useState<any[][]>(Array(tableHeight).fill(null).map(() => Array(tableWidth).fill(0)));

    const createMineField = () => {

        const mines = [...getMines];

        if(mines.length < 25){
            for(let n = 0; n <= 25; n++){
                let randNumber = Math.floor(Math.random() * (tableHeight * tableWidth));
                if (!mines.includes(randNumber)) {
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
        for(let n = 0; n < tableHeight; n++){
            for(let i = 0; i < tableWidth; i++){
                if(mines.includes(countMinePlacements)){
                    newMineField[n][i] = "*";
                }
                countMinePlacements++;
            }
        }

        let countIterations = 0;

        for(let n = 0; n < tableHeight; n++){
            for(let i = 0; i < tableWidth; i++){

                if(newMineField[n][i] === "*"){

                    //Add one to the fields next to the mine
                    if(i !== 0 && newMineField[n][i-1] !== "*") newMineField[n][i-1] += 1;
                    if(i !== 9 && newMineField[n][i+1] !== "*") newMineField[n][i+1] += 1;


                    if(n !== 0){
                        if(i !== 0 && newMineField[n-1][i-1] !== "*") newMineField[n-1][i-1] += 1;
                        if(i !== 9 && newMineField[n-1][i+1] !== "*") newMineField[n-1][i+1] += 1;
                        if(newMineField[n-1][i] !== "*") newMineField[n-1][i] += 1;
                    }

                    if(n !== 9){
                        if(i !== 0 && newMineField[n+1][i-1] !== "*") newMineField[n+1][i-1] += 1;
                        if(i !== 9 && newMineField[n+1][i+1] !== "*") newMineField[n+1][i+1] += 1;
                        if(newMineField[n+1][i] !== "*") newMineField[n+1][i] += 1;
                    }
                }

                countIterations++;
                if(getMines.length === countIterations) break;
            }
        }
        setMineField(newMineField);
        console.log(newMineField);
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
            default: return "gray";
        }
    }

    const renderTable = () => {

        return Array.from({ length: tableHeight }).map((_, rowIndex) => (
            <tr key={rowIndex}>
                {Array.from({ length: tableWidth }).map((_, colIndex) => (
                    <td key={colIndex}>
                        <MineButton
                            style={{ color: getColor(getMineField[rowIndex][colIndex]), fontWeight: "bold"}}
                        >{getInvisible === 1 ? getMineField[rowIndex][colIndex] : ""}</MineButton>
                    </td>
                ))}
            </tr>
        ));
    }

    return(
        <>
            <button onClick={createMineField}>TestButton</button>
            <button onClick={renderTable}>TestButton2</button>
            <button onClick={invisible}>invisible mode</button>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <table style={{border: "1px solid gray", padding: "1px"}}>
                    <tbody>
                    {renderTable()}
                    </tbody>
                </table>
            </div>
        </>
    );
}

const MineButton = styled('button')`
    padding: 10px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;