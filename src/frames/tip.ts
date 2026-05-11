export function createTipFrame(recipient: string, amounts: string[]) {
  return {
    metadata: { version: "vNext", image: `https://og.base.org/tip/${recipient}`,
      buttons: amounts.map(a => ({ label: `Tip ${a} ETH`, action: "tx" })), postUrl: "/api/tip" },
    handler: async (req: Request) => {
      const body = await req.json();
      const amount = amounts[body.untrustedData?.buttonIndex - 1] ?? "0.001";
      return Response.json({ chainId: "eip155:8453", method: "eth_sendTransaction",
        params: { to: recipient, value: (parseFloat(amount) * 1e18).toString(16) } });
    }
  };
}
