import { useRef, useEffect } from 'react';
import { Card, OverlayTrigger, Tooltip, Form, Button } from 'react-bootstrap';
import { TextAreaCopyable } from '../TextAreaCopyable/TextAreaCopyable';
import './LandingPage.css';

export function LandingPage() {
  return (
    <div className="box">
      <Card className="box-child" bg="light">
        <Card.Img variant="top" src="/logo.svg" />
        <Card.Body>
          <Card.Title>How to use this arch repo</Card.Title>
          <p>
            If you want to install packages from this repository just add the following lines to the bottom of your pacman.conf file
            (probably located here <code>/etc/pacman.conf</code>).
          </p>
          <TextAreaCopyable
            text={'[tereius_priv]\nSigLevel = Optional TrustAll\nServer = ' + window.location.href + 'arch-repo/x86_64/'}
          ></TextAreaCopyable>
          <br />
          <p>Then just run</p>
          <TextAreaCopyable text={'pacman -Sy'}></TextAreaCopyable>
        </Card.Body>
      </Card>
    </div>
  );
}
