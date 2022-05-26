import React, { useState, useEffect, useMemo } from 'react';
import Pako from 'pako';
import untar from 'js-untar';
import RepoParser from '../shared/repo-parser';
import { singletonHook } from 'react-singleton-hook';

const init = new Map();

function useRepoDbImpl() {
  const [packages, setPackages] = useState(init);

  useEffect(() => {
    fetch('/community.db.tar.gz')
      .then(res => res.arrayBuffer())
      //.then(x => new Promise(resolve => setTimeout(() => resolve(x), 1000)))
      .then(buff => {
        const byteArray = Pako.inflate(buff);
        return untar(byteArray.buffer).progress(extractedFile => {
          if (extractedFile.name.endsWith('desc')) {
            const descr = RepoParser.parse(extractedFile.readAsString());
            //this.setState(prevState => ({
            //  files: [...prevState.files, descr],
            //}));
          }
        });
      })
      .then(extractedFiles => {
        // onSuccess
        console.info('finished');
        const p = new Map(
          extractedFiles
            .filter(file => file.name.endsWith('desc'))
            .map(file => {
              const parsed = RepoParser.parse(file.readAsString());
              return [parsed.name, parsed];
            })
        );
        setPackages(p);
      })
      .catch(err => {
        console.warn('errrrr ' + err.message);
      });
  }, []);

  return packages;
}

export const useRepoDb = singletonHook(init, useRepoDbImpl);
