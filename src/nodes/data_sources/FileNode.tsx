
import { Handle, Position } from "@xyflow/react"
import { nanoid } from 'nanoid'

import "../base.css"
import { useState } from "react"

export function FileNode({ id, data }) {
    const [isConnectable, setIsConnectable] = useState(false)

    const handleFileChange = (e) => {
        data.load_fields(id, e.target.files[0])
        setIsConnectable(true)
    }

    return (
        <div className="node">
            <input type="file" accept={data.file_type} onChange={handleFileChange}/>
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
        </div>
    )
}

export function createFileNode(file_type: string, load_fields: Function) {
    return {
        id: nanoid(),
        type: "file-node",
        position: {x: 0, y: 0},
        data: { file_type: file_type, load_fields: load_fields },
    }
}
