export type Node = {
	name: string;
	description: string;
	type: NodeType;
	language: Language;
	syncStrategy?: SyncStrategy[]; // only for execution nodes.
	forkOf?: string;
	repository: string;
	documentation: string;
};

export enum NodeType {
	Execution = 0,
	Consensus = 1,
}

export enum Language {
	Java = 0,
	Go = 1,
	CSharp = 2,
	Rust = 3,
	TypeScript = 4,
	Nim = 5,
}

export enum SyncStrategy {
	Snap = 0,
	Fast = 1,
	Full = 2,
}
