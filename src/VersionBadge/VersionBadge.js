import { useEffect, useState } from 'react';
import './VersionBadge.css';

export function VersionBadge(props) {
  /*
  const [newestVersion, setNewestVersion] = useState(0);

  useEffect(() => {
    fetch('https://repology.org/api/v1/project/' + props.name)
      .then(res => {
        console.warn('asdfasf ' + res);
      })
      .catch(err => {
        console.warn('errrrr ' + err.message);
      });
  }, []);*/

  return (
    <span className="badge-nowrap">
      <span className="badge badge-success badge-right">{props.version}</span>
      <span className="badge badge-secondary badge-left">{props.revision}</span>
    </span>
  );
}
