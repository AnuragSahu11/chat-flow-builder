import { Alert, Grid, Snackbar } from "@mui/material";
import { MouseEvent, ReactElement, useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  MiniMap,
  Node,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  ERROR_CODE_UNCONNECTED_NODE,
  FLOW_SAVE_NAME,
  INITIAL_EDGES,
  INITIAL_NODES,
  NODE_TYPE_EMAIL_NODE,
  NODE_TYPE_TEXT_NODE,
} from "../../config/general-config";
import { useReactFlowCreator } from "../../hooks/useReactFlowCreater";
import { HeaderPanel } from "../HeaderPanel/HeaderPanel";
import { NodesPanel } from "../NodesPanel/NodesPanel";
import { TextNode } from "../Nodes/TextNode/TextNode";
import { EmailNode } from "../Nodes/EmailNode/EmailNode";
import { EmailOutlined, MessageOutlined } from "@mui/icons-material";

export type NodeEditDataFormType = {
  id: string | null;
};

export type OnNodeClick = (event: MouseEvent, node: Node) => void;
export type OnSave = () => void;

type ReactFlowCreatorProps = {
  width: string;
  height: string;
};

export type OnNodeUpdateType = (
  nodeId: string,
  valueKey: string,
  value: unknown
) => void;

export type ErrorData = {
  code: string | null;
  data: string | null | undefined;
};

export type NodeConfigurationType = {
  nodeType: string;
  icon: ReactElement;
  active: boolean;
  nodeName: string;
};

const initialNodes: Node[] = INITIAL_NODES;
const initialEdges: Edge[] = INITIAL_EDGES;

const initialErrorState = { code: null, data: null };
const nodeTypes = { textNode: TextNode, emailNode: EmailNode };
const nodeConfiguration: NodeConfigurationType[] = [
  // * TO CREATE A NEW NODE COMPONENT AND ADD A NODE TYPE CORRESPONDING TO IT

  {
    nodeType: NODE_TYPE_TEXT_NODE,
    icon: <MessageOutlined />,
    active: true,
    nodeName: "Text Node",
  },
  {
    nodeType: NODE_TYPE_EMAIL_NODE,
    icon: <EmailOutlined />,
    active: false,
    nodeName: "Email Node",
  },
];

export const ReactFlowCreator = ({ width, height }: ReactFlowCreatorProps) => {
  // * STATES
  const [errorData, setErrorData] = useState<ErrorData>(initialErrorState);
  const [showSaveSuccessToast, setShowSaveSuccessToast] =
    useState<boolean>(false);
  const [nodeEditDataForm, setNodeEditDataForm] =
    useState<NodeEditDataFormType>({
      id: null,
    });

  // * HOOKS
  const {
    nodes,
    edges,
    setNodes,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDrop,
    onDragOver,
    reactFlowWrapper,
    reactFlowInstance,
    setReactFlowInstance,
  } = useReactFlowCreator(initialEdges, initialNodes);

  // * FUNCTIONS

  // * RUNS WHEN A NODE IS CLICKED
  const onNodeClick: OnNodeClick = useCallback(
    (_event: MouseEvent, node: Node) => {
      const { id } = node;
      setNodeEditDataForm({ id });
    },
    []
  );

  // * RUNS WHEN NODE EDIT FORM CLOSED
  const onNodeEditClose = () => {
    setNodeEditDataForm({ id: null });
  };

  // * TO CHECK FOR UN-CONNECTED NODES
  const checkUnconnectedNodes = (nodes: Node[], edges: Edge[]): boolean => {
    const nodesHavingEdge: string[] = [];
    nodes.forEach(({ id }: Node) => {
      if (!nodesHavingEdge.includes(id)) {
        const edgeConnectedToNode = edges.find(({ source, target }: Edge) => {
          return source === id || target === id;
        });
        edgeConnectedToNode && nodesHavingEdge.push(id);
      }
    });
    return nodesHavingEdge.length === nodes.length;
  };

  // * RUNS WHEN SAVE BUTTON CLICKED
  const onSave: OnSave = useCallback(() => {
    if (reactFlowInstance) {
      if (checkUnconnectedNodes(nodes, edges)) {
        const flow = reactFlowInstance.toObject();
        localStorage.setItem(FLOW_SAVE_NAME, JSON.stringify(flow));
        setShowSaveSuccessToast(true);
        removeError();
      } else {
        showError(ERROR_CODE_UNCONNECTED_NODE);
      }
    }
  }, [reactFlowInstance, nodes, edges]);

  // * RUNS WHEN A NODE IS EDITED
  const onNodeUpdate: OnNodeUpdateType = (nodeId, valueKey, value) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            [valueKey]: value,
          };
        }

        return node;
      })
    );
  };

  // * RUNS WHEN AN ERROR IS DETECTED
  const showError = useCallback((code: string, data?: string): void => {
    setErrorData({ code, data });
  }, []);

  // * RUNS WHEN THE ERROR HAS BEEN RESOLVED
  const removeError = useCallback(() => {
    setErrorData(initialErrorState);
  }, []);

  return (
    <Grid
      borderRadius={1}
      sx={{
        overflow: "hidden",
      }}
      maxHeight={"100%"}
      height={height}
      width={width}
      container
      xs={12}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showSaveSuccessToast}
        onClose={() => setShowSaveSuccessToast(false)}
      >
        <Alert
          onClose={() => setShowSaveSuccessToast(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Save Successful
        </Alert>
      </Snackbar>
      <ReactFlowProvider>
        <Grid
          ref={reactFlowWrapper}
          width={"100%"}
          height={"100%"}
          container
          xs={12}
        >
          <Grid height={"7vh"} item xs={12}>
            <HeaderPanel onSave={onSave} errorData={errorData} />
          </Grid>
          <Grid item height={"100%"} container xs={12}>
            <Grid item xs={10}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                fitView
                onNodeClick={onNodeClick}
              >
                <Controls />
                <MiniMap />
                <Background gap={12} size={1} />
              </ReactFlow>
            </Grid>
            <Grid item xs={2}>
              <NodesPanel
                nodeConfiguration={nodeConfiguration}
                onNodeEditClose={onNodeEditClose}
                onNodeUpdate={onNodeUpdate}
                nodeEditData={nodeEditDataForm}
              />
            </Grid>
          </Grid>
        </Grid>
      </ReactFlowProvider>
    </Grid>
  );
};
