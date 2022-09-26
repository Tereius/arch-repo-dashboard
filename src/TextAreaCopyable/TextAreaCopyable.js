import { useRef, useEffect } from 'react';
import { Card, OverlayTrigger, Tooltip, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import './TextAreaCopyable.css';

export function TextAreaCopyable(props) {
  const textInputFirst = useRef(null);

  useEffect(() => {
    if (props.text) {
      textInputFirst.current.innerHTML = props.text;
    } else {
      textInputFirst.current.innerHTML = '';
    }
    textInputFirst.current.style.height = '5px';
    textInputFirst.current.style.height = textInputFirst.current.scrollHeight + 5 + 'px';
  }, [textInputFirst]);

  function copyToClipboard() {
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.error('Copying text failed', err);
    }
  }

  function copyInputFirst() {
    textInputFirst.current.focus();
    textInputFirst.current.select();
    copyToClipboard();
  }

  return (
    <div className="buttonIn">
      <Form.Control ref={textInputFirst} style={{ resize: 'none' }} as="textarea" aria-label="pacman conf" readOnly />
      <OverlayTrigger placement="left" overlay={<Tooltip id="overlay-example">Copy to clipboard</Tooltip>}>
        <Button onClick={copyInputFirst} size="sm" variant="outline-secondary">
          <FontAwesomeIcon icon={faCopy} />
        </Button>
      </OverlayTrigger>
    </div>
  );
}
