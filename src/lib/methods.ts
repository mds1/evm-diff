import { ETHEREUM_ORG_JSON_RPC_URL } from './constants';

export const jsonRPCMethodSrc = (name: string): string => `${ETHEREUM_ORG_JSON_RPC_URL}#${name}`;
