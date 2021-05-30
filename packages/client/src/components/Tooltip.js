import styled from 'styled-components';

const Tooltip = ({
  text,
  children,
  className,
}) => {
  return (
    <Container
      className={className}
    >
      <span className="tooltiptext">{text}</span>
      {children}
    </Container>
  )
}

const Container = styled.span`
  position: relative;
  display: inline-block;
  
  .tooltiptext {
    visibility: hidden;
    width: 140px;
    background-color: #212121;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 50%;
    margin-left: -75px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #212121 transparent transparent transparent;
  }

  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`

export default Tooltip;