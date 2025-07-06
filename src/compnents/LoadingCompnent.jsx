import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
export default function LoadingCompnent() {
  return (
    <Box sx={{ width: "100%", mt:"40px"}}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  )
}