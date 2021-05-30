import React, { useState } from 'react';
import Card from 'components/Card';
import Button from 'components/Button';
import InfoText from 'components/InfoText';
import LabelText from 'components/LabelText'
import { Field, Form, Formik } from 'formik';
import { generateHDWallet } from 'utils/bip84';
import FormElement from 'components/FormElement';

const GenerateWallet = () => {
  const [wallet, setWallet] = useState();
  const handleSubmit = ({seedPhrase, accountIndex, addressIndex}) => {
    let wallet = generateHDWallet(seedPhrase, +accountIndex, +addressIndex)
    setWallet(wallet.childAccount)
  }

  const generatePath = ({accountIndex, addressIndex}) =>  `m/84'/0'/${accountIndex}'/${addressIndex}`


  return (
    <Card
      heading="Generate HD Wallet"
      icon="account_balance_wallet"
      subHeading="Generate a BIP-84 hd wallet from seed phrase"
    >
      <Formik
        initialValues={{seedPhrase: "", accountIndex: 0, addressIndex: 0}}
        onSubmit={(values)=> handleSubmit(values)}
      >
        {({errors, touched, values })=>(
          <Form>
            <Field
              label="Seed Phrase *"
              as={FormElement}
              name="seedPhrase"
              validate={(v)=>!v && 'Seed Phase is required'}
              error={touched.seedPhrase && errors.seedPhrase}
            />
            <Field
              label="Account Index *"
              as={FormElement}
              name="accountIndex"
              type="number"
              validate={(v)=>v!==0 && !v && 'Account Index is required'}
              error={touched.accountIndex && errors.accountIndex}
            />
            <Field
              label="Address Index *"
              as={FormElement}
              name="addressIndex"
              type="number"
              validate={(v)=> v!==0 && !v  && 'Address Index is required'}
              error={touched.s && errors.s}
            />
            <LabelText> Path: {generatePath(values)} </LabelText>
            <Button
              type="submit"
            >
              Generate
            </Button>
          </Form>
        )}
      </Formik>
      <InfoText label="Address">{(wallet && wallet.address) || 'Address here'}</InfoText>
      <InfoText label="Private key">{(wallet && wallet.privateKey) || 'Private key here'}</InfoText>
      <InfoText label="Public key">{(wallet && wallet.publicKey) || 'Public key here'}</InfoText>
    </Card>
  )
}

export default GenerateWallet;