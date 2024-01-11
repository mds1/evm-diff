export type Node = {
  name: string;
  description: string;
  type: NodeType;
  language: Language;
  syncStrategy?: SyncStrategy[]; // only for execution nodes.
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

export enum SyncStrategy {
  Snap,
  Fast,
  Full,
}
