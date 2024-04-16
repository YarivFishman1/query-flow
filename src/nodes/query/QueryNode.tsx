import { useState } from 'react';
import { QueryBuilder, RuleGroupType } from 'react-querybuilder';
import { Handle, Position, NodeProps, useHandleConnections, useNodesData } from '@xyflow/react';
import { nanoid } from 'nanoid';

import 'react-querybuilder/dist/query-builder.css';
import '../base.css'

export function QueryNode({ data }: NodeProps) {
	const connections = useHandleConnections({
		type: "target",
	});
	const nodesData = useNodesData(
		connections.map((connection) => connection.source)
	);

	const [query, setQuery] = useState<RuleGroupType>({rules: []})

	return (
		<div className={connections.length > 0 && nodesData[0].data.fields.length > 0 ? "queryBuilder" : "node"}>
			<Handle type="target" position={Position.Left} />
			{ nodesData[0]?.data.fields.length > 0 &&
			  <QueryBuilder fields={nodesData[0].data.fields} query={query} onQueryChange={q => setQuery(q)} />
			}
			<Handle type="source" position={Position.Right} />
		</div>
	)
}

export function createQueryNode() {
	return {
		id: nanoid(),
		type: "query-node",
		position: {x: 0, y: 0},
		data: { fields: [ {} ] },
	  }
}
