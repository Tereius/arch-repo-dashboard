import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useParams, Link } from 'react-router-dom';
import { useRepoDb } from '../hooks/useRepoDb';
import { VersionBadge } from '../VersionBadge/VersionBadge';

export function PackagePage() {
  let params = useParams();
  const data = useRepoDb();

  const [item, setItem] = useState();

  useEffect(() => {
    setItem(data.get(params.packageName));
  }, [data, params]);

  function toArray(d) {
    const ret = [];
    for (const key in d) {
      if (Object.hasOwnProperty.call(d, key)) {
        ret.push({
          name: key,
          value: d[key],
        });
      }
    }
    return ret;
  }

  if (!item) {
    return <Spinner animation="border" variant="primary" />;
  }
  return (
    <>
      <Spinner animation="border" variant="primary" />
      <div className="card">
        <div className="card-header">
          {item.name} <VersionBadge version="asfd" revision="3" />
          <div className="card-body">
            <h5 className="card-title">Special title treatment</h5>
            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table">
          <tbody>
            <tr>
              <th scope="row">Architecture:</th>
              <td>{item.arch}</td>
            </tr>
            <tr>
              <th scope="row">License(s):</th>
              <td>{item.license}</td>
            </tr>
            <tr>
              <th scope="row">Upstream URL:</th>
              <td>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.url}
                </a>
              </td>
            </tr>
            {item.provides && (
              <tr>
                <th scope="row">Provides:</th>
                <td>{item.provides}</td>
              </tr>
            )}
            {item.replaces && (
              <tr>
                <th scope="row">Provides:</th>
                <td>{item.replaces}</td>
              </tr>
            )}
            {item.groups && (
              <tr>
                <th scope="row">PGP sig:</th>
                <td>{item.groups}</td>
              </tr>
            )}
            {item.pgpsig && (
              <tr>
                <th scope="row">PGP sig:</th>
                <td>asfasf</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="container">
        <div className="row">
          <table className="table">
            <tbody>
              <tr>
                <th scope="row">Architecture:</th>
                <td>{item.arch}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row">
          <table className="table">
            <tbody>
              <tr>
                <th scope="row">Architecture:</th>
                <td>{item.arch}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
