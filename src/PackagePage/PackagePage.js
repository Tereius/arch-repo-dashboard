import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useParams, Link } from 'react-router-dom';
import { useRepoDb, repoPathPart } from '../hooks/useRepoDb';
import { VersionBadge } from '../VersionBadge/VersionBadge';
import { TextAreaCopyable } from '../TextAreaCopyable/TextAreaCopyable';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function PackagePage() {
  let params = useParams();
  const data = useRepoDb();

  const host = new URL(window.location.href).host

  const [item, setItem] = useState();

  useEffect(() => {
    setItem(data.get(params.packageName));
  }, [data, params]);

  if (!item) {
    return (
      <div class="d-flex align-items-center justify-content-center vh-100">
        <div class="text-center">
          <h1 class="display-1 fw-bold">404</h1>
          <p class="lead">The package you’re looking for doesn’t exist.</p>
          <p><Link to="/packages">Go back</Link></p>
          <p><a href={"https://archlinux.org/packages/?sort=&q=" + params.packageName} target="_blank" rel="noopener noreferrer">Search "{params.packageName}" Arch package</a></p>
          <p><a href={"https://aur.archlinux.org/packages?O=0&K=" + params.packageName} target="_blank" rel="noopener noreferrer">Search "{params.packageName}" Aur package</a></p>
        </div>
      </div>
    );
  }
  return (
    <>
      <Spinner animation="border" variant="primary" />
      <div className="card">
        <div className="card-header">
          <VersionBadge version={item.version} revision={item.rev} />
          <div className="card-body">
            <Row>
              <Col sm={8}>
                <h2 className="card-title">{item.name}</h2>
              </Col>
              <Col sm={4}>
                <TextAreaCopyable text={'pacman -S ' + item.name}></TextAreaCopyable>
              </Col>
            </Row>
            <Row>
              <Col sm={8}>
                <p className="card-text">{item.desc}</p>
              </Col>
              <Col sm={4}>
                <a href={"//" + host + "/" + repoPathPart + "/" + item.filename} download>
                  Download
                </a>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table">
          <tbody>
            {item.filename && (
              <tr>
                <th scope="row">Filename:</th>
                <td>{item.filename}</td>
              </tr>
            )}
            {item.name && (
              <tr>
                <th scope="row">Name:</th>
                <td>{item.name}</td>
              </tr>
            )}
            {item.base && (
              <tr>
                <th scope="row">Base:</th>
                <td>{item.base}</td>
              </tr>
            )}
            {item.csize && (
              <tr>
                <th scope="row">Csize:</th>
                <td>{item.csize}</td>
              </tr>
            )}
            {item.isize && (
              <tr>
                <th scope="row">Isize:</th>
                <td>{item.isize}</td>
              </tr>
            )}
            {item.md5sum && (
              <tr>
                <th scope="row">MD5:</th>
                <td>{item.md5sum}</td>
              </tr>
            )}
            {item.sha256sum && (
              <tr>
                <th scope="row">SHA256:</th>
                <td>{item.sha256sum}</td>
              </tr>
            )}
            {item.url && (
              <tr>
                <th scope="row">Upstream URL:</th>
                <td>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.url}
                  </a>
                </td>
              </tr>
            )}
            {item.license && (
              <tr>
                <th scope="row">License(s):</th>
                <td>{item.license}</td>
              </tr>
            )}
            {item.arch && (
              <tr>
                <th scope="row">Architecture:</th>
                <td>{item.arch}</td>
              </tr>
            )}
            {item.builddate && (
              <tr>
                <th scope="row">Build date:</th>
                <td>{item.builddate}</td>
              </tr>
            )}
            {item.packager && (
              <tr>
                <th scope="row">Packager:</th>
                <td>{item.packager}</td>
              </tr>
            )}
            {item.depends && (
              <tr>
                <th scope="row">Depends:</th>
                <td>
                  <Link to={{ pathname: '/package/' + `${item.depends}` }}>{item.depends}</Link>
                </td>
              </tr>
            )}
            {item.makedepends && (
              <tr>
                <th scope="row">Make depends:</th>
                <td>
                  <Link to={{ pathname: '/package/' + `${item.makedepends}` }}>{item.makedepends}</Link>
                </td>
              </tr>
            )}
            {item.provides && (
              <tr>
                <th scope="row">Provides:</th>
                <td>{item.provides}</td>
              </tr>
            )}
            {item.conflicts && (
              <tr>
                <th scope="row">Conflicts:</th>
                <td>
                  <Link to={{ pathname: '/package/' + `${item.conflicts}` }}>{item.conflicts}</Link>
                </td>
              </tr>
            )}
            {item.replaces && (
              <tr>
                <th scope="row">Replaces:</th>
                <td>
                  <Link to={{ pathname: '/package/' + `${item.replaces}` }}>{item.replaces}</Link>
                </td>
              </tr>
            )}
            {item.optdepends && (
              <tr>
                <th scope="row">Optionsl depends:</th>
                <td>
                  <Link to={{ pathname: '/package/' + `${item.optdepends}` }}>{item.optdepends}</Link>
                </td>
              </tr>
            )}
            {item.checkdepends && (
              <tr>
                <th scope="row">Check depends:</th>
                <td>
                  <Link to={{ pathname: '/package/' + `${item.checkdepends}` }}>{item.checkdepends}</Link>
                </td>
              </tr>
            )}
            {item.groups && (
              <tr>
                <th scope="row">Groups:</th>
                <td>{item.groups}</td>
              </tr>
            )}
            {item.pgpsig && (
              <tr>
                <th scope="row">PGP:</th>
                <td>{item.pgpsig}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
