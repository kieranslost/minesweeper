import { MineFieldButton } from "../components/MineFieldButton";
import { useGameSettings } from "../context/GameContext";
import { CreateField } from "./CreateField";

export function RenderTable() {

    const {
        getCurrentTableWidth,
        getCurrentTableHeight,
        getMineField,
        getShownMineField,
        getGameStateLoss,
        getGameStateStarted,
        getInvisible,
        getDisplayedMines,
        getTableDataIsCorrect,
        setShownMineField,
        setDisplayedMines,
    } = useGameSettings();

    const { createMineField, uncoverField } = CreateField();

    const handleRightClick = (event: any, rowIndex: number, colIndex: number) => {

        event.preventDefault();

        if(getShownMineField[rowIndex][colIndex] !== "" && getShownMineField[rowIndex][colIndex] !== "F"){
            return;
        }

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

    const getCharacterSize = (symbol: any) => {
        if(symbol === "*") {
            return "20px";
        }
        return "14px";
    }

    const getColor = (symbol: any) => {

        switch(symbol){
            case "*": return "black";
            case 0: return "gray";
            case 1: return "blue";
            case 2: return "green";
            case 3: return "red";
            case 4: return "darkblue";
            case 5: return "darkred";
            case 6: return "#008B8B";
            case 7: return "black";
            case 8: return "gray";
            case "F": return "#C33C54";
            default: return "gray";
        }
    }

    return (
        <>
            { getTableDataIsCorrect &&
                Array.from({ length: getCurrentTableHeight }).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        {Array.from({ length: getCurrentTableWidth }).map((_, colIndex) => (
                            <td key={colIndex}>
                                    <MineFieldButton name={getShownMineField[rowIndex][colIndex]} 
                                    disabled={(getShownMineField[rowIndex][colIndex] !== "" || getGameStateLoss) && getShownMineField[rowIndex][colIndex] !== "F"} 
                                    style={{ color: getColor(getShownMineField[rowIndex][colIndex]), fontSize: getCharacterSize(getShownMineField[rowIndex][colIndex]), fontWeight: "bold" }}
                                    onClick={getGameStateStarted ? () => uncoverField(getShownMineField, rowIndex, colIndex): () => createMineField(rowIndex, colIndex)} 
                                    onContextMenu={(event: any) => handleRightClick(event, rowIndex, colIndex)}
                                >{getInvisible ? getMineField[rowIndex][colIndex] : getShownMineField[rowIndex][colIndex]}</MineFieldButton>
                            </td>
                        ))}
                    </tr>
                ))
            }
        </>
    );
}