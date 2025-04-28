import { useGameSettings } from "../context/GameContext";
import { Timer } from "./Timer";

export function CreateField() {

    const {
        getCurrentTableWidth,
        getCurrentTableHeight,
        getUpdateTableWidth,
        getUpdateTableHeight,
        getMinesToGenerate,
        getMineField,
        getShownMineField,
        getMines,
        getIntervalId,
        setCurrentTableWidth,
        setCurrentTableHeight,
        setMinesToGenerate,
        setMineField,
        setShownMineField,
        setGameStateLoss,
        setGameStateStarted,
        setDisplayedMines,
        setMines,
        setHeightIndex,
        setWidthIndex,
        setTimer,
        setTableDataIsCorrect,
        setIntervalId,
        setAlertModalOpen,
        setAlertModalText
    } = useGameSettings();

    const { updateTimer, stopTimer } = Timer();

    const createMineField = (rowIndex: number, colIndex: number) => {   

        setHeightIndex(rowIndex);
        setWidthIndex(colIndex);

        let fieldClicked = ((rowIndex*getCurrentTableWidth)+ colIndex)

        const mines = [...getMines];

        const totalCells = getCurrentTableWidth*getCurrentTableHeight;

        let minesToGenerate = getMinesToGenerate;
        if(getMinesToGenerate > (totalCells-9)){
            setMinesToGenerate(minesToGenerate);
        }

        const allPositions = Array.from({ length: totalCells }, (_, i) => i);

        const excludedPositions = new Set([
            fieldClicked,
            fieldClicked - 1,
            fieldClicked + 1,
            fieldClicked - getCurrentTableWidth,
            (fieldClicked - getCurrentTableWidth) - 1,
            (fieldClicked - getCurrentTableWidth) + 1,
            fieldClicked + getCurrentTableWidth,
            (fieldClicked + getCurrentTableWidth) - 1,
            (fieldClicked + getCurrentTableWidth) + 1
        ]);

        const availablePositions = allPositions.filter(positions => 
          !excludedPositions.has(positions) && !mines.includes(positions)
        );

        for (let i = availablePositions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availablePositions[i], availablePositions[j]] = [availablePositions[j], availablePositions[i]];
        }

        const minesToAdd = minesToGenerate - mines.length;
        mines.push(...availablePositions.slice(0, minesToAdd));

        setMines(mines);

        //console.log(mines);

        let countMinePlacements = 0;
        const newMineField = getMineField.map(row => [...row]);
        for(let n = 0; n < getCurrentTableHeight; n++){
            for(let i = 0; i < getCurrentTableWidth; i++){
                if(mines.includes(countMinePlacements)){
                    newMineField[n][i] = "*";
                }
                countMinePlacements++;
            }
        }

        let countIterations = 0;
        let maxHeight = getCurrentTableHeight - 1;
        let maxWidth = getCurrentTableWidth - 1;

        for(let n = 0; n < getCurrentTableHeight; n++){
            for(let i = 0; i < getCurrentTableWidth; i++){

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
        setShownMineField(Array(getCurrentTableHeight).fill(null).map(() => Array(getCurrentTableWidth).fill(" ")));
        
        //console.log(newMineField);

        uncoverField(newMineField, rowIndex, colIndex);

        setGameStateStarted(true);

        setIntervalId(setInterval(updateTimer, 1000));
    }

    const uncoverField = (newMineField: number[][], rowIndex: number, colIndex: number) => {

        const updatedMineField = [...getShownMineField.map(row => [...row])];

        let MineField = newMineField;

        if(newMineField === getShownMineField){
            MineField = getMineField;
        }

        if(updatedMineField[rowIndex][colIndex] === "F"){
            return;
        }

        updatedMineField[rowIndex][colIndex] = MineField[rowIndex][colIndex];

        if(updatedMineField[rowIndex][colIndex] === "*"){
            handleGameWonLoss(false);

            let lossMineField= [...getShownMineField];

            for(let n = 0; n < getCurrentTableHeight; n++){
                for(let i = 0; i < getCurrentTableWidth; i++){
                    if(getMineField[n][i] === "*"){
                        lossMineField[n][i] = "*";
                    }
                }
            }

            setShownMineField(lossMineField);
            return;
        }

        if(updatedMineField[rowIndex][colIndex] === 0) {
            showAllEmpty(updatedMineField, MineField);
        }
        setShownMineField(updatedMineField);

        checkGameWon(updatedMineField);
    }

    const showAllEmpty = (updatedMineField: any[][], MineField: number[][]) => {

        let maxHeight = getCurrentTableHeight - 1;
        let loop = true;
        let inLoopFor = 0;

        while (loop){
            inLoopFor += 1;
            loop = false;
            for(let n = 0; n < getCurrentTableHeight; n++){
                for(let i = 0; i < getCurrentTableWidth; i++){
                    
                    if(updatedMineField[n][i] === 0){
                        if(updatedMineField[n][i-1] !== 0 && MineField[n][i-1] === 0) loop = true;
                        if(i !== 0 && updatedMineField[n][i-1] !== "F") updatedMineField[n][i-1] = MineField[n][i-1];
                        if(updatedMineField[n][i+1] !== 0 && MineField[n][i+1] === 0) loop = true;
                        if(updatedMineField[n][i+1] !== "F") updatedMineField[n][i+1] = MineField[n][i+1];

                        if(n !== 0) {
                            if(updatedMineField[n - 1][i - 1] !== 0 && MineField[n - 1][i - 1] === 0) loop = true;
                            if(i !== 0 && updatedMineField[n-1][i-1] !== "F") updatedMineField[n - 1][i - 1] = MineField[n - 1][i - 1];
                            if(updatedMineField[n - 1][i] !== 0 && MineField[n - 1][i] === 0) loop = true;
                            if(updatedMineField[n-1][i] !== "F") updatedMineField[n - 1][i] = MineField[n - 1][i];
                            if(updatedMineField[n - 1][i + 1] !== 0 && MineField[n - 1][i + 1] === 0) loop = true;
                            if(updatedMineField[n-1][i+1] !== "F") updatedMineField[n - 1][i + 1] = MineField[n - 1][i + 1];
                        }

                        if(n !== maxHeight){
                            if(updatedMineField[n+1][i-1] !== 0 && MineField[n+1][i-1] === 0) loop = true;
                            if(i !== 0 && updatedMineField[n+1][i-1] !== "F") updatedMineField[n+1][i-1] = MineField[n+1][i-1];
                            if(updatedMineField[n+1][i] !== 0 && MineField[n+1][i] === 0) loop = true;
                            if(updatedMineField[n+1][i] !== "F") updatedMineField[n+1][i] = MineField[n+1][i];
                            if(updatedMineField[n+1][i+1] !== 0 && MineField[n+1][i+1] === 0) loop = true;
                            if(updatedMineField[n+1][i+1] !== "F") updatedMineField[n+1][i+1] = MineField[n+1][i+1];
                        }
                    }
                }
            }

            // Failsafe
            if(inLoopFor > 1000){
                setAlertModalOpen(true);
                setAlertModalText("Error: Something went wrong");
                loop = false;
            }
        }
    }

    const checkTableData = () => {

        var wrongData = false;

        if(getUpdateTableHeight === null || getUpdateTableHeight === 0){
            setAlertModalOpen(true);
            setAlertModalText("Error: Table height cannot be zero");
            wrongData = true;
        }

        if(getUpdateTableWidth === null || getUpdateTableWidth === 0){
            setAlertModalOpen(true);
            setAlertModalText("Error: Table width cannot be zero");
            wrongData = true;
        }

        if(getMinesToGenerate === null || getMinesToGenerate === 0){
            setAlertModalOpen(true);
            setAlertModalText("Error: Mine Number cannot be null");
            wrongData = true;
        }

        if(wrongData){
            setTableDataIsCorrect(false);
        }
        
        setTableDataIsCorrect(true);
        return true;
    }

    const checkGameWon = (updatedMineField: any[][]) => {

        let openedFieldCounter = 0;

        for(let n = 0; n < getCurrentTableHeight; n++){
            for(let i = 0; i < getCurrentTableWidth; i++){

                if(updatedMineField[n][i] !== "" && updatedMineField[n][i] !== "F"){
                    openedFieldCounter++;
                }
            }
        }

        if(openedFieldCounter === (getCurrentTableHeight*getCurrentTableWidth)-getMinesToGenerate){
            handleGameWonLoss(true);

            let wonMineField = [...getMineField];

            for(let n = 0; n < getCurrentTableHeight; n++){
                for(let i = 0; i < getCurrentTableWidth; i++){
                    if(getMineField[n][i] === "*"){
                        wonMineField[n][i] = "F";
                    }
                }
            }

            setShownMineField(wonMineField);
        }
    }

    const handleGameWonLoss = (status: boolean) => {
        if(status) {
            setAlertModalOpen(true);
            setAlertModalText("congrats!");
        }
        stopTimer();
        setGameStateLoss(true);
        setGameStateStarted(false);
    }

    const handleGameRestart = () => {
        if(!checkTableData()) return;
        stopTimer();
        setTimer(0);
        setGameStateLoss(true);
        setGameStateStarted(false);
        setGameStateLoss(false);
        setMines([]);
        setDisplayedMines(getMinesToGenerate);
        setCurrentTableWidth(getUpdateTableWidth);
        setCurrentTableHeight(getUpdateTableHeight);
        setMineField(Array(getUpdateTableHeight).fill(null).map(() => Array(getUpdateTableWidth).fill(0)));
        setShownMineField(Array(getUpdateTableHeight).fill(null).map(() => Array(getUpdateTableWidth).fill("")));
    }

    return { createMineField, uncoverField, handleGameRestart };
}