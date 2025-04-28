import { Input, Sheet, DialogTitle, Drawer, ModalClose } from '@mui/joy';
import { useGameSettings, sanitizeNumberInput } from '../context/GameContext';
import { CreateField } from '../utils/CreateField';
import { GeneratedField } from '../utils/GeneratedField';
import { AlternativeButton } from './AlternativeButton';

export function SettingsDrawer () {

    const { getGeneratedField } = GeneratedField();
    const { handleGameRestart } = CreateField();

    const {
        getDrawerOpen,
        getUpdateTableWidth,
        getUpdateTableHeight,
        getMinesToGenerate,
        getGameStateStarted,
        getGameStateLoss,
        setUpdateTableWidth,
        setUpdateTableHeight,
        setMinesToGenerate,
        setRenderGeneratedFieldModalOpen,
        setDrawerOpen
    } = useGameSettings();

    const openRenderGeneratedField = () => {
        handleGameRestart();
        setRenderGeneratedFieldModalOpen(true);
    }

    const applyChanges = () => {
        handleGameRestart();
        setDrawerOpen(false);
    }

    return(
        <Drawer 
            size="md"
            variant="plain"
            open={getDrawerOpen} 
            onClose={() => setDrawerOpen(false)}
            slotProps={{
                content: {
                    sx: {
                    bgcolor: 'transparent',
                    p: { md: 2, sm: 0 },
                    boxShadow: 'none',
                    },
                }, 
            }}>

            <Sheet 
                sx={{
                    borderRadius: 'md',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    height: '100%',
                    overflow: 'auto',
                }}>

                <DialogTitle>Mine Field Settings</DialogTitle>
                <ModalClose />
            
                Table Width
                <Input type={"number"} value={getUpdateTableWidth}
                    onChange={e => setUpdateTableWidth(sanitizeNumberInput(e.target.valueAsNumber))}></Input>

                Table Height
                <Input type={"number"} value={getUpdateTableHeight}
                    onChange={e => setUpdateTableHeight(sanitizeNumberInput(e.target.valueAsNumber))}></Input>

                <label>Mines</label>
                <Input type={"number"} value={getMinesToGenerate}
                    onChange={e => setMinesToGenerate(sanitizeNumberInput(e.target.valueAsNumber))}></Input>

                <AlternativeButton onClick={openRenderGeneratedField}>Set Field Code</AlternativeButton>

                { getGameStateStarted || getGameStateLoss ? 
                <>
                    <AlternativeButton onClick={getGeneratedField}>Get Field Code</AlternativeButton>
                </>
                : 
                <></>
                }

                <AlternativeButton onClick={applyChanges}>Apply Changes</AlternativeButton>

            </Sheet>
        </Drawer>
    );
}

