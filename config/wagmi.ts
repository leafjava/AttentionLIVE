import { http, createConfig } from 'wagmi';
import { bscTestnet, localhost } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

// 硬编码 RPC / WalletConnect 项目 ID（按要求写死在代码中）
const RPC_URL = 'https://data-seed-prebsc-2-s1.binance.org:8545';
const WALLETCONNECT_PROJECT_ID = '3d0b389d5e9da1836f8f5067bc123231'; // 目前未启用 walletConnect 连接器

// 仅使用 injected（MetaMask/OKX），如需 WalletConnect 可在此处扩展
const connectors = [
  injected({
    shimDisconnect: true,
  }),
];

// 支持本地开发和 BSC 测试网
export const wagmiConfig = createConfig({
  chains: [localhost, bscTestnet],
  connectors,
  transports: {
    [localhost.id]: http('http://127.0.0.1:8545'),
    [bscTestnet.id]: http(RPC_URL),
  },
  ssr: true,
});
