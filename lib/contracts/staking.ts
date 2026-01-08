// Staking contract addresses
// Local Anvil (chainId 31337) - Update these with your deployed addresses
export const ATTENTION_TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3" as `0x${string}`;
export const STREAMER_STAKING_POOL_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" as `0x${string}`;
export const VIEWER_REWARD_POOL_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0" as `0x${string}`;

// Contract configuration
export const STAKING_CONFIG = {
  minStakeAmount: "1000", // 1000 ATT
  unstakeCooldown: 10, // 10 seconds (for testing)
  platformFeeRate: 500, // 5% = 500 basis points
  pointsPerToken: 1000, // 1000 points = 1 ATT
  minClaimPoints: 1000, // Minimum 1000 points to claim
  claimCooldown: 60 * 60, // 1 hour in seconds
};
