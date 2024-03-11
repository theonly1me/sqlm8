// Ideally I wouldn't have my main page component as a client-side component,
// in this case the app is very heavy on client side logic and doesn't really need
// SSG. I do have some cases for SSR, but that is taken care of by the server action that
// actually runs the SQL query
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import QueryEditor from '@/components/QueryEditor';
import SavedQueries from '@/components/SavedQueries';
import { Code } from '@/types';
import ResultViewer from '@/components/ResultViewer';

export default function Home() {
  const defaultText = 'SELECT * FROM customers;';

  const [code, setCode] = useState<Code>({
    name: `New Query ${new Date().getTime()}`,
    query: defaultText,
  });

  const [results, setResults] = useState<{
    rows: unknown[];
    columns: string[];
    error?: string;
  }>();

  /**
   * Handle context change for the query
   */
  const handleContextChange = (code: Code) => {
    setCode(code);
  };

  return (
    <>
      <Header />
      <main className="flex flex-col mx-8 px-4 gap-2 main-container">
        <div className="flex flex-row gap-2">
          <QueryEditor
            code={code}
            handleContextChange={handleContextChange}
            setResults={setResults}
          />
          <SavedQueries handleQuerySelect={handleContextChange} />
        </div>
        <div className="w-full results-container">
          <ResultViewer
            columns={results?.columns || []}
            rows={results?.rows || []}
            error={results?.error || ''}
          />
        </div>
      </main>
    </>
  );
}
