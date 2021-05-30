import React from 'react';
import styled from 'styled-components';

const LabelText = ({
  children
}) =>{

  return (
    <>
      {
        children && (
          <Label className="label">
            {children}
          </Label>
        )
      }
    </>
  )
}

const Label = styled.div`
  margin-bottom: 24px;
  font-size: .8rem;
  color: #aaa;
`

export default LabelText;