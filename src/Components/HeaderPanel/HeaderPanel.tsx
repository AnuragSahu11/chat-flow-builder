import { Box, Button } from "@mui/material";

type HeaderPanelProps = {
  height: string;
};

export const HeaderPanel = ({ height }: HeaderPanelProps) => {
  return (
    <Box height={height} display={"flex"} justifyContent={"flex-end"}>
      <Button variant="contained">Save</Button>
    </Box>
  );
};
