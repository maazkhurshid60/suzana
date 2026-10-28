// One-time import of the local content (src/content) into the Sanity dashboard.
// Run after connecting the project:  npm run seed-dashboard
// Safe to re-run: documents keep fixed IDs and are replaced, not duplicated.
import { getCliClient } from 'sanity/cli';
import { buildDocuments } from './seed-documents';

const client = getCliClient({ apiVersion: '2025-10-01' });

async function main() {
  const tx = client.transaction();
  for (const doc of buildDocuments()) tx.createOrReplace(doc as { _id: string; _type: string });
  const result = await tx.commit();
  console.log(`Imported ${result.results.length} documents into the dashboard.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
