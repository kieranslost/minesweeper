import { Input, Typography, Modal, ModalDialog } from '@mui/joy';
import { useGameSettings } from '../context/GameContext';
import { AlternativeButton } from './AlternativeButton';
import { GeneratedField } from "../utils/GeneratedField";
    
export function RenderGeneratedFieldModal ({ open, onClose }: { open: boolean; onClose: () => void }) {

    const {
        getPreGeneratedField,
        setPreGeneratedField,
        setDrawerOpen
    } = useGameSettings();

    const { renderGeneratedField } = GeneratedField();

    const handleRenderGeneratedField = () => {
        renderGeneratedField(); 
        setDrawerOpen(false);
        onClose();
    }

    return(

        <Modal open={open} onClose={onClose}>
            <ModalDialog>
                <Typography>Enter Field Code</Typography>
                <Input value={getPreGeneratedField} onChange={e => setPreGeneratedField(e.target.value)}></Input>
                <AlternativeButton onClick={handleRenderGeneratedField}>Set Field Code</AlternativeButton>
            </ModalDialog>
        </Modal>
    );
}