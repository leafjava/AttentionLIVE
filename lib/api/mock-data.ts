// Mock 数据 - 用于开发测试
import type { Task, User, PointRecord, StreamerStats, LeaderboardEntry } from '@/types/attention';

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'BTC 行情分析直播',
    streamerName: 'CryptoKing',
    streamUrl: 'https://www.binance.com/zh-CN/live/video?roomId=2179393',
    reward: 100,
    status: 'active',
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 3600000).toISOString(),
    participantCount: 1234,
  },
  {
    id: 'task-2',
    title: 'ETH 2.0 技术解读',
    streamerName: 'BlockchainGuru',
    streamUrl: 'https://www.binance.com/zh-CN/live/video?roomId=2179394',
    reward: 150,
    status: 'active',
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 7200000).toISOString(),
    participantCount: 856,
  },
  {
    id: 'task-3',
    title: 'DeFi 项目深度分析',
    streamerName: 'DeFiMaster',
    streamUrl: 'https://www.binance.com/zh-CN/live/video?roomId=2179395',
    reward: 200,
    status: 'upcoming',
    startTime: new Date(Date.now() + 3600000).toISOString(),
    endTime: new Date(Date.now() + 7200000).toISOString(),
    participantCount: 0,
  },
];

export const mockUser: User = {
  id: 'user-123',
  username: 'CryptoFan',
  totalPoints: 2580,
  rank: 42,
};

export const mockPointRecords: PointRecord[] = [
  {
    id: 'record-1',
    taskId: 'task-1',
    taskTitle: 'BTC 行情分析直播',
    points: 100,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    type: 'earn',
  },
  {
    id: 'record-2',
    taskId: 'task-2',
    taskTitle: 'ETH 2.0 技术解读',
    points: 150,
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    type: 'earn',
  },
];

export const mockLeaderboard: LeaderboardEntry[] = Array.from({ length: 50 }, (_, i) => ({
  rank: i + 1,
  username: `User${i + 1}`,
  points: 10000 - i * 150,
}));

export const mockStreamerStats: StreamerStats[] = [
  {
    taskId: 'task-1',
    taskTitle: 'BTC 行情分析直播',
    activeViewers: 1234,
    totalPoints: 123400,
    verificationRate: 0.78,
  },
];
