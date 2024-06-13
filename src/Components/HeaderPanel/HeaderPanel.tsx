import { Box, Button } from "@mui/material";

type HeaderPanelProps = {};

export const HeaderPanel = ({}: HeaderPanelProps) => {
  return (
    <Box display={"flex"} justifyContent={"flex-end"}>
      <Button variant="contained">Save</Button>
    </Box>
  );
};
