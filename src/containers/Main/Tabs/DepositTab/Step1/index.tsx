import React, { memo, useState, useCallback } from 'react';
import { MetamaskIcon, PlugIcon } from 'assets/img';
import { Button, FromToSwitcher, Input } from 'components';
import { WalletButton } from '../WalletButton';
import styles from './styles.module.css';

type Step1Props = {
  onNextClick: () => void;
};

const Step1 = memo(({
  onNextClick,
}: Step1Props) => {
  const [amount, setAmount] = useState('');
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  
  const onChangeAmount = useCallback((t: string) => {
    setAmount(t);
    if (t === '') {
      setIsNextDisabled(true);
    } else {
      setIsNextDisabled(false);
    }
  }, []);

  const switchElement1 = (
    <WalletButton
      icon={PlugIcon}
      text="Connect to Plug"
      onClick={() => {}}
    />
  );

  const switchElement2 = (
    <WalletButton
      icon={MetamaskIcon}
      text="Connect to Metamask"
      onClick={() => {}}
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
        value={amount}
        onChange={onChangeAmount}
        classNameContainer={styles.step1__input}
      />
      <Button
        theme="gradient"
        onClick={onNextClick}
        isDisabled={isNextDisabled}
        className={styles.step1__next_button}
      >
        Next
      </Button>
    </section>
  );
});

export { Step1 };
