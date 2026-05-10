import { FrameRequest, getFrameMessage } from "@coinbase/onchainkit/frame";
import { encodeFunctionData, parseEther } from "viem";

const MINT_ABI = [
  { name: "mint", type: "function", inputs: [{ name: "to", type: "address" }], outputs: [], stateMutability: "payable" }
] as const;

interface MintFrameConfig {
  contractAddress: `0x${string}`;
  chainId: number;
  title: string;
  image: string;
  price: string;
}

export function createMintFrame(config: MintFrameConfig) {
  return {
    metadata: {
      version: "vNext",
      image: config.image,
      buttons: [{ label: `Mint — ${config.price} ETH`, action: "tx" }],
      postUrl: "/api/frame/mint",
    },

    handler: async (req: Request) => {
      const body: FrameRequest = await req.json();
      const { isValid, message } = await getFrameMessage(body);
      if (!isValid) return new Response("Invalid frame", { status: 400 });

      const txData = encodeFunctionData({
        abi: MINT_ABI,
        functionName: "mint",
        args: [message.interactor.verified_addresses.eth_addresses[0] as `0x${string}`],
      });

      return Response.json({
        chainId: `eip155:${config.chainId}`,
        method: "eth_sendTransaction",
        params: {
          to: config.contractAddress,
          data: txData,
          value: parseEther(config.price).toString(),
        },
      });
    },
  };
}