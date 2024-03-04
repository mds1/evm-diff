export type Node = {
  name: string;
  description: string;
  type: NodeType;
  language: Language;
  syncStrategy?: NodeSyncStrategy[]; // only for execution nodes.
  forkOf?: string;
  repository: string;
  documentation: string;
};

export enum NodeType {
  Execution,
  Consensus,
}

export enum Language {
  Java,
  Go,
  CSharp,
  Rust,
  TypeScript,
  Nim,
}

export enum NodeSyncStrategy {
  Snap,
  Fast,
  Full,
}
