// Shown at /admin until the Sanity project is connected.
const steps = [
  <>Create a free account and project at <a href="https://www.sanity.io/manage">sanity.io/manage</a>. Note the project ID.</>,
  <>In the project&apos;s API settings, add this site&apos;s address (and http://localhost:3000) as a CORS origin with credentials allowed.</>,
  <>Put the ID in <code>.env.local</code> as <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and restart the site.</>,
  <>Copy the current pages and projects into the dashboard: <code>npm run seed-dashboard</code>.</>,
  <>Add a webhook so publishing refreshes the site instantly. The README has the details.</>,
];

export function SetupSteps() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 640, margin: '12vh auto', padding: '0 24px', color: '#171717', lineHeight: 1.6 }}>
      <p style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#737373' }}>Dashboard</p>
      <h1 style={{ fontSize: 32, fontWeight: 500, margin: '8px 0 16px' }}>Connect the dashboard to finish setup</h1>
      <p style={{ color: '#525252' }}>
        The dashboard is built and ready. It needs a Sanity project to store content in. Until then the site runs from the
        content files in the project.
      </p>
      <ol style={{ paddingLeft: 20, color: '#404040' }}>
        {steps.map((step, i) => (
          <li key={i} style={{ marginTop: 12 }}>
            {step}
          </li>
        ))}
      </ol>
    </main>
  );
}
