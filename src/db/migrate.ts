import { db } from "./drizzle";
import { migrate } from "drizzle-orm/neon-http/migrator";

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "src/db/migrations" });
    console.log("Migration Completed");
  } catch (error) {
    console.error("Migration Failed", error);
    process.exit(1);
  }
};

main();
