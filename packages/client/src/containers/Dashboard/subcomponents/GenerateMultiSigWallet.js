import React, { useState } from 'react';
import Card from 'components/Card';
import Button from 'components/Button';
import InfoText from 'components/InfoText';
import { Field, Form, Formik } from 'formik';
import { generatep2shKeys } from 'utils/bitcoin-lib';
import FormElement from 'components/FormElement';

const GenerateMultiSigWallet = () => {
  const [wallet, setWallet] = useState();

  const handleOnSubmit  = ({publicKeys, m}) => {
    let pubKeysArr = publicKeys.replace(/\s/, '').split(',')
    const p2shKeys = generatep2shKeys(pubKeysArr, m)
    console.log("**", {p2shKeys})
    setWallet(p2shKeys)
  }

  return (
    <Card
      heading="Generate Multi Signature Wallet"
      icon="shopping_bag"
      subHeading="Generate Multi Signature from public keys"
    >
      <Formik
        initialValues={{publicKeys: '', m: 0}}
        onSubmit={values => handleOnSubmit(values) }
        validate={(values)=>{
          if(values.publicKeys.replace(/\s/, '').split(',').length < values.m)
            return {m: 'M cannot be greater than number of public keys'}
        }}
      >
        {({errors, touched})=>(
          <Form>
            <Field
              label="Public keys"
              as={FormElement}
              name="publicKeys"
              placeholder={`comma separated Public keys without " or '`}
              validate={(v)=>!v && 'Public Keys are required'}
              error={touched.publicKeys && errors.publicKeys}
            />
            <Field
              label="M *"
              as={FormElement}
              name="m"
              type="number"
              validate={(v)=> v!==0 && !v  && 'M is required'}
              error={touched.m && errors.m}
            />
            <Button
              type="submit"
            >
              Generate
            </Button>
          </Form>
        )}
      </Formik>
      <InfoText label="Address">{(wallet) || 'Address here'}</InfoText>
    </Card>
  )
}

export default GenerateMultiSigWallet;