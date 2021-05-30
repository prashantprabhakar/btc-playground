import React, { useState } from 'react';
import Card from 'components/Card';
import Button from 'components/Button';
import InfoText from 'components/InfoText';
import { generateMnemonic } from 'bip84';

const CreateMnemonic = () => {
  const [mnemonic, setMnemonic] = useState('Your Mnemonic will appear here');

  return (
    <Card
      heading="Create Mnemonic"
      subHeading="Generate a new random one"
      icon="fingerprint"
    >
      <InfoText>
        {mnemonic}
      </InfoText>
      <Button
        type="submit"
        onClick={() => setMnemonic(generateMnemonic())}
      >
        Generate
      </Button>
    </Card>
  )
}

export default CreateMnemonic;