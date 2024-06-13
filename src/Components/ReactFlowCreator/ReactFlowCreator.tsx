import { Grid } from "@mui/material";
import { nanoid } from "nanoid";
import { DragEvent, useCallback, useRef, useState } from "react";
import {
  Connection,
  Edge,
  Node,
  OnConnect,
  ReactFlowInstance,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { HeaderPanel } from "../HeaderPanel/HeaderPanel";
import { NodesPanel } from "../NodesPanel/NodesPanel";
import ReactFlowViewer from "../ReactFlowViewer/ReactFlowViewer";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "textNode",
    position: { x: 0, y: 0 },
    data: { label: "1", color: "red" },
  },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];

type ReactFlowCreatorProps = {
  width: string;
  height: string;
};

export const ReactFlowCreator = ({ width, height }: ReactFlowCreatorProps) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<
    ReactFlowInstance | undefined
  >();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      if (reactFlowInstance) {
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        const newNode = {
          id: nanoid(),
          type,
          position,
          data: { label: `${type} node` },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance]
  );

  return (
    <Grid height={height} width={width} container xs={12}>
      <ReactFlowProvider>
        <Grid
          ref={reactFlowWrapper}
          width={"100%"}
          height={"100%"}
          container
          xs={12}
        >
          <Grid height={"10vh"} item xs={12}>
            <HeaderPanel />
          </Grid>
          <Grid item height={"100%"} container xs={12}>
            <Grid item xs={10}>
              <ReactFlowViewer
                nodes={nodes}
                edges={edges}
                onConnect={onConnect}
                onEdgesChange={onEdgesChange}
                onNodesChange={onNodesChange}
                setReactFlowInstance={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
              />
            </Grid>
            <Grid item xs={2}>
              <NodesPanel />
            </Grid>
          </Grid>
        </Grid>
      </ReactFlowProvider>
    </Grid>
  );
};
