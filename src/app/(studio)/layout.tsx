// The dashboard gets its own document, free of the site's styles, header and footer.
export const metadata = { title: 'Dashboard | Gar Rector & Associates', robots: { index: false, follow: false } };

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
