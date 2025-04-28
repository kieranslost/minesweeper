import { Typography, Modal, ModalDialog } from '@mui/joy';
import { useGameSettings } from '../context/GameContext';
import { AlternativeButton } from './AlternativeButton';

export function AlertModal ({ open, onClose }: { open: boolean; onClose: () => void }) {

    const {
        getAlertModalText
    } = useGameSettings();

    return(
        <Modal open={open} onClose={onClose}>
            <ModalDialog>
                <Typography>{getAlertModalText}</Typography>
                <AlternativeButton onClick={() => onClose()}>Close</AlternativeButton>
            </ModalDialog>
        </Modal>
    );
}