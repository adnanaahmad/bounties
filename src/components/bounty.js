import { Box, Card, Divider, Typography } from "@mui/material";
import Board from "./board";

function BountyBoard() {
    return (
        <Box component={Card} sx={{maxWidth: 1200, marginX: 'auto', marginTop: 10, paddingX: 2, paddingY: 4}}>
            <Typography textAlign={'center'} variant='h4' fontWeight={600}>Bounties</Typography>
            <Divider sx={{mb: 4}}/>
            <Board/>
        </Box>
    );
  }
  
export default BountyBoard;