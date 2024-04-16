import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  Connection,
  useReactFlow,
} from '@xyflow/react';
 
import "@xyflow/react/dist/style.css";

import {nodeTypes, initialNodes} from './nodes/index.ts'
import { initialEdges } from './edges/index.ts';
import { createFileNode } from './nodes/data_sources/FileNode.tsx';
import Papa from 'papaparse'
import { createQueryNode } from './nodes/query/QueryNode.tsx';

 
export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { updateNodeData } = useReactFlow()

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const addCsvFileNode = useCallback(
      () => {
        const load_fields = (id, file) => {
            Papa.parse(file, {
                step: function (results, parser) {
                    console.log(results)
                    var fields = []

                    results.data.forEach(element => {
                        fields.push({name: element, label: element})
                    });

                    updateNodeData(id, { fields: fields })
                    parser.abort()
                }
            })
        }
        const newNode = createFileNode(".csv", load_fields)
      setNodes((nodes) => nodes.concat(newNode))
    },
    [nodes, setNodes]
  )

  const addQueryNode = () => {
    setNodes((nodes) => nodes.concat(createQueryNode()))
  }

  const print_nodes = () => {
    console.log(nodes)
  }
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
        >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
            <Panel position="top-right">
                <button onClick={addCsvFileNode}>
                Add CSV file
                </button>
                <button onClick={addQueryNode}>
                Add query node
                </button>
                <button onClick={print_nodes}>Inspect</button>
            </Panel>
        </ReactFlow>
    </div>
  );
}
