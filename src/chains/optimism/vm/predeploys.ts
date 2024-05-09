import { Predeploy } from '@/types';

const PREDEPLOYS_SPEC = 'https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md';

export const predeploys: Predeploy[] = [
  {
    address: '0x4200000000000000000000000000000000000000',
    name: '`LegacyMessagePasser`',
    description: 'Stores commitments to withdrawal transactions before the Bedrock upgrade.',
    proxyAbi: [
      'constructor(address _admin)',
      'event AdminChanged(address previousAdmin, address newAdmin)',
      'event Upgraded(address indexed implementation)',
      'fallback()',
      'function admin() returns (address)',
      'function changeAdmin(address _admin)',
      'function implementation() returns (address)',
      'function upgradeTo(address _implementation)',
      'function upgradeToAndCall(address _implementation, bytes _data) payable returns (bytes)',
      'receive() external payable',
    ],
    logicAbi: [
      'constructor()',
      'function passMessageToL1(bytes _message)',
      'function sentMessages(bytes32) view returns (bool)',
      'function version() view returns (string)',
    ],
    logicAddress: '0xc0D3C0d3C0d3C0D3c0d3C0d3c0D3C0d3c0d30000',
    deprecated: true,
    references: [PREDEPLOYS_SPEC],
  },
  {
    address: '0x4200000000000000000000000000000000000002',
    name: '`DeployerWhitelist`',
    description:
      'Defined a list of accounts that were allowed to deploy contracts during the initial phases of Optimism.',
    proxyAbi: [
      'constructor(address _admin)',
      'event AdminChanged(address previousAdmin, address newAdmin)',
      'event Upgraded(address indexed implementation)',
      'fallback()',
      'function admin() returns (address)',
      'function changeAdmin(address _admin)',
      'function implementation() returns (address)',
      'function upgradeTo(address _implementation)',
      'function upgradeToAndCall(address _implementation, bytes _data) payable returns (bytes)',
      'receive() external payable',
    ],
    logicAbi: [
      'constructor()',
      'event OwnerChanged(address oldOwner, address newOwner)',
      'event WhitelistDisabled(address oldOwner)',
      'event WhitelistStatusChanged(address deployer, bool whitelisted)',
      'function enableArbitraryContractDeployment()',
      'function isDeployerAllowed(address _deployer) view returns (bool)',
      'function owner() view returns (address)',
      'function setOwner(address _owner)',
      'function setWhitelistedDeployer(address _deployer, bool _isWhitelisted)',
      'function version() view returns (string)',
      'function whitelist(address) view returns (bool)',
    ],
    logicAddress: '0xc0d3c0d3C0d3c0D3c0d3C0D3c0d3C0d3c0D30002',
    deprecated: true,
    references: [PREDEPLOYS_SPEC],
  },
  {
    address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
    name: '`LegacyERC20ETH`',
    description: 'Represents all Ether in the system before Bedrock.',
    logicAbi: [
      'constructor()',
      'event Approval(address indexed owner, address indexed spender, uint256 value)',
      'event Burn(address indexed account, uint256 amount)',
      'event Mint(address indexed account, uint256 amount)',
      'event Transfer(address indexed from, address indexed to, uint256 value)',
      'function BRIDGE() view returns (address)',
      'function REMOTE_TOKEN() view returns (address)',
      'function allowance(address owner, address spender) view returns (uint256)',
      'function approve(address, uint256) returns (bool)',
      'function balanceOf(address _who) view returns (uint256)',
      'function bridge() view returns (address)',
      'function burn(address, uint256)',
      'function decimals() view returns (uint8)',
      'function decreaseAllowance(address, uint256) returns (bool)',
      'function increaseAllowance(address, uint256) returns (bool)',
      'function l1Token() view returns (address)',
      'function l2Bridge() view returns (address)',
      'function mint(address, uint256)',
      'function name() view returns (string)',
      'function remoteToken() view returns (address)',
      'function supportsInterface(bytes4 _interfaceId) pure returns (bool)',
      'function symbol() view returns (string)',
      'function totalSupply() view returns (uint256)',
      'function transfer(address, uint256) returns (bool)',
      'function transferFrom(address, address, uint256) returns (bool)',
    ],
    deprecated: true,
    references: [PREDEPLOYS_SPEC],
  },
  {
    address: '0x4200000000000000000000000000000000000006',
    name: '`WETH9`',
    description: "Wrapped Ether contract, behaves identically to mainnet's canonical WETH.",
    logicAbi: [
      'event Approval(address indexed src, address indexed guy, uint256 wad)',
      'event Deposit(address indexed dst, uint256 wad)',
      'event Transfer(address indexed src, address indexed dst, uint256 wad)',
      'event Withdrawal(address indexed src, uint256 wad)',
      'fallback()',
      'function allowance(address, address) view returns (uint256)',
      'function approve(address guy, uint256 wad) returns (bool)',
      'function balanceOf(address) view returns (uint256)',
      'function decimals() view returns (uint8)',
      'function deposit() payable',
      'function name() view returns (string)',
      'function symbol() view returns (string)',
      'function totalSupply() view returns (uint256)',
      'function transfer(address dst, uint256 wad) returns (bool)',
      'function transferFrom(address src, address dst, uint256 wad) returns (bool)',
      'function withdraw(uint256 wad)',
    ],
    deprecated: false,
    references: [
      PREDEPLOYS_SPEC,
      '[What is ETH? WETH? How do they interact?](https://help.optimism.io/hc/en-us/articles/4417948883611-What-is-ETH-WETH-How-do-they-interact-)',
    ],
  },
  {
    address: '0x4200000000000000000000000000000000000007',
    name: '`L2CrossDomainMessenger`',
    description:
      'Provides a higher level API for sending cross-domain messages, compared to directly calling L2ToL1MessagePasser.',
    proxyAbi: [
      'constructor(address _admin)',
      'event AdminChanged(address previousAdmin, address newAdmin)',
      'event Upgraded(address indexed implementation)',
      'fallback()',
      'function admin() returns (address)',
      'function changeAdmin(address _admin)',
      'function implementation() returns (address)',
      'function upgradeTo(address _implementation)',
      'function upgradeToAndCall(address _implementation, bytes _data) payable returns (bytes)',
      'receive() external payable',
    ],
    logicAbi: [
      'constructor(address _l1CrossDomainMessenger)',
      'event FailedRelayedMessage(bytes32 indexed msgHash)',
      'event Initialized(uint8 version)',
      'event RelayedMessage(bytes32 indexed msgHash)',
      'event SentMessage(address indexed target, address sender, bytes message, uint256 messageNonce, uint256 gasLimit)',
      'event SentMessageExtension1(address indexed sender, uint256 value)',
      'function MESSAGE_VERSION() view returns (uint16)',
      'function MIN_GAS_CALLDATA_OVERHEAD() view returns (uint64)',
      'function MIN_GAS_DYNAMIC_OVERHEAD_DENOMINATOR() view returns (uint64)',
      'function MIN_GAS_DYNAMIC_OVERHEAD_NUMERATOR() view returns (uint64)',
      'function OTHER_MESSENGER() view returns (address)',
      'function RELAY_CALL_OVERHEAD() view returns (uint64)',
      'function RELAY_CONSTANT_OVERHEAD() view returns (uint64)',
      'function RELAY_GAS_CHECK_BUFFER() view returns (uint64)',
      'function RELAY_RESERVED_GAS() view returns (uint64)',
      'function baseGas(bytes _message, uint32 _minGasLimit) pure returns (uint64)',
      'function failedMessages(bytes32) view returns (bool)',
      'function initialize()',
      'function l1CrossDomainMessenger() view returns (address)',
      'function messageNonce() view returns (uint256)',
      'function relayMessage(uint256 _nonce, address _sender, address _target, uint256 _value, uint256 _minGasLimit, bytes _message) payable',
      'function sendMessage(address _target, bytes _message, uint32 _minGasLimit) payable',
      'function successfulMessages(bytes32) view returns (bool)',
      'function version() view returns (string)',
      'function xDomainMessageSender() view returns (address)',
    ],
    logicAddress: '0xC0d3c0d3c0D3c0D3C0d3C0D3C0D3c0d3c0d30007',
    deprecated: false,
    references: [PREDEPLOYS_SPEC],
  },
  {
    address: '0x4200000000000000000000000000000000000010',
    name: '`L2StandardBridge`',
    description:
      'Higher level API built on top of the L2CrossDomainMessenger that gives a standard interface for sending ETH or ERC20 tokens across domains.',
    proxyAbi: [
      'constructor(address _admin)',
      'event AdminChanged(address previousAdmin, address newAdmin)',
      'event Upgraded(address indexed implementation)',
      'fallback()',
      'function admin() returns (address)',
      'function changeAdmin(address _admin)',
      'function implementation() returns (address)',
      'function upgradeTo(address _implementation)',
      'function upgradeToAndCall(address _implementation, bytes _data) payable returns (bytes)',
      'receive() external payable',
    ],
    logicAbi: [
      'constructor(address _otherBridge)',
      'event DepositFinalized(address indexed l1Token, address indexed l2Token, address indexed from, address to, uint256 amount, bytes extraData)',
      'event ERC20BridgeFinalized(address indexed localToken, address indexed remoteToken, address indexed from, address to, uint256 amount, bytes extraData)',
      'event ERC20BridgeInitiated(address indexed localToken, address indexed remoteToken, address indexed from, address to, uint256 amount, bytes extraData)',
      'event ETHBridgeFinalized(address indexed from, address indexed to, uint256 amount, bytes extraData)',
      'event ETHBridgeInitiated(address indexed from, address indexed to, uint256 amount, bytes extraData)',
      'event WithdrawalInitiated(address indexed l1Token, address indexed l2Token, address indexed from, address to, uint256 amount, bytes extraData)',
      'function MESSENGER() view returns (address)',
      'function OTHER_BRIDGE() view returns (address)',
      'function bridgeERC20(address _localToken, address _remoteToken, uint256 _amount, uint32 _minGasLimit, bytes _extraData)',
      'function bridgeERC20To(address _localToken, address _remoteToken, address _to, uint256 _amount, uint32 _minGasLimit, bytes _extraData)',
      'function bridgeETH(uint32 _minGasLimit, bytes _extraData) payable',
      'function bridgeETHTo(address _to, uint32 _minGasLimit, bytes _extraData) payable',
      'function deposits(address, address) view returns (uint256)',
      'function finalizeBridgeERC20(address _localToken, address _remoteToken, address _from, address _to, uint256 _amount, bytes _extraData)',
      'function finalizeBridgeETH(address _from, address _to, uint256 _amount, bytes _extraData) payable',
      'function finalizeDeposit(address _l1Token, address _l2Token, address _from, address _to, uint256 _amount, bytes _extraData) payable',
      'function l1TokenBridge() view returns (address)',
      'function messenger() view returns (address)',
      'function version() view returns (string)',
      'function withdraw(address _l2Token, uint256 _amount, uint32 _minGasLimit, bytes _extraData) payable',
      'function withdrawTo(address _l2Token, address _to, uint256 _amount, uint32 _minGasLimit, bytes _extraData) payable',
      'receive() external payable',
    ],
    logicAddress: '0xC0d3c0d3c0D3c0d3C0D3c0D3C0d3C0D3C0D30010',
    deprecated: false,
    references: [PREDEPLOYS_SPEC],
  },
  {
    address: '0x4200000000000000000000000000000000000011',
    name: '`SequencerFeeVault`',
    description:
      'Accumulates any transaction priority fees and is the value of block.coinbase. When enough fees accumulate in this account, they can be withdrawn to an immutable L1 address.',
    logicAbi: [
      'constructor(address _l1FeeWallet)',
      'function MIN_WITHDRAWAL_AMOUNT() view returns (uint256)',
      'function l1FeeWallet() view returns (address)',
      'function withdraw()',
      'receive() external payable',
    ],
    deprecated: false,
    references: [PREDEPLOYS_SPEC],
  },
  {
    address: '0x4200000000000000000000000000000000000012',
    name: '`OptimismMintableERC20Factory`',
    description:
      'Responsible for creating ERC20 contracts on L2 that can be used for depositing native L1 tokens into.',
    proxyAbi: [
      'constructor(address _admin)',
      'event AdminChanged(address previousAdmin, address newAdmin)',
      'event Upgraded(address indexed implementation)',
      'fallback()',
      'function admin() returns (address)',
      'function changeAdmin(address _admin)',
      'function implementation() returns (address)',
      'function upgradeTo(address _implementation)',
      'function upgradeToAndCall(address _implementation, bytes _data) payable returns (bytes)',
      'receive() external payable',
    ],
    logicAbi: [
      'constructor(address _bridge)',
      'event OptimismMintableERC20Created(address indexed localToken, address indexed remoteToken, address deployer)',
      'event StandardL2TokenCreated(address indexed remoteToken, address indexed localToken)',
      'function BRIDGE() view returns (address)',
      'function createOptimismMintableERC20(address _remoteToken, string _name, string _symbol) returns (address)',
      'function createStandardL2Token(address _remoteToken, string _name, string _symbol) returns (address)',
      'function version() view returns (string)',
    ],
    logicAddress: '0xc0D3c0d3C0d3c0d3c0D3c0d3c0D3c0D3c0D30012',
    deprecated: false,
    references: [PREDEPLOYS_SPEC],
  },
  {
    address: '0x4200000000000000000000000000000000000013',
    name: '`L1BlockNumber`',
    description: 'Returns the last known L1 block number.',
    proxyAbi: [
      'constructor(address _admin)',
      'event AdminChanged(address previousAdmin, address newAdmin)',
      'event Upgraded(address indexed implementation)',
      'fallback()',
      'function admin() returns (address)',
      'function changeAdmin(address _admin)',
      'function implementation() returns (address)',
      'function upgradeTo(address _implementation)',
      'function upgradeToAndCall(address _implementation, bytes _data) payable returns (bytes)',
      'receive() external payable',
    ],
    logicAbi: [
      'constructor()',
      'fallback()',
      'function getL1BlockNumber() view returns (uint256)',
      'function version() view returns (string)',
      'receive() external payable',
    ],
    logicAddress: '0xC0D3C0d3C0D3c0D3C0d3c0D3C0d3c0d3C0d30013',
    deprecated: true,
    references: [PREDEPLOYS_SPEC],
  },
  {
    address: '0x420000000000000000000000000000000000000F',
    name: '`GasPriceOracle`',
    description: 'Provides an API to return the L1 portion of the fee for a transaction.',
    proxyAbi: [
      'constructor(address _admin)',
      'event AdminChanged(address previousAdmin, address newAdmin)',
      'event Upgraded(address indexed implementation)',
      'fallback()',
      'function admin() returns (address)',
      'function changeAdmin(address _admin)',
      'function implementation() returns (address)',
      'function upgradeTo(address _implementation)',
      'function upgradeToAndCall(address _implementation, bytes _data) payable returns (bytes)',
      'receive() external payable',
    ],
    logicAbi: [
      'constructor()',
      'function DECIMALS() view returns (uint256)',
      'function baseFee() view returns (uint256)',
      'function decimals() pure returns (uint256)',
      'function gasPrice() view returns (uint256)',
      'function getL1Fee(bytes _data) view returns (uint256)',
      'function getL1GasUsed(bytes _data) view returns (uint256)',
      'function l1BaseFee() view returns (uint256)',
      'function overhead() view returns (uint256)',
      'function scalar() view returns (uint256)',
      'function version() view returns (string)',
    ],
    logicAddress: '0xc0d3C0d3C0d3c0D3C0D3C0d3C0d3C0D3C0D3000f',
    deprecated: false,
    references: [PREDEPLOYS_SPEC],
  },
  {
    address: '0x4200000000000000000000000000000000000042',
    name: '`GovernanceToken`',
    description: 'The Optimism (OP) token contract.',
    logicAbi: [
      'constructor()',
      'event Approval(address indexed owner, address indexed spender, uint256 value)',
      'event DelegateChanged(address indexed delegator, address indexed fromDelegate, address indexed toDelegate)',
      'event DelegateVotesChanged(address indexed delegate, uint256 previousBalance, uint256 newBalance)',
      'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
      'event Transfer(address indexed from, address indexed to, uint256 value)',
      'function DOMAIN_SEPARATOR() view returns (bytes32)',
      'function allowance(address owner, address spender) view returns (uint256)',
      'function approve(address spender, uint256 amount) returns (bool)',
      'function balanceOf(address account) view returns (uint256)',
      'function burn(uint256 amount)',
      'function burnFrom(address account, uint256 amount)',
      'function checkpoints(address account, uint32 pos) view returns ((uint32 fromBlock, uint224 votes))',
      'function decimals() view returns (uint8)',
      'function decreaseAllowance(address spender, uint256 subtractedValue) returns (bool)',
      'function delegate(address delegatee)',
      'function delegateBySig(address delegatee, uint256 nonce, uint256 expiry, uint8 v, bytes32 r, bytes32 s)',
      'function delegates(address account) view returns (address)',
      'function getPastTotalSupply(uint256 blockNumber) view returns (uint256)',
      'function getPastVotes(address account, uint256 blockNumber) view returns (uint256)',
      'function getVotes(address account) view returns (uint256)',
      'function increaseAllowance(address spender, uint256 addedValue) returns (bool)',
      'function mint(address _account, uint256 _amount)',
      'function name() view returns (string)',
      'function nonces(address owner) view returns (uint256)',
      'function numCheckpoints(address account) view returns (uint32)',
      'function owner() view returns (address)',
      'function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)',
      'function renounceOwnership()',
      'function symbol() view returns (string)',
      'function totalSupply() view returns (uint256)',
      'function transfer(address to, uint256 amount) returns (bool)',
      'function transferFrom(address from, address to, uint256 amount) returns (bool)',
      'function transferOwnership(address newOwner)',
    ],
    deprecated: false,
    references: [PREDEPLOYS_SPEC],
  },
  {
    address: '0x4200000000000000000000000000000000000015',
    name: '`L1Block`',
    description: 'Allows for L1 state to be accessed in L2.',
    proxyAbi: [
      'constructor(address _admin)',
      'event AdminChanged(address previousAdmin, address newAdmin)',
      'event Upgraded(address indexed implementation)',
      'fallback()',
      'function admin() returns (address)',
      'function changeAdmin(address _admin)',
      'function implementation() returns (address)',
      'function upgradeTo(address _implementation)',
      'function upgradeToAndCall(address _implementation, bytes _data) payable returns (bytes)',
      'receive() external payable',
    ],
    logicAbi: [
      'constructor()',
      'function DEPOSITOR_ACCOUNT() view returns (address)',
      'function basefee() view returns (uint256)',
      'function batcherHash() view returns (bytes32)',
      'function hash() view returns (bytes32)',
      'function l1FeeOverhead() view returns (uint256)',
      'function l1FeeScalar() view returns (uint256)',
      'function number() view returns (uint64)',
      'function sequenceNumber() view returns (uint64)',
      'function setL1BlockValues(uint64 _number, uint64 _timestamp, uint256 _basefee, bytes32 _hash, uint64 _sequenceNumber, bytes32 _batcherHash, uint256 _l1FeeOverhead, uint256 _l1FeeScalar)',
      'function timestamp() view returns (uint64)',
      'function version() view returns (string)',
    ],
    logicAddress: '0xc0d3C0D3C0D3c0D3C0D3C0d3C0D3c0D3c0d30015',
    deprecated: false,
    references: [PREDEPLOYS_SPEC],
  },
  {
    address: '0x4200000000000000000000000000000000000016',
    name: '`L2ToL1MessagePasser`',
    description: 'Stores commitments to withdrawal transactions.',
    proxyAbi: [
      'constructor(address _admin)',
      'event AdminChanged(address previousAdmin, address newAdmin)',
      'event Upgraded(address indexed implementation)',
      'fallback()',
      'function admin() returns (address)',
      'function changeAdmin(address _admin)',
      'function implementation() returns (address)',
      'function upgradeTo(address _implementation)',
      'function upgradeToAndCall(address _implementation, bytes _data) payable returns (bytes)',
      'receive() external payable',
    ],
    logicAbi: [
      'constructor()',
      'event MessagePassed(uint256 indexed nonce, address indexed sender, address indexed target, uint256 value, uint256 gasLimit, bytes data, bytes32 withdrawalHash)',
      'event WithdrawerBalanceBurnt(uint256 indexed amount)',
      'function MESSAGE_VERSION() view returns (uint16)',
      'function burn()',
      'function initiateWithdrawal(address _target, uint256 _gasLimit, bytes _data) payable',
      'function messageNonce() view returns (uint256)',
      'function sentMessages(bytes32) view returns (bool)',
      'function version() view returns (string)',
      'receive() external payable',
    ],
    logicAddress: '0xC0D3C0d3C0d3c0d3C0d3C0D3c0D3c0d3c0D30016',
    deprecated: false,
    references: [PREDEPLOYS_SPEC],
  },
  {
    address: '0x4200000000000000000000000000000000000014',
    name: '`L2ERC721Bridge`',
    description:
      'Works together with the L1 ERC721 bridge to enable transfers of ERC721 tokens from Ethereum to Optimism.',
    proxyAbi: [
      'constructor(address _admin)',
      'event AdminChanged(address previousAdmin, address newAdmin)',
      'event Upgraded(address indexed implementation)',
      'fallback()',
      'function admin() returns (address)',
      'function changeAdmin(address _admin)',
      'function implementation() returns (address)',
      'function upgradeTo(address _implementation)',
      'function upgradeToAndCall(address _implementation, bytes _data) payable returns (bytes)',
      'receive() external payable',
    ],
    logicAbi: [
      'constructor(address _messenger, address _otherBridge)',
      'event ERC721BridgeFinalized(address indexed localToken, address indexed remoteToken, address indexed from, address to, uint256 tokenId, bytes extraData)',
      'event ERC721BridgeInitiated(address indexed localToken, address indexed remoteToken, address indexed from, address to, uint256 tokenId, bytes extraData)',
      'function MESSENGER() view returns (address)',
      'function OTHER_BRIDGE() view returns (address)',
      'function bridgeERC721(address _localToken, address _remoteToken, uint256 _tokenId, uint32 _minGasLimit, bytes _extraData)',
      'function bridgeERC721To(address _localToken, address _remoteToken, address _to, uint256 _tokenId, uint32 _minGasLimit, bytes _extraData)',
      'function finalizeBridgeERC721(address _localToken, address _remoteToken, address _from, address _to, uint256 _tokenId, bytes _extraData)',
      'function messenger() view returns (address)',
      'function otherBridge() view returns (address)',
      'function version() view returns (string)',
    ],
    logicAddress: '0xC0D3c0d3c0d3c0d3c0D3C0d3C0D3C0D3c0d30014',
    deprecated: false,
    references: [PREDEPLOYS_SPEC],
  },
  {
    address: '0x4200000000000000000000000000000000000017',
    name: '`OptimismMintableERC721Factory`',
    description:
      'Responsible for creating ERC721 contracts on L2 that can be used for depositing native L1 NFTs into.',
    proxyAbi: [
      'constructor(address _admin)',
      'event AdminChanged(address previousAdmin, address newAdmin)',
      'event Upgraded(address indexed implementation)',
      'fallback()',
      'function admin() returns (address)',
      'function changeAdmin(address _admin)',
      'function implementation() returns (address)',
      'function upgradeTo(address _implementation)',
      'function upgradeToAndCall(address _implementation, bytes _data) payable returns (bytes)',
      'receive() external payable',
    ],
    logicAbi: [
      'constructor(address _bridge, uint256 _remoteChainId)',
      'event OptimismMintableERC721Created(address indexed localToken, address indexed remoteToken, address deployer)',
      'function BRIDGE() view returns (address)',
      'function REMOTE_CHAIN_ID() view returns (uint256)',
      'function createOptimismMintableERC721(address _remoteToken, string _name, string _symbol) returns (address)',
      'function isOptimismMintableERC721(address) view returns (bool)',
      'function version() view returns (string)',
    ],
    logicAddress: '0xc0d3C0d3C0d3C0d3C0d3c0d3C0D3C0d3C0D30017',
    deprecated: false,
    references: [PREDEPLOYS_SPEC],
  },
  {
    address: '0x4200000000000000000000000000000000000018',
    name: '`ProxyAdmin`',
    description: 'The owner of all of the proxy contracts set at the predeploys.',
    proxyAbi: [
      'constructor(address _admin)',
      'event AdminChanged(address previousAdmin, address newAdmin)',
      'event Upgraded(address indexed implementation)',
      'fallback()',
      'function admin() returns (address)',
      'function changeAdmin(address _admin)',
      'function implementation() returns (address)',
      'function upgradeTo(address _implementation)',
      'function upgradeToAndCall(address _implementation, bytes _data) payable returns (bytes)',
      'receive() external payable',
    ],
    logicAbi: [
      'constructor(address _owner)',
      'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
      'function addressManager() view returns (address)',
      'function changeProxyAdmin(address _proxy, address _newAdmin)',
      'function getProxyAdmin(address _proxy) view returns (address)',
      'function getProxyImplementation(address _proxy) view returns (address)',
      'function implementationName(address) view returns (string)',
      'function isUpgrading() view returns (bool)',
      'function owner() view returns (address)',
      'function proxyType(address) view returns (uint8)',
      'function renounceOwnership()',
      'function setAddress(string _name, address _address)',
      'function setAddressManager(address _address)',
      'function setImplementationName(address _address, string _name)',
      'function setProxyType(address _address, uint8 _type)',
      'function setUpgrading(bool _upgrading)',
      'function transferOwnership(address newOwner)',
      'function upgrade(address _proxy, address _implementation)',
      'function upgradeAndCall(address _proxy, address _implementation, bytes _data) payable',
    ],
    logicAddress: '0xC0d3C0D3c0d3C0d3c0d3c0D3C0D3C0d3C0D30018',
    deprecated: false,
    references: [PREDEPLOYS_SPEC],
  },
  {
    address: '0x4200000000000000000000000000000000000019',
    name: 'BaseFeeVault',
    description:
      'Receives the base fees on L2, since the basefee is not burnt on L2 like it is on L1.',
    proxyAbi: [
      'constructor(address _admin)',
      'event AdminChanged(address previousAdmin, address newAdmin)',
      'event Upgraded(address indexed implementation)',
      'fallback()',
      'function admin() returns (address)',
      'function changeAdmin(address _admin)',
      'function implementation() returns (address)',
      'function upgradeTo(address _implementation)',
      'function upgradeToAndCall(address _implementation, bytes _data) payable returns (bytes)',
      'receive() external payable',
    ],
    logicAbi: [
      'constructor(address _recipient)',
      'event Withdrawal(uint256 value, address to, address from)',
      'function MIN_WITHDRAWAL_AMOUNT() view returns (uint256)',
      'function RECIPIENT() view returns (address)',
      'function totalProcessed() view returns (uint256)',
      'function version() view returns (string)',
      'function withdraw()',
      'receive() external payable',
    ],
    logicAddress: '0xC0d3c0D3c0d3C0D3C0D3C0d3c0D3C0D3c0d30019',
    deprecated: false,
    references: [PREDEPLOYS_SPEC],
  },
  {
    address: '0x420000000000000000000000000000000000001a',
    name: 'L1FeeVault',
    description:
      'Receives the L1 portion of the transaction fees. Once the contract has received a certain amount of fees, the ETH can be withdrawn to an immutable address on L1.',
    proxyAbi: [
      'constructor(address _admin)',
      'event AdminChanged(address previousAdmin, address newAdmin)',
      'event Upgraded(address indexed implementation)',
      'fallback()',
      'function admin() returns (address)',
      'function changeAdmin(address _admin)',
      'function implementation() returns (address)',
      'function upgradeTo(address _implementation)',
      'function upgradeToAndCall(address _implementation, bytes _data) payable returns (bytes)',
      'receive() external payable',
    ],
    logicAbi: [
      'constructor(address _recipient)',
      'event Withdrawal(uint256 value, address to, address from)',
      'function MIN_WITHDRAWAL_AMOUNT() view returns (uint256)',
      'function RECIPIENT() view returns (address)',
      'function totalProcessed() view returns (uint256)',
      'function version() view returns (string)',
      'function withdraw()',
      'receive() external payable',
    ],
    logicAddress: '0xc0D3c0D3C0d3c0d3c0d3C0d3c0d3C0d3C0D3001A',
    deprecated: false,
    references: [PREDEPLOYS_SPEC],
  },
];
