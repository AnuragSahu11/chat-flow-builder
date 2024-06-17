import { nanoid } from "nanoid";
import { useCallback, DragEvent, useRef, useState } from "react";
import {
  useEdgesState,
  useNodesState,
  Edge,
  Node,
  Connection,
  OnConnect,
  addEdge,
  ReactFlowInstance,
} from "reactflow";

export const useReactFlowCreator = (
  initialEdges: Edge[],
  initialNodes: Node[]
) => {
  // * STATES
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<
    ReactFlowInstance | undefined
  >();

  // * REFS
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // * FUNCTIONS

  // * RUNS ON EDGE CONNECT
  const onConnect: OnConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // * RUNS WHEN SOMETHING IS DRAGGED OVER REACT-FLOW-CANVAS
  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // * RUNS WHEN SOMETHING IS DROPPED OVER REACT FLOW CANVAS
  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      if (reactFlowInstance) {
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        const newNode = {
          id: nanoid(),
          type,
          position,
          data: { label: `Click Me to Edit` },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance]
  );

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDrop,
    onDragOver,
    reactFlowWrapper,
    reactFlowInstance,
    setReactFlowInstance,
  };
};
