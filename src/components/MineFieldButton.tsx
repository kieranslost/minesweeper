import { Button, styled} from '@mui/joy';

export const MineFieldButton = styled(Button)<{ name?: string }>`
            
    background-color: #DEDEDE;
    height: 35px;
    width: 35px;
    border-radius: 4px;

    &:hover {
        background-color: #BEBEBE;
    }

    &:disabled {
        background-color: ${({ name }) => 
        name !== "" ? name === "*" ? "#e3788c" : "#F5F5F5" : "#DEDEDE"};
    }
`;