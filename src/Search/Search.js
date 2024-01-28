import Fuse from 'fuse.js';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useRepoDb } from '../hooks/useRepoDb';
import { Dropdown, Form, FormControl, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export function Search() {
  const data = useRepoDb();
  const [searchText, setSearchText] = useState('');
  const [show, setShow] = React.useState(false);
  const [proposedShow, setProposedShow] = React.useState(false);
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
      setShow(proposedShow);
    } else {
      setShow(false);
    }
  }, [searchResult, focused, proposedShow]);

  const inputRef = useRef();
  const onSelected = (key, event) => {
    inputRef.current.blur();
  };

  const onToggle = (nextShow, meta) => {
    //console.warn('proposed show ' + nextShow + ' cause ' + meta.source);
    if ((meta.source === 'rootClose' || meta.source === 'click') && nextShow === false) {
      setProposedShow(focused);
    } else {
      setProposedShow(nextShow);
    }
  };

  return (
    <>
      <Dropdown autoClose="true" focusFirstItemOnShow="keyboard" onSelect={onSelected} onToggle={onToggle} show={show}>
        <Dropdown.Toggle as={'Form'} split={true} bsPrefix="ignore">
          <InputGroup
            //className="mb-3"
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder="Search"
            aria-label="Search"
            onChange={event => setSearchText(event.target.value)}
            ref={inputRef}
          >
            <Form.Control type="text" placeholder="Search packages" />
            <InputGroup.Text><FontAwesomeIcon icon={faMagnifyingGlass} /></InputGroup.Text>
          </InputGroup>
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
