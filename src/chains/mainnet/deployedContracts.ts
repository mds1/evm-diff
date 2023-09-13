import { DeployedContract, DeployedContractKind } from '@/types';

const contracts: DeployedContract[] = [
  {
    name: 'Wrapped Native Token',
    description:
      'It allows users to deposit Ether into the contract and receive ERC-20 WETH tokens in return.',
    kind: DeployedContractKind.WrappedNativeAsset,
    tokenName: 'Wrapped Ether',
    tokenSymbol: 'WETH',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    references: [
      '[Alchemy Smart Contract Repository](https://www.alchemy.com/smart-contracts/weth9)',
    ],
    logicAbi: [
      'function name() view returns (string)',
      'function approve(address guy, uint256 wad) returns (bool)',
      'function totalSupply() view returns (uint256)',
      'function transferFrom(address src, address dst, uint256 wad) returns (bool)',
      'function withdraw(uint256 wad)',
      'function decimals() view returns (uint8)',
      'function balanceOf(address) view returns (uint256)',
      'function symbol() view returns (string)',
      'function transfer(address dst, uint256 wad) returns (bool)',
      'function deposit() payable',
      'function allowance(address, address) view returns (uint256)',
      'fallback()',
      'event Approval(address indexed src, address indexed guy, uint256 wad)',
      'event Transfer(address indexed src, address indexed dst, uint256 wad)',
      'event Deposit(address indexed dst, uint256 wad)',
      'event Withdrawal(address indexed src, uint256 wad)',
    ],
  },
  {
    name: 'Multicall3',
    description: 'The Multicall3 contract enables batched read or write operations.',
    kind: DeployedContractKind.Utility,
    address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    deploymentInstructions:
      'https://github.com/mds1/multicall/blob/main/README.md#new-deployments.',
    references: ['[Multicall3 website](https://www.multicall3.com/)'],
    logicAbi: [
      'struct Call { address target; bytes callData; }',
      'struct Call3 { address target; bool allowFailure; bytes callData; }',
      'struct Call3Value { address target; bool allowFailure; uint256 value; bytes callData; }',
      'struct Result { bool success; bytes returnData; }',
      'function aggregate(Call[] calldata calls) public payable returns (uint256 blockNumber, bytes[] memory returnData)',
      'function aggregate3(Call3[] calldata calls) public payable returns (Result[] memory returnData)',
      'function aggregate3Value(Call3Value[] calldata calls) public payable returns (Result[] memory returnData)',
      'function blockAndAggregate(Call[] calldata calls) public payable returns (uint256 blockNumber, bytes32 blockHash, Result[] memory returnData)',
      'function getBasefee() view returns (uint256 basefee)',
      'function getBlockHash(uint256 blockNumber) view returns (bytes32 blockHash)',
      'function getBlockNumber() view returns (uint256 blockNumber)',
      'function getChainId() view returns (uint256 chainid)',
      'function getCurrentBlockCoinbase() view returns (address coinbase)',
      'function getCurrentBlockDifficulty() view returns (uint256 difficulty)',
      'function getCurrentBlockGasLimit() view returns (uint256 gaslimit)',
      'function getCurrentBlockTimestamp() view returns (uint256 timestamp)',
      'function getEthBalance(address addr) view returns (uint256 balance)',
      'function getLastBlockHash() view returns (bytes32 blockHash)',
      'function tryAggregate(bool requireSuccess, Call[] calldata calls) public payable returns (Result[] memory returnData)',
      'function tryBlockAndAggregate(bool requireSuccess, Call[] calldata calls) public payable returns (uint256 blockNumber, bytes32 blockHash, Result[] memory returnData)',
    ],
  },
  {
    name: "Nick Johnson's Create2 Deployer",
    description:
      'A contract that allows you to deploy contracts to a deterministic address with CREATE2.',
    kind: DeployedContractKind.Utility,
    address: '0x4e59b44847b379578588920cA78FbF26c0B4956C',
    deploymentInstructions:
      'https://github.com/Arachnid/deterministic-deployment-proxy/blob/master/README.md#deployment-transaction',
    references: [
      'https://github.com/Arachnid/deterministic-deployment-proxy/blob/master/README.md',
    ],
    logicAbi: [
      // Since the contract is written in Yul, it has no Solidity ABI.
      JSON.stringify({
        payable: true,
        stateMutability: 'payable',
        type: 'fallback',
        inputs: [
          {
            internalType: 'bytes32',
            name: 'salt',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'creationCode',
            type: 'bytes',
          },
        ],
      }),
    ],
  },
  {
    name: "0age's Create2 Deployer",
    description:
      'A contract that allows you to deploy contracts to a deterministic address with CREATE2, and provides a safe deployment method that ensures the first 20 bytes of the salt are equal to the address of the caller.',
    kind: DeployedContractKind.Utility,
    address: '0x0000000000FFe8B47B3e2130213B802212439497',
    deploymentInstructions:
      'https://github.com/ProjectOpenSea/seaport/blob/main/docs/Deployment.md#setting-up-factory-on-a-new-chain.',
    references: [
      '[Etherscan: Keyless CREATE2 Factory](https://etherscan.io/address/0x0000000000FFe8B47B3e2130213B802212439497#code)',
    ],
    logicAbi: [
      'function hasBeenDeployed(address deploymentAddress) view returns (bool)',
      'function safeCreate2(bytes32 salt, bytes initializationCode) payable returns (address deploymentAddress)',
      'function findCreate2Address(bytes32 salt, bytes initCode) view returns (address deploymentAddress)',
      'function findCreate2AddressViaHash(bytes32 salt, bytes32 initCodeHash) view returns (address deploymentAddress)',
    ],
  },
  {
    name: "pcaversaccio's Create2 Deployer",
    description:
      'A contract that allows you to deploy contracts to a deterministic address with CREATE2, and is part of a Hardhat plugin to simplify deterministic deployments.',
    kind: DeployedContractKind.Utility,
    address: '0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2',
    deploymentInstructions:
      'See https://github.com/pcaversaccio/xdeployer/blob/main/README.md#local-deployment to deploy locally, or open an issue in that repo to request a new deployment.',
    references: ['https://github.com/pcaversaccio/xdeployer/blob/main/README.md#local-deployment'],
    logicAbi: [
      'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
      'event Paused(address account)',
      'event Unpaused(address account)',
      'function computeAddress(bytes32 salt, bytes32 codeHash) view returns (address)',
      'function computeAddressWithDeployer(bytes32 salt, bytes32 codeHash, address deployer) pure returns (address)',
      'function deploy(uint256 value, bytes32 salt, bytes code)',
      'function deployERC1820Implementer(uint256 value, bytes32 salt)',
      'function killCreate2Deployer(address payoutAddress)',
      'function owner() view returns (address)',
      'function pause()',
      'function paused() view returns (bool)',
      'function renounceOwnership()',
      'function transferOwnership(address newOwner)',
      'function unpause()',
      'receive() external payable',
    ],
  },
];

// Reshape into a map where the key is the name.
export const deployedContracts: Record<string, DeployedContract> = contracts.reduce(
  (acc, contract) => {
    acc[contract.name] = contract;
    return acc;
  },
  {} as Record<string, DeployedContract>
);
