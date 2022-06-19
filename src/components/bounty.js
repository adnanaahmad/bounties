import { Box, Card, Typography } from "@mui/material";

function BountyBoard() {
    return (
        <Box component={Card} sx={{maxWidth: 1000, marginX: 'auto', marginTop: 10, paddingX: 2, paddingY: 4}}>
            <Typography>Bounties</Typography>
        </Box>
    );
  }
  
export default BountyBoard;