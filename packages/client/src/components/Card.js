import React from 'react';
import styled from 'styled-components';

const Card = ({
  children,
  className,
  heading,
  subHeading,
  icon,
}) => {
  return (
    <Container
      className={className}
    >
      <header>
        <i className="material-icons head-icon">{icon}</i>
        <span className="heading">{heading}</span>
      </header>
      <div className="sub-heading">{subHeading}</div>
      {children}
    </Container>
  )
}


const Container = styled.section`
  background: #333;
  margin: 12px;
  width: 640px;
  border-radius: 2px;
  padding: 24px;
  box-sizing: border-box;
  max-width: calc(100% - 24px);
  
  .head-icon {
    color: #90caf9;
    font-size: 2rem;
    margin-right: 10px;
    width: 2rem;
    height: 2rem;
  }
  .sub-heading {
    margin-bottom: 24px;
    margin-left: 42px;
    font-size: .8rem;
    color: #aaa;
  }
  header {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    margin-bottom: 8px;
  }
  &+& {
    margin-top: 32px;
  }
`

export default Card;