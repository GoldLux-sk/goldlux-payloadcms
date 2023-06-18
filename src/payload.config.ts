import { buildConfig } from 'payload/config';
import path from 'path';
// import Examples from './collections/Examples';
import Users from './collections/Users';
import Orders from './collections/Orders';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_BASE_DNS || 'http://localhost:3000',
  cors: [
    'http://localhost:3000',
    'https://adamdemian1-gmailcom-goldlux-payloadcms.payloadcms.app',
    'https://goldlux-nextjs.vercel.app'
  ],
  csrf: [
    'https://adamdemian1-gmailcom-goldlux-payloadcms.payloadcms.app',
    'http://localhost:3000',
    'https://goldlux-nextjs.vercel.app'
  ],
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Orders,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
