import { drizzleReactHooks } from 'drizzle-react'
import BN from 'bn.js'
import { fromWei } from 'web3-utils'
import { useUsdEthPrice as useUsdEthPriceOrig } from './UsdPriceProvider'
import moment from 'moment'

const {
  useDrizzleState,
  useDrizzle,
} = drizzleReactHooks

export const useCurrentUser =
  () => {
    const state = useDrizzleState(state => state.accounts);
    return state[0];
  };

export const useUsdEthPrice = useUsdEthPriceOrig
export const useTotalPatronageForTokenWei = (tokenId) => {
  const { useCacheCall } = useDrizzle()
  // try { // TODO: should have some error handling here, but react didn't like it (no conditionals around hooks)
  const totalCollectedOpt =
    useCacheCall(['VitalikSteward'], call => call('VitalikSteward', 'totalCollected', tokenId))
  const patronageOwedOpt =
    useCacheCall(['VitalikSteward'], call => call('VitalikSteward', 'patronageOwed', tokenId))

  if (!!totalCollectedOpt && !!patronageOwedOpt) {
    return (new BN(totalCollectedOpt)).add(new BN(patronageOwedOpt)).toString()
  } else {
    return null
  }
  // } catch (e) {
  //   console.error('This is a friendly (friendlier) error message from Jason. You cannot call this function until drizzle is completely initialized and has loaded all the contracts.', e)
  // }
}

export const useTotalPatronageForTokenEth = (tokenId) => {
  const totPatranageWei = useTotalPatronageForTokenWei(tokenId)
  return (!!totPatranageWei) ? fromWei(totPatranageWei, 'ether') : null
}
export const useTotalPatronageForTokenUsd = (tokenId) => {
  const totPatranageEth = useTotalPatronageForTokenEth(tokenId)
  const usdEthPrice = useUsdEthPrice()
  return (!!totPatranageEth && !!usdEthPrice) ?
    (usdEthPrice * parseFloat(totPatranageEth)).toFixed(2)
    : null
}

export const useAreContractsLoaded = () => {
  return useDrizzleState(({
    web3: { status: web3Status },
    contracts: {
      VitalikSteward: { initialized: vitalikStewardInitialized },
      ERC721Full: { initialized: erc721FullInitialized }
    }
  }) => ({
    web3Status,
    erc721FullInitialized,
    vitalikStewardInitialized,
    allContractsLoaded: vitalikStewardInitialized && erc721FullInitialized
  }))
}

export const useDepositAbleToWithdrawWei = (tokenId) => {
  const { useCacheCall } = useDrizzle()
  // TODO: should have some error handling here, but react didn't like it (no conditionals around hooks)
  return useCacheCall(['VitalikSteward'], call => call('VitalikSteward', 'depositAbleToWithdraw', tokenId))
}

export const useDepositAbleToWithdrawEth = (tokenId) => {
  const depositToWithdraw = useDepositAbleToWithdrawWei(tokenId)
  return (!!depositToWithdraw) ? fromWei(depositToWithdraw, 'ether') : null
}

export const useDepositAbleToWithdrawUsd = (tokenId) => {
  const depositeAbleToWithdrawEth = useDepositAbleToWithdrawEth(tokenId);
  const usdEthPrice = useUsdEthPrice();
  return (!!depositeAbleToWithdrawEth && !!usdEthPrice) ?
    (usdEthPrice * parseFloat(depositeAbleToWithdrawEth)).toFixed(2)
    : null
};

// TODO: maybe using the 'moment.js' library would be beneficial here!
export const useForeclosureTime = (tokenId) => {
  const { useCacheCall } = useDrizzle()
  const foreclosureTimestamp = useCacheCall(['VitalikSteward'], call => call('VitalikSteward', 'foreclosureTime', tokenId))
  return (!!foreclosureTimestamp) ? moment(foreclosureTimestamp, 'X') : null
}

export const useTokenHash = (tokenId) => {
  const { useCacheCall } = useDrizzle()
  return useCacheCall(['VitalikSteward'], call => call('VitalikSteward', 'hashes', tokenId))
}

export const useTokenUrl = (tokenId) => {
  const { useCacheCall } = useDrizzle()
  return useCacheCall(['VitalikSteward'], call => call('VitalikSteward', 'urls', tokenId))
}

export const useCurrentPriceWei = (tokenId) => {
  const { useCacheCall } = useDrizzle()
  return useCacheCall(['VitalikSteward'], call => call('VitalikSteward', 'price', tokenId))
}
export const useCurrentPriceEth = (tokenId) => {
  const depositToWithdraw = useCurrentPriceWei(tokenId)
  return (!!depositToWithdraw) ? fromWei(depositToWithdraw, 'ether') : null
}

export const useCurrentPriceUsd = (tokenId) => {
  const currentPriceEth = useCurrentPriceEth(tokenId);
  const usdEthPrice = useUsdEthPrice();
  return (!!currentPriceEth && !!usdEthPrice) ?
    (usdEthPrice * parseFloat(currentPriceEth)).toFixed(2)
    : null
}

export const useCurrentPatron = (tokenId) => {
  const { useCacheCall } = useDrizzle()
  return useCacheCall(['ERC721Full'], call => call('ERC721Full', 'ownerOf', tokenId))
}

export const useIsCurrentPatron = (tokenId) => {
  const currentPatron = useCurrentPatron(tokenId)
  const currentUser = useCurrentUser()
  return !!currentPatron && !!currentUser && currentPatron.toUpperCase() === currentUser.toUpperCase()
}
// TODO: get `useTotalTimeHeld` working
// const useTotalTimeHeld = (addressOfUser) =>
//       const currentTimeHeld = parseInt(this.getTimeHeld(props, timeHeldKey)) + (parseInt(date.getTime()/1000) - parseInt(this.getTimeAcquired(props))

const useAvailableDeposit = (tokenId) => {
  const { useCacheCall } = useDrizzle()
  return useCacheCall(['VitalikSteward'], call => call('VitalikSteward', 'availableDeposit', tokenId))
}

// // const useBuyTransaction: unit => string => = (newPriceInEther: string) =>
// //   (useCacheSend())(. 'VitalikSteward', 'buy', newPriceInEther);
// const useBuyTransaction = () => (useCacheSend())(.'VitalikSteward', 'buy');
export const genericTransaction = (contractId, functionName) => tokenId => {
  const { useCacheSend } = useDrizzle()
  const { send, TXObjects } = useCacheSend(contractId, functionName)
  return { TXObjects, send }
}

export const useBuyTransaction = genericTransaction('VitalikSteward', 'buy')
export const useChangeImage = genericTransaction('VitalikSteward', 'changeImage')
export const useChangeUrl = genericTransaction('VitalikSteward', 'changeUrl')
export const useWithdrawDeposit = genericTransaction('VitalikSteward', 'withdrawDeposit')
export const useChangePrice = genericTransaction('VitalikSteward', 'changePrice')
export const useDepositWei = genericTransaction('VitalikSteward', 'depositWei')
export const useExit = genericTransaction('VitalikSteward', 'exit')
export const useTransferAssetTokenTo = genericTransaction('VitalikSteward', 'transferAssetTokenTo')
