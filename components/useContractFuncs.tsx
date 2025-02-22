import { CONTRACT_ADDRESS, JSON_RPC_URL } from "@/lib/constants";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import {
  BrowserProvider,
  Contract,
  Eip1193Provider,
  formatUnits,
  JsonRpcProvider,
  parseEther,
} from "ethers";
import blast_presale_abi from "../contracts/blast_presale_abi.json";
import { ErrorDecoder } from "ethers-decode-error";
import type { DecodedError } from "ethers-decode-error";

export default function useContractFuncs() {
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");

  // Create a read-only provider
  const readProvider = new JsonRpcProvider(JSON_RPC_URL);
  const readOnlyContract = new Contract(
    CONTRACT_ADDRESS,
    blast_presale_abi,
    readProvider
  );
  const errorDecoder = ErrorDecoder.create([blast_presale_abi]);

  // Initialize contract with signer for write operations
  async function initWriteContract() {
    if (!isConnected) throw Error("User disconnected");
    const ethersProvider = new BrowserProvider(
      walletProvider as Eip1193Provider
    );
    const signer = await ethersProvider.getSigner();
    return new Contract(CONTRACT_ADDRESS, blast_presale_abi, signer);
  }

  // Write function - requires wallet connection
  const buyToken = async (ethAmount: string) => {
    try {
      // Convert the user input (e.g., "0.001") to wei
      const ethValue = parseEther(ethAmount);

      // Initialize the contract with the signer
      const contract = await initWriteContract();

      // Call the buyTokens function with the value in wei
      const tx = await contract.buyTokens({ value: ethValue });
      await tx.wait();
    } catch (err) {
      const decodedError: DecodedError = await errorDecoder.decode(err);
      console.log(`Revert reason: ${decodedError.reason}`);
      throw new Error(`Transaction failed: ${decodedError.reason}!`);
    }
  };

  const claimYourTokens = async () => {
    try {
      const contract = await initWriteContract();
      const tx = await contract.claimTokens();
      await tx.wait();
    } catch (err) {
      const decodedError: DecodedError = await errorDecoder.decode(err);
      console.log(`Revert reason: ${decodedError.reason}`);
      throw new Error(`Transaction failed: ${decodedError.reason}!`);
    }
  };

  // Read functions - don't require wallet connection
  const getCalculatedToken = async (ethAmount: string) => {
    try {
      // Convert the user input (e.g., "0.001") to wei
      const ethValue = parseEther(ethAmount);

      // Call the calculateTokenAmount function with the value in wei
      const tokenAmountBigNumber = await readOnlyContract.calculateTokenAmount(
        ethValue
      );

      // Convert the result back to Ether for display
      return formatUnits(tokenAmountBigNumber, 18);
    } catch (err) {
      const decodedError: DecodedError = await errorDecoder.decode(err);
      console.log(`Revert reason: ${decodedError.reason}`);
      throw new Error(`Transaction failed: ${decodedError.reason}!`);
    }
  };

  // Helper function to convert seconds to { days, hours, minutes, seconds }
  const formatTimeRemaining = (seconds: bigint) => {
    const days = Math.floor(Number(seconds) / (3600 * 24));
    const hours = Math.floor((Number(seconds) % (3600 * 24)) / 3600);
    const minutes = Math.floor((Number(seconds) % 3600) / 60);
    const secs = Math.floor(Number(seconds) % 60);

    return {
      days,
      hours,
      minutes,
      seconds: secs,
    };
  };

  const getTimeRemaining = async () => {
    const timeRemainingInSeconds = await readOnlyContract.getTimeRemaining();
    return formatTimeRemaining(timeRemainingInSeconds);
  };

  const getBlastTokenPrice = async () => {
    const price = await readOnlyContract.getCurrentPrice();
    return formatUnits(price, 18);
  };

  const getBlastTokenPriceInUSD = async () => {
    const price = await readOnlyContract.getCurrentPriceInUSD();
    return formatUnits(price, 8);
  };

  const getPurchasedAmount = async () => {
    const amount = await readOnlyContract.getPurchasedAmount(address);
    return formatUnits(amount, 18);
  };

  const getRemainingTokens = async () => {
    const amount = await readOnlyContract.getRemainingTokens();
    return parseFloat(formatUnits(amount, 18)).toFixed(0);
  };
  
  const getBlastAddress = async () => {
    const address = await readOnlyContract.BLAST_TOKEN();
    return address;
  };


  const getTimeUntilNextPriceIncrease = async () => {
    const timeRemainingInSeconds = await readOnlyContract.getTimeUntilNextPriceIncrease();
    return formatTimeRemaining(timeRemainingInSeconds);
  };

  return {
    // Write functions (require wallet)
    buyToken,
    claimYourTokens,
    getTimeUntilNextPriceIncrease,
    // Read functions (don't require wallet)
    getBlastAddress,
    getCalculatedToken,
    getTimeRemaining,
    getBlastTokenPrice,
    getPurchasedAmount,
    getBlastTokenPriceInUSD,
    getRemainingTokens,
    // Connection status
    isConnected,
  };
}
