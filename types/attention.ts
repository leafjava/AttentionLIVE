// Attention LIVE 类型定义

export interface Task {
  id: string;
  title: string;
  streamerName: string;
  streamUrl: string;
  reward: number;
  status: 'active' | 'upcoming' | 'ended';
  startTime: string;
  endTime: string;
  thumbnailUrl?: string;
  participantCount: number;
}

export interface User {
  id: string;
  binanceId?: string;
  username: string;
  totalPoints: number;
  rank?: number;
}

export interface PointRecord {
  id: string;
  taskId: string;
  taskTitle: string;
  points: number;
  timestamp: string;
  type: 'earn' | 'redeem';
}

export interface VerificationResult {
  success: boolean;
  points?: number;
  message: string;
}

export interface StreamerStats {
  taskId: string;
  taskTitle: string;
  activeViewers: number;
  totalPoints: number;
  verificationRate: number;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  avatar?: string;
}
