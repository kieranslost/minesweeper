import { useGameSettings } from "../context/GameContext";

export function Timer() {

    const {
        getIntervalId,
        setIntervalId,
        setTimer
    } = useGameSettings();

    var timer = 0;

    const updateTimer = () => {
        timer += 1;
        setTimer(timer);
    }

    const stopTimer = () => {
        if(getIntervalId){
            clearInterval(getIntervalId);
            setIntervalId(null);
        }
    }

    return { updateTimer, stopTimer };
}