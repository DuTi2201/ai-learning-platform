import { PrismaClient } from '../generated/prisma';
declare const prisma: PrismaClient<{
    log: ("info" | "query" | "warn" | "error")[];
}, never, import("@/generated/prisma/runtime/library").DefaultArgs>;
export { prisma };
export default prisma;
//# sourceMappingURL=database.d.ts.map