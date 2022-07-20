import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRepoDb } from '../hooks/useRepoDb';
import { VersionBadge } from '../VersionBadge/VersionBadge';

export function PackagePage() {
  let params = useParams();
  const data = useRepoDb();
  const p = data.get(params.packageName);

  return (
    <>
      <div className="card">
        <div className="card-header">
          {p.name} <VersionBadge version="asfd" revision="3" />
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
              <td>{p.arch}</td>
            </tr>
            <tr>
              <th scope="row">License(s):</th>
              <td>{p.license}</td>
            </tr>
            <tr>
              <th scope="row">Upstream URL:</th>
              <td>
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  {p.url}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
