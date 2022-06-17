/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  memo,
  useState,
  useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MetamaskIcon, PlugIcon } from 'assets/img';
import { getTransactionState } from 'store/transaction/selector';
import { setAmount } from 'store/transaction/actionCreator';
import { Button, Input, WalletButton } from 'components';
import { FromToSwitcher } from 'containers';
import { useMetamaskWallet } from 'hooks/useMetamaskWallet';
import { metamaskConnect } from 'store/metamask/actionCreators';
import { plugConnect } from 'store/plug/actionsCreator';
import { usePlugWallet } from 'hooks/usePlugWallet';
import styles from './styles.module.css';
import { fee } from '../contentDemo';

type Step1Props = {
  onNextClick: () => void;
};

const Step1 = memo(({
  onNextClick,
}: Step1Props) => {
  const stateTransaction = useSelector(getTransactionState);
  const dispatch = useDispatch();

  let currency = '';
  if (stateTransaction.from === 'polygon') {
    currency = 'WICP';
  } else {
    currency = 'ICP';
  }

  let inputAmountInit = '';
  if (stateTransaction.amount !== 0) {
    inputAmountInit = stateTransaction.amount.toString();
  }

  const [amountInput, setAmountInput] = useState(inputAmountInit);
  const [isNextDisabled, setIsNextDisabled] = useState(!amountInput);
  const { isMetaMaskConnected, metamaskAddres } = useMetamaskWallet();
  const { isPlugConnected, plugAddress } = usePlugWallet();

  const onChangeAmount = useCallback((t: string) => {
    setAmountInput(t);
    if (t === '') {
      setIsNextDisabled(true);
    } else {
      setIsNextDisabled(false);
    }
  }, [currency]);

  const onMetaMaskConnectClick = useCallback(() => {
    dispatch(metamaskConnect());
  }, [dispatch]);

  const onPlugConnectClick = useCallback(() => {
    dispatch(plugConnect());
  }, [dispatch]);

  const onNextButtonClick = useCallback(() => {
    const amountForState = amountInput;
    dispatch(setAmount(amountForState));
    onNextClick();
  }, [amountInput, dispatch]);

  const switchElement1 = (
    <WalletButton
      icon={PlugIcon}
      text="Connect to Plug"
      onClick={onPlugConnectClick}
      textIsClicked={plugAddress}
      isConnected={isPlugConnected}
    />
  );

  const switchElement2 = (
    <WalletButton
      icon={MetamaskIcon}
      text="Connect to Metamask"
      onClick={onMetaMaskConnectClick}
      textIsClicked={metamaskAddres || ''}
      isConnected={isMetaMaskConnected}
    />
  );

  return (
    <section className={styles.step1__container}>
      <FromToSwitcher
        element1={switchElement1}
        element2={switchElement2}
        label1="From"
        label2="To"
      />
      <Input
        label="Amount"
        placeholder="Enter amount"
        value={amountInput}
        onChange={onChangeAmount}
        classNameContainer={styles.step1__input}
        currency={currency}
      />
      <p className={styles.step1__fee}>
        {isMetaMaskConnected && isPlugConnected
          ? (
            <>
              Fee:
              {' '}
              <span>
                {fee}
              </span>
            </>
          )
          : <>&nbsp;</>}
      </p>
      <Button
        theme="gradient"
        onClick={onNextButtonClick}
        isDisabled={isNextDisabled}
        className={styles.step1__next_button}
      >
        Next
      </Button>
    </section>
  );
});

export { Step1 };
