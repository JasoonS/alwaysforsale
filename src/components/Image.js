import React, { Fragment, useState, useEffect } from 'react';
import { useTokenId } from '../providers/TokenIdContext';
import { useTokenHash, useTokenUrl, useIsCurrentPatron } from '../providers/Hooks';
import { cat } from '../lib/ipfs';
import UpdateModal from './UpdateModal';
import BuyModal from './BuyModal';

export default ({ displayWeb3Actions }) => {
  const [imageData, setImageData] = useState('')
  const tokenId = useTokenId()
  const imageHash = useTokenHash(tokenId)
  const adLink = useTokenUrl(tokenId)
  const isCurrentPatron = useIsCurrentPatron(tokenId)

  // Load the imageData
  useEffect(() => {
    if (!!imageHash) {
      cat(imageHash).then(data => {
        const dataString = data.toString()
        if (dataString.includes('data')) {
          setImageData(dataString)
        } else {
          // TODO: Show some kind of error to the user that the image is corrupt/wrong format
        }
      })
    }
  }, [imageHash])

  return <Fragment>
    <div className='image-container'>
      <a href={`${adLink | ''}?ref=alwaysforsale`}>
        {(!!imageData && imageData !== '') ?
          <img
            src={imageData}
            style={{ width: '100%' }}
          />
          :
          <div
            style={{ width: '100%' }}
          >
            <p style={{ backgroundColor: 'white' }}>Loading the image...</p>
            {/* <img
        src={window.rootCdnUrl + tokenId}
        style={{ width: '100%' }}
      ></img> */}
          </div>
        }
      </a>
      {!!displayWeb3Actions && (
        <div className='interaction-button-container'>
          <div className='interaction-buttons'>
            {isCurrentPatron ? (
              <div>
                <Fragment>
                  <p>You own this token</p>
                  <UpdateModal />
                  {/* <TokenOverview /> */}
                </Fragment>
              </div>
            ) : (
                <div>
                  <p>You DON'T own this token</p>
                  <BuyModal />
                  {/* <BuyModal />
                    <TokenOverview /> */}
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  </Fragment>
}
