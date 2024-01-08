export type Node = {
  name: string;
  description: string;
  type: NodeType;
  language: string;
  syncStrategy?: SyncStrategy[]; // only for execution nodes.
  repository: string;
  documentation: string;
};

export type Nodes = {
  execution: Node[];
  consensus: Node[];
};

export enum NodeType {
  Execution,
  Consensus,
}

export enum SyncStrategy {
  Snap,
  Fast,
  Full,
}
