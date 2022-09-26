import { useRef, useEffect } from 'react';
import { Card, OverlayTrigger, Tooltip, Form, Button } from 'react-bootstrap';
import './LandingPage.css';

export function LandingPage() {
  const textInputFirst = useRef(null);
  const textInputSecond = useRef(null);

  useEffect(() => {
    textInputFirst.current.innerHTML =
      '[tereius_priv]\nSigLevel = Optional TrustAll\nServer = ' + window.location.href + 'arch-repo/x86_64/';
  }, [textInputFirst]);

  useEffect(() => {
    textInputSecond.current.innerHTML = 'pacman -Sy';
  }, [textInputSecond]);

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
    //textArea.focus();
    textInputFirst.current.focus();
    textInputFirst.current.select();
    copyToClipboard();
  }

  function copyInputSecond() {
    //textArea.focus();
    textInputSecond.current.focus();
    textInputSecond.current.select();
    copyToClipboard();
  }

  return (
    <div className="box">
      <Card className="box-child" bg="light">
        <Card.Img variant="top" src="/logo512.png" />
        <Card.Body>
          <Card.Title>How to use this arch repo</Card.Title>
          <p>
            If you want to install packages from this repository just add the following lines to the bottom of your pacman.conf file
            (probably located here <code>/etc/pacman.conf</code>).
          </p>
          <div className="buttonIn">
            <Form.Control ref={textInputFirst} style={{ resize: 'none', height: '6rem' }} as="textarea" aria-label="pacman conf" readOnly />
            <OverlayTrigger placement="left" overlay={<Tooltip id="overlay-example">Copy to clipboard</Tooltip>}>
              <Button onClick={copyInputFirst} size="sm" variant="outline-secondary">
                Copy
              </Button>
            </OverlayTrigger>
          </div>
          <br />
          <p>Then just run</p>
          <div className="buttonIn">
            <Form.Control
              ref={textInputSecond}
              style={{ resize: 'none', height: '4rem' }}
              as="textarea"
              aria-label="pacman conf"
              readOnly
            />
            <OverlayTrigger placement="left" overlay={<Tooltip id="overlay-example">Copy to clipboard</Tooltip>}>
              <Button onClick={copyInputSecond} size="sm" variant="outline-secondary">
                Copy
              </Button>
            </OverlayTrigger>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
