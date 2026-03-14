import { useEffect, useState } from "react";

const PRICE_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,solana,binancecoin&vs_currencies=usd&include_24hr_change=true";
const GLOBAL_URL = "https://api.coingecko.com/api/v3/global";
const GAS_URL = "https://api.coingecko.com/api/v3/simple/gas";

const formatNumber = (value, maximumFractionDigits = 2) =>
  value?.toLocaleString("en-US", { maximumFractionDigits });

export const useTickerData = () => {
  const [state, setState] = useState({
    prices: null,
    global: null,
    gas: null,
    updatedAt: null
  });

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const [priceRes, globalRes, gasRes] = await Promise.all([
          fetch(PRICE_URL, { signal: controller.signal }),
          fetch(GLOBAL_URL, { signal: controller.signal }),
          fetch(GAS_URL, { signal: controller.signal })
        ]);
        const [prices, global, gas] = await Promise.all([
          priceRes.ok ? priceRes.json() : null,
          globalRes.ok ? globalRes.json() : null,
          gasRes.ok ? gasRes.json() : null
        ]);
        if (mounted) {
          setState({
            prices,
            global,
            gas,
            updatedAt: new Date().toISOString()
          });
        }
      } catch (error) {
        if (mounted) {
          setState((prev) => ({ ...prev, updatedAt: new Date().toISOString() }));
        }
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);

    return () => {
      mounted = false;
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  const stats = [];
  const prices = state.prices || {};

  const pushPrice = (label, id) => {
    if (!prices[id]) return;
    const change = prices[id].usd_24h_change ?? 0;
    stats.push({
      label,
      value: `$${formatNumber(prices[id].usd)}`,
      change
    });
  };

  pushPrice("ETH", "ethereum");
  pushPrice("BTC", "bitcoin");

  if (state.global?.data?.total_market_cap?.usd) {
    stats.push({
      label: "TOTAL MCAP",
      value: `$${formatNumber(state.global.data.total_market_cap.usd, 0)}`,
      change: null
    });
  }

  if (state.gas?.standard) {
    stats.push({
      label: "ETH GAS",
      value: `${formatNumber(state.gas.standard, 0)} Gwei`,
      change: null
    });
  }

  pushPrice("SOL", "solana");
  pushPrice("BNB", "binancecoin");

  return { stats, updatedAt: state.updatedAt };
};
