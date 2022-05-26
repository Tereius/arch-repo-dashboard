import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { useRepoDb } from '../hooks/useRepoDb';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { VersionBadge } from '../VersionBadge/VersionBadge';
import { useParams } from 'react-router-dom';

export function PackageTable(props) {
  let params = useParams();
  const data = useRepoDb();

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ row }) => <Link to={{ pathname: '/package/' + `${row.original.name}` }}>{row.original.name}</Link>,
      },
      {
        Header: 'Version',
        accessor: 'version',
        Cell: ({ row }) => <VersionBadge name={row.original.name} version={row.original.versionWoRev} revision={row.original.rev} />,
      },
      {
        Header: 'Description',
        accessor: 'desc',
      },
      {
        Header: 'BuildDate',
        accessor: 'builddate',
      },
      {
        Header: 'Arch',
        accessor: 'arch',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 100, pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table className="table table-striped" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th scope="col" {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' ↑' : ' ↓') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <nav aria-label="Page navigation example" hidden={pageOptions.length < 2}>
        <ul className="pagination justify-content-end">
          <li className={'page-item ' + (canPreviousPage ? '' : 'disabled')}>
            <a className="page-link" href="#" onClick={() => previousPage()}>
              Previous
            </a>
          </li>

          {pageOptions.map(p => (
            <li key={p} className={'page-item ' + (pageIndex === p ? 'active' : '')}>
              <a className="page-link" href="#" onClick={() => gotoPage(p)}>
                {p}
              </a>
            </li>
          ))}

          <li className={'page-item ' + (canNextPage ? '' : 'disabled')}>
            <a className="page-link" href="#" onClick={() => nextPage()}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
