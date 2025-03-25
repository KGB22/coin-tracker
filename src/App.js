import Button from "./Button";
import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const handleSelect = (event) => {
    const coinName = event.target.value;
    const coin = coins.find((c) => c.name === coinName);
    setSelectedCoin(coin);
  };

  function reset() {
    setAmount("");
  }

  const onChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div className={styles.box}>
      <div className={styles.title}>
        Coin Tracker
        {!loading && (
          <>
            {" ("}
            <span>{coins.length}</span>
            {")"}
          </>
        )}
      </div>

      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <div className={styles.select_box}>
            <select onChange={handleSelect} defaultValue="">
              <option value="" disabled>
                Select Coin!
              </option>
              {coins.map((coin) => (
                <option key={coin.rank} value={coin.name}>
                  {coin.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.input_box}>
            <input
              type="number"
              id="dollars"
              placeholder="Dollars"
              value={amount}
              onChange={onChange}
            />
            <label htmlFor="dollars">Dollars</label>
          </div>{" "}
          {selectedCoin !== "" ? (
            <div className={styles.input_box}>
              <input
                id="btc"
                placeholder={selectedCoin.symbol}
                value={(amount / selectedCoin.quotes.USD.price).toFixed(2)}
                disabled
              />
              <label htmlFor="btc">{selectedCoin.symbol}</label>
            </div>
          ) : null}
          <div className={styles.button_box}>
            <Button reset={reset} text="Reset" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
