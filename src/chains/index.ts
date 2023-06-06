import { arbitrum } from '@/chains/arbitrum';
import { mainnet } from '@/chains/mainnet';
import { optimism } from '@/chains/optimism';

export type { Chain, Precompile, Predeploy } from '@/chains/types';
export const chains = { arbitrum, mainnet, optimism };
