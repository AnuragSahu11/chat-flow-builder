import { Box, Button, Tooltip, Typography } from "@mui/material";
import { DragEvent } from "react";
import { TextNodeEditForm } from "../NodeEditForm/TextNodeEditForm";
import {
  NodeConfigurationType,
  NodeEditDataFormType,
  OnNodeUpdateType,
} from "../ReactFlowCreator/ReactFlowCreator";
import {
  NODE_ACTIVE_TOOLTIP_TITLE,
  NODE_DISABLED_TOOLTIP_TITLE,
} from "../../config/general-config";

type NodesPanelPropType = {
  nodeEditData: NodeEditDataFormType;
  onNodeUpdate: OnNodeUpdateType;
  onNodeEditClose: () => void;
  nodeConfiguration: NodeConfigurationType[];
};

export const NodesPanel = ({
  nodeEditData,
  onNodeUpdate,
  onNodeEditClose,
  nodeConfiguration,
}: NodesPanelPropType) => {
  const { id } = nodeEditData;
  const showNodeEditForm = id;

  // * RUNS WHEN DRAG STARTED
  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f3f3f3",
      }}
    >
      <Box sx={{ mb: 2 }} textAlign={"center"}>
        <Typography variant="h6" fontWeight={"bold"}>
          Nodes Panel
        </Typography>
      </Box>
      <Box px={"10px"}>
        {showNodeEditForm ? (
          <TextNodeEditForm
            nodeId={id}
            onNodeEditClose={onNodeEditClose}
            onNodeUpdate={onNodeUpdate}
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            {nodeConfiguration.map(({ nodeName, active, icon, nodeType }) => {
              return (
                <Tooltip
                  title={
                    active
                      ? NODE_ACTIVE_TOOLTIP_TITLE
                      : NODE_DISABLED_TOOLTIP_TITLE
                  }
                >
                  <Button
                    disabled={!active}
                    startIcon={icon}
                    sx={{
                      width: "100%",
                    }}
                    variant="contained"
                    size="large"
                    className="dndnode input"
                    onDragStart={(event) =>
                      active && onDragStart(event, nodeType)
                    }
                    draggable
                  >
                    {nodeName}
                  </Button>
                </Tooltip>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};
