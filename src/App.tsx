import { ReactFlowProvider } from "@xyflow/react";
import Flow from "./Flow";

export default function App() {
  return (
    <div>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}