import Fuse from 'fuse.js';
import React, { useEffect, useState } from 'react';
import { useRepoDb } from '../hooks/useRepoDb';
import { Dropdown, NavItem, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Search() {
  const data = useRepoDb();
  const [searchText, setSearchText] = useState('');
  const [focused, setFocused] = React.useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const options = {
    includeScore: true,
    // Search in `author` and in `tags` array
    keys: [
      {
        name: 'name',
      },
    ],
  };

  let fuse = new Fuse(Array.from(data.values()), options);

  useEffect(() => {
    fuse = new Fuse(Array.from(data.values()), options);
  }, [data]);

  useEffect(() => {
    const result = fuse.search(searchText);
    setSearchResult(result.slice(0, Math.min(20, result.length)));
  }, [searchText]);

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => <span>{children}</span>);

  return (
    <>
      <Dropdown autoClose="true" show={focused}>
        <Dropdown.Toggle as={'form'} split={true} bsPrefix="ignore">
          <input
            className="form-control me-2"
            type="search"
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder="Search"
            aria-label="Search"
            onChange={event => setSearchText(event.target.value)}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {searchResult.map(item => (
            <Dropdown.Item key={item.item.name} href={'/package/' + item.item.name}>
              {item.item.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
