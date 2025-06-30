declare module 'pdf-parse-fork' {
  interface PDFData {
    text: string;
    numpages: number;
    info: any;
    metadata: any;
    version: string;
  }

  function pdfParse(dataBuffer: Buffer | ArrayBuffer): Promise<PDFData>;
  export = pdfParse;
} 