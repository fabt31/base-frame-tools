import { encodeFunctionData, parseUnits } from "viem";

const SWAP_ROUTER_ABI = [{
  name: "exactInputSingle",
  type: "function",
  inputs: [{
    type: "tuple",
    components: [
      { name: "tokenIn", type: "address" },
      { name: "tokenOut", type: "address" },
      { name: "fee", type: "uint24" },
      { name: "recipient", type: "address" },
      { name: "amountIn", type: "uint256" },
      { name: "amountOutMinimum", type: "uint256" },
      { name: "sqrtPriceLimitX96", type: "uint160" },
    ]
  }],
  outputs: [{ name: "amountOut", type: "uint256" }],
  stateMutability: "payable"
}] as const;

const UNISWAP_ROUTER = "0x2626664c2603336E57B271c5C0b26F421741e481" as const;
const WETH = "0x4200000000000000000000000000000000000006" as const;
const USDC = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as const;

export function createSwapFrameTransaction(recipient: `0x${string}`, amountEth: string) {
  const txData = encodeFunctionData({
    abi: SWAP_ROUTER_ABI,
    functionName: "exactInputSingle",
    args: [{
      tokenIn: WETH,
      tokenOut: USDC,
      fee: 500,
      recipient,
      amountIn: parseUnits(amountEth, 18),
      amountOutMinimum: BigInt(0),
      sqrtPriceLimitX96: BigInt(0),
    }],
  });
  return { to: UNISWAP_ROUTER, data: txData, value: parseUnits(amountEth, 18).toString() };
}