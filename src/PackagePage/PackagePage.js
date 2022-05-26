import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRepoDb } from '../hooks/useRepoDb';
import { VersionBadge } from '../VersionBadge/VersionBadge';

export function PackagePage() {
  let params = useParams();
  const data = useRepoDb();
  const p = data.get(params.packageName);

  return (
    <div className="card">
      <div className="card-header">
        {p.name} <VersionBadge version="asfd" revision="3" />
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
      </div>
    </div>
  );
}
