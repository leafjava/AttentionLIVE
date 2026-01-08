'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Tabs, Tab } from '@heroui/tabs';
import { Chip } from '@heroui/chip';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { 
  ATTENTION_TOKEN_ADDRESS, 
  STREAMER_STAKING_POOL_ADDRESS,
  VIEWER_REWARD_POOL_ADDRESS,
  STAKING_CONFIG 
} from '@/lib/contracts/staking';
import AttentionTokenABI from '@/lib/abi/AttentionToken.json';
import StreamerStakingPoolABI from '@/lib/abi/StreamerStakingPool.json';
import ViewerRewardPoolABI from '@/lib/abi/ViewerRewardPool.json';

export default function StakingPage() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState('streamer');

  // Streamer staking state
  const [stakeAmount, setStakeAmount] = useState('');
  const [duration, setDuration] = useState('3600'); // 1 hour default
  const [rewardRate, setRewardRate] = useState('500'); // 5% default

  // Read ATT balance
  const { data: attBalance } = useReadContract({
    address: ATTENTION_TOKEN_ADDRESS,
    abi: AttentionTokenABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  // Read viewer reward account
  const { data: viewerAccount } = useReadContract({
    address: VIEWER_REWARD_POOL_ADDRESS,
    abi: ViewerRewardPoolABI,
    functionName: 'getViewerAccount',
    args: address ? [address] : undefined,
  });

  // Read claimable tokens
  const { data: claimableTokens } = useReadContract({
    address: VIEWER_REWARD_POOL_ADDRESS,
    abi: ViewerRewardPoolABI,
    functionName: 'getClaimableTokens',
    args: address ? [address] : undefined,
  });

  // Write contracts
  const { writeContract: approveToken, data: approveHash } = useWriteContract();
  const { writeContract: createTask, data: createTaskHash } = useWriteContract();
  const { writeContract: claimReward, data: claimHash } = useWriteContract();

  // Wait for transactions
  const { isLoading: isApproving } = useWaitForTransactionReceipt({ hash: approveHash });
  const { isLoading: isCreating } = useWaitForTransactionReceipt({ hash: createTaskHash });
  const { isLoading: isClaiming } = useWaitForTransactionReceipt({ hash: claimHash });

  const handleApprove = async () => {
    if (!stakeAmount) return;
    
    approveToken({
      address: ATTENTION_TOKEN_ADDRESS,
      abi: AttentionTokenABI,
      functionName: 'approve',
      args: [STREAMER_STAKING_POOL_ADDRESS, parseEther(stakeAmount)],
    });
  };

  const handleCreateTask = async () => {
    if (!stakeAmount || !duration || !rewardRate) return;

    createTask({
      address: STREAMER_STAKING_POOL_ADDRESS,
      abi: StreamerStakingPoolABI,
      functionName: 'createStreamingTask',
      args: [parseEther(stakeAmount), BigInt(duration), BigInt(rewardRate)],
    });
  };

  const handleClaimReward = async () => {
    claimReward({
      address: VIEWER_REWARD_POOL_ADDRESS,
      abi: ViewerRewardPoolABI,
      functionName: 'claimReward',
    });
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardBody className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-600">Please connect your wallet to access staking features</p>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Staking</h1>
        <p className="text-gray-600">Stake ATT tokens to earn rewards</p>
      </div>

      {/* Balance Card */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Your ATT Balance</p>
              <p className="text-2xl font-bold">
                {attBalance ? formatEther(attBalance as bigint) : '0'} ATT
              </p>
            </div>
            <Chip color="primary" variant="flat">
              Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
            </Chip>
          </div>
        </CardBody>
      </Card>

      <Tabs 
        selectedKey={activeTab} 
        onSelectionChange={(key) => setActiveTab(key as string)}
        className="mb-6"
      >
        <Tab key="streamer" title="Streamer Staking">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold">Create Streaming Task</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <Input
                  label="Stake Amount (ATT)"
                  placeholder="1000"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  type="number"
                  description={`Minimum: ${STAKING_CONFIG.minStakeAmount} ATT`}
                />
              </div>

              <div>
                <Input
                  label="Duration (seconds)"
                  placeholder="3600"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  type="number"
                  description="Minimum: 300 (5 minutes), Maximum: 86400 (24 hours)"
                />
              </div>

              <div>
                <Input
                  label="Reward Rate (basis points)"
                  placeholder="500"
                  value={rewardRate}
                  onChange={(e) => setRewardRate(e.target.value)}
                  type="number"
                  description="100 = 1%, 500 = 5%, 1000 = 10%"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">How it works:</h4>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Stake ATT tokens to create a streaming task</li>
                  <li>Earn rewards based on viewer engagement</li>
                  <li>Higher viewer count = higher rewards</li>
                  <li>Platform fee: {STAKING_CONFIG.platformFeeRate / 100}%</li>
                  <li>Unstake cooldown: {STAKING_CONFIG.unstakeCooldown / 86400} days</li>
                </ul>
              </div>

              <div className="flex gap-2">
                <Button
                  color="primary"
                  variant="flat"
                  onPress={handleApprove}
                  isLoading={isApproving}
                  isDisabled={!stakeAmount || isApproving}
                >
                  1. Approve ATT
                </Button>
                <Button
                  color="primary"
                  onPress={handleCreateTask}
                  isLoading={isCreating}
                  isDisabled={!stakeAmount || isCreating}
                >
                  2. Create Task
                </Button>
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="viewer" title="Viewer Rewards">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold">Claim Your Rewards</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Points</p>
                  <p className="text-2xl font-bold">
                    {viewerAccount && Array.isArray(viewerAccount) ? Number(viewerAccount[0]) : 0}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Pending Points</p>
                  <p className="text-2xl font-bold">
                    {viewerAccount && Array.isArray(viewerAccount) ? Number(viewerAccount[2]) : 0}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Claimable ATT</p>
                  <p className="text-2xl font-bold">
                    {claimableTokens ? formatEther(claimableTokens as bigint) : '0'}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Claimed</p>
                  <p className="text-2xl font-bold">
                    {viewerAccount && Array.isArray(viewerAccount) && viewerAccount[3] 
                      ? formatEther(viewerAccount[3] as bigint) 
                      : '0'}
                  </p>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Conversion Rate:</h4>
                <p className="text-sm">
                  {STAKING_CONFIG.pointsPerToken} points = 1 ATT token
                </p>
                <p className="text-sm mt-1">
                  Minimum to claim: {STAKING_CONFIG.minClaimPoints} points
                </p>
              </div>

              <Button
                color="success"
                size="lg"
                className="w-full"
                onPress={handleClaimReward}
                isLoading={isClaiming}
                isDisabled={!claimableTokens || Number(claimableTokens) === 0 || isClaiming}
              >
                Claim Rewards
              </Button>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
