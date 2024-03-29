import { IconButton } from "@mui/material";

export default function BaseIconButton(props) {
    return <IconButton {...props} sx={{backgroundColor: 'whitesmoke', ...props.sx}} />
}