import React from "react";
import {
  useCurrentUser,
  useTotalPatronageForTokenWei,
  useTotalPatronageForTokenEth,
  useUsdEthPrice,
  useTotalPatronageForTokenUsd,
  useDepositAbleToWithdrawWei,
  useDepositAbleToWithdrawEth,
  useDepositAbleToWithdrawUsd,
  useForeclosureTime,
  useCurrentPriceWei,
  useCurrentPriceEth,
  useCurrentPriceUsd,
  useCurrentPatron,
  useTokenHash,
  useTokenUrl,
} from '../providers/Hooks'

export default () => {
  const currentUser = useCurrentUser()

  const usdEthPrice = useUsdEthPrice()

  const totalRaisedToken0 = useTotalPatronageForTokenWei(0)
  const totalRaisedToken1 = useTotalPatronageForTokenWei(1)
  const totalRaisedToken2 = useTotalPatronageForTokenWei(2)
  const totalRaisedToken0Eth = useTotalPatronageForTokenEth(0)
  const totalRaisedToken1Eth = useTotalPatronageForTokenEth(1)
  const totalRaisedToken2Eth = useTotalPatronageForTokenEth(2)
  const totalRaisedToken0Usd = useTotalPatronageForTokenUsd(0)
  const totalRaisedToken1Usd = useTotalPatronageForTokenUsd(1)
  const totalRaisedToken2Usd = useTotalPatronageForTokenUsd(2)

  const depositAbleToWithdraw0 = useDepositAbleToWithdrawWei(0)
  const depositAbleToWithdraw1 = useDepositAbleToWithdrawWei(1)
  const depositAbleToWithdraw2 = useDepositAbleToWithdrawWei(2)
  const depositAbleToWithdraw0Eth = useDepositAbleToWithdrawEth(0)
  const depositAbleToWithdraw1Eth = useDepositAbleToWithdrawEth(1)
  const depositAbleToWithdraw2Eth = useDepositAbleToWithdrawEth(2)
  const depositAbleToWithdraw0Usd = useDepositAbleToWithdrawUsd(0)
  const depositAbleToWithdraw1Usd = useDepositAbleToWithdrawUsd(1)
  const depositAbleToWithdraw2Usd = useDepositAbleToWithdrawUsd(2)

  const currentPrice0 = useCurrentPriceWei(0)
  const currentPrice1 = useCurrentPriceWei(1)
  const currentPrice2 = useCurrentPriceWei(2)
  const currentPrice0Eth = useCurrentPriceEth(0)
  const currentPrice1Eth = useCurrentPriceEth(1)
  const currentPrice2Eth = useCurrentPriceEth(2)
  const currentPrice0Usd = useCurrentPriceUsd(0)
  const currentPrice1Usd = useCurrentPriceUsd(1)
  const currentPrice2Usd = useCurrentPriceUsd(2)

  const foreclosureTime0 = useForeclosureTime(0)
  const foreclosureTime1 = useForeclosureTime(1)
  const foreclosureTime2 = useForeclosureTime(2)

  const hash0 = useTokenHash(0)
  const hash1 = useTokenHash(1)
  const hash2 = useTokenHash(2)

  const url0 = useTokenUrl(0)
  const url1 = useTokenUrl(1)
  const url2 = useTokenUrl(2)

  const currentPatron0 = useCurrentPatron(0)
  const currentPatron1 = useCurrentPatron(1)
  const currentPatron2 = useCurrentPatron(2)

  console.log('re-render')

  return <div>

    <p>Current user: {currentUser}</p>

    <p>Etherem/Usd price: {usdEthPrice} USD/ETH</p>

    <p>Ad 1 has raised: {totalRaisedToken0} WEI</p>
    <p>Ad 2 has raised: {totalRaisedToken1} WEI</p>
    <p>Ad 3 has raised: {totalRaisedToken2} WEI</p>
    <p>Ad 1 has raised: {totalRaisedToken0Eth} ETH</p>
    <p>Ad 2 has raised: {totalRaisedToken1Eth} ETH</p>
    <p>Ad 3 has raised: {totalRaisedToken2Eth} ETH</p>
    <p>Ad 1 has raised: {totalRaisedToken0Usd} USD</p>
    <p>Ad 2 has raised: {totalRaisedToken1Usd} USD</p>
    <p>Ad 3 has raised: {totalRaisedToken2Usd} USD</p>

    <p>Ad 1 has deposit available: {depositAbleToWithdraw0} WEI</p>
    <p>Ad 2 has deposit available: {depositAbleToWithdraw1} WEI</p>
    <p>Ad 3 has deposit available: {depositAbleToWithdraw2} WEI</p>
    <p>Ad 1 has deposit available: {depositAbleToWithdraw0Eth} ETH</p>
    <p>Ad 2 has deposit available: {depositAbleToWithdraw1Eth} ETH</p>
    <p>Ad 3 has deposit available: {depositAbleToWithdraw2Eth} ETH</p>
    <p>Ad 1 has deposit available: {depositAbleToWithdraw0Usd} USD</p>
    <p>Ad 2 has deposit available: {depositAbleToWithdraw1Usd} USD</p>
    <p>Ad 3 has deposit available: {depositAbleToWithdraw2Usd} USD</p>

    <p>Ad 1 has current price: {currentPrice0} WEI</p>
    <p>Ad 2 has current price: {currentPrice1} WEI</p>
    <p>Ad 3 has current price: {currentPrice2} WEI</p>
    <p>Ad 1 has current price: {currentPrice0Eth} ETH</p>
    <p>Ad 2 has current price: {currentPrice1Eth} ETH</p>
    <p>Ad 3 has current price: {currentPrice2Eth} ETH</p>
    <p>Ad 1 has current price: {currentPrice0Usd} USD</p>
    <p>Ad 2 has current price: {currentPrice1Usd} USD</p>
    <p>Ad 3 has current price: {currentPrice2Usd} USD</p>

    {(!!foreclosureTime0) && <p>Foreclosure time: {foreclosureTime0.format()}</p>}
    {(!!foreclosureTime1) && <p>Foreclosure time: {foreclosureTime1.format()}</p>}
    {(!!foreclosureTime2) && <p>Foreclosure time: {foreclosureTime2.format()}</p>}

    <p>Ad 1 current hash: {hash0}</p>
    <p>Ad 2 current hash: {hash1}</p>
    <p>Ad 3 current hash: {hash2}</p>

    <p>Ad 1 current url: {url0}</p>
    <p>Ad 2 current url: {url1}</p>
    <p>Ad 3 current url: {url2}</p>

    <p>Ad 1 current patron: {currentPatron0}</p>
    <p>Ad 2 current patron: {currentPatron1}</p>
    <p>Ad 3 current patron: {currentPatron2}</p>
  </div>
}

