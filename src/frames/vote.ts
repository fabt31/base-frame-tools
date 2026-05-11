import { encodeFunctionData } from "viem";
const VOTE_ABI = [{ name: "castVote", type: "function", inputs: [{ name: "proposalId", type: "uint256" }, { name: "support", type: "uint8" }], outputs: [], stateMutability: "nonpayable" }] as const;
export function createVoteFrameTransaction(governor: `0x${string}`, proposalId: bigint, support: 0|1|2) {
  return { to: governor, data: encodeFunctionData({ abi: VOTE_ABI, functionName: "castVote", args: [proposalId, support] }), value: "0" };
}
