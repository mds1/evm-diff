export type Node = {
    name: string;
    description: string;
    githubUrl: string;
    references: string[];
    traceApi: string[];
    notes?: string[];
    // All properties are private, and a missing field indicates that the property is unknown.
    properties: {
      isExecution?: boolean;
      isConsensus?: boolean;
    };
  };
  