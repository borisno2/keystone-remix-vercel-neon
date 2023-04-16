import { list, config } from "@keystone-6/core";
import { password, text } from "@keystone-6/core/fields";
import type { TypeInfo } from ".keystone/types";

export default config<TypeInfo>({
  db: {
    provider: "postgresql",
    url:
      process.env.DATABASE_URL ||
      "postgres://postgres:mysecretpassword@localhost:55001",
  },
  server: {
    port: 4000,
  },
  lists: {
    User: list({
      access: {
        operation: ({ session }) => !!session,
      },
      fields: {
        name: text(),
        email: text({
          isIndexed: "unique",
        }),
        password: password(),
        about: text(),
      },
    }),
  },
});
