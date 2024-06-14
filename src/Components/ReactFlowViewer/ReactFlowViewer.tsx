import { Box } from "@mui/material";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  MiniMap,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import { TextNode } from "../Nodes/TextNode/TextNode";
import { Dispatch, DragEventHandler } from "react";
import { OnNodeClick } from "../ReactFlowCreator/ReactFlowCreator";

type ReactFlowViewerPropType = {
  setReactFlowInstance: Dispatch<ReactFlowInstance>;
  onDrop: DragEventHandler;
  onDragOver: DragEventHandler;
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onNodeClick: OnNodeClick;
};

const nodeTypes = { textNode: TextNode };

export default function ReactFlowViewer({
  setReactFlowInstance,
  onDrop,
  onDragOver,
  onNodesChange,
  onEdgesChange,
  onConnect,
  nodes,
  edges,
  onNodeClick,
}: ReactFlowViewerPropType) {
  return (
    <Box width={"100%"} height={"100%"}>
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
    </Box>
  );
}
