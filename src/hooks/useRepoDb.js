import React, { useState, useEffect, useMemo } from 'react';
import Pako from 'pako';
import untar from 'js-untar';
import RepoParser from '../shared/repo-parser';
import { singletonHook } from 'react-singleton-hook';

const init = new Map();

function useRepoDbImpl() {

  const [packages, setPackages] = useState(init);

  useEffect(() => {
    fetch(repoPath)
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
        console.info('finished loading repo');
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
        console.warn(err.message);
      });
  }, []);

  return packages;
}

export const repoPath = process.env.REACT_APP_ARCH_REPO_PATH ? process.env.REACT_APP_ARCH_REPO_PATH : "core.db.tar.gz"
export const repoPathPart = repoPath.split('/').slice(0, -1).join('/') // Does not end with /
export const repoName = repoPath.split('/').slice(-1).join('').split('.')[0]
export const useRepoDb = singletonHook(init, useRepoDbImpl);
