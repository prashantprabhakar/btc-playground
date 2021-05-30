import React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';

const FormElement = ({
  element,
  label,
  error,
  ...otherProps
}) => {
  const Component = element || 'input'

  return (
    <Container>
      <label>{label}</label>
      <Component
        className={clsx("form-control", {error})}
        {...otherProps}
      />
      {error && <p className="error-label">{error}</p>}
    </Container>
  )
}


const Container = styled.div`
  width: 100%;
  padding: 10px 0;
  box-sizing: border-box;
  display: inline-flex;
  flex-flow: column;
  align-items: flex-start;
  position: relative;

  label {
    font-weight: 500;
    display: block;
    margin-bottom: 8px;
    color: #ccc;
    font-size: .8rem;
  }

  .error-label {
    color: #df8080;
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: -4px;
    font-size: .7rem;
  }

  .form-control {
    font-size: 12px;
    outline: none;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 6px 10px;
    width: 100%;
    border-radius: 4px;
    box-sizing: border-box;
    &:focus {
      outline: none;
      background-color: #fff;
      border: 1px solid #009ae0;
    }
    &.error {
      border-color: #d81b1b!important;
    }
  }
`

export default FormElement;