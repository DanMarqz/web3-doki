import { useCallback, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import styles from '../styles/Home.module.css'
import { connector } from '../config/web3'

export default function Home() {

  const { 
    account,                    // To know how is our Address
    activate,                   // To activate our account
    active,                     // To know is our account is active
    deactivate,                 // To deactivate our account
    chainId,                    // To know which network we are using
    error } = useWeb3React()    // To know the error if any
  
  const connect = useCallback(() => {
    activate(connector)
    localStorage.setItem('previouslyConnected', true)
  }, [activate])

  useEffect(() => {
    if (localStorage.getItem('previouslyConnected') === 'true')
      connect()
    }, [connect])
  
  const disconnect = () => {
    deactivate()
    localStorage.removeItem('previouslyConnected')
  }

  if(error){
    return <p>Something it's wrong... Please notify this to administrator. <br /> <b>{error.message}</b> </p>
  }

  return (
    <div className={styles.container}>
      <h1>Web3 Doki Demo App</h1>
      {
        active 
        ? <>
            <p>
              You are connected to <b>{chainId}</b> network. <br />
              Your account is: {account} 
            </p>
            <button onClick={disconnect}>Disconnect Wallet</button>
          </> 
        : <button onClick={connect}>Connect Wallet</button>
      }
      
    </div>
  )
}
