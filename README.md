# CreatorClass

A Next.js application for managing and viewing educational presentations.

## Prerequisites

- Node.js 18 or later
- npm or yarn
- Adobe PDF Services API credentials

### Setting up Adobe PDF Services

1. Sign up for Adobe PDF Services API at https://developer.adobe.com/document-services/apis/pdf-extract/
2. Create a new project and get your API credentials
3. Create a `.env.local` file in the project root with your credentials:
```bash
PDF_SERVICES_CLIENT_ID=your_client_id_here
PDF_SERVICES_CLIENT_SECRET=your_client_secret_here
```

### Installing poppler-utils

On macOS:
```bash
brew install poppler
```

On Ubuntu/Debian:
```bash
sudo apt-get install poppler-utils
```

On Windows:
1. Download the latest poppler release from: https://github.com/oschwartz10612/poppler-windows/releases/
2. Extract the files
3. Add the `bin` directory to your system's PATH

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Features

- Upload and process PDF presentations
- Extract text content from PDFs using Adobe PDF Services
- Organize presentations by subject, topic, and subtopic
- View presentations in a responsive interface
- Search through presentation content

## Project Structure

- `/src/app` - Next.js App Router pages and API routes
- `/src/components` - React components
- `/src/lib` - Utility functions and services
- `/public/uploads` - Storage for uploaded presentations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
