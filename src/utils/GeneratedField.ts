import { useGameSettings } from "../context/GameContext";
import { CreateField } from "./CreateField";

export function GeneratedField() {

    const {
        getCurrentTableWidth,
        getCurrentTableHeight,
        getMineField,
        getPreGeneratedField,
        getHeightIndex,
        getWidthIndex,
        setMineField,
        setGameStateStarted,
        setAlertModalOpen,
        setAlertModalText
    } = useGameSettings();

    const { uncoverField } = CreateField(); 

    const checkGeneratedFieldForValidity = () => {

        let checkPreGeneratedFieldArray = getPreGeneratedField.split("_");

        if(checkPreGeneratedFieldArray.length !== 5){
            console.log("check-array-length");
            return false;
        }

        console.log(checkPreGeneratedFieldArray[0].trim());

        if(!/^[0-9]+$/.test(checkPreGeneratedFieldArray[0].trim())){
            console.log("check-height-isnumber");
            return false;
        }

        if(!/^[0-9]+$/.test(checkPreGeneratedFieldArray[1].trim())){
            console.log("check-width-isnumber");
            return false;
        }

        if(!/^[0-9]+$/.test(checkPreGeneratedFieldArray[2].trim())){
            console.log("check-position-height-isnumber");
            return false;
        }

        if(!/^[0-9]+$/.test(checkPreGeneratedFieldArray[3].trim())){
            console.log("check-position-width-isnumber");
            return false;
        }

        let numericTableHeight = Number(checkPreGeneratedFieldArray[0]);
        let numericTableWidth= Number(checkPreGeneratedFieldArray[1])

        if(getCurrentTableHeight !== numericTableHeight) {
            console.log("check-position-height-matchesfield");
            return;
        }

        if(getCurrentTableWidth !== numericTableWidth) {
            console.log("check-position-width-matchesfield");
            return;
        }
    
        if(numericTableHeight < Number(checkPreGeneratedFieldArray[2])){
            console.log("check-position-height-islower");
            return false;
        }

        if(numericTableWidth < Number(checkPreGeneratedFieldArray[3])){
            console.log("check-position-width-islower");
            return false;
        }

        if(checkPreGeneratedFieldArray[4].length !== (numericTableHeight * numericTableWidth)){
            console.log("check-mine-length");
            return false;
        }

        if(!/^[0-9]+$/.test(checkPreGeneratedFieldArray[4].trim())){
            console.log("check-mine-isnumber");
            return false;
        }

        return true;
    }

    const getGeneratedField = () => {

        let mineFieldToBeTransformed = "";
        let setMineValue = 9;

        mineFieldToBeTransformed += getCurrentTableHeight + "_";
        mineFieldToBeTransformed += getCurrentTableWidth + "_";
        mineFieldToBeTransformed += getHeightIndex + "_";
        mineFieldToBeTransformed += getWidthIndex + "_";

        for(let i = 0; i < getCurrentTableHeight; i++){
            for(let n = 0; n < getCurrentTableWidth; n++){  
                mineFieldToBeTransformed += getMineField[i][n] == "*" ? setMineValue : getMineField[i][n];
            }
        }
        
        navigator.clipboard.writeText(mineFieldToBeTransformed)
        .then(() => {
            setAlertModalText("Field Code Copied To Clipboard");
            setAlertModalOpen(true);
        })
        .catch(() => {
            setAlertModalText("Failed to Copy Field Code");
            setAlertModalOpen(true);
        });

        console.log(mineFieldToBeTransformed);
    }

    const renderGeneratedField = () => {

        if(!checkGeneratedFieldForValidity()) {
            alert("Schema does not match");
            return;
        }

        let preGeneratedFieldArray = getPreGeneratedField.split("_");
    
        let newMineField: string[] = [];
    
        let tableHeight = Number(preGeneratedFieldArray[0]);
        let tableWidth = Number(preGeneratedFieldArray[1]);
        let startingHeight = Number(preGeneratedFieldArray[2]);
        let startingWidth = Number(preGeneratedFieldArray[3]);

        let newNewMineField: any[][] = Array.from({ length: tableHeight }, () => []);
    
        let RowPositionStart = 0;
        let RowPositionEnd = tableWidth;
        
        for(let i = 0; i < tableHeight; i++){
            newMineField[i] = preGeneratedFieldArray[4].slice(RowPositionStart, RowPositionEnd);
            RowPositionStart += tableWidth;
            RowPositionEnd += tableWidth;
        }

        let value;

        for(let a = 0; a < tableHeight; a++){
            for(let n = 0; n < tableWidth; n++){  
                value = newMineField[a].split("");
                newNewMineField[a][n] = Number(value[n]) == 9 ? "*" : Number(value[n]);
            }
        }

        if(newNewMineField[startingHeight][startingWidth] !== 0) {
            alert("Schema does not match");
            return;
        }
        
        setGameStateStarted(true);

        setMineField(newNewMineField);

        uncoverField(newNewMineField, startingHeight, startingWidth);
    }

    return { getGeneratedField, renderGeneratedField };
}