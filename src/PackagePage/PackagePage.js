import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRepoDb } from '../hooks/useRepoDb';
import { VersionBadge } from '../VersionBadge/VersionBadge';

export function PackagePage() {
  let params = useParams();
  const data = useRepoDb();
  const p = data.get(params.packageName);

  return (
    <div>
      <h2>
        {p.name} <VersionBadge version="asfd" revision="3" />
      </h2>
      <hr />
    </div>
  );
}
