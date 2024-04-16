import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import Stack from 'react-bootstrap/Stack';

import Select from 'react-select'

import "./elastic_query.css"

const providers = [
    {value: "eck-prod", label: "eck-prod"},
    {value: "eck-stg", label: "eck-stg"},
]

const indexs = [
    {value: "eck-a", label: "eck-a"},
    {value: "eck-b", label: "eck-b"},
    {value: "eck-c", label: "eck-c"},
]

function ElasticQueryNode() {
    const [provider, setProvider] = useState<string | undefined>(providers[0].value)
    const [index, setIndex] = useState<string | undefined>(indexs[0].value)

    return (
        <div className="query-node">
            <Stack gap={10}>
                <div className="p-2">
                    <Select onChange={(input) => setProvider(input?.value)} className="nodrag" isSearchable options={providers} />
                </div>
                <div className="p-2">
                    <Select onChange={(input) => setIndex(input?.value)} className="nodrag" isSearchable options={indexs} />
                </div>
            </Stack>
            <Handle type="source" position={Position.Right}/>
        </div>
    )
}

export default ElasticQueryNode
