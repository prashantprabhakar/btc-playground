import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import copyToClipboard from 'utils/copyToClipboard';
import Tooltip from './Tooltip';

const HighlightedText = ({
  children, 
  className,
  label
}) =>{
  const contentRef = useRef();
  const [copied, setCopied] = useState();

  return (
    <>
      {
        label && (
          <Label className="label">
            {label}
          </Label>
        )
      }
      <Container
        className={className}
      >
        <span
          ref={contentRef}
        >
          {children}
        </span>
        <Tooltip
          text={copied ? 'Copied': 'Click to copy'}
          className="tooltip"
        >
          <i 
            className="material-icons copy-icon"
            onClick={()=>{
              copyToClipboard(contentRef.current);
              setCopied(true);
            }}
            onMouseOut={()=>setCopied()}
          >
            content_copy
          </i>
        </Tooltip>
      </Container>
    </>
  )
}

const Container = styled.div`
  background: #272d33;
  border-radius: 4px;
  padding: 16px;
  font-size: .9rem;
  position: relative;
  word-break: break-all;
  .tooltip {
    position: absolute;
    right: 1rem;
  }
  .copy-icon {
    color: #90caf9;
    font-size: 1.1rem;
    cursor: pointer;
  }
`

const Label = styled.div`
  font-weight: 500;
  display: block;
  ${Container}+& {
    margin-top: 12px;
  }
  margin: 24px 0 8px;
  color: #ccc;
  font-size: .8rem;
`

export default HighlightedText;