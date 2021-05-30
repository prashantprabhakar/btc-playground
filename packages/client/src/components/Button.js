import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
  font-family: inherit;
  border: none;
  border-radius: 4px;
  font-family: inherit;
  background-color: unset;
  position: relative;
  box-sizing: border-box;
  vertical-align: middle;
  padding: 0 16px;
  height: 32px;
  color: #90caf9;
  border: 1px solid rgba(144, 202, 249, 0.5);
  &:active {
    border: 1px solid #90caf9;
    background-color: rgba(144, 202, 249, 0.08);
  }
  margin: 24px 0 0;
  display: block;
`

export default Button;