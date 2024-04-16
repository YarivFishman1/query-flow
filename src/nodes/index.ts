import type { Node, NodeTypes } from "@xyflow/react";
import { FileNode } from "./data_sources/FileNode";
import { QueryNode } from "./query/QueryNode";

export const initialNodes = [] satisfies Node[];

export const nodeTypes = {
  "file-node": FileNode,
  "query-node": QueryNode,
} satisfies NodeTypes;
