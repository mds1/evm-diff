import type { Chain as Metadata } from '@wagmi/chains';
import type { AccountType } from './accountType';
import type { DeployedContract } from './deployedContract';
import type { EIP } from './eip';
import type { Mempool } from './mempool';
import type { Node } from './node';
import type { Opcode } from './opcode';
import type { Precompile } from './precompile';
import type { Predeploy } from './predeploy';
import type { SignatureType } from './signatureType';

export type Chain = {
	metadata: Metadata;
	precompiles: Precompile[];
	predeploys: Predeploy[];
	signatureTypes: SignatureType[];
	accountTypes: AccountType[];
	opcodes: Partial<Opcode>[];
	mempools: Mempool[];
	deployedContracts: DeployedContract[];
	eips: EIP[];
	executionNodes: Node[];
	consensusNodes: Node[];
};
