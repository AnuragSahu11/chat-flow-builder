export const ERROR_CODE_UNCONNECTED_NODE = "UNCONNECTED_NODE";
export const INITIAL_NODES = [
  {
    id: "1",
    type: "textNode",
    position: { x: 0, y: 0 },
    data: { label: "Message 1", color: "red" },
  },
  {
    id: "2",
    type: "textNode",
    position: { x: 0, y: 100 },
    data: { label: "Message 2" },
  },
];
export const INITIAL_EDGES = [{ id: "e1-2", source: "1", target: "2" }];
export const FLOW_SAVE_NAME = "react-flow-demo-save";
export const NODE_TYPE_TEXT_NODE = "textNode";
export const NODE_TYPE_EMAIL_NODE = "emailNode";
export const NODE_ACTIVE_TOOLTIP_TITLE =
  "Please Drag & Drop to the Canvas to use it";
export const NODE_DISABLED_TOOLTIP_TITLE = "Please change the status to active to use it"
