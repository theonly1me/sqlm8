import React, { useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Chip,
} from '@nextui-org/react';

import { ResultViewerProps } from '@/types';

const ResultViewer: React.FC<ResultViewerProps> = ({
  columns,
  rows,
  error,
}) => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 3;

  useEffect(() => {
    setPage(1);
  }, [columns.length, rows.length]);

  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rows]);

  if (!items.length) {
    return (
      <Table
        aria-label="Query results"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              data-testid="pagination"
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={page => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: 'min-h-[222px]',
        }}
      >
        <TableHeader>
          <TableColumn>{''}</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={
            error ? (
              <span className="text-red-500">{error}</span>
            ) : (
              'No rows to display.'
            )
          }
        >
          {[]}
        </TableBody>
      </Table>
    );
  }

  return (
    <>
      <Chip color="default" variant="flat">
        {rows.length} records found
      </Chip>
      <Table
        aria-label="Query results"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={page => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: 'min-h-[222px]',
        }}
      >
        <TableHeader>
          {columns.map(column => (
            <TableColumn key={column} data-testid={`column-${column}`}>
              {column.toUpperCase()}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody items={items}>
          {items.map(item => (
            // @ts-ignore
            <TableRow key={item.toString()}>
              {columnKey => (
                <TableCell className="max-w-3 break-words text-neutral-600">
                  {getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {error && <div>{error}</div>}
    </>
  );
};

export default ResultViewer;
