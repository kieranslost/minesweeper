import { useEffect, useState } from "react";
import { useGameSettings } from "../context/GameContext";
import { RenderTable } from "../utils/RenderTable";
import { GeneratedField } from "../utils/GeneratedField";
import { RenderGeneratedFieldModal } from "../components/RenderGeneratedFieldModal";
import { AlternativeButton } from "../components/AlternativeButton";
import { AlertModal } from "../components/AlertModal";
import { SettingsDrawer } from "../components/SettingsDrawer";
import { Box, Card } from "@mui/joy";
import { CreateField } from "../utils/CreateField";
import { Timer } from "../utils/Timer";

export function DisplayField() {

    const {
        getDisplayedMines,
        getAlertModalOpen,
        getRenderGeneratedFieldModalOpen,
        getTimer,
        getIntervalId,
        setAlertModalOpen,
        setRenderGeneratedFieldModalOpen,
        setDrawerOpen,
    } = useGameSettings();

    const { handleGameRestart } = CreateField();

    const { stopTimer } = Timer();

    useEffect(() => {
        if(getTimer >= 999 && getIntervalId){
            stopTimer();
        }
    }, [getTimer]);

    return(
        <>        
            <AlternativeButton onClick={() => setDrawerOpen(true)} sx={{position: "absolute", left: "25px", top: "28px", width: "233px", }}>Open Mine Field Settings</AlternativeButton>

            <Card 
                sx={{
                    gap: 1,
                    width: 500,
                    border: "none",
                    flexDirection: "row",
                    display: "inline-flex",
                    textAlign: "center",
                    margin: "30px"
                }}>
                <Box sx={{
                    height: 40,
                    width: 200,
                    borderRadius: 5,
                    bgcolor: "white",
                    color: "black",
                    border: "1px solid #2A5778",
                    alignContent: "center"
                    }}> {getDisplayedMines} 
                </Box>
                <AlternativeButton sx={{ width: 233 }} onClick={handleGameRestart}>Restart</AlternativeButton>
                <Box sx={{
                    height: 40,
                    width: 200,
                    borderRadius: 5,
                    bgcolor: "white",
                    color: "black",
                    border: "1px solid #2A5778",
                    alignContent: "center"
                    }}> {getTimer}
                </Box>
            </Card>

            <table style={{backgroundColor: "#fff", borderRadius: "5px", margin: "10px auto"}}>
                <tbody>
                    <RenderTable></RenderTable>
                </tbody>
            </table>

            <AlertModal 
                open={getAlertModalOpen}
                onClose={() => setAlertModalOpen(false)}></AlertModal>

            <RenderGeneratedFieldModal
                open={getRenderGeneratedFieldModalOpen}
                onClose={() => setRenderGeneratedFieldModalOpen(false)}></RenderGeneratedFieldModal>

            <SettingsDrawer></SettingsDrawer>
        </>
    );
}
