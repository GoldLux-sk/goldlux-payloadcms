import { buildConfig } from "payload/config";
import path from "path";
import Users from "./collections/Users";
import Orders from "./collections/Orders";
import Icon from "./graphics/Icon";
import Logo from "./graphics/Logo";
import dotenv from "dotenv";

dotenv.config();

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_BASE_DNS,
  cors: [process.env.FRONTEND_URL || "http://localhost:3001"].filter(Boolean),
  csrf: [process.env.FRONTEND_URL || "http://localhost:3001"].filter(Boolean),
  admin: {
    user: Users.slug,
    css: path.resolve(__dirname, "./admin.scss"),
    meta: {
      titleSuffix: " - GOLDLUX",
      favicon: "/assets/logo.svg",
      ogImage: "/assets/logo.svg",
    },
    components: {
      graphics: {
        Icon,
        Logo,
      },
    },
  },
  collections: [Users, Orders],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  onInit: async () => {
    console.log(
      `Payload Admin URL: ${process.env.PAYLOAD_PUBLIC_BASE_DNS}/admin`
    );
    console.log(`Public Frontend URL: ${process.env.FRONTEND_URL}`);
  },
});
