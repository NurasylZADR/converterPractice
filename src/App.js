import React, { useEffect, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {

  const [fromCurrency, setFromCurrency] = useState('RUB')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(0)

  const [rates, setRates] = useState({})

  useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then((res) => res.json())
      .then((json) => {
        setRates(json.rates)
        console.log(json.rates);
      }).catch(err => {
        console.warn(err)
        alert('Не удалось получить информацию')
      })
  }, [])

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency]
    const result = price * rates[toCurrency]
    setFromPrice(value)
    setToPrice(result)
  }

  const onChangeToPrice = (value) => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value;
    setFromPrice(result)
    setToPrice(value)
  }

  const onChangeFromCurrency = (cur) => {
    setFromCurrency(cur)
    onChangeFromPrice(fromPrice)
  }

  return (
    <div className="App">

      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />

      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />

    </div>
  );
}

export default App;
