import React, { useRef, useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@nextui-org/react';
import { Code } from '@/types';
import SaveQueryPopover from './SaveQueryPopover';
import { executeQuery } from '@/actions';

interface QueryEditorProps {
  code: Code;
  handleContextChange: (code: Code) => void;
  setResults: (results: {
    rows: unknown[];
    columns: string[];
    error?: string;
  }) => void;
}

const QueryEditor: React.FC<QueryEditorProps> = ({
  code,
  handleContextChange,
  setResults,
}) => {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  //refs
  const saveQueryInputRef = useRef<HTMLInputElement>(null);

  // state
  const [queryName, setQueryName] = useState(code.name);
  const [showPopover, setShowPopover] = useState(false);

  // side effects
  useEffect(() => {
    if (showPopover) {
      saveQueryInputRef.current?.focus();
    }
  }, [showPopover]);

  // #region - event handlers
  /**
   * Handle save button clicked
   */
  const handleSaveClicked = () => {
    setShowPopover(current => !current);
  };

  /**
   * Handle input keydown event
   * This function makes sure the query is saved when user presses Enter
   * and the popover is closed when user presses Escape
   */
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowPopover(false);
    }

    if (e.key !== 'Enter') return;

    const rawQueries = localStorage.getItem('saved_queries');
    let queries: Array<Code> = [];
    if (rawQueries && rawQueries.length) {
      queries = JSON.parse(rawQueries);
    } else {
      queries = [];
    }

    const exists = queries.some(query => query.name === queryName);

    if (exists) {
      // if it is an existing query, just update the snippet
      queries.map(q => {
        if (q.name === queryName) {
          q.query = code.query;
        }

        return q;
      });
    } else {
      // if it's a new query, add it to the list
      queries.push({
        name: queryName,
        query: code.query,
      });
    }

    localStorage.setItem('saved_queries', JSON.stringify(queries));
    window.dispatchEvent(new Event('storage'));
    setShowPopover(false);
  };

  /**
   * Handle monaco editor change
   */
  const handleEditorChange = (value: string | undefined) => {
    if (!value) return;

    const code: Code = {
      name: queryName,
      query: value,
    };

    handleContextChange(code);
  };

  const handleQueryRun = async () => {
    const queryResult = await executeQuery(code.query);
    if (queryResult) {
      setResults({
        columns: queryResult.columns || [],
        rows: queryResult.result || [],
        error: queryResult.error || '',
      });
    }
  };

  // #endregion - eventhandlers

  return (
    <div className="flex flex-col gap-1 w-3/4">
      <Editor
        // @ts-ignore
        name="queryEditor"
        theme={isDarkMode ? 'vs-dark' : 'light'}
        language="sql"
        value={code.query}
        defaultValue={code.query}
        options={{
          minimap: { enabled: false },
        }}
        height="50vh"
        onChange={handleEditorChange}
      />
      <div className="flex flex-row w-full gap-2">
        <Button
          radius="none"
          color="primary"
          fullWidth
          onClick={handleQueryRun}
        >
          Run
        </Button>
        <SaveQueryPopover
          showPopover={showPopover}
          trigger={
            <Button
              radius="none"
              variant="ghost"
              color="default"
              onClick={handleSaveClicked}
              fullWidth
            >
              Save
            </Button>
          }
          saveQueryInputRef={saveQueryInputRef}
          queryName={queryName}
          setQueryName={setQueryName}
          handleInputKeyDown={handleInputKeyDown}
        />
      </div>
    </div>
  );
};

export default QueryEditor;
