'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { LoadingSpinner } from './LoadingSpinner';

// Dynamically import react-pdf components
const Document = dynamic(() => import('react-pdf').then(mod => mod.Document), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

const Page = dynamic(() => import('react-pdf').then(mod => mod.Page), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

interface PdfViewerProps {
  fileUrl: string;
}

export function PdfViewer({ fileUrl }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [workerInitialized, setWorkerInitialized] = useState(false);

  useEffect(() => {
    const initWorker = async () => {
      try {
        const { pdfjs } = await import('react-pdf');
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
        setWorkerInitialized(true);
      } catch (error) {
        console.error('Failed to initialize PDF worker:', error);
        setError('Failed to initialize PDF viewer');
        setIsLoading(false);
      }
    };
    initWorker();
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  function onDocumentLoadError(error: Error) {
    console.error('Error loading PDF:', error);
    setError('Failed to load PDF');
    setIsLoading(false);
  }

  if (!fileUrl) {
    return <div>No PDF file specified</div>;
  }

  if (!workerInitialized) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <LoadingSpinner />
        </div>
      )}
      
      {error && (
        <div className="text-red-500 p-4">
          {error}
        </div>
      )}

      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={<LoadingSpinner />}
      >
        <Page
          pageNumber={pageNumber}
          scale={scale}
          loading={<LoadingSpinner />}
        />
      </Document>

      {numPages > 0 && (
        <div className="flex gap-4 items-center mt-4">
          <button
            onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
            disabled={pageNumber <= 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {pageNumber} of {numPages}
          </span>
          <button
            onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
            disabled={pageNumber >= numPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
          <button
            onClick={() => setScale(scale + 0.2)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Zoom In
          </button>
          <button
            onClick={() => setScale(Math.max(0.2, scale - 0.2))}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Zoom Out
          </button>
        </div>
      )}
    </div>
  );
} 