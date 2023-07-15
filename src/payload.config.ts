import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import Orders from './collections/Orders';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_BASE_DNS || 'http://localhost:3000',
  cors: [
    process.env.PAYLOAD_PUBLIC_NEXT_BASE_DNS || 'http://localhost:3001',

  ],
  csrf: [
    process.env.PAYLOAD_PUBLIC_NEXT_BASE_DNS || 'http://localhost:3001',
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
