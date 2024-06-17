import SaveAsIcon from "@mui/icons-material/SaveAs";
import { Alert, Box, Button } from "@mui/material";
import { ErrorData, OnSave } from "../ReactFlowCreator/ReactFlowCreator";

type HeaderPanelProps = {
  onSave: OnSave;
  errorData: ErrorData;
};

export const HeaderPanel = ({ onSave, errorData }: HeaderPanelProps) => {
  const { code } = errorData;
  return (
    <Box
      sx={{
        position: "relative",
        p: 1,
        backgroundColor: "#f3f3f3",
      }}
      display={"flex"}
    >
      <Button
        color="success"
        startIcon={<SaveAsIcon />}
        onClick={onSave}
        variant="contained"
      >
        Save Changes
      </Button>
      <Box
        position={"absolute"}
        sx={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {code && (
          <Alert severity="error"> Please Connect the node to an edge</Alert>
        )}
      </Box>
    </Box>
  );
};
