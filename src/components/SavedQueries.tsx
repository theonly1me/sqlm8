import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { Code } from '@/types';

// Local storage key
const KEY_NAME = 'saved_queries';

interface SavedQueriesProps {
  handleQuerySelect: (code: Code) => void;
}

/**
 * SavedQueries component
 * @param {SavedQueriesProps} props
 * @returns {React.ReactElement} React component
 */
const SavedQueries: React.FC<SavedQueriesProps> = ({ handleQuerySelect }) => {
  const [savedQueries, setSavedQueries] = useState<Code[]>([]);

  useEffect(() => {
    const rawQueries = localStorage.getItem(KEY_NAME);
    if (rawQueries) {
      const queries = JSON.parse(rawQueries);
      setSavedQueries(queries);
    }

    const handleStorageChange = () => {
      const rawQueries = localStorage.getItem(KEY_NAME);
      if (rawQueries) {
        const queries = JSON.parse(rawQueries);
        setSavedQueries(queries);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Table
      color="primary"
      selectionMode="single"
      className="w-1/4"
      classNames={{
        th: 'text-sm',
        table: 'queries-container',
        base: 'max-h-[500px] overflow-scroll',
      }}
      aria-label="Saved queries"
    >
      <TableHeader>
        <TableColumn>Saved</TableColumn>
      </TableHeader>
      <TableBody emptyContent={'No saved queries.'}>
        {savedQueries.map(q => (
          <TableRow key={q.name} onClick={() => handleQuerySelect(q)}>
            <TableCell>{q.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SavedQueries;
