'use client';

import { useEffect } from 'react';

// Root page: redirects to /en on GitHub Pages
export default function RootPage() {
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
    window.location.replace(`${base}/en/`);
  }, []);

  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0;url=/Noble/en/" />
        <title>Noble VIP Transfer</title>
      </head>
      <body style={{ background: '#FAFAF8' }} />
    </html>
  );
}
