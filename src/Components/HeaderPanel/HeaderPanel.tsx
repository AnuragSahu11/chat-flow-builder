import { Box, Button } from "@mui/material";
import { OnSave } from "../ReactFlowCreator/ReactFlowCreator";

type HeaderPanelProps = {
  onSave: OnSave;
};

export const HeaderPanel = ({ onSave }: HeaderPanelProps) => {
  return (
    <Box display={"flex"} justifyContent={"flex-end"}>
      <Button onClick={onSave} variant="contained">
        Save
      </Button>
    </Box>
  );
};
