import Fuse from 'fuse.js';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useRepoDb } from '../hooks/useRepoDb';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Search() {
  const data = useRepoDb();
  const [searchText, setSearchText] = useState('');
  const [show, setShow] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  let fuse = useMemo(() => {
    return new Fuse(Array.from(data.values()), {
      includeScore: true,
      keys: [
        {
          name: 'name',
        },
      ],
    });
  }, [data]);

  useEffect(() => {
    const result = fuse.search(searchText);
    setSearchResult(result.slice(0, Math.min(20, result.length)));
  }, [searchText, fuse]);

  useEffect(() => {
    if (searchResult.length > 0) {
      setShow(focused);
    } else {
      setShow(false);
    }
  }, [searchResult, focused]);

  const inputRef = useRef();
  const onSelected = (key, event) => {
    inputRef.current.blur();
  };

  return (
    <>
      <Dropdown autoClose="true" onSelect={onSelected} show={show}>
        <Dropdown.Toggle as={'form'} split={true} bsPrefix="ignore">
          <input
            className="form-control me-2"
            type="search"
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder="Search"
            aria-label="Search"
            onChange={event => setSearchText(event.target.value)}
            ref={inputRef}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {searchResult.map(item => (
            <Dropdown.Item as={Link} key={item.item.name} to={'/package/' + item.item.name} onMouseDown={event => event.preventDefault()}>
              {item.item.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}