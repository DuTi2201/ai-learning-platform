import * as runtime from './runtime/library.js';
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;
export type PrismaPromise<T> = $Public.PrismaPromise<T>;
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
export type Course = $Result.DefaultSelection<Prisma.$CoursePayload>;
export type Module = $Result.DefaultSelection<Prisma.$ModulePayload>;
export type Instructor = $Result.DefaultSelection<Prisma.$InstructorPayload>;
export type Lesson = $Result.DefaultSelection<Prisma.$LessonPayload>;
export type Resource = $Result.DefaultSelection<Prisma.$ResourcePayload>;
export type Enrollment = $Result.DefaultSelection<Prisma.$EnrollmentPayload>;
export type LessonProgress = $Result.DefaultSelection<Prisma.$LessonProgressPayload>;
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>;
export declare namespace $Enums {
    const UserRole: {
        ADMIN: 'ADMIN';
        USER: 'USER';
    };
    type UserRole = (typeof UserRole)[keyof typeof UserRole];
    const ResourceType: {
        PDF: 'PDF';
        QUIZ: 'QUIZ';
        LINK: 'LINK';
        RECORDING: 'RECORDING';
    };
    type ResourceType = (typeof ResourceType)[keyof typeof ResourceType];
    const LessonStatus: {
        NOT_STARTED: 'NOT_STARTED';
        COMPLETED: 'COMPLETED';
    };
    type LessonStatus = (typeof LessonStatus)[keyof typeof LessonStatus];
}
export type UserRole = $Enums.UserRole;
export declare const UserRole: typeof $Enums.UserRole;
export type ResourceType = $Enums.ResourceType;
export declare const ResourceType: typeof $Enums.ResourceType;
export type LessonStatus = $Enums.LessonStatus;
export declare const LessonStatus: typeof $Enums.LessonStatus;
export declare class PrismaClient<ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    constructor(optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
    $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    $connect(): $Utils.JsPromise<void>;
    $disconnect(): $Utils.JsPromise<void>;
    $use(cb: Prisma.Middleware): void;
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): $Utils.JsPromise<R>;
    $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
        extArgs: ExtArgs;
    }>>;
    get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
    get course(): Prisma.CourseDelegate<ExtArgs, ClientOptions>;
    get module(): Prisma.ModuleDelegate<ExtArgs, ClientOptions>;
    get instructor(): Prisma.InstructorDelegate<ExtArgs, ClientOptions>;
    get lesson(): Prisma.LessonDelegate<ExtArgs, ClientOptions>;
    get resource(): Prisma.ResourceDelegate<ExtArgs, ClientOptions>;
    get enrollment(): Prisma.EnrollmentDelegate<ExtArgs, ClientOptions>;
    get lessonProgress(): Prisma.LessonProgressDelegate<ExtArgs, ClientOptions>;
    get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;
}
export declare namespace Prisma {
    export import DMMF = runtime.DMMF;
    export type PrismaPromise<T> = $Public.PrismaPromise<T>;
    export import validator = runtime.Public.validator;
    export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
    export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
    export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
    export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
    export import PrismaClientValidationError = runtime.PrismaClientValidationError;
    export import sql = runtime.sqltag;
    export import empty = runtime.empty;
    export import join = runtime.join;
    export import raw = runtime.raw;
    export import Sql = runtime.Sql;
    export import Decimal = runtime.Decimal;
    export type DecimalJsLike = runtime.DecimalJsLike;
    export type Metrics = runtime.Metrics;
    export type Metric<T> = runtime.Metric<T>;
    export type MetricHistogram = runtime.MetricHistogram;
    export type MetricHistogramBucket = runtime.MetricHistogramBucket;
    export import Extension = $Extensions.UserArgs;
    export import getExtensionContext = runtime.Extensions.getExtensionContext;
    export import Args = $Public.Args;
    export import Payload = $Public.Payload;
    export import Result = $Public.Result;
    export import Exact = $Public.Exact;
    export type PrismaVersion = {
        client: string;
    };
    export const prismaVersion: PrismaVersion;
    export import JsonObject = runtime.JsonObject;
    export import JsonArray = runtime.JsonArray;
    export import JsonValue = runtime.JsonValue;
    export import InputJsonObject = runtime.InputJsonObject;
    export import InputJsonArray = runtime.InputJsonArray;
    export import InputJsonValue = runtime.InputJsonValue;
    namespace NullTypes {
    }
    export const DbNull: NullTypes.DbNull;
    export const JsonNull: NullTypes.JsonNull;
    export const AnyNull: NullTypes.AnyNull;
    type SelectAndInclude = {
        select: any;
        include: any;
    };
    type SelectAndOmit = {
        select: any;
        omit: any;
    };
    export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;
    export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>;
    type Prisma__Pick<T, K extends keyof T> = {
        [P in K]: T[P];
    };
    export type Enumerable<T> = T | Array<T>;
    export type RequiredKeys<T> = {
        [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
    }[keyof T];
    export type TruthyKeys<T> = keyof {
        [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
    };
    export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;
    export type Subset<T, U> = {
        [key in keyof T]: key extends keyof U ? T[key] : never;
    };
    export type SelectSubset<T, U> = {
        [key in keyof T]: key extends keyof U ? T[key] : never;
    } & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
    export type SubsetIntersection<T, U, K> = {
        [key in keyof T]: key extends keyof U ? T[key] : never;
    } & K;
    type Without<T, U> = {
        [P in Exclude<keyof T, keyof U>]?: never;
    };
    type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
    type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
    export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
    export type Union = any;
    export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
    export type Overwrite<O extends object, O1 extends object> = {
        [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
    } & {};
    type _Merge<U extends object> = IntersectOf<Overwrite<U, {
        [K in keyof U]-?: At<U, K>;
    }>>;
    type Key = string | number | symbol;
    type AtStrict<O extends object, K extends Key> = O[K & keyof O];
    type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
    export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
        1: AtStrict<O, K>;
        0: AtLoose<O, K>;
    }[strict];
    export type ComputeRaw<A extends any> = A extends Function ? A : {
        [K in keyof A]: A[K];
    } & {};
    export type OptionalFlat<O> = {
        [K in keyof O]?: O[K];
    } & {};
    type _Record<K extends keyof any, T> = {
        [P in K]: T;
    };
    type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
    export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
    export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
    export type Boolean = True | False;
    export type True = 1;
    export type False = 0;
    export type Not<B extends Boolean> = {
        0: 1;
        1: 0;
    }[B];
    export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
    export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
    export type Or<B1 extends Boolean, B2 extends Boolean> = {
        0: {
            0: 0;
            1: 1;
        };
        1: {
            0: 1;
            1: 1;
        };
    }[B1][B2];
    export type Keys<U extends Union> = U extends unknown ? keyof U : never;
    export const type: unique symbol;
    export type GetScalarType<T, O> = O extends object ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
    } : never;
    type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
    type GetHavingFields<T> = {
        [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
    }[keyof T];
    type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
    type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
    type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
    type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
    type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
    export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
    type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
    export const ModelName: {
        User: 'User';
        Course: 'Course';
        Module: 'Module';
        Instructor: 'Instructor';
        Lesson: 'Lesson';
        Resource: 'Resource';
        Enrollment: 'Enrollment';
        LessonProgress: 'LessonProgress';
        Session: 'Session';
    };
    export type ModelName = (typeof ModelName)[keyof typeof ModelName];
    export type Datasources = {
        db?: Datasource;
    };
    export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
        globalOmitOptions: {
            omit: GlobalOmitOptions;
        };
        meta: {
            modelProps: "user" | "course" | "module" | "instructor" | "lesson" | "resource" | "enrollment" | "lessonProgress" | "session";
            txIsolationLevel: Prisma.TransactionIsolationLevel;
        };
        model: {
            User: {
                payload: Prisma.$UserPayload<ExtArgs>;
                fields: Prisma.UserFieldRefs;
                operations: {
                    findUnique: {
                        args: Prisma.UserFindUniqueArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
                    };
                    findUniqueOrThrow: {
                        args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$UserPayload>;
                    };
                    findFirst: {
                        args: Prisma.UserFindFirstArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
                    };
                    findFirstOrThrow: {
                        args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$UserPayload>;
                    };
                    findMany: {
                        args: Prisma.UserFindManyArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
                    };
                    create: {
                        args: Prisma.UserCreateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$UserPayload>;
                    };
                    createMany: {
                        args: Prisma.UserCreateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    createManyAndReturn: {
                        args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
                    };
                    delete: {
                        args: Prisma.UserDeleteArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$UserPayload>;
                    };
                    update: {
                        args: Prisma.UserUpdateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$UserPayload>;
                    };
                    deleteMany: {
                        args: Prisma.UserDeleteManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateMany: {
                        args: Prisma.UserUpdateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateManyAndReturn: {
                        args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
                    };
                    upsert: {
                        args: Prisma.UserUpsertArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$UserPayload>;
                    };
                    aggregate: {
                        args: Prisma.UserAggregateArgs<ExtArgs>;
                        result: $Utils.Optional<AggregateUser>;
                    };
                    groupBy: {
                        args: Prisma.UserGroupByArgs<ExtArgs>;
                        result: $Utils.Optional<UserGroupByOutputType>[];
                    };
                    count: {
                        args: Prisma.UserCountArgs<ExtArgs>;
                        result: $Utils.Optional<UserCountAggregateOutputType> | number;
                    };
                };
            };
            Course: {
                payload: Prisma.$CoursePayload<ExtArgs>;
                fields: Prisma.CourseFieldRefs;
                operations: {
                    findUnique: {
                        args: Prisma.CourseFindUniqueArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null;
                    };
                    findUniqueOrThrow: {
                        args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$CoursePayload>;
                    };
                    findFirst: {
                        args: Prisma.CourseFindFirstArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null;
                    };
                    findFirstOrThrow: {
                        args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$CoursePayload>;
                    };
                    findMany: {
                        args: Prisma.CourseFindManyArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$CoursePayload>[];
                    };
                    create: {
                        args: Prisma.CourseCreateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$CoursePayload>;
                    };
                    createMany: {
                        args: Prisma.CourseCreateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    createManyAndReturn: {
                        args: Prisma.CourseCreateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$CoursePayload>[];
                    };
                    delete: {
                        args: Prisma.CourseDeleteArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$CoursePayload>;
                    };
                    update: {
                        args: Prisma.CourseUpdateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$CoursePayload>;
                    };
                    deleteMany: {
                        args: Prisma.CourseDeleteManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateMany: {
                        args: Prisma.CourseUpdateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateManyAndReturn: {
                        args: Prisma.CourseUpdateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$CoursePayload>[];
                    };
                    upsert: {
                        args: Prisma.CourseUpsertArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$CoursePayload>;
                    };
                    aggregate: {
                        args: Prisma.CourseAggregateArgs<ExtArgs>;
                        result: $Utils.Optional<AggregateCourse>;
                    };
                    groupBy: {
                        args: Prisma.CourseGroupByArgs<ExtArgs>;
                        result: $Utils.Optional<CourseGroupByOutputType>[];
                    };
                    count: {
                        args: Prisma.CourseCountArgs<ExtArgs>;
                        result: $Utils.Optional<CourseCountAggregateOutputType> | number;
                    };
                };
            };
            Module: {
                payload: Prisma.$ModulePayload<ExtArgs>;
                fields: Prisma.ModuleFieldRefs;
                operations: {
                    findUnique: {
                        args: Prisma.ModuleFindUniqueArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ModulePayload> | null;
                    };
                    findUniqueOrThrow: {
                        args: Prisma.ModuleFindUniqueOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ModulePayload>;
                    };
                    findFirst: {
                        args: Prisma.ModuleFindFirstArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ModulePayload> | null;
                    };
                    findFirstOrThrow: {
                        args: Prisma.ModuleFindFirstOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ModulePayload>;
                    };
                    findMany: {
                        args: Prisma.ModuleFindManyArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ModulePayload>[];
                    };
                    create: {
                        args: Prisma.ModuleCreateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ModulePayload>;
                    };
                    createMany: {
                        args: Prisma.ModuleCreateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    createManyAndReturn: {
                        args: Prisma.ModuleCreateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ModulePayload>[];
                    };
                    delete: {
                        args: Prisma.ModuleDeleteArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ModulePayload>;
                    };
                    update: {
                        args: Prisma.ModuleUpdateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ModulePayload>;
                    };
                    deleteMany: {
                        args: Prisma.ModuleDeleteManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateMany: {
                        args: Prisma.ModuleUpdateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateManyAndReturn: {
                        args: Prisma.ModuleUpdateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ModulePayload>[];
                    };
                    upsert: {
                        args: Prisma.ModuleUpsertArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ModulePayload>;
                    };
                    aggregate: {
                        args: Prisma.ModuleAggregateArgs<ExtArgs>;
                        result: $Utils.Optional<AggregateModule>;
                    };
                    groupBy: {
                        args: Prisma.ModuleGroupByArgs<ExtArgs>;
                        result: $Utils.Optional<ModuleGroupByOutputType>[];
                    };
                    count: {
                        args: Prisma.ModuleCountArgs<ExtArgs>;
                        result: $Utils.Optional<ModuleCountAggregateOutputType> | number;
                    };
                };
            };
            Instructor: {
                payload: Prisma.$InstructorPayload<ExtArgs>;
                fields: Prisma.InstructorFieldRefs;
                operations: {
                    findUnique: {
                        args: Prisma.InstructorFindUniqueArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$InstructorPayload> | null;
                    };
                    findUniqueOrThrow: {
                        args: Prisma.InstructorFindUniqueOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$InstructorPayload>;
                    };
                    findFirst: {
                        args: Prisma.InstructorFindFirstArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$InstructorPayload> | null;
                    };
                    findFirstOrThrow: {
                        args: Prisma.InstructorFindFirstOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$InstructorPayload>;
                    };
                    findMany: {
                        args: Prisma.InstructorFindManyArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$InstructorPayload>[];
                    };
                    create: {
                        args: Prisma.InstructorCreateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$InstructorPayload>;
                    };
                    createMany: {
                        args: Prisma.InstructorCreateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    createManyAndReturn: {
                        args: Prisma.InstructorCreateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$InstructorPayload>[];
                    };
                    delete: {
                        args: Prisma.InstructorDeleteArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$InstructorPayload>;
                    };
                    update: {
                        args: Prisma.InstructorUpdateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$InstructorPayload>;
                    };
                    deleteMany: {
                        args: Prisma.InstructorDeleteManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateMany: {
                        args: Prisma.InstructorUpdateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateManyAndReturn: {
                        args: Prisma.InstructorUpdateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$InstructorPayload>[];
                    };
                    upsert: {
                        args: Prisma.InstructorUpsertArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$InstructorPayload>;
                    };
                    aggregate: {
                        args: Prisma.InstructorAggregateArgs<ExtArgs>;
                        result: $Utils.Optional<AggregateInstructor>;
                    };
                    groupBy: {
                        args: Prisma.InstructorGroupByArgs<ExtArgs>;
                        result: $Utils.Optional<InstructorGroupByOutputType>[];
                    };
                    count: {
                        args: Prisma.InstructorCountArgs<ExtArgs>;
                        result: $Utils.Optional<InstructorCountAggregateOutputType> | number;
                    };
                };
            };
            Lesson: {
                payload: Prisma.$LessonPayload<ExtArgs>;
                fields: Prisma.LessonFieldRefs;
                operations: {
                    findUnique: {
                        args: Prisma.LessonFindUniqueArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonPayload> | null;
                    };
                    findUniqueOrThrow: {
                        args: Prisma.LessonFindUniqueOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonPayload>;
                    };
                    findFirst: {
                        args: Prisma.LessonFindFirstArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonPayload> | null;
                    };
                    findFirstOrThrow: {
                        args: Prisma.LessonFindFirstOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonPayload>;
                    };
                    findMany: {
                        args: Prisma.LessonFindManyArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonPayload>[];
                    };
                    create: {
                        args: Prisma.LessonCreateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonPayload>;
                    };
                    createMany: {
                        args: Prisma.LessonCreateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    createManyAndReturn: {
                        args: Prisma.LessonCreateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonPayload>[];
                    };
                    delete: {
                        args: Prisma.LessonDeleteArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonPayload>;
                    };
                    update: {
                        args: Prisma.LessonUpdateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonPayload>;
                    };
                    deleteMany: {
                        args: Prisma.LessonDeleteManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateMany: {
                        args: Prisma.LessonUpdateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateManyAndReturn: {
                        args: Prisma.LessonUpdateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonPayload>[];
                    };
                    upsert: {
                        args: Prisma.LessonUpsertArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonPayload>;
                    };
                    aggregate: {
                        args: Prisma.LessonAggregateArgs<ExtArgs>;
                        result: $Utils.Optional<AggregateLesson>;
                    };
                    groupBy: {
                        args: Prisma.LessonGroupByArgs<ExtArgs>;
                        result: $Utils.Optional<LessonGroupByOutputType>[];
                    };
                    count: {
                        args: Prisma.LessonCountArgs<ExtArgs>;
                        result: $Utils.Optional<LessonCountAggregateOutputType> | number;
                    };
                };
            };
            Resource: {
                payload: Prisma.$ResourcePayload<ExtArgs>;
                fields: Prisma.ResourceFieldRefs;
                operations: {
                    findUnique: {
                        args: Prisma.ResourceFindUniqueArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ResourcePayload> | null;
                    };
                    findUniqueOrThrow: {
                        args: Prisma.ResourceFindUniqueOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ResourcePayload>;
                    };
                    findFirst: {
                        args: Prisma.ResourceFindFirstArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ResourcePayload> | null;
                    };
                    findFirstOrThrow: {
                        args: Prisma.ResourceFindFirstOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ResourcePayload>;
                    };
                    findMany: {
                        args: Prisma.ResourceFindManyArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ResourcePayload>[];
                    };
                    create: {
                        args: Prisma.ResourceCreateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ResourcePayload>;
                    };
                    createMany: {
                        args: Prisma.ResourceCreateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    createManyAndReturn: {
                        args: Prisma.ResourceCreateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ResourcePayload>[];
                    };
                    delete: {
                        args: Prisma.ResourceDeleteArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ResourcePayload>;
                    };
                    update: {
                        args: Prisma.ResourceUpdateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ResourcePayload>;
                    };
                    deleteMany: {
                        args: Prisma.ResourceDeleteManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateMany: {
                        args: Prisma.ResourceUpdateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateManyAndReturn: {
                        args: Prisma.ResourceUpdateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ResourcePayload>[];
                    };
                    upsert: {
                        args: Prisma.ResourceUpsertArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$ResourcePayload>;
                    };
                    aggregate: {
                        args: Prisma.ResourceAggregateArgs<ExtArgs>;
                        result: $Utils.Optional<AggregateResource>;
                    };
                    groupBy: {
                        args: Prisma.ResourceGroupByArgs<ExtArgs>;
                        result: $Utils.Optional<ResourceGroupByOutputType>[];
                    };
                    count: {
                        args: Prisma.ResourceCountArgs<ExtArgs>;
                        result: $Utils.Optional<ResourceCountAggregateOutputType> | number;
                    };
                };
            };
            Enrollment: {
                payload: Prisma.$EnrollmentPayload<ExtArgs>;
                fields: Prisma.EnrollmentFieldRefs;
                operations: {
                    findUnique: {
                        args: Prisma.EnrollmentFindUniqueArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload> | null;
                    };
                    findUniqueOrThrow: {
                        args: Prisma.EnrollmentFindUniqueOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>;
                    };
                    findFirst: {
                        args: Prisma.EnrollmentFindFirstArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload> | null;
                    };
                    findFirstOrThrow: {
                        args: Prisma.EnrollmentFindFirstOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>;
                    };
                    findMany: {
                        args: Prisma.EnrollmentFindManyArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[];
                    };
                    create: {
                        args: Prisma.EnrollmentCreateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>;
                    };
                    createMany: {
                        args: Prisma.EnrollmentCreateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    createManyAndReturn: {
                        args: Prisma.EnrollmentCreateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[];
                    };
                    delete: {
                        args: Prisma.EnrollmentDeleteArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>;
                    };
                    update: {
                        args: Prisma.EnrollmentUpdateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>;
                    };
                    deleteMany: {
                        args: Prisma.EnrollmentDeleteManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateMany: {
                        args: Prisma.EnrollmentUpdateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateManyAndReturn: {
                        args: Prisma.EnrollmentUpdateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[];
                    };
                    upsert: {
                        args: Prisma.EnrollmentUpsertArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>;
                    };
                    aggregate: {
                        args: Prisma.EnrollmentAggregateArgs<ExtArgs>;
                        result: $Utils.Optional<AggregateEnrollment>;
                    };
                    groupBy: {
                        args: Prisma.EnrollmentGroupByArgs<ExtArgs>;
                        result: $Utils.Optional<EnrollmentGroupByOutputType>[];
                    };
                    count: {
                        args: Prisma.EnrollmentCountArgs<ExtArgs>;
                        result: $Utils.Optional<EnrollmentCountAggregateOutputType> | number;
                    };
                };
            };
            LessonProgress: {
                payload: Prisma.$LessonProgressPayload<ExtArgs>;
                fields: Prisma.LessonProgressFieldRefs;
                operations: {
                    findUnique: {
                        args: Prisma.LessonProgressFindUniqueArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload> | null;
                    };
                    findUniqueOrThrow: {
                        args: Prisma.LessonProgressFindUniqueOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>;
                    };
                    findFirst: {
                        args: Prisma.LessonProgressFindFirstArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload> | null;
                    };
                    findFirstOrThrow: {
                        args: Prisma.LessonProgressFindFirstOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>;
                    };
                    findMany: {
                        args: Prisma.LessonProgressFindManyArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>[];
                    };
                    create: {
                        args: Prisma.LessonProgressCreateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>;
                    };
                    createMany: {
                        args: Prisma.LessonProgressCreateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    createManyAndReturn: {
                        args: Prisma.LessonProgressCreateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>[];
                    };
                    delete: {
                        args: Prisma.LessonProgressDeleteArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>;
                    };
                    update: {
                        args: Prisma.LessonProgressUpdateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>;
                    };
                    deleteMany: {
                        args: Prisma.LessonProgressDeleteManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateMany: {
                        args: Prisma.LessonProgressUpdateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateManyAndReturn: {
                        args: Prisma.LessonProgressUpdateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>[];
                    };
                    upsert: {
                        args: Prisma.LessonProgressUpsertArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$LessonProgressPayload>;
                    };
                    aggregate: {
                        args: Prisma.LessonProgressAggregateArgs<ExtArgs>;
                        result: $Utils.Optional<AggregateLessonProgress>;
                    };
                    groupBy: {
                        args: Prisma.LessonProgressGroupByArgs<ExtArgs>;
                        result: $Utils.Optional<LessonProgressGroupByOutputType>[];
                    };
                    count: {
                        args: Prisma.LessonProgressCountArgs<ExtArgs>;
                        result: $Utils.Optional<LessonProgressCountAggregateOutputType> | number;
                    };
                };
            };
            Session: {
                payload: Prisma.$SessionPayload<ExtArgs>;
                fields: Prisma.SessionFieldRefs;
                operations: {
                    findUnique: {
                        args: Prisma.SessionFindUniqueArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null;
                    };
                    findUniqueOrThrow: {
                        args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
                    };
                    findFirst: {
                        args: Prisma.SessionFindFirstArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null;
                    };
                    findFirstOrThrow: {
                        args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
                    };
                    findMany: {
                        args: Prisma.SessionFindManyArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
                    };
                    create: {
                        args: Prisma.SessionCreateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
                    };
                    createMany: {
                        args: Prisma.SessionCreateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    createManyAndReturn: {
                        args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
                    };
                    delete: {
                        args: Prisma.SessionDeleteArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
                    };
                    update: {
                        args: Prisma.SessionUpdateArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
                    };
                    deleteMany: {
                        args: Prisma.SessionDeleteManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateMany: {
                        args: Prisma.SessionUpdateManyArgs<ExtArgs>;
                        result: BatchPayload;
                    };
                    updateManyAndReturn: {
                        args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
                    };
                    upsert: {
                        args: Prisma.SessionUpsertArgs<ExtArgs>;
                        result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
                    };
                    aggregate: {
                        args: Prisma.SessionAggregateArgs<ExtArgs>;
                        result: $Utils.Optional<AggregateSession>;
                    };
                    groupBy: {
                        args: Prisma.SessionGroupByArgs<ExtArgs>;
                        result: $Utils.Optional<SessionGroupByOutputType>[];
                    };
                    count: {
                        args: Prisma.SessionCountArgs<ExtArgs>;
                        result: $Utils.Optional<SessionCountAggregateOutputType> | number;
                    };
                };
            };
        };
    } & {
        other: {
            payload: any;
            operations: {
                $executeRaw: {
                    args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
                    result: any;
                };
                $executeRawUnsafe: {
                    args: [query: string, ...values: any[]];
                    result: any;
                };
                $queryRaw: {
                    args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
                    result: any;
                };
                $queryRawUnsafe: {
                    args: [query: string, ...values: any[]];
                    result: any;
                };
            };
        };
    };
    export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>;
    export type DefaultPrismaClient = PrismaClient;
    export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
    export interface PrismaClientOptions {
        datasources?: Datasources;
        datasourceUrl?: string;
        errorFormat?: ErrorFormat;
        log?: (LogLevel | LogDefinition)[];
        transactionOptions?: {
            maxWait?: number;
            timeout?: number;
            isolationLevel?: Prisma.TransactionIsolationLevel;
        };
        omit?: Prisma.GlobalOmitConfig;
    }
    export type GlobalOmitConfig = {
        user?: UserOmit;
        course?: CourseOmit;
        module?: ModuleOmit;
        instructor?: InstructorOmit;
        lesson?: LessonOmit;
        resource?: ResourceOmit;
        enrollment?: EnrollmentOmit;
        lessonProgress?: LessonProgressOmit;
        session?: SessionOmit;
    };
    export type LogLevel = 'info' | 'query' | 'warn' | 'error';
    export type LogDefinition = {
        level: LogLevel;
        emit: 'stdout' | 'event';
    };
    export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never;
    export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]> : never;
    export type QueryEvent = {
        timestamp: Date;
        query: string;
        params: string;
        duration: number;
        target: string;
    };
    export type LogEvent = {
        timestamp: Date;
        message: string;
        target: string;
    };
    export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
    export type MiddlewareParams = {
        model?: ModelName;
        action: PrismaAction;
        args: any;
        dataPath: string[];
        runInTransaction: boolean;
    };
    export type Middleware<T = any> = (params: MiddlewareParams, next: (params: MiddlewareParams) => $Utils.JsPromise<T>) => $Utils.JsPromise<T>;
    export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;
    export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>;
    export type Datasource = {
        url?: string;
    };
    export type UserCountOutputType = {
        enrollments: number;
        lessonProgress: number;
        createdCourses: number;
    };
    export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        enrollments?: boolean | UserCountOutputTypeCountEnrollmentsArgs;
        lessonProgress?: boolean | UserCountOutputTypeCountLessonProgressArgs;
        createdCourses?: boolean | UserCountOutputTypeCountCreatedCoursesArgs;
    };
    export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: UserCountOutputTypeSelect<ExtArgs> | null;
    };
    export type UserCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: EnrollmentWhereInput;
    };
    export type UserCountOutputTypeCountLessonProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: LessonProgressWhereInput;
    };
    export type UserCountOutputTypeCountCreatedCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: CourseWhereInput;
    };
    export type CourseCountOutputType = {
        modules: number;
        enrollments: number;
    };
    export type CourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        modules?: boolean | CourseCountOutputTypeCountModulesArgs;
        enrollments?: boolean | CourseCountOutputTypeCountEnrollmentsArgs;
    };
    export type CourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: CourseCountOutputTypeSelect<ExtArgs> | null;
    };
    export type CourseCountOutputTypeCountModulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: ModuleWhereInput;
    };
    export type CourseCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: EnrollmentWhereInput;
    };
    export type ModuleCountOutputType = {
        lessons: number;
    };
    export type ModuleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        lessons?: boolean | ModuleCountOutputTypeCountLessonsArgs;
    };
    export type ModuleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ModuleCountOutputTypeSelect<ExtArgs> | null;
    };
    export type ModuleCountOutputTypeCountLessonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: LessonWhereInput;
    };
    export type InstructorCountOutputType = {
        lessons: number;
    };
    export type InstructorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        lessons?: boolean | InstructorCountOutputTypeCountLessonsArgs;
    };
    export type InstructorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: InstructorCountOutputTypeSelect<ExtArgs> | null;
    };
    export type InstructorCountOutputTypeCountLessonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: LessonWhereInput;
    };
    export type LessonCountOutputType = {
        resources: number;
        lessonProgress: number;
    };
    export type LessonCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        resources?: boolean | LessonCountOutputTypeCountResourcesArgs;
        lessonProgress?: boolean | LessonCountOutputTypeCountLessonProgressArgs;
    };
    export type LessonCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonCountOutputTypeSelect<ExtArgs> | null;
    };
    export type LessonCountOutputTypeCountResourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: ResourceWhereInput;
    };
    export type LessonCountOutputTypeCountLessonProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: LessonProgressWhereInput;
    };
    export type AggregateUser = {
        _count: UserCountAggregateOutputType | null;
        _min: UserMinAggregateOutputType | null;
        _max: UserMaxAggregateOutputType | null;
    };
    export type UserMinAggregateOutputType = {
        id: string | null;
        googleId: string | null;
        email: string | null;
        fullName: string | null;
        profilePictureUrl: string | null;
        role: $Enums.UserRole | null;
        createdAt: Date | null;
    };
    export type UserMaxAggregateOutputType = {
        id: string | null;
        googleId: string | null;
        email: string | null;
        fullName: string | null;
        profilePictureUrl: string | null;
        role: $Enums.UserRole | null;
        createdAt: Date | null;
    };
    export type UserCountAggregateOutputType = {
        id: number;
        googleId: number;
        email: number;
        fullName: number;
        profilePictureUrl: number;
        role: number;
        createdAt: number;
        _all: number;
    };
    export type UserMinAggregateInputType = {
        id?: true;
        googleId?: true;
        email?: true;
        fullName?: true;
        profilePictureUrl?: true;
        role?: true;
        createdAt?: true;
    };
    export type UserMaxAggregateInputType = {
        id?: true;
        googleId?: true;
        email?: true;
        fullName?: true;
        profilePictureUrl?: true;
        role?: true;
        createdAt?: true;
    };
    export type UserCountAggregateInputType = {
        id?: true;
        googleId?: true;
        email?: true;
        fullName?: true;
        profilePictureUrl?: true;
        role?: true;
        createdAt?: true;
        _all?: true;
    };
    export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: UserWhereInput;
        orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
        cursor?: UserWhereUniqueInput;
        take?: number;
        skip?: number;
        _count?: true | UserCountAggregateInputType;
        _min?: UserMinAggregateInputType;
        _max?: UserMaxAggregateInputType;
    };
    export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : GetScalarType<T[P], AggregateUser[P]> : GetScalarType<T[P], AggregateUser[P]>;
    };
    export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: UserWhereInput;
        orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[];
        by: UserScalarFieldEnum[] | UserScalarFieldEnum;
        having?: UserScalarWhereWithAggregatesInput;
        take?: number;
        skip?: number;
        _count?: UserCountAggregateInputType | true;
        _min?: UserMinAggregateInputType;
        _max?: UserMaxAggregateInputType;
    };
    export type UserGroupByOutputType = {
        id: string;
        googleId: string;
        email: string;
        fullName: string;
        profilePictureUrl: string | null;
        role: $Enums.UserRole;
        createdAt: Date;
        _count: UserCountAggregateOutputType | null;
        _min: UserMinAggregateOutputType | null;
        _max: UserMaxAggregateOutputType | null;
    };
    type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<PickEnumerable<UserGroupByOutputType, T['by']> & {
        [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : GetScalarType<T[P], UserGroupByOutputType[P]> : GetScalarType<T[P], UserGroupByOutputType[P]>;
    }>>;
    export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        googleId?: boolean;
        email?: boolean;
        fullName?: boolean;
        profilePictureUrl?: boolean;
        role?: boolean;
        createdAt?: boolean;
        enrollments?: boolean | User$enrollmentsArgs<ExtArgs>;
        lessonProgress?: boolean | User$lessonProgressArgs<ExtArgs>;
        createdCourses?: boolean | User$createdCoursesArgs<ExtArgs>;
        _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
    }, ExtArgs["result"]["user"]>;
    export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        googleId?: boolean;
        email?: boolean;
        fullName?: boolean;
        profilePictureUrl?: boolean;
        role?: boolean;
        createdAt?: boolean;
    }, ExtArgs["result"]["user"]>;
    export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        googleId?: boolean;
        email?: boolean;
        fullName?: boolean;
        profilePictureUrl?: boolean;
        role?: boolean;
        createdAt?: boolean;
    }, ExtArgs["result"]["user"]>;
    export type UserSelectScalar = {
        id?: boolean;
        googleId?: boolean;
        email?: boolean;
        fullName?: boolean;
        profilePictureUrl?: boolean;
        role?: boolean;
        createdAt?: boolean;
    };
    export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "googleId" | "email" | "fullName" | "profilePictureUrl" | "role" | "createdAt", ExtArgs["result"]["user"]>;
    export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        enrollments?: boolean | User$enrollmentsArgs<ExtArgs>;
        lessonProgress?: boolean | User$lessonProgressArgs<ExtArgs>;
        createdCourses?: boolean | User$createdCoursesArgs<ExtArgs>;
        _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
    };
    export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {};
    export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {};
    export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        name: "User";
        objects: {
            enrollments: Prisma.$EnrollmentPayload<ExtArgs>[];
            lessonProgress: Prisma.$LessonProgressPayload<ExtArgs>[];
            createdCourses: Prisma.$CoursePayload<ExtArgs>[];
        };
        scalars: $Extensions.GetPayloadResult<{
            id: string;
            googleId: string;
            email: string;
            fullName: string;
            profilePictureUrl: string | null;
            role: $Enums.UserRole;
            createdAt: Date;
        }, ExtArgs["result"]["user"]>;
        composites: {};
    };
    type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
        select?: UserCountAggregateInputType | true;
    };
    export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
        [K: symbol]: {
            types: Prisma.TypeMap<ExtArgs>['model']['User'];
            meta: {
                name: 'User';
            };
        };
        findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
        create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
        delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
        upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        count<T extends UserCountArgs>(args?: Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends $Utils.Record<'select', any> ? T['select'] extends true ? number : GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
        aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
        groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>, OrderByArg extends True extends HasSelectOrTake ? {
            orderBy: UserGroupByArgs['orderBy'];
        } : {
            orderBy?: UserGroupByArgs['orderBy'];
        }, OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>, ByFields extends MaybeTupleToUnion<T['by']>, ByValid extends Has<ByFields, OrderFields>, HavingFields extends GetHavingFields<T['having']>, HavingValid extends Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? True : False, InputErrors extends ByEmpty extends True ? `Error: "by" must not be empty.` : HavingValid extends False ? {
            [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`
            ];
        }[HavingFields] : 'take' extends Keys<T> ? 'orderBy' extends Keys<T> ? ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Keys<T> ? 'orderBy' extends Keys<T> ? ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields]>(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
        readonly fields: UserFieldRefs;
    }
    export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
        readonly [Symbol.toStringTag]: "PrismaPromise";
        enrollments<T extends User$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
        lessonProgress<T extends User$lessonProgressArgs<ExtArgs> = {}>(args?: Subset<T, User$lessonProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
        createdCourses<T extends User$createdCoursesArgs<ExtArgs> = {}>(args?: Subset<T, User$createdCoursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
        then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
        catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
        finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
    }
    interface UserFieldRefs {
        readonly id: FieldRef<"User", 'String'>;
        readonly googleId: FieldRef<"User", 'String'>;
        readonly email: FieldRef<"User", 'String'>;
        readonly fullName: FieldRef<"User", 'String'>;
        readonly profilePictureUrl: FieldRef<"User", 'String'>;
        readonly role: FieldRef<"User", 'UserRole'>;
        readonly createdAt: FieldRef<"User", 'DateTime'>;
    }
    export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: UserSelect<ExtArgs> | null;
        omit?: UserOmit<ExtArgs> | null;
        include?: UserInclude<ExtArgs> | null;
        where: UserWhereUniqueInput;
    };
    export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: UserSelect<ExtArgs> | null;
        omit?: UserOmit<ExtArgs> | null;
        include?: UserInclude<ExtArgs> | null;
        where: UserWhereUniqueInput;
    };
    export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: UserSelect<ExtArgs> | null;
        omit?: UserOmit<ExtArgs> | null;
        include?: UserInclude<ExtArgs> | null;
        where?: UserWhereInput;
        orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
        cursor?: UserWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
    };
    export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: UserSelect<ExtArgs> | null;
        omit?: UserOmit<ExtArgs> | null;
        include?: UserInclude<ExtArgs> | null;
        where?: UserWhereInput;
        orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
        cursor?: UserWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
    };
    export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: UserSelect<ExtArgs> | null;
        omit?: UserOmit<ExtArgs> | null;
        include?: UserInclude<ExtArgs> | null;
        where?: UserWhereInput;
        orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
        cursor?: UserWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
    };
    export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: UserSelect<ExtArgs> | null;
        omit?: UserOmit<ExtArgs> | null;
        include?: UserInclude<ExtArgs> | null;
        data: XOR<UserCreateInput, UserUncheckedCreateInput>;
    };
    export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        data: UserCreateManyInput | UserCreateManyInput[];
        skipDuplicates?: boolean;
    };
    export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
        omit?: UserOmit<ExtArgs> | null;
        data: UserCreateManyInput | UserCreateManyInput[];
        skipDuplicates?: boolean;
    };
    export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: UserSelect<ExtArgs> | null;
        omit?: UserOmit<ExtArgs> | null;
        include?: UserInclude<ExtArgs> | null;
        data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
        where: UserWhereUniqueInput;
    };
    export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
        where?: UserWhereInput;
        limit?: number;
    };
    export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: UserSelectUpdateManyAndReturn<ExtArgs> | null;
        omit?: UserOmit<ExtArgs> | null;
        data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
        where?: UserWhereInput;
        limit?: number;
    };
    export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: UserSelect<ExtArgs> | null;
        omit?: UserOmit<ExtArgs> | null;
        include?: UserInclude<ExtArgs> | null;
        where: UserWhereUniqueInput;
        create: XOR<UserCreateInput, UserUncheckedCreateInput>;
        update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    };
    export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: UserSelect<ExtArgs> | null;
        omit?: UserOmit<ExtArgs> | null;
        include?: UserInclude<ExtArgs> | null;
        where: UserWhereUniqueInput;
    };
    export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: UserWhereInput;
        limit?: number;
    };
    export type User$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: EnrollmentSelect<ExtArgs> | null;
        omit?: EnrollmentOmit<ExtArgs> | null;
        include?: EnrollmentInclude<ExtArgs> | null;
        where?: EnrollmentWhereInput;
        orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[];
        cursor?: EnrollmentWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[];
    };
    export type User$lessonProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonProgressSelect<ExtArgs> | null;
        omit?: LessonProgressOmit<ExtArgs> | null;
        include?: LessonProgressInclude<ExtArgs> | null;
        where?: LessonProgressWhereInput;
        orderBy?: LessonProgressOrderByWithRelationInput | LessonProgressOrderByWithRelationInput[];
        cursor?: LessonProgressWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: LessonProgressScalarFieldEnum | LessonProgressScalarFieldEnum[];
    };
    export type User$createdCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: CourseSelect<ExtArgs> | null;
        omit?: CourseOmit<ExtArgs> | null;
        include?: CourseInclude<ExtArgs> | null;
        where?: CourseWhereInput;
        orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[];
        cursor?: CourseWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[];
    };
    export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: UserSelect<ExtArgs> | null;
        omit?: UserOmit<ExtArgs> | null;
        include?: UserInclude<ExtArgs> | null;
    };
    export type AggregateCourse = {
        _count: CourseCountAggregateOutputType | null;
        _min: CourseMinAggregateOutputType | null;
        _max: CourseMaxAggregateOutputType | null;
    };
    export type CourseMinAggregateOutputType = {
        id: string | null;
        courseCode: string | null;
        title: string | null;
        description: string | null;
        createdById: string | null;
        createdAt: Date | null;
    };
    export type CourseMaxAggregateOutputType = {
        id: string | null;
        courseCode: string | null;
        title: string | null;
        description: string | null;
        createdById: string | null;
        createdAt: Date | null;
    };
    export type CourseCountAggregateOutputType = {
        id: number;
        courseCode: number;
        title: number;
        description: number;
        createdById: number;
        createdAt: number;
        _all: number;
    };
    export type CourseMinAggregateInputType = {
        id?: true;
        courseCode?: true;
        title?: true;
        description?: true;
        createdById?: true;
        createdAt?: true;
    };
    export type CourseMaxAggregateInputType = {
        id?: true;
        courseCode?: true;
        title?: true;
        description?: true;
        createdById?: true;
        createdAt?: true;
    };
    export type CourseCountAggregateInputType = {
        id?: true;
        courseCode?: true;
        title?: true;
        description?: true;
        createdById?: true;
        createdAt?: true;
        _all?: true;
    };
    export type CourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: CourseWhereInput;
        orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[];
        cursor?: CourseWhereUniqueInput;
        take?: number;
        skip?: number;
        _count?: true | CourseCountAggregateInputType;
        _min?: CourseMinAggregateInputType;
        _max?: CourseMaxAggregateInputType;
    };
    export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count' ? T[P] extends true ? number : GetScalarType<T[P], AggregateCourse[P]> : GetScalarType<T[P], AggregateCourse[P]>;
    };
    export type CourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: CourseWhereInput;
        orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[];
        by: CourseScalarFieldEnum[] | CourseScalarFieldEnum;
        having?: CourseScalarWhereWithAggregatesInput;
        take?: number;
        skip?: number;
        _count?: CourseCountAggregateInputType | true;
        _min?: CourseMinAggregateInputType;
        _max?: CourseMaxAggregateInputType;
    };
    export type CourseGroupByOutputType = {
        id: string;
        courseCode: string;
        title: string;
        description: string | null;
        createdById: string;
        createdAt: Date;
        _count: CourseCountAggregateOutputType | null;
        _min: CourseMinAggregateOutputType | null;
        _max: CourseMaxAggregateOutputType | null;
    };
    type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<Array<PickEnumerable<CourseGroupByOutputType, T['by']> & {
        [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : GetScalarType<T[P], CourseGroupByOutputType[P]> : GetScalarType<T[P], CourseGroupByOutputType[P]>;
    }>>;
    export type CourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        courseCode?: boolean;
        title?: boolean;
        description?: boolean;
        createdById?: boolean;
        createdAt?: boolean;
        createdBy?: boolean | UserDefaultArgs<ExtArgs>;
        modules?: boolean | Course$modulesArgs<ExtArgs>;
        enrollments?: boolean | Course$enrollmentsArgs<ExtArgs>;
        _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>;
    }, ExtArgs["result"]["course"]>;
    export type CourseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        courseCode?: boolean;
        title?: boolean;
        description?: boolean;
        createdById?: boolean;
        createdAt?: boolean;
        createdBy?: boolean | UserDefaultArgs<ExtArgs>;
    }, ExtArgs["result"]["course"]>;
    export type CourseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        courseCode?: boolean;
        title?: boolean;
        description?: boolean;
        createdById?: boolean;
        createdAt?: boolean;
        createdBy?: boolean | UserDefaultArgs<ExtArgs>;
    }, ExtArgs["result"]["course"]>;
    export type CourseSelectScalar = {
        id?: boolean;
        courseCode?: boolean;
        title?: boolean;
        description?: boolean;
        createdById?: boolean;
        createdAt?: boolean;
    };
    export type CourseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "courseCode" | "title" | "description" | "createdById" | "createdAt", ExtArgs["result"]["course"]>;
    export type CourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        createdBy?: boolean | UserDefaultArgs<ExtArgs>;
        modules?: boolean | Course$modulesArgs<ExtArgs>;
        enrollments?: boolean | Course$enrollmentsArgs<ExtArgs>;
        _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>;
    };
    export type CourseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        createdBy?: boolean | UserDefaultArgs<ExtArgs>;
    };
    export type CourseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        createdBy?: boolean | UserDefaultArgs<ExtArgs>;
    };
    export type $CoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        name: "Course";
        objects: {
            createdBy: Prisma.$UserPayload<ExtArgs>;
            modules: Prisma.$ModulePayload<ExtArgs>[];
            enrollments: Prisma.$EnrollmentPayload<ExtArgs>[];
        };
        scalars: $Extensions.GetPayloadResult<{
            id: string;
            courseCode: string;
            title: string;
            description: string | null;
            createdById: string;
            createdAt: Date;
        }, ExtArgs["result"]["course"]>;
        composites: {};
    };
    type CourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
        select?: CourseCountAggregateInputType | true;
    };
    export interface CourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
        [K: symbol]: {
            types: Prisma.TypeMap<ExtArgs>['model']['Course'];
            meta: {
                name: 'Course';
            };
        };
        findUnique<T extends CourseFindUniqueArgs>(args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        findFirst<T extends CourseFindFirstArgs>(args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        findMany<T extends CourseFindManyArgs>(args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
        create<T extends CourseCreateArgs>(args: SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        createMany<T extends CourseCreateManyArgs>(args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        createManyAndReturn<T extends CourseCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
        delete<T extends CourseDeleteArgs>(args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        update<T extends CourseUpdateArgs>(args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        deleteMany<T extends CourseDeleteManyArgs>(args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        updateMany<T extends CourseUpdateManyArgs>(args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        updateManyAndReturn<T extends CourseUpdateManyAndReturnArgs>(args: SelectSubset<T, CourseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
        upsert<T extends CourseUpsertArgs>(args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        count<T extends CourseCountArgs>(args?: Subset<T, CourseCountArgs>): Prisma.PrismaPromise<T extends $Utils.Record<'select', any> ? T['select'] extends true ? number : GetScalarType<T['select'], CourseCountAggregateOutputType> : number>;
        aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>;
        groupBy<T extends CourseGroupByArgs, HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>, OrderByArg extends True extends HasSelectOrTake ? {
            orderBy: CourseGroupByArgs['orderBy'];
        } : {
            orderBy?: CourseGroupByArgs['orderBy'];
        }, OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>, ByFields extends MaybeTupleToUnion<T['by']>, ByValid extends Has<ByFields, OrderFields>, HavingFields extends GetHavingFields<T['having']>, HavingValid extends Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? True : False, InputErrors extends ByEmpty extends True ? `Error: "by" must not be empty.` : HavingValid extends False ? {
            [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`
            ];
        }[HavingFields] : 'take' extends Keys<T> ? 'orderBy' extends Keys<T> ? ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Keys<T> ? 'orderBy' extends Keys<T> ? ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields]>(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
        readonly fields: CourseFieldRefs;
    }
    export interface Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
        readonly [Symbol.toStringTag]: "PrismaPromise";
        createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
        modules<T extends Course$modulesArgs<ExtArgs> = {}>(args?: Subset<T, Course$modulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
        enrollments<T extends Course$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, Course$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
        then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
        catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
        finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
    }
    interface CourseFieldRefs {
        readonly id: FieldRef<"Course", 'String'>;
        readonly courseCode: FieldRef<"Course", 'String'>;
        readonly title: FieldRef<"Course", 'String'>;
        readonly description: FieldRef<"Course", 'String'>;
        readonly createdById: FieldRef<"Course", 'String'>;
        readonly createdAt: FieldRef<"Course", 'DateTime'>;
    }
    export type CourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: CourseSelect<ExtArgs> | null;
        omit?: CourseOmit<ExtArgs> | null;
        include?: CourseInclude<ExtArgs> | null;
        where: CourseWhereUniqueInput;
    };
    export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: CourseSelect<ExtArgs> | null;
        omit?: CourseOmit<ExtArgs> | null;
        include?: CourseInclude<ExtArgs> | null;
        where: CourseWhereUniqueInput;
    };
    export type CourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: CourseSelect<ExtArgs> | null;
        omit?: CourseOmit<ExtArgs> | null;
        include?: CourseInclude<ExtArgs> | null;
        where?: CourseWhereInput;
        orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[];
        cursor?: CourseWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[];
    };
    export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: CourseSelect<ExtArgs> | null;
        omit?: CourseOmit<ExtArgs> | null;
        include?: CourseInclude<ExtArgs> | null;
        where?: CourseWhereInput;
        orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[];
        cursor?: CourseWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[];
    };
    export type CourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: CourseSelect<ExtArgs> | null;
        omit?: CourseOmit<ExtArgs> | null;
        include?: CourseInclude<ExtArgs> | null;
        where?: CourseWhereInput;
        orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[];
        cursor?: CourseWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[];
    };
    export type CourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: CourseSelect<ExtArgs> | null;
        omit?: CourseOmit<ExtArgs> | null;
        include?: CourseInclude<ExtArgs> | null;
        data: XOR<CourseCreateInput, CourseUncheckedCreateInput>;
    };
    export type CourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        data: CourseCreateManyInput | CourseCreateManyInput[];
        skipDuplicates?: boolean;
    };
    export type CourseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: CourseSelectCreateManyAndReturn<ExtArgs> | null;
        omit?: CourseOmit<ExtArgs> | null;
        data: CourseCreateManyInput | CourseCreateManyInput[];
        skipDuplicates?: boolean;
        include?: CourseIncludeCreateManyAndReturn<ExtArgs> | null;
    };
    export type CourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: CourseSelect<ExtArgs> | null;
        omit?: CourseOmit<ExtArgs> | null;
        include?: CourseInclude<ExtArgs> | null;
        data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>;
        where: CourseWhereUniqueInput;
    };
    export type CourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>;
        where?: CourseWhereInput;
        limit?: number;
    };
    export type CourseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: CourseSelectUpdateManyAndReturn<ExtArgs> | null;
        omit?: CourseOmit<ExtArgs> | null;
        data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>;
        where?: CourseWhereInput;
        limit?: number;
        include?: CourseIncludeUpdateManyAndReturn<ExtArgs> | null;
    };
    export type CourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: CourseSelect<ExtArgs> | null;
        omit?: CourseOmit<ExtArgs> | null;
        include?: CourseInclude<ExtArgs> | null;
        where: CourseWhereUniqueInput;
        create: XOR<CourseCreateInput, CourseUncheckedCreateInput>;
        update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>;
    };
    export type CourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: CourseSelect<ExtArgs> | null;
        omit?: CourseOmit<ExtArgs> | null;
        include?: CourseInclude<ExtArgs> | null;
        where: CourseWhereUniqueInput;
    };
    export type CourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: CourseWhereInput;
        limit?: number;
    };
    export type Course$modulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ModuleSelect<ExtArgs> | null;
        omit?: ModuleOmit<ExtArgs> | null;
        include?: ModuleInclude<ExtArgs> | null;
        where?: ModuleWhereInput;
        orderBy?: ModuleOrderByWithRelationInput | ModuleOrderByWithRelationInput[];
        cursor?: ModuleWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: ModuleScalarFieldEnum | ModuleScalarFieldEnum[];
    };
    export type Course$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: EnrollmentSelect<ExtArgs> | null;
        omit?: EnrollmentOmit<ExtArgs> | null;
        include?: EnrollmentInclude<ExtArgs> | null;
        where?: EnrollmentWhereInput;
        orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[];
        cursor?: EnrollmentWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[];
    };
    export type CourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: CourseSelect<ExtArgs> | null;
        omit?: CourseOmit<ExtArgs> | null;
        include?: CourseInclude<ExtArgs> | null;
    };
    export type AggregateModule = {
        _count: ModuleCountAggregateOutputType | null;
        _avg: ModuleAvgAggregateOutputType | null;
        _sum: ModuleSumAggregateOutputType | null;
        _min: ModuleMinAggregateOutputType | null;
        _max: ModuleMaxAggregateOutputType | null;
    };
    export type ModuleAvgAggregateOutputType = {
        moduleOrder: number | null;
    };
    export type ModuleSumAggregateOutputType = {
        moduleOrder: number | null;
    };
    export type ModuleMinAggregateOutputType = {
        id: string | null;
        courseId: string | null;
        title: string | null;
        description: string | null;
        moduleOrder: number | null;
    };
    export type ModuleMaxAggregateOutputType = {
        id: string | null;
        courseId: string | null;
        title: string | null;
        description: string | null;
        moduleOrder: number | null;
    };
    export type ModuleCountAggregateOutputType = {
        id: number;
        courseId: number;
        title: number;
        description: number;
        moduleOrder: number;
        _all: number;
    };
    export type ModuleAvgAggregateInputType = {
        moduleOrder?: true;
    };
    export type ModuleSumAggregateInputType = {
        moduleOrder?: true;
    };
    export type ModuleMinAggregateInputType = {
        id?: true;
        courseId?: true;
        title?: true;
        description?: true;
        moduleOrder?: true;
    };
    export type ModuleMaxAggregateInputType = {
        id?: true;
        courseId?: true;
        title?: true;
        description?: true;
        moduleOrder?: true;
    };
    export type ModuleCountAggregateInputType = {
        id?: true;
        courseId?: true;
        title?: true;
        description?: true;
        moduleOrder?: true;
        _all?: true;
    };
    export type ModuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: ModuleWhereInput;
        orderBy?: ModuleOrderByWithRelationInput | ModuleOrderByWithRelationInput[];
        cursor?: ModuleWhereUniqueInput;
        take?: number;
        skip?: number;
        _count?: true | ModuleCountAggregateInputType;
        _avg?: ModuleAvgAggregateInputType;
        _sum?: ModuleSumAggregateInputType;
        _min?: ModuleMinAggregateInputType;
        _max?: ModuleMaxAggregateInputType;
    };
    export type GetModuleAggregateType<T extends ModuleAggregateArgs> = {
        [P in keyof T & keyof AggregateModule]: P extends '_count' | 'count' ? T[P] extends true ? number : GetScalarType<T[P], AggregateModule[P]> : GetScalarType<T[P], AggregateModule[P]>;
    };
    export type ModuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: ModuleWhereInput;
        orderBy?: ModuleOrderByWithAggregationInput | ModuleOrderByWithAggregationInput[];
        by: ModuleScalarFieldEnum[] | ModuleScalarFieldEnum;
        having?: ModuleScalarWhereWithAggregatesInput;
        take?: number;
        skip?: number;
        _count?: ModuleCountAggregateInputType | true;
        _avg?: ModuleAvgAggregateInputType;
        _sum?: ModuleSumAggregateInputType;
        _min?: ModuleMinAggregateInputType;
        _max?: ModuleMaxAggregateInputType;
    };
    export type ModuleGroupByOutputType = {
        id: string;
        courseId: string;
        title: string;
        description: string | null;
        moduleOrder: number;
        _count: ModuleCountAggregateOutputType | null;
        _avg: ModuleAvgAggregateOutputType | null;
        _sum: ModuleSumAggregateOutputType | null;
        _min: ModuleMinAggregateOutputType | null;
        _max: ModuleMaxAggregateOutputType | null;
    };
    type GetModuleGroupByPayload<T extends ModuleGroupByArgs> = Prisma.PrismaPromise<Array<PickEnumerable<ModuleGroupByOutputType, T['by']> & {
        [P in ((keyof T) & (keyof ModuleGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : GetScalarType<T[P], ModuleGroupByOutputType[P]> : GetScalarType<T[P], ModuleGroupByOutputType[P]>;
    }>>;
    export type ModuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        courseId?: boolean;
        title?: boolean;
        description?: boolean;
        moduleOrder?: boolean;
        course?: boolean | CourseDefaultArgs<ExtArgs>;
        lessons?: boolean | Module$lessonsArgs<ExtArgs>;
        _count?: boolean | ModuleCountOutputTypeDefaultArgs<ExtArgs>;
    }, ExtArgs["result"]["module"]>;
    export type ModuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        courseId?: boolean;
        title?: boolean;
        description?: boolean;
        moduleOrder?: boolean;
        course?: boolean | CourseDefaultArgs<ExtArgs>;
    }, ExtArgs["result"]["module"]>;
    export type ModuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        courseId?: boolean;
        title?: boolean;
        description?: boolean;
        moduleOrder?: boolean;
        course?: boolean | CourseDefaultArgs<ExtArgs>;
    }, ExtArgs["result"]["module"]>;
    export type ModuleSelectScalar = {
        id?: boolean;
        courseId?: boolean;
        title?: boolean;
        description?: boolean;
        moduleOrder?: boolean;
    };
    export type ModuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "courseId" | "title" | "description" | "moduleOrder", ExtArgs["result"]["module"]>;
    export type ModuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        course?: boolean | CourseDefaultArgs<ExtArgs>;
        lessons?: boolean | Module$lessonsArgs<ExtArgs>;
        _count?: boolean | ModuleCountOutputTypeDefaultArgs<ExtArgs>;
    };
    export type ModuleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        course?: boolean | CourseDefaultArgs<ExtArgs>;
    };
    export type ModuleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        course?: boolean | CourseDefaultArgs<ExtArgs>;
    };
    export type $ModulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        name: "Module";
        objects: {
            course: Prisma.$CoursePayload<ExtArgs>;
            lessons: Prisma.$LessonPayload<ExtArgs>[];
        };
        scalars: $Extensions.GetPayloadResult<{
            id: string;
            courseId: string;
            title: string;
            description: string | null;
            moduleOrder: number;
        }, ExtArgs["result"]["module"]>;
        composites: {};
    };
    type ModuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<ModuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
        select?: ModuleCountAggregateInputType | true;
    };
    export interface ModuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
        [K: symbol]: {
            types: Prisma.TypeMap<ExtArgs>['model']['Module'];
            meta: {
                name: 'Module';
            };
        };
        findUnique<T extends ModuleFindUniqueArgs>(args: SelectSubset<T, ModuleFindUniqueArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        findUniqueOrThrow<T extends ModuleFindUniqueOrThrowArgs>(args: SelectSubset<T, ModuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        findFirst<T extends ModuleFindFirstArgs>(args?: SelectSubset<T, ModuleFindFirstArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        findFirstOrThrow<T extends ModuleFindFirstOrThrowArgs>(args?: SelectSubset<T, ModuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        findMany<T extends ModuleFindManyArgs>(args?: SelectSubset<T, ModuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
        create<T extends ModuleCreateArgs>(args: SelectSubset<T, ModuleCreateArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        createMany<T extends ModuleCreateManyArgs>(args?: SelectSubset<T, ModuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        createManyAndReturn<T extends ModuleCreateManyAndReturnArgs>(args?: SelectSubset<T, ModuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
        delete<T extends ModuleDeleteArgs>(args: SelectSubset<T, ModuleDeleteArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        update<T extends ModuleUpdateArgs>(args: SelectSubset<T, ModuleUpdateArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        deleteMany<T extends ModuleDeleteManyArgs>(args?: SelectSubset<T, ModuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        updateMany<T extends ModuleUpdateManyArgs>(args: SelectSubset<T, ModuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        updateManyAndReturn<T extends ModuleUpdateManyAndReturnArgs>(args: SelectSubset<T, ModuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
        upsert<T extends ModuleUpsertArgs>(args: SelectSubset<T, ModuleUpsertArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        count<T extends ModuleCountArgs>(args?: Subset<T, ModuleCountArgs>): Prisma.PrismaPromise<T extends $Utils.Record<'select', any> ? T['select'] extends true ? number : GetScalarType<T['select'], ModuleCountAggregateOutputType> : number>;
        aggregate<T extends ModuleAggregateArgs>(args: Subset<T, ModuleAggregateArgs>): Prisma.PrismaPromise<GetModuleAggregateType<T>>;
        groupBy<T extends ModuleGroupByArgs, HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>, OrderByArg extends True extends HasSelectOrTake ? {
            orderBy: ModuleGroupByArgs['orderBy'];
        } : {
            orderBy?: ModuleGroupByArgs['orderBy'];
        }, OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>, ByFields extends MaybeTupleToUnion<T['by']>, ByValid extends Has<ByFields, OrderFields>, HavingFields extends GetHavingFields<T['having']>, HavingValid extends Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? True : False, InputErrors extends ByEmpty extends True ? `Error: "by" must not be empty.` : HavingValid extends False ? {
            [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`
            ];
        }[HavingFields] : 'take' extends Keys<T> ? 'orderBy' extends Keys<T> ? ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Keys<T> ? 'orderBy' extends Keys<T> ? ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields]>(args: SubsetIntersection<T, ModuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
        readonly fields: ModuleFieldRefs;
    }
    export interface Prisma__ModuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
        readonly [Symbol.toStringTag]: "PrismaPromise";
        course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
        lessons<T extends Module$lessonsArgs<ExtArgs> = {}>(args?: Subset<T, Module$lessonsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
        then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
        catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
        finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
    }
    interface ModuleFieldRefs {
        readonly id: FieldRef<"Module", 'String'>;
        readonly courseId: FieldRef<"Module", 'String'>;
        readonly title: FieldRef<"Module", 'String'>;
        readonly description: FieldRef<"Module", 'String'>;
        readonly moduleOrder: FieldRef<"Module", 'Int'>;
    }
    export type ModuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ModuleSelect<ExtArgs> | null;
        omit?: ModuleOmit<ExtArgs> | null;
        include?: ModuleInclude<ExtArgs> | null;
        where: ModuleWhereUniqueInput;
    };
    export type ModuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ModuleSelect<ExtArgs> | null;
        omit?: ModuleOmit<ExtArgs> | null;
        include?: ModuleInclude<ExtArgs> | null;
        where: ModuleWhereUniqueInput;
    };
    export type ModuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ModuleSelect<ExtArgs> | null;
        omit?: ModuleOmit<ExtArgs> | null;
        include?: ModuleInclude<ExtArgs> | null;
        where?: ModuleWhereInput;
        orderBy?: ModuleOrderByWithRelationInput | ModuleOrderByWithRelationInput[];
        cursor?: ModuleWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: ModuleScalarFieldEnum | ModuleScalarFieldEnum[];
    };
    export type ModuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ModuleSelect<ExtArgs> | null;
        omit?: ModuleOmit<ExtArgs> | null;
        include?: ModuleInclude<ExtArgs> | null;
        where?: ModuleWhereInput;
        orderBy?: ModuleOrderByWithRelationInput | ModuleOrderByWithRelationInput[];
        cursor?: ModuleWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: ModuleScalarFieldEnum | ModuleScalarFieldEnum[];
    };
    export type ModuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ModuleSelect<ExtArgs> | null;
        omit?: ModuleOmit<ExtArgs> | null;
        include?: ModuleInclude<ExtArgs> | null;
        where?: ModuleWhereInput;
        orderBy?: ModuleOrderByWithRelationInput | ModuleOrderByWithRelationInput[];
        cursor?: ModuleWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: ModuleScalarFieldEnum | ModuleScalarFieldEnum[];
    };
    export type ModuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ModuleSelect<ExtArgs> | null;
        omit?: ModuleOmit<ExtArgs> | null;
        include?: ModuleInclude<ExtArgs> | null;
        data: XOR<ModuleCreateInput, ModuleUncheckedCreateInput>;
    };
    export type ModuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        data: ModuleCreateManyInput | ModuleCreateManyInput[];
        skipDuplicates?: boolean;
    };
    export type ModuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ModuleSelectCreateManyAndReturn<ExtArgs> | null;
        omit?: ModuleOmit<ExtArgs> | null;
        data: ModuleCreateManyInput | ModuleCreateManyInput[];
        skipDuplicates?: boolean;
        include?: ModuleIncludeCreateManyAndReturn<ExtArgs> | null;
    };
    export type ModuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ModuleSelect<ExtArgs> | null;
        omit?: ModuleOmit<ExtArgs> | null;
        include?: ModuleInclude<ExtArgs> | null;
        data: XOR<ModuleUpdateInput, ModuleUncheckedUpdateInput>;
        where: ModuleWhereUniqueInput;
    };
    export type ModuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        data: XOR<ModuleUpdateManyMutationInput, ModuleUncheckedUpdateManyInput>;
        where?: ModuleWhereInput;
        limit?: number;
    };
    export type ModuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ModuleSelectUpdateManyAndReturn<ExtArgs> | null;
        omit?: ModuleOmit<ExtArgs> | null;
        data: XOR<ModuleUpdateManyMutationInput, ModuleUncheckedUpdateManyInput>;
        where?: ModuleWhereInput;
        limit?: number;
        include?: ModuleIncludeUpdateManyAndReturn<ExtArgs> | null;
    };
    export type ModuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ModuleSelect<ExtArgs> | null;
        omit?: ModuleOmit<ExtArgs> | null;
        include?: ModuleInclude<ExtArgs> | null;
        where: ModuleWhereUniqueInput;
        create: XOR<ModuleCreateInput, ModuleUncheckedCreateInput>;
        update: XOR<ModuleUpdateInput, ModuleUncheckedUpdateInput>;
    };
    export type ModuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ModuleSelect<ExtArgs> | null;
        omit?: ModuleOmit<ExtArgs> | null;
        include?: ModuleInclude<ExtArgs> | null;
        where: ModuleWhereUniqueInput;
    };
    export type ModuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: ModuleWhereInput;
        limit?: number;
    };
    export type Module$lessonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonSelect<ExtArgs> | null;
        omit?: LessonOmit<ExtArgs> | null;
        include?: LessonInclude<ExtArgs> | null;
        where?: LessonWhereInput;
        orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[];
        cursor?: LessonWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[];
    };
    export type ModuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ModuleSelect<ExtArgs> | null;
        omit?: ModuleOmit<ExtArgs> | null;
        include?: ModuleInclude<ExtArgs> | null;
    };
    export type AggregateInstructor = {
        _count: InstructorCountAggregateOutputType | null;
        _min: InstructorMinAggregateOutputType | null;
        _max: InstructorMaxAggregateOutputType | null;
    };
    export type InstructorMinAggregateOutputType = {
        id: string | null;
        fullName: string | null;
        title: string | null;
        bio: string | null;
    };
    export type InstructorMaxAggregateOutputType = {
        id: string | null;
        fullName: string | null;
        title: string | null;
        bio: string | null;
    };
    export type InstructorCountAggregateOutputType = {
        id: number;
        fullName: number;
        title: number;
        bio: number;
        _all: number;
    };
    export type InstructorMinAggregateInputType = {
        id?: true;
        fullName?: true;
        title?: true;
        bio?: true;
    };
    export type InstructorMaxAggregateInputType = {
        id?: true;
        fullName?: true;
        title?: true;
        bio?: true;
    };
    export type InstructorCountAggregateInputType = {
        id?: true;
        fullName?: true;
        title?: true;
        bio?: true;
        _all?: true;
    };
    export type InstructorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: InstructorWhereInput;
        orderBy?: InstructorOrderByWithRelationInput | InstructorOrderByWithRelationInput[];
        cursor?: InstructorWhereUniqueInput;
        take?: number;
        skip?: number;
        _count?: true | InstructorCountAggregateInputType;
        _min?: InstructorMinAggregateInputType;
        _max?: InstructorMaxAggregateInputType;
    };
    export type GetInstructorAggregateType<T extends InstructorAggregateArgs> = {
        [P in keyof T & keyof AggregateInstructor]: P extends '_count' | 'count' ? T[P] extends true ? number : GetScalarType<T[P], AggregateInstructor[P]> : GetScalarType<T[P], AggregateInstructor[P]>;
    };
    export type InstructorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: InstructorWhereInput;
        orderBy?: InstructorOrderByWithAggregationInput | InstructorOrderByWithAggregationInput[];
        by: InstructorScalarFieldEnum[] | InstructorScalarFieldEnum;
        having?: InstructorScalarWhereWithAggregatesInput;
        take?: number;
        skip?: number;
        _count?: InstructorCountAggregateInputType | true;
        _min?: InstructorMinAggregateInputType;
        _max?: InstructorMaxAggregateInputType;
    };
    export type InstructorGroupByOutputType = {
        id: string;
        fullName: string;
        title: string | null;
        bio: string | null;
        _count: InstructorCountAggregateOutputType | null;
        _min: InstructorMinAggregateOutputType | null;
        _max: InstructorMaxAggregateOutputType | null;
    };
    type GetInstructorGroupByPayload<T extends InstructorGroupByArgs> = Prisma.PrismaPromise<Array<PickEnumerable<InstructorGroupByOutputType, T['by']> & {
        [P in ((keyof T) & (keyof InstructorGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : GetScalarType<T[P], InstructorGroupByOutputType[P]> : GetScalarType<T[P], InstructorGroupByOutputType[P]>;
    }>>;
    export type InstructorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        fullName?: boolean;
        title?: boolean;
        bio?: boolean;
        lessons?: boolean | Instructor$lessonsArgs<ExtArgs>;
        _count?: boolean | InstructorCountOutputTypeDefaultArgs<ExtArgs>;
    }, ExtArgs["result"]["instructor"]>;
    export type InstructorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        fullName?: boolean;
        title?: boolean;
        bio?: boolean;
    }, ExtArgs["result"]["instructor"]>;
    export type InstructorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        fullName?: boolean;
        title?: boolean;
        bio?: boolean;
    }, ExtArgs["result"]["instructor"]>;
    export type InstructorSelectScalar = {
        id?: boolean;
        fullName?: boolean;
        title?: boolean;
        bio?: boolean;
    };
    export type InstructorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullName" | "title" | "bio", ExtArgs["result"]["instructor"]>;
    export type InstructorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        lessons?: boolean | Instructor$lessonsArgs<ExtArgs>;
        _count?: boolean | InstructorCountOutputTypeDefaultArgs<ExtArgs>;
    };
    export type InstructorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {};
    export type InstructorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {};
    export type $InstructorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        name: "Instructor";
        objects: {
            lessons: Prisma.$LessonPayload<ExtArgs>[];
        };
        scalars: $Extensions.GetPayloadResult<{
            id: string;
            fullName: string;
            title: string | null;
            bio: string | null;
        }, ExtArgs["result"]["instructor"]>;
        composites: {};
    };
    type InstructorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<InstructorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
        select?: InstructorCountAggregateInputType | true;
    };
    export interface InstructorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
        [K: symbol]: {
            types: Prisma.TypeMap<ExtArgs>['model']['Instructor'];
            meta: {
                name: 'Instructor';
            };
        };
        findUnique<T extends InstructorFindUniqueArgs>(args: SelectSubset<T, InstructorFindUniqueArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        findUniqueOrThrow<T extends InstructorFindUniqueOrThrowArgs>(args: SelectSubset<T, InstructorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        findFirst<T extends InstructorFindFirstArgs>(args?: SelectSubset<T, InstructorFindFirstArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        findFirstOrThrow<T extends InstructorFindFirstOrThrowArgs>(args?: SelectSubset<T, InstructorFindFirstOrThrowArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        findMany<T extends InstructorFindManyArgs>(args?: SelectSubset<T, InstructorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
        create<T extends InstructorCreateArgs>(args: SelectSubset<T, InstructorCreateArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        createMany<T extends InstructorCreateManyArgs>(args?: SelectSubset<T, InstructorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        createManyAndReturn<T extends InstructorCreateManyAndReturnArgs>(args?: SelectSubset<T, InstructorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
        delete<T extends InstructorDeleteArgs>(args: SelectSubset<T, InstructorDeleteArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        update<T extends InstructorUpdateArgs>(args: SelectSubset<T, InstructorUpdateArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        deleteMany<T extends InstructorDeleteManyArgs>(args?: SelectSubset<T, InstructorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        updateMany<T extends InstructorUpdateManyArgs>(args: SelectSubset<T, InstructorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        updateManyAndReturn<T extends InstructorUpdateManyAndReturnArgs>(args: SelectSubset<T, InstructorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
        upsert<T extends InstructorUpsertArgs>(args: SelectSubset<T, InstructorUpsertArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        count<T extends InstructorCountArgs>(args?: Subset<T, InstructorCountArgs>): Prisma.PrismaPromise<T extends $Utils.Record<'select', any> ? T['select'] extends true ? number : GetScalarType<T['select'], InstructorCountAggregateOutputType> : number>;
        aggregate<T extends InstructorAggregateArgs>(args: Subset<T, InstructorAggregateArgs>): Prisma.PrismaPromise<GetInstructorAggregateType<T>>;
        groupBy<T extends InstructorGroupByArgs, HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>, OrderByArg extends True extends HasSelectOrTake ? {
            orderBy: InstructorGroupByArgs['orderBy'];
        } : {
            orderBy?: InstructorGroupByArgs['orderBy'];
        }, OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>, ByFields extends MaybeTupleToUnion<T['by']>, ByValid extends Has<ByFields, OrderFields>, HavingFields extends GetHavingFields<T['having']>, HavingValid extends Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? True : False, InputErrors extends ByEmpty extends True ? `Error: "by" must not be empty.` : HavingValid extends False ? {
            [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`
            ];
        }[HavingFields] : 'take' extends Keys<T> ? 'orderBy' extends Keys<T> ? ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Keys<T> ? 'orderBy' extends Keys<T> ? ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields]>(args: SubsetIntersection<T, InstructorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstructorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
        readonly fields: InstructorFieldRefs;
    }
    export interface Prisma__InstructorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
        readonly [Symbol.toStringTag]: "PrismaPromise";
        lessons<T extends Instructor$lessonsArgs<ExtArgs> = {}>(args?: Subset<T, Instructor$lessonsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
        then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
        catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
        finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
    }
    interface InstructorFieldRefs {
        readonly id: FieldRef<"Instructor", 'String'>;
        readonly fullName: FieldRef<"Instructor", 'String'>;
        readonly title: FieldRef<"Instructor", 'String'>;
        readonly bio: FieldRef<"Instructor", 'String'>;
    }
    export type InstructorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: InstructorSelect<ExtArgs> | null;
        omit?: InstructorOmit<ExtArgs> | null;
        include?: InstructorInclude<ExtArgs> | null;
        where: InstructorWhereUniqueInput;
    };
    export type InstructorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: InstructorSelect<ExtArgs> | null;
        omit?: InstructorOmit<ExtArgs> | null;
        include?: InstructorInclude<ExtArgs> | null;
        where: InstructorWhereUniqueInput;
    };
    export type InstructorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: InstructorSelect<ExtArgs> | null;
        omit?: InstructorOmit<ExtArgs> | null;
        include?: InstructorInclude<ExtArgs> | null;
        where?: InstructorWhereInput;
        orderBy?: InstructorOrderByWithRelationInput | InstructorOrderByWithRelationInput[];
        cursor?: InstructorWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: InstructorScalarFieldEnum | InstructorScalarFieldEnum[];
    };
    export type InstructorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: InstructorSelect<ExtArgs> | null;
        omit?: InstructorOmit<ExtArgs> | null;
        include?: InstructorInclude<ExtArgs> | null;
        where?: InstructorWhereInput;
        orderBy?: InstructorOrderByWithRelationInput | InstructorOrderByWithRelationInput[];
        cursor?: InstructorWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: InstructorScalarFieldEnum | InstructorScalarFieldEnum[];
    };
    export type InstructorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: InstructorSelect<ExtArgs> | null;
        omit?: InstructorOmit<ExtArgs> | null;
        include?: InstructorInclude<ExtArgs> | null;
        where?: InstructorWhereInput;
        orderBy?: InstructorOrderByWithRelationInput | InstructorOrderByWithRelationInput[];
        cursor?: InstructorWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: InstructorScalarFieldEnum | InstructorScalarFieldEnum[];
    };
    export type InstructorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: InstructorSelect<ExtArgs> | null;
        omit?: InstructorOmit<ExtArgs> | null;
        include?: InstructorInclude<ExtArgs> | null;
        data: XOR<InstructorCreateInput, InstructorUncheckedCreateInput>;
    };
    export type InstructorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        data: InstructorCreateManyInput | InstructorCreateManyInput[];
        skipDuplicates?: boolean;
    };
    export type InstructorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: InstructorSelectCreateManyAndReturn<ExtArgs> | null;
        omit?: InstructorOmit<ExtArgs> | null;
        data: InstructorCreateManyInput | InstructorCreateManyInput[];
        skipDuplicates?: boolean;
    };
    export type InstructorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: InstructorSelect<ExtArgs> | null;
        omit?: InstructorOmit<ExtArgs> | null;
        include?: InstructorInclude<ExtArgs> | null;
        data: XOR<InstructorUpdateInput, InstructorUncheckedUpdateInput>;
        where: InstructorWhereUniqueInput;
    };
    export type InstructorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        data: XOR<InstructorUpdateManyMutationInput, InstructorUncheckedUpdateManyInput>;
        where?: InstructorWhereInput;
        limit?: number;
    };
    export type InstructorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: InstructorSelectUpdateManyAndReturn<ExtArgs> | null;
        omit?: InstructorOmit<ExtArgs> | null;
        data: XOR<InstructorUpdateManyMutationInput, InstructorUncheckedUpdateManyInput>;
        where?: InstructorWhereInput;
        limit?: number;
    };
    export type InstructorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: InstructorSelect<ExtArgs> | null;
        omit?: InstructorOmit<ExtArgs> | null;
        include?: InstructorInclude<ExtArgs> | null;
        where: InstructorWhereUniqueInput;
        create: XOR<InstructorCreateInput, InstructorUncheckedCreateInput>;
        update: XOR<InstructorUpdateInput, InstructorUncheckedUpdateInput>;
    };
    export type InstructorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: InstructorSelect<ExtArgs> | null;
        omit?: InstructorOmit<ExtArgs> | null;
        include?: InstructorInclude<ExtArgs> | null;
        where: InstructorWhereUniqueInput;
    };
    export type InstructorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: InstructorWhereInput;
        limit?: number;
    };
    export type Instructor$lessonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonSelect<ExtArgs> | null;
        omit?: LessonOmit<ExtArgs> | null;
        include?: LessonInclude<ExtArgs> | null;
        where?: LessonWhereInput;
        orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[];
        cursor?: LessonWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[];
    };
    export type InstructorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: InstructorSelect<ExtArgs> | null;
        omit?: InstructorOmit<ExtArgs> | null;
        include?: InstructorInclude<ExtArgs> | null;
    };
    export type AggregateLesson = {
        _count: LessonCountAggregateOutputType | null;
        _avg: LessonAvgAggregateOutputType | null;
        _sum: LessonSumAggregateOutputType | null;
        _min: LessonMinAggregateOutputType | null;
        _max: LessonMaxAggregateOutputType | null;
    };
    export type LessonAvgAggregateOutputType = {
        lessonOrder: number | null;
    };
    export type LessonSumAggregateOutputType = {
        lessonOrder: number | null;
    };
    export type LessonMinAggregateOutputType = {
        id: string | null;
        moduleId: string | null;
        instructorId: string | null;
        title: string | null;
        description: string | null;
        lessonDate: Date | null;
        zoomInfo: string | null;
        lessonOrder: number | null;
    };
    export type LessonMaxAggregateOutputType = {
        id: string | null;
        moduleId: string | null;
        instructorId: string | null;
        title: string | null;
        description: string | null;
        lessonDate: Date | null;
        zoomInfo: string | null;
        lessonOrder: number | null;
    };
    export type LessonCountAggregateOutputType = {
        id: number;
        moduleId: number;
        instructorId: number;
        title: number;
        description: number;
        lessonDate: number;
        zoomInfo: number;
        lessonOrder: number;
        _all: number;
    };
    export type LessonAvgAggregateInputType = {
        lessonOrder?: true;
    };
    export type LessonSumAggregateInputType = {
        lessonOrder?: true;
    };
    export type LessonMinAggregateInputType = {
        id?: true;
        moduleId?: true;
        instructorId?: true;
        title?: true;
        description?: true;
        lessonDate?: true;
        zoomInfo?: true;
        lessonOrder?: true;
    };
    export type LessonMaxAggregateInputType = {
        id?: true;
        moduleId?: true;
        instructorId?: true;
        title?: true;
        description?: true;
        lessonDate?: true;
        zoomInfo?: true;
        lessonOrder?: true;
    };
    export type LessonCountAggregateInputType = {
        id?: true;
        moduleId?: true;
        instructorId?: true;
        title?: true;
        description?: true;
        lessonDate?: true;
        zoomInfo?: true;
        lessonOrder?: true;
        _all?: true;
    };
    export type LessonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: LessonWhereInput;
        orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[];
        cursor?: LessonWhereUniqueInput;
        take?: number;
        skip?: number;
        _count?: true | LessonCountAggregateInputType;
        _avg?: LessonAvgAggregateInputType;
        _sum?: LessonSumAggregateInputType;
        _min?: LessonMinAggregateInputType;
        _max?: LessonMaxAggregateInputType;
    };
    export type GetLessonAggregateType<T extends LessonAggregateArgs> = {
        [P in keyof T & keyof AggregateLesson]: P extends '_count' | 'count' ? T[P] extends true ? number : GetScalarType<T[P], AggregateLesson[P]> : GetScalarType<T[P], AggregateLesson[P]>;
    };
    export type LessonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: LessonWhereInput;
        orderBy?: LessonOrderByWithAggregationInput | LessonOrderByWithAggregationInput[];
        by: LessonScalarFieldEnum[] | LessonScalarFieldEnum;
        having?: LessonScalarWhereWithAggregatesInput;
        take?: number;
        skip?: number;
        _count?: LessonCountAggregateInputType | true;
        _avg?: LessonAvgAggregateInputType;
        _sum?: LessonSumAggregateInputType;
        _min?: LessonMinAggregateInputType;
        _max?: LessonMaxAggregateInputType;
    };
    export type LessonGroupByOutputType = {
        id: string;
        moduleId: string;
        instructorId: string;
        title: string;
        description: string | null;
        lessonDate: Date | null;
        zoomInfo: string | null;
        lessonOrder: number;
        _count: LessonCountAggregateOutputType | null;
        _avg: LessonAvgAggregateOutputType | null;
        _sum: LessonSumAggregateOutputType | null;
        _min: LessonMinAggregateOutputType | null;
        _max: LessonMaxAggregateOutputType | null;
    };
    type GetLessonGroupByPayload<T extends LessonGroupByArgs> = Prisma.PrismaPromise<Array<PickEnumerable<LessonGroupByOutputType, T['by']> & {
        [P in ((keyof T) & (keyof LessonGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : GetScalarType<T[P], LessonGroupByOutputType[P]> : GetScalarType<T[P], LessonGroupByOutputType[P]>;
    }>>;
    export type LessonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        moduleId?: boolean;
        instructorId?: boolean;
        title?: boolean;
        description?: boolean;
        lessonDate?: boolean;
        zoomInfo?: boolean;
        lessonOrder?: boolean;
        module?: boolean | ModuleDefaultArgs<ExtArgs>;
        instructor?: boolean | InstructorDefaultArgs<ExtArgs>;
        resources?: boolean | Lesson$resourcesArgs<ExtArgs>;
        lessonProgress?: boolean | Lesson$lessonProgressArgs<ExtArgs>;
        _count?: boolean | LessonCountOutputTypeDefaultArgs<ExtArgs>;
    }, ExtArgs["result"]["lesson"]>;
    export type LessonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        moduleId?: boolean;
        instructorId?: boolean;
        title?: boolean;
        description?: boolean;
        lessonDate?: boolean;
        zoomInfo?: boolean;
        lessonOrder?: boolean;
        module?: boolean | ModuleDefaultArgs<ExtArgs>;
        instructor?: boolean | InstructorDefaultArgs<ExtArgs>;
    }, ExtArgs["result"]["lesson"]>;
    export type LessonSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        moduleId?: boolean;
        instructorId?: boolean;
        title?: boolean;
        description?: boolean;
        lessonDate?: boolean;
        zoomInfo?: boolean;
        lessonOrder?: boolean;
        module?: boolean | ModuleDefaultArgs<ExtArgs>;
        instructor?: boolean | InstructorDefaultArgs<ExtArgs>;
    }, ExtArgs["result"]["lesson"]>;
    export type LessonSelectScalar = {
        id?: boolean;
        moduleId?: boolean;
        instructorId?: boolean;
        title?: boolean;
        description?: boolean;
        lessonDate?: boolean;
        zoomInfo?: boolean;
        lessonOrder?: boolean;
    };
    export type LessonOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "moduleId" | "instructorId" | "title" | "description" | "lessonDate" | "zoomInfo" | "lessonOrder", ExtArgs["result"]["lesson"]>;
    export type LessonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        module?: boolean | ModuleDefaultArgs<ExtArgs>;
        instructor?: boolean | InstructorDefaultArgs<ExtArgs>;
        resources?: boolean | Lesson$resourcesArgs<ExtArgs>;
        lessonProgress?: boolean | Lesson$lessonProgressArgs<ExtArgs>;
        _count?: boolean | LessonCountOutputTypeDefaultArgs<ExtArgs>;
    };
    export type LessonIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        module?: boolean | ModuleDefaultArgs<ExtArgs>;
        instructor?: boolean | InstructorDefaultArgs<ExtArgs>;
    };
    export type LessonIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        module?: boolean | ModuleDefaultArgs<ExtArgs>;
        instructor?: boolean | InstructorDefaultArgs<ExtArgs>;
    };
    export type $LessonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        name: "Lesson";
        objects: {
            module: Prisma.$ModulePayload<ExtArgs>;
            instructor: Prisma.$InstructorPayload<ExtArgs>;
            resources: Prisma.$ResourcePayload<ExtArgs>[];
            lessonProgress: Prisma.$LessonProgressPayload<ExtArgs>[];
        };
        scalars: $Extensions.GetPayloadResult<{
            id: string;
            moduleId: string;
            instructorId: string;
            title: string;
            description: string | null;
            lessonDate: Date | null;
            zoomInfo: string | null;
            lessonOrder: number;
        }, ExtArgs["result"]["lesson"]>;
        composites: {};
    };
    type LessonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<LessonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
        select?: LessonCountAggregateInputType | true;
    };
    export interface LessonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
        [K: symbol]: {
            types: Prisma.TypeMap<ExtArgs>['model']['Lesson'];
            meta: {
                name: 'Lesson';
            };
        };
        findUnique<T extends LessonFindUniqueArgs>(args: SelectSubset<T, LessonFindUniqueArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        findUniqueOrThrow<T extends LessonFindUniqueOrThrowArgs>(args: SelectSubset<T, LessonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        findFirst<T extends LessonFindFirstArgs>(args?: SelectSubset<T, LessonFindFirstArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        findFirstOrThrow<T extends LessonFindFirstOrThrowArgs>(args?: SelectSubset<T, LessonFindFirstOrThrowArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        findMany<T extends LessonFindManyArgs>(args?: SelectSubset<T, LessonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
        create<T extends LessonCreateArgs>(args: SelectSubset<T, LessonCreateArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        createMany<T extends LessonCreateManyArgs>(args?: SelectSubset<T, LessonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        createManyAndReturn<T extends LessonCreateManyAndReturnArgs>(args?: SelectSubset<T, LessonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
        delete<T extends LessonDeleteArgs>(args: SelectSubset<T, LessonDeleteArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        update<T extends LessonUpdateArgs>(args: SelectSubset<T, LessonUpdateArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        deleteMany<T extends LessonDeleteManyArgs>(args?: SelectSubset<T, LessonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        updateMany<T extends LessonUpdateManyArgs>(args: SelectSubset<T, LessonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        updateManyAndReturn<T extends LessonUpdateManyAndReturnArgs>(args: SelectSubset<T, LessonUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
        upsert<T extends LessonUpsertArgs>(args: SelectSubset<T, LessonUpsertArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        count<T extends LessonCountArgs>(args?: Subset<T, LessonCountArgs>): Prisma.PrismaPromise<T extends $Utils.Record<'select', any> ? T['select'] extends true ? number : GetScalarType<T['select'], LessonCountAggregateOutputType> : number>;
        aggregate<T extends LessonAggregateArgs>(args: Subset<T, LessonAggregateArgs>): Prisma.PrismaPromise<GetLessonAggregateType<T>>;
        groupBy<T extends LessonGroupByArgs, HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>, OrderByArg extends True extends HasSelectOrTake ? {
            orderBy: LessonGroupByArgs['orderBy'];
        } : {
            orderBy?: LessonGroupByArgs['orderBy'];
        }, OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>, ByFields extends MaybeTupleToUnion<T['by']>, ByValid extends Has<ByFields, OrderFields>, HavingFields extends GetHavingFields<T['having']>, HavingValid extends Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? True : False, InputErrors extends ByEmpty extends True ? `Error: "by" must not be empty.` : HavingValid extends False ? {
            [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`
            ];
        }[HavingFields] : 'take' extends Keys<T> ? 'orderBy' extends Keys<T> ? ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Keys<T> ? 'orderBy' extends Keys<T> ? ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields]>(args: SubsetIntersection<T, LessonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLessonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
        readonly fields: LessonFieldRefs;
    }
    export interface Prisma__LessonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
        readonly [Symbol.toStringTag]: "PrismaPromise";
        module<T extends ModuleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ModuleDefaultArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
        instructor<T extends InstructorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InstructorDefaultArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
        resources<T extends Lesson$resourcesArgs<ExtArgs> = {}>(args?: Subset<T, Lesson$resourcesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
        lessonProgress<T extends Lesson$lessonProgressArgs<ExtArgs> = {}>(args?: Subset<T, Lesson$lessonProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
        then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
        catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
        finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
    }
    interface LessonFieldRefs {
        readonly id: FieldRef<"Lesson", 'String'>;
        readonly moduleId: FieldRef<"Lesson", 'String'>;
        readonly instructorId: FieldRef<"Lesson", 'String'>;
        readonly title: FieldRef<"Lesson", 'String'>;
        readonly description: FieldRef<"Lesson", 'String'>;
        readonly lessonDate: FieldRef<"Lesson", 'DateTime'>;
        readonly zoomInfo: FieldRef<"Lesson", 'String'>;
        readonly lessonOrder: FieldRef<"Lesson", 'Int'>;
    }
    export type LessonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonSelect<ExtArgs> | null;
        omit?: LessonOmit<ExtArgs> | null;
        include?: LessonInclude<ExtArgs> | null;
        where: LessonWhereUniqueInput;
    };
    export type LessonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonSelect<ExtArgs> | null;
        omit?: LessonOmit<ExtArgs> | null;
        include?: LessonInclude<ExtArgs> | null;
        where: LessonWhereUniqueInput;
    };
    export type LessonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonSelect<ExtArgs> | null;
        omit?: LessonOmit<ExtArgs> | null;
        include?: LessonInclude<ExtArgs> | null;
        where?: LessonWhereInput;
        orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[];
        cursor?: LessonWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[];
    };
    export type LessonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonSelect<ExtArgs> | null;
        omit?: LessonOmit<ExtArgs> | null;
        include?: LessonInclude<ExtArgs> | null;
        where?: LessonWhereInput;
        orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[];
        cursor?: LessonWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[];
    };
    export type LessonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonSelect<ExtArgs> | null;
        omit?: LessonOmit<ExtArgs> | null;
        include?: LessonInclude<ExtArgs> | null;
        where?: LessonWhereInput;
        orderBy?: LessonOrderByWithRelationInput | LessonOrderByWithRelationInput[];
        cursor?: LessonWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: LessonScalarFieldEnum | LessonScalarFieldEnum[];
    };
    export type LessonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonSelect<ExtArgs> | null;
        omit?: LessonOmit<ExtArgs> | null;
        include?: LessonInclude<ExtArgs> | null;
        data: XOR<LessonCreateInput, LessonUncheckedCreateInput>;
    };
    export type LessonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        data: LessonCreateManyInput | LessonCreateManyInput[];
        skipDuplicates?: boolean;
    };
    export type LessonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonSelectCreateManyAndReturn<ExtArgs> | null;
        omit?: LessonOmit<ExtArgs> | null;
        data: LessonCreateManyInput | LessonCreateManyInput[];
        skipDuplicates?: boolean;
        include?: LessonIncludeCreateManyAndReturn<ExtArgs> | null;
    };
    export type LessonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonSelect<ExtArgs> | null;
        omit?: LessonOmit<ExtArgs> | null;
        include?: LessonInclude<ExtArgs> | null;
        data: XOR<LessonUpdateInput, LessonUncheckedUpdateInput>;
        where: LessonWhereUniqueInput;
    };
    export type LessonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        data: XOR<LessonUpdateManyMutationInput, LessonUncheckedUpdateManyInput>;
        where?: LessonWhereInput;
        limit?: number;
    };
    export type LessonUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonSelectUpdateManyAndReturn<ExtArgs> | null;
        omit?: LessonOmit<ExtArgs> | null;
        data: XOR<LessonUpdateManyMutationInput, LessonUncheckedUpdateManyInput>;
        where?: LessonWhereInput;
        limit?: number;
        include?: LessonIncludeUpdateManyAndReturn<ExtArgs> | null;
    };
    export type LessonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonSelect<ExtArgs> | null;
        omit?: LessonOmit<ExtArgs> | null;
        include?: LessonInclude<ExtArgs> | null;
        where: LessonWhereUniqueInput;
        create: XOR<LessonCreateInput, LessonUncheckedCreateInput>;
        update: XOR<LessonUpdateInput, LessonUncheckedUpdateInput>;
    };
    export type LessonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonSelect<ExtArgs> | null;
        omit?: LessonOmit<ExtArgs> | null;
        include?: LessonInclude<ExtArgs> | null;
        where: LessonWhereUniqueInput;
    };
    export type LessonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: LessonWhereInput;
        limit?: number;
    };
    export type Lesson$resourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ResourceSelect<ExtArgs> | null;
        omit?: ResourceOmit<ExtArgs> | null;
        include?: ResourceInclude<ExtArgs> | null;
        where?: ResourceWhereInput;
        orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[];
        cursor?: ResourceWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[];
    };
    export type Lesson$lessonProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonProgressSelect<ExtArgs> | null;
        omit?: LessonProgressOmit<ExtArgs> | null;
        include?: LessonProgressInclude<ExtArgs> | null;
        where?: LessonProgressWhereInput;
        orderBy?: LessonProgressOrderByWithRelationInput | LessonProgressOrderByWithRelationInput[];
        cursor?: LessonProgressWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: LessonProgressScalarFieldEnum | LessonProgressScalarFieldEnum[];
    };
    export type LessonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonSelect<ExtArgs> | null;
        omit?: LessonOmit<ExtArgs> | null;
        include?: LessonInclude<ExtArgs> | null;
    };
    export type AggregateResource = {
        _count: ResourceCountAggregateOutputType | null;
        _min: ResourceMinAggregateOutputType | null;
        _max: ResourceMaxAggregateOutputType | null;
    };
    export type ResourceMinAggregateOutputType = {
        id: string | null;
        lessonId: string | null;
        resourceType: $Enums.ResourceType | null;
        title: string | null;
        url: string | null;
        deadline: Date | null;
    };
    export type ResourceMaxAggregateOutputType = {
        id: string | null;
        lessonId: string | null;
        resourceType: $Enums.ResourceType | null;
        title: string | null;
        url: string | null;
        deadline: Date | null;
    };
    export type ResourceCountAggregateOutputType = {
        id: number;
        lessonId: number;
        resourceType: number;
        title: number;
        url: number;
        deadline: number;
        _all: number;
    };
    export type ResourceMinAggregateInputType = {
        id?: true;
        lessonId?: true;
        resourceType?: true;
        title?: true;
        url?: true;
        deadline?: true;
    };
    export type ResourceMaxAggregateInputType = {
        id?: true;
        lessonId?: true;
        resourceType?: true;
        title?: true;
        url?: true;
        deadline?: true;
    };
    export type ResourceCountAggregateInputType = {
        id?: true;
        lessonId?: true;
        resourceType?: true;
        title?: true;
        url?: true;
        deadline?: true;
        _all?: true;
    };
    export type ResourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: ResourceWhereInput;
        orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[];
        cursor?: ResourceWhereUniqueInput;
        take?: number;
        skip?: number;
        _count?: true | ResourceCountAggregateInputType;
        _min?: ResourceMinAggregateInputType;
        _max?: ResourceMaxAggregateInputType;
    };
    export type GetResourceAggregateType<T extends ResourceAggregateArgs> = {
        [P in keyof T & keyof AggregateResource]: P extends '_count' | 'count' ? T[P] extends true ? number : GetScalarType<T[P], AggregateResource[P]> : GetScalarType<T[P], AggregateResource[P]>;
    };
    export type ResourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: ResourceWhereInput;
        orderBy?: ResourceOrderByWithAggregationInput | ResourceOrderByWithAggregationInput[];
        by: ResourceScalarFieldEnum[] | ResourceScalarFieldEnum;
        having?: ResourceScalarWhereWithAggregatesInput;
        take?: number;
        skip?: number;
        _count?: ResourceCountAggregateInputType | true;
        _min?: ResourceMinAggregateInputType;
        _max?: ResourceMaxAggregateInputType;
    };
    export type ResourceGroupByOutputType = {
        id: string;
        lessonId: string;
        resourceType: $Enums.ResourceType;
        title: string;
        url: string;
        deadline: Date | null;
        _count: ResourceCountAggregateOutputType | null;
        _min: ResourceMinAggregateOutputType | null;
        _max: ResourceMaxAggregateOutputType | null;
    };
    type GetResourceGroupByPayload<T extends ResourceGroupByArgs> = Prisma.PrismaPromise<Array<PickEnumerable<ResourceGroupByOutputType, T['by']> & {
        [P in ((keyof T) & (keyof ResourceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : GetScalarType<T[P], ResourceGroupByOutputType[P]> : GetScalarType<T[P], ResourceGroupByOutputType[P]>;
    }>>;
    export type ResourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        lessonId?: boolean;
        resourceType?: boolean;
        title?: boolean;
        url?: boolean;
        deadline?: boolean;
        lesson?: boolean | LessonDefaultArgs<ExtArgs>;
    }, ExtArgs["result"]["resource"]>;
    export type ResourceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        lessonId?: boolean;
        resourceType?: boolean;
        title?: boolean;
        url?: boolean;
        deadline?: boolean;
        lesson?: boolean | LessonDefaultArgs<ExtArgs>;
    }, ExtArgs["result"]["resource"]>;
    export type ResourceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        lessonId?: boolean;
        resourceType?: boolean;
        title?: boolean;
        url?: boolean;
        deadline?: boolean;
        lesson?: boolean | LessonDefaultArgs<ExtArgs>;
    }, ExtArgs["result"]["resource"]>;
    export type ResourceSelectScalar = {
        id?: boolean;
        lessonId?: boolean;
        resourceType?: boolean;
        title?: boolean;
        url?: boolean;
        deadline?: boolean;
    };
    export type ResourceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "lessonId" | "resourceType" | "title" | "url" | "deadline", ExtArgs["result"]["resource"]>;
    export type ResourceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        lesson?: boolean | LessonDefaultArgs<ExtArgs>;
    };
    export type ResourceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        lesson?: boolean | LessonDefaultArgs<ExtArgs>;
    };
    export type ResourceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        lesson?: boolean | LessonDefaultArgs<ExtArgs>;
    };
    export type $ResourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        name: "Resource";
        objects: {
            lesson: Prisma.$LessonPayload<ExtArgs>;
        };
        scalars: $Extensions.GetPayloadResult<{
            id: string;
            lessonId: string;
            resourceType: $Enums.ResourceType;
            title: string;
            url: string;
            deadline: Date | null;
        }, ExtArgs["result"]["resource"]>;
        composites: {};
    };
    type ResourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<ResourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
        select?: ResourceCountAggregateInputType | true;
    };
    export interface ResourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
        [K: symbol]: {
            types: Prisma.TypeMap<ExtArgs>['model']['Resource'];
            meta: {
                name: 'Resource';
            };
        };
        findUnique<T extends ResourceFindUniqueArgs>(args: SelectSubset<T, ResourceFindUniqueArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        findUniqueOrThrow<T extends ResourceFindUniqueOrThrowArgs>(args: SelectSubset<T, ResourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        findFirst<T extends ResourceFindFirstArgs>(args?: SelectSubset<T, ResourceFindFirstArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        findFirstOrThrow<T extends ResourceFindFirstOrThrowArgs>(args?: SelectSubset<T, ResourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        findMany<T extends ResourceFindManyArgs>(args?: SelectSubset<T, ResourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
        create<T extends ResourceCreateArgs>(args: SelectSubset<T, ResourceCreateArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        createMany<T extends ResourceCreateManyArgs>(args?: SelectSubset<T, ResourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        createManyAndReturn<T extends ResourceCreateManyAndReturnArgs>(args?: SelectSubset<T, ResourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
        delete<T extends ResourceDeleteArgs>(args: SelectSubset<T, ResourceDeleteArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        update<T extends ResourceUpdateArgs>(args: SelectSubset<T, ResourceUpdateArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        deleteMany<T extends ResourceDeleteManyArgs>(args?: SelectSubset<T, ResourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        updateMany<T extends ResourceUpdateManyArgs>(args: SelectSubset<T, ResourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        updateManyAndReturn<T extends ResourceUpdateManyAndReturnArgs>(args: SelectSubset<T, ResourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
        upsert<T extends ResourceUpsertArgs>(args: SelectSubset<T, ResourceUpsertArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        count<T extends ResourceCountArgs>(args?: Subset<T, ResourceCountArgs>): Prisma.PrismaPromise<T extends $Utils.Record<'select', any> ? T['select'] extends true ? number : GetScalarType<T['select'], ResourceCountAggregateOutputType> : number>;
        aggregate<T extends ResourceAggregateArgs>(args: Subset<T, ResourceAggregateArgs>): Prisma.PrismaPromise<GetResourceAggregateType<T>>;
        groupBy<T extends ResourceGroupByArgs, HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>, OrderByArg extends True extends HasSelectOrTake ? {
            orderBy: ResourceGroupByArgs['orderBy'];
        } : {
            orderBy?: ResourceGroupByArgs['orderBy'];
        }, OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>, ByFields extends MaybeTupleToUnion<T['by']>, ByValid extends Has<ByFields, OrderFields>, HavingFields extends GetHavingFields<T['having']>, HavingValid extends Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? True : False, InputErrors extends ByEmpty extends True ? `Error: "by" must not be empty.` : HavingValid extends False ? {
            [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`
            ];
        }[HavingFields] : 'take' extends Keys<T> ? 'orderBy' extends Keys<T> ? ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Keys<T> ? 'orderBy' extends Keys<T> ? ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields]>(args: SubsetIntersection<T, ResourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
        readonly fields: ResourceFieldRefs;
    }
    export interface Prisma__ResourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
        readonly [Symbol.toStringTag]: "PrismaPromise";
        lesson<T extends LessonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LessonDefaultArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
        then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
        catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
        finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
    }
    interface ResourceFieldRefs {
        readonly id: FieldRef<"Resource", 'String'>;
        readonly lessonId: FieldRef<"Resource", 'String'>;
        readonly resourceType: FieldRef<"Resource", 'ResourceType'>;
        readonly title: FieldRef<"Resource", 'String'>;
        readonly url: FieldRef<"Resource", 'String'>;
        readonly deadline: FieldRef<"Resource", 'DateTime'>;
    }
    export type ResourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ResourceSelect<ExtArgs> | null;
        omit?: ResourceOmit<ExtArgs> | null;
        include?: ResourceInclude<ExtArgs> | null;
        where: ResourceWhereUniqueInput;
    };
    export type ResourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ResourceSelect<ExtArgs> | null;
        omit?: ResourceOmit<ExtArgs> | null;
        include?: ResourceInclude<ExtArgs> | null;
        where: ResourceWhereUniqueInput;
    };
    export type ResourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ResourceSelect<ExtArgs> | null;
        omit?: ResourceOmit<ExtArgs> | null;
        include?: ResourceInclude<ExtArgs> | null;
        where?: ResourceWhereInput;
        orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[];
        cursor?: ResourceWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[];
    };
    export type ResourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ResourceSelect<ExtArgs> | null;
        omit?: ResourceOmit<ExtArgs> | null;
        include?: ResourceInclude<ExtArgs> | null;
        where?: ResourceWhereInput;
        orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[];
        cursor?: ResourceWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[];
    };
    export type ResourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ResourceSelect<ExtArgs> | null;
        omit?: ResourceOmit<ExtArgs> | null;
        include?: ResourceInclude<ExtArgs> | null;
        where?: ResourceWhereInput;
        orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[];
        cursor?: ResourceWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[];
    };
    export type ResourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ResourceSelect<ExtArgs> | null;
        omit?: ResourceOmit<ExtArgs> | null;
        include?: ResourceInclude<ExtArgs> | null;
        data: XOR<ResourceCreateInput, ResourceUncheckedCreateInput>;
    };
    export type ResourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        data: ResourceCreateManyInput | ResourceCreateManyInput[];
        skipDuplicates?: boolean;
    };
    export type ResourceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ResourceSelectCreateManyAndReturn<ExtArgs> | null;
        omit?: ResourceOmit<ExtArgs> | null;
        data: ResourceCreateManyInput | ResourceCreateManyInput[];
        skipDuplicates?: boolean;
        include?: ResourceIncludeCreateManyAndReturn<ExtArgs> | null;
    };
    export type ResourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ResourceSelect<ExtArgs> | null;
        omit?: ResourceOmit<ExtArgs> | null;
        include?: ResourceInclude<ExtArgs> | null;
        data: XOR<ResourceUpdateInput, ResourceUncheckedUpdateInput>;
        where: ResourceWhereUniqueInput;
    };
    export type ResourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        data: XOR<ResourceUpdateManyMutationInput, ResourceUncheckedUpdateManyInput>;
        where?: ResourceWhereInput;
        limit?: number;
    };
    export type ResourceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ResourceSelectUpdateManyAndReturn<ExtArgs> | null;
        omit?: ResourceOmit<ExtArgs> | null;
        data: XOR<ResourceUpdateManyMutationInput, ResourceUncheckedUpdateManyInput>;
        where?: ResourceWhereInput;
        limit?: number;
        include?: ResourceIncludeUpdateManyAndReturn<ExtArgs> | null;
    };
    export type ResourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ResourceSelect<ExtArgs> | null;
        omit?: ResourceOmit<ExtArgs> | null;
        include?: ResourceInclude<ExtArgs> | null;
        where: ResourceWhereUniqueInput;
        create: XOR<ResourceCreateInput, ResourceUncheckedCreateInput>;
        update: XOR<ResourceUpdateInput, ResourceUncheckedUpdateInput>;
    };
    export type ResourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ResourceSelect<ExtArgs> | null;
        omit?: ResourceOmit<ExtArgs> | null;
        include?: ResourceInclude<ExtArgs> | null;
        where: ResourceWhereUniqueInput;
    };
    export type ResourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: ResourceWhereInput;
        limit?: number;
    };
    export type ResourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: ResourceSelect<ExtArgs> | null;
        omit?: ResourceOmit<ExtArgs> | null;
        include?: ResourceInclude<ExtArgs> | null;
    };
    export type AggregateEnrollment = {
        _count: EnrollmentCountAggregateOutputType | null;
        _min: EnrollmentMinAggregateOutputType | null;
        _max: EnrollmentMaxAggregateOutputType | null;
    };
    export type EnrollmentMinAggregateOutputType = {
        id: string | null;
        userId: string | null;
        courseId: string | null;
        enrollmentDate: Date | null;
    };
    export type EnrollmentMaxAggregateOutputType = {
        id: string | null;
        userId: string | null;
        courseId: string | null;
        enrollmentDate: Date | null;
    };
    export type EnrollmentCountAggregateOutputType = {
        id: number;
        userId: number;
        courseId: number;
        enrollmentDate: number;
        _all: number;
    };
    export type EnrollmentMinAggregateInputType = {
        id?: true;
        userId?: true;
        courseId?: true;
        enrollmentDate?: true;
    };
    export type EnrollmentMaxAggregateInputType = {
        id?: true;
        userId?: true;
        courseId?: true;
        enrollmentDate?: true;
    };
    export type EnrollmentCountAggregateInputType = {
        id?: true;
        userId?: true;
        courseId?: true;
        enrollmentDate?: true;
        _all?: true;
    };
    export type EnrollmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: EnrollmentWhereInput;
        orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[];
        cursor?: EnrollmentWhereUniqueInput;
        take?: number;
        skip?: number;
        _count?: true | EnrollmentCountAggregateInputType;
        _min?: EnrollmentMinAggregateInputType;
        _max?: EnrollmentMaxAggregateInputType;
    };
    export type GetEnrollmentAggregateType<T extends EnrollmentAggregateArgs> = {
        [P in keyof T & keyof AggregateEnrollment]: P extends '_count' | 'count' ? T[P] extends true ? number : GetScalarType<T[P], AggregateEnrollment[P]> : GetScalarType<T[P], AggregateEnrollment[P]>;
    };
    export type EnrollmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: EnrollmentWhereInput;
        orderBy?: EnrollmentOrderByWithAggregationInput | EnrollmentOrderByWithAggregationInput[];
        by: EnrollmentScalarFieldEnum[] | EnrollmentScalarFieldEnum;
        having?: EnrollmentScalarWhereWithAggregatesInput;
        take?: number;
        skip?: number;
        _count?: EnrollmentCountAggregateInputType | true;
        _min?: EnrollmentMinAggregateInputType;
        _max?: EnrollmentMaxAggregateInputType;
    };
    export type EnrollmentGroupByOutputType = {
        id: string;
        userId: string;
        courseId: string;
        enrollmentDate: Date;
        _count: EnrollmentCountAggregateOutputType | null;
        _min: EnrollmentMinAggregateOutputType | null;
        _max: EnrollmentMaxAggregateOutputType | null;
    };
    type GetEnrollmentGroupByPayload<T extends EnrollmentGroupByArgs> = Prisma.PrismaPromise<Array<PickEnumerable<EnrollmentGroupByOutputType, T['by']> & {
        [P in ((keyof T) & (keyof EnrollmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : GetScalarType<T[P], EnrollmentGroupByOutputType[P]> : GetScalarType<T[P], EnrollmentGroupByOutputType[P]>;
    }>>;
    export type EnrollmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        userId?: boolean;
        courseId?: boolean;
        enrollmentDate?: boolean;
        user?: boolean | UserDefaultArgs<ExtArgs>;
        course?: boolean | CourseDefaultArgs<ExtArgs>;
    }, ExtArgs["result"]["enrollment"]>;
    export type EnrollmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        userId?: boolean;
        courseId?: boolean;
        enrollmentDate?: boolean;
        user?: boolean | UserDefaultArgs<ExtArgs>;
        course?: boolean | CourseDefaultArgs<ExtArgs>;
    }, ExtArgs["result"]["enrollment"]>;
    export type EnrollmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        userId?: boolean;
        courseId?: boolean;
        enrollmentDate?: boolean;
        user?: boolean | UserDefaultArgs<ExtArgs>;
        course?: boolean | CourseDefaultArgs<ExtArgs>;
    }, ExtArgs["result"]["enrollment"]>;
    export type EnrollmentSelectScalar = {
        id?: boolean;
        userId?: boolean;
        courseId?: boolean;
        enrollmentDate?: boolean;
    };
    export type EnrollmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "courseId" | "enrollmentDate", ExtArgs["result"]["enrollment"]>;
    export type EnrollmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        user?: boolean | UserDefaultArgs<ExtArgs>;
        course?: boolean | CourseDefaultArgs<ExtArgs>;
    };
    export type EnrollmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        user?: boolean | UserDefaultArgs<ExtArgs>;
        course?: boolean | CourseDefaultArgs<ExtArgs>;
    };
    export type EnrollmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        user?: boolean | UserDefaultArgs<ExtArgs>;
        course?: boolean | CourseDefaultArgs<ExtArgs>;
    };
    export type $EnrollmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        name: "Enrollment";
        objects: {
            user: Prisma.$UserPayload<ExtArgs>;
            course: Prisma.$CoursePayload<ExtArgs>;
        };
        scalars: $Extensions.GetPayloadResult<{
            id: string;
            userId: string;
            courseId: string;
            enrollmentDate: Date;
        }, ExtArgs["result"]["enrollment"]>;
        composites: {};
    };
    type EnrollmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<EnrollmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
        select?: EnrollmentCountAggregateInputType | true;
    };
    export interface EnrollmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
        [K: symbol]: {
            types: Prisma.TypeMap<ExtArgs>['model']['Enrollment'];
            meta: {
                name: 'Enrollment';
            };
        };
        findUnique<T extends EnrollmentFindUniqueArgs>(args: SelectSubset<T, EnrollmentFindUniqueArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        findUniqueOrThrow<T extends EnrollmentFindUniqueOrThrowArgs>(args: SelectSubset<T, EnrollmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        findFirst<T extends EnrollmentFindFirstArgs>(args?: SelectSubset<T, EnrollmentFindFirstArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        findFirstOrThrow<T extends EnrollmentFindFirstOrThrowArgs>(args?: SelectSubset<T, EnrollmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        findMany<T extends EnrollmentFindManyArgs>(args?: SelectSubset<T, EnrollmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
        create<T extends EnrollmentCreateArgs>(args: SelectSubset<T, EnrollmentCreateArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        createMany<T extends EnrollmentCreateManyArgs>(args?: SelectSubset<T, EnrollmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        createManyAndReturn<T extends EnrollmentCreateManyAndReturnArgs>(args?: SelectSubset<T, EnrollmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
        delete<T extends EnrollmentDeleteArgs>(args: SelectSubset<T, EnrollmentDeleteArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        update<T extends EnrollmentUpdateArgs>(args: SelectSubset<T, EnrollmentUpdateArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        deleteMany<T extends EnrollmentDeleteManyArgs>(args?: SelectSubset<T, EnrollmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        updateMany<T extends EnrollmentUpdateManyArgs>(args: SelectSubset<T, EnrollmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        updateManyAndReturn<T extends EnrollmentUpdateManyAndReturnArgs>(args: SelectSubset<T, EnrollmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
        upsert<T extends EnrollmentUpsertArgs>(args: SelectSubset<T, EnrollmentUpsertArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        count<T extends EnrollmentCountArgs>(args?: Subset<T, EnrollmentCountArgs>): Prisma.PrismaPromise<T extends $Utils.Record<'select', any> ? T['select'] extends true ? number : GetScalarType<T['select'], EnrollmentCountAggregateOutputType> : number>;
        aggregate<T extends EnrollmentAggregateArgs>(args: Subset<T, EnrollmentAggregateArgs>): Prisma.PrismaPromise<GetEnrollmentAggregateType<T>>;
        groupBy<T extends EnrollmentGroupByArgs, HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>, OrderByArg extends True extends HasSelectOrTake ? {
            orderBy: EnrollmentGroupByArgs['orderBy'];
        } : {
            orderBy?: EnrollmentGroupByArgs['orderBy'];
        }, OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>, ByFields extends MaybeTupleToUnion<T['by']>, ByValid extends Has<ByFields, OrderFields>, HavingFields extends GetHavingFields<T['having']>, HavingValid extends Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? True : False, InputErrors extends ByEmpty extends True ? `Error: "by" must not be empty.` : HavingValid extends False ? {
            [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`
            ];
        }[HavingFields] : 'take' extends Keys<T> ? 'orderBy' extends Keys<T> ? ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Keys<T> ? 'orderBy' extends Keys<T> ? ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields]>(args: SubsetIntersection<T, EnrollmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnrollmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
        readonly fields: EnrollmentFieldRefs;
    }
    export interface Prisma__EnrollmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
        readonly [Symbol.toStringTag]: "PrismaPromise";
        user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
        course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
        then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
        catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
        finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
    }
    interface EnrollmentFieldRefs {
        readonly id: FieldRef<"Enrollment", 'String'>;
        readonly userId: FieldRef<"Enrollment", 'String'>;
        readonly courseId: FieldRef<"Enrollment", 'String'>;
        readonly enrollmentDate: FieldRef<"Enrollment", 'DateTime'>;
    }
    export type EnrollmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: EnrollmentSelect<ExtArgs> | null;
        omit?: EnrollmentOmit<ExtArgs> | null;
        include?: EnrollmentInclude<ExtArgs> | null;
        where: EnrollmentWhereUniqueInput;
    };
    export type EnrollmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: EnrollmentSelect<ExtArgs> | null;
        omit?: EnrollmentOmit<ExtArgs> | null;
        include?: EnrollmentInclude<ExtArgs> | null;
        where: EnrollmentWhereUniqueInput;
    };
    export type EnrollmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: EnrollmentSelect<ExtArgs> | null;
        omit?: EnrollmentOmit<ExtArgs> | null;
        include?: EnrollmentInclude<ExtArgs> | null;
        where?: EnrollmentWhereInput;
        orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[];
        cursor?: EnrollmentWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[];
    };
    export type EnrollmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: EnrollmentSelect<ExtArgs> | null;
        omit?: EnrollmentOmit<ExtArgs> | null;
        include?: EnrollmentInclude<ExtArgs> | null;
        where?: EnrollmentWhereInput;
        orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[];
        cursor?: EnrollmentWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[];
    };
    export type EnrollmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: EnrollmentSelect<ExtArgs> | null;
        omit?: EnrollmentOmit<ExtArgs> | null;
        include?: EnrollmentInclude<ExtArgs> | null;
        where?: EnrollmentWhereInput;
        orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[];
        cursor?: EnrollmentWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[];
    };
    export type EnrollmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: EnrollmentSelect<ExtArgs> | null;
        omit?: EnrollmentOmit<ExtArgs> | null;
        include?: EnrollmentInclude<ExtArgs> | null;
        data: XOR<EnrollmentCreateInput, EnrollmentUncheckedCreateInput>;
    };
    export type EnrollmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        data: EnrollmentCreateManyInput | EnrollmentCreateManyInput[];
        skipDuplicates?: boolean;
    };
    export type EnrollmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: EnrollmentSelectCreateManyAndReturn<ExtArgs> | null;
        omit?: EnrollmentOmit<ExtArgs> | null;
        data: EnrollmentCreateManyInput | EnrollmentCreateManyInput[];
        skipDuplicates?: boolean;
        include?: EnrollmentIncludeCreateManyAndReturn<ExtArgs> | null;
    };
    export type EnrollmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: EnrollmentSelect<ExtArgs> | null;
        omit?: EnrollmentOmit<ExtArgs> | null;
        include?: EnrollmentInclude<ExtArgs> | null;
        data: XOR<EnrollmentUpdateInput, EnrollmentUncheckedUpdateInput>;
        where: EnrollmentWhereUniqueInput;
    };
    export type EnrollmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyInput>;
        where?: EnrollmentWhereInput;
        limit?: number;
    };
    export type EnrollmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: EnrollmentSelectUpdateManyAndReturn<ExtArgs> | null;
        omit?: EnrollmentOmit<ExtArgs> | null;
        data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyInput>;
        where?: EnrollmentWhereInput;
        limit?: number;
        include?: EnrollmentIncludeUpdateManyAndReturn<ExtArgs> | null;
    };
    export type EnrollmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: EnrollmentSelect<ExtArgs> | null;
        omit?: EnrollmentOmit<ExtArgs> | null;
        include?: EnrollmentInclude<ExtArgs> | null;
        where: EnrollmentWhereUniqueInput;
        create: XOR<EnrollmentCreateInput, EnrollmentUncheckedCreateInput>;
        update: XOR<EnrollmentUpdateInput, EnrollmentUncheckedUpdateInput>;
    };
    export type EnrollmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: EnrollmentSelect<ExtArgs> | null;
        omit?: EnrollmentOmit<ExtArgs> | null;
        include?: EnrollmentInclude<ExtArgs> | null;
        where: EnrollmentWhereUniqueInput;
    };
    export type EnrollmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: EnrollmentWhereInput;
        limit?: number;
    };
    export type EnrollmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: EnrollmentSelect<ExtArgs> | null;
        omit?: EnrollmentOmit<ExtArgs> | null;
        include?: EnrollmentInclude<ExtArgs> | null;
    };
    export type AggregateLessonProgress = {
        _count: LessonProgressCountAggregateOutputType | null;
        _min: LessonProgressMinAggregateOutputType | null;
        _max: LessonProgressMaxAggregateOutputType | null;
    };
    export type LessonProgressMinAggregateOutputType = {
        id: string | null;
        userId: string | null;
        lessonId: string | null;
        status: $Enums.LessonStatus | null;
        completedAt: Date | null;
    };
    export type LessonProgressMaxAggregateOutputType = {
        id: string | null;
        userId: string | null;
        lessonId: string | null;
        status: $Enums.LessonStatus | null;
        completedAt: Date | null;
    };
    export type LessonProgressCountAggregateOutputType = {
        id: number;
        userId: number;
        lessonId: number;
        status: number;
        completedAt: number;
        _all: number;
    };
    export type LessonProgressMinAggregateInputType = {
        id?: true;
        userId?: true;
        lessonId?: true;
        status?: true;
        completedAt?: true;
    };
    export type LessonProgressMaxAggregateInputType = {
        id?: true;
        userId?: true;
        lessonId?: true;
        status?: true;
        completedAt?: true;
    };
    export type LessonProgressCountAggregateInputType = {
        id?: true;
        userId?: true;
        lessonId?: true;
        status?: true;
        completedAt?: true;
        _all?: true;
    };
    export type LessonProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: LessonProgressWhereInput;
        orderBy?: LessonProgressOrderByWithRelationInput | LessonProgressOrderByWithRelationInput[];
        cursor?: LessonProgressWhereUniqueInput;
        take?: number;
        skip?: number;
        _count?: true | LessonProgressCountAggregateInputType;
        _min?: LessonProgressMinAggregateInputType;
        _max?: LessonProgressMaxAggregateInputType;
    };
    export type GetLessonProgressAggregateType<T extends LessonProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateLessonProgress]: P extends '_count' | 'count' ? T[P] extends true ? number : GetScalarType<T[P], AggregateLessonProgress[P]> : GetScalarType<T[P], AggregateLessonProgress[P]>;
    };
    export type LessonProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: LessonProgressWhereInput;
        orderBy?: LessonProgressOrderByWithAggregationInput | LessonProgressOrderByWithAggregationInput[];
        by: LessonProgressScalarFieldEnum[] | LessonProgressScalarFieldEnum;
        having?: LessonProgressScalarWhereWithAggregatesInput;
        take?: number;
        skip?: number;
        _count?: LessonProgressCountAggregateInputType | true;
        _min?: LessonProgressMinAggregateInputType;
        _max?: LessonProgressMaxAggregateInputType;
    };
    export type LessonProgressGroupByOutputType = {
        id: string;
        userId: string;
        lessonId: string;
        status: $Enums.LessonStatus;
        completedAt: Date | null;
        _count: LessonProgressCountAggregateOutputType | null;
        _min: LessonProgressMinAggregateOutputType | null;
        _max: LessonProgressMaxAggregateOutputType | null;
    };
    type GetLessonProgressGroupByPayload<T extends LessonProgressGroupByArgs> = Prisma.PrismaPromise<Array<PickEnumerable<LessonProgressGroupByOutputType, T['by']> & {
        [P in ((keyof T) & (keyof LessonProgressGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : GetScalarType<T[P], LessonProgressGroupByOutputType[P]> : GetScalarType<T[P], LessonProgressGroupByOutputType[P]>;
    }>>;
    export type LessonProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        userId?: boolean;
        lessonId?: boolean;
        status?: boolean;
        completedAt?: boolean;
        user?: boolean | UserDefaultArgs<ExtArgs>;
        lesson?: boolean | LessonDefaultArgs<ExtArgs>;
    }, ExtArgs["result"]["lessonProgress"]>;
    export type LessonProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        userId?: boolean;
        lessonId?: boolean;
        status?: boolean;
        completedAt?: boolean;
        user?: boolean | UserDefaultArgs<ExtArgs>;
        lesson?: boolean | LessonDefaultArgs<ExtArgs>;
    }, ExtArgs["result"]["lessonProgress"]>;
    export type LessonProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        userId?: boolean;
        lessonId?: boolean;
        status?: boolean;
        completedAt?: boolean;
        user?: boolean | UserDefaultArgs<ExtArgs>;
        lesson?: boolean | LessonDefaultArgs<ExtArgs>;
    }, ExtArgs["result"]["lessonProgress"]>;
    export type LessonProgressSelectScalar = {
        id?: boolean;
        userId?: boolean;
        lessonId?: boolean;
        status?: boolean;
        completedAt?: boolean;
    };
    export type LessonProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "lessonId" | "status" | "completedAt", ExtArgs["result"]["lessonProgress"]>;
    export type LessonProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        user?: boolean | UserDefaultArgs<ExtArgs>;
        lesson?: boolean | LessonDefaultArgs<ExtArgs>;
    };
    export type LessonProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        user?: boolean | UserDefaultArgs<ExtArgs>;
        lesson?: boolean | LessonDefaultArgs<ExtArgs>;
    };
    export type LessonProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        user?: boolean | UserDefaultArgs<ExtArgs>;
        lesson?: boolean | LessonDefaultArgs<ExtArgs>;
    };
    export type $LessonProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        name: "LessonProgress";
        objects: {
            user: Prisma.$UserPayload<ExtArgs>;
            lesson: Prisma.$LessonPayload<ExtArgs>;
        };
        scalars: $Extensions.GetPayloadResult<{
            id: string;
            userId: string;
            lessonId: string;
            status: $Enums.LessonStatus;
            completedAt: Date | null;
        }, ExtArgs["result"]["lessonProgress"]>;
        composites: {};
    };
    type LessonProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<LessonProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
        select?: LessonProgressCountAggregateInputType | true;
    };
    export interface LessonProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
        [K: symbol]: {
            types: Prisma.TypeMap<ExtArgs>['model']['LessonProgress'];
            meta: {
                name: 'LessonProgress';
            };
        };
        findUnique<T extends LessonProgressFindUniqueArgs>(args: SelectSubset<T, LessonProgressFindUniqueArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        findUniqueOrThrow<T extends LessonProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, LessonProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        findFirst<T extends LessonProgressFindFirstArgs>(args?: SelectSubset<T, LessonProgressFindFirstArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        findFirstOrThrow<T extends LessonProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, LessonProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        findMany<T extends LessonProgressFindManyArgs>(args?: SelectSubset<T, LessonProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
        create<T extends LessonProgressCreateArgs>(args: SelectSubset<T, LessonProgressCreateArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        createMany<T extends LessonProgressCreateManyArgs>(args?: SelectSubset<T, LessonProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        createManyAndReturn<T extends LessonProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, LessonProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
        delete<T extends LessonProgressDeleteArgs>(args: SelectSubset<T, LessonProgressDeleteArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        update<T extends LessonProgressUpdateArgs>(args: SelectSubset<T, LessonProgressUpdateArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        deleteMany<T extends LessonProgressDeleteManyArgs>(args?: SelectSubset<T, LessonProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        updateMany<T extends LessonProgressUpdateManyArgs>(args: SelectSubset<T, LessonProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        updateManyAndReturn<T extends LessonProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, LessonProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
        upsert<T extends LessonProgressUpsertArgs>(args: SelectSubset<T, LessonProgressUpsertArgs<ExtArgs>>): Prisma__LessonProgressClient<$Result.GetResult<Prisma.$LessonProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        count<T extends LessonProgressCountArgs>(args?: Subset<T, LessonProgressCountArgs>): Prisma.PrismaPromise<T extends $Utils.Record<'select', any> ? T['select'] extends true ? number : GetScalarType<T['select'], LessonProgressCountAggregateOutputType> : number>;
        aggregate<T extends LessonProgressAggregateArgs>(args: Subset<T, LessonProgressAggregateArgs>): Prisma.PrismaPromise<GetLessonProgressAggregateType<T>>;
        groupBy<T extends LessonProgressGroupByArgs, HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>, OrderByArg extends True extends HasSelectOrTake ? {
            orderBy: LessonProgressGroupByArgs['orderBy'];
        } : {
            orderBy?: LessonProgressGroupByArgs['orderBy'];
        }, OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>, ByFields extends MaybeTupleToUnion<T['by']>, ByValid extends Has<ByFields, OrderFields>, HavingFields extends GetHavingFields<T['having']>, HavingValid extends Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? True : False, InputErrors extends ByEmpty extends True ? `Error: "by" must not be empty.` : HavingValid extends False ? {
            [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`
            ];
        }[HavingFields] : 'take' extends Keys<T> ? 'orderBy' extends Keys<T> ? ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Keys<T> ? 'orderBy' extends Keys<T> ? ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields]>(args: SubsetIntersection<T, LessonProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLessonProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
        readonly fields: LessonProgressFieldRefs;
    }
    export interface Prisma__LessonProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
        readonly [Symbol.toStringTag]: "PrismaPromise";
        user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
        lesson<T extends LessonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LessonDefaultArgs<ExtArgs>>): Prisma__LessonClient<$Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
        then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
        catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
        finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
    }
    interface LessonProgressFieldRefs {
        readonly id: FieldRef<"LessonProgress", 'String'>;
        readonly userId: FieldRef<"LessonProgress", 'String'>;
        readonly lessonId: FieldRef<"LessonProgress", 'String'>;
        readonly status: FieldRef<"LessonProgress", 'LessonStatus'>;
        readonly completedAt: FieldRef<"LessonProgress", 'DateTime'>;
    }
    export type LessonProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonProgressSelect<ExtArgs> | null;
        omit?: LessonProgressOmit<ExtArgs> | null;
        include?: LessonProgressInclude<ExtArgs> | null;
        where: LessonProgressWhereUniqueInput;
    };
    export type LessonProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonProgressSelect<ExtArgs> | null;
        omit?: LessonProgressOmit<ExtArgs> | null;
        include?: LessonProgressInclude<ExtArgs> | null;
        where: LessonProgressWhereUniqueInput;
    };
    export type LessonProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonProgressSelect<ExtArgs> | null;
        omit?: LessonProgressOmit<ExtArgs> | null;
        include?: LessonProgressInclude<ExtArgs> | null;
        where?: LessonProgressWhereInput;
        orderBy?: LessonProgressOrderByWithRelationInput | LessonProgressOrderByWithRelationInput[];
        cursor?: LessonProgressWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: LessonProgressScalarFieldEnum | LessonProgressScalarFieldEnum[];
    };
    export type LessonProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonProgressSelect<ExtArgs> | null;
        omit?: LessonProgressOmit<ExtArgs> | null;
        include?: LessonProgressInclude<ExtArgs> | null;
        where?: LessonProgressWhereInput;
        orderBy?: LessonProgressOrderByWithRelationInput | LessonProgressOrderByWithRelationInput[];
        cursor?: LessonProgressWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: LessonProgressScalarFieldEnum | LessonProgressScalarFieldEnum[];
    };
    export type LessonProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonProgressSelect<ExtArgs> | null;
        omit?: LessonProgressOmit<ExtArgs> | null;
        include?: LessonProgressInclude<ExtArgs> | null;
        where?: LessonProgressWhereInput;
        orderBy?: LessonProgressOrderByWithRelationInput | LessonProgressOrderByWithRelationInput[];
        cursor?: LessonProgressWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: LessonProgressScalarFieldEnum | LessonProgressScalarFieldEnum[];
    };
    export type LessonProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonProgressSelect<ExtArgs> | null;
        omit?: LessonProgressOmit<ExtArgs> | null;
        include?: LessonProgressInclude<ExtArgs> | null;
        data: XOR<LessonProgressCreateInput, LessonProgressUncheckedCreateInput>;
    };
    export type LessonProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        data: LessonProgressCreateManyInput | LessonProgressCreateManyInput[];
        skipDuplicates?: boolean;
    };
    export type LessonProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonProgressSelectCreateManyAndReturn<ExtArgs> | null;
        omit?: LessonProgressOmit<ExtArgs> | null;
        data: LessonProgressCreateManyInput | LessonProgressCreateManyInput[];
        skipDuplicates?: boolean;
        include?: LessonProgressIncludeCreateManyAndReturn<ExtArgs> | null;
    };
    export type LessonProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonProgressSelect<ExtArgs> | null;
        omit?: LessonProgressOmit<ExtArgs> | null;
        include?: LessonProgressInclude<ExtArgs> | null;
        data: XOR<LessonProgressUpdateInput, LessonProgressUncheckedUpdateInput>;
        where: LessonProgressWhereUniqueInput;
    };
    export type LessonProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        data: XOR<LessonProgressUpdateManyMutationInput, LessonProgressUncheckedUpdateManyInput>;
        where?: LessonProgressWhereInput;
        limit?: number;
    };
    export type LessonProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonProgressSelectUpdateManyAndReturn<ExtArgs> | null;
        omit?: LessonProgressOmit<ExtArgs> | null;
        data: XOR<LessonProgressUpdateManyMutationInput, LessonProgressUncheckedUpdateManyInput>;
        where?: LessonProgressWhereInput;
        limit?: number;
        include?: LessonProgressIncludeUpdateManyAndReturn<ExtArgs> | null;
    };
    export type LessonProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonProgressSelect<ExtArgs> | null;
        omit?: LessonProgressOmit<ExtArgs> | null;
        include?: LessonProgressInclude<ExtArgs> | null;
        where: LessonProgressWhereUniqueInput;
        create: XOR<LessonProgressCreateInput, LessonProgressUncheckedCreateInput>;
        update: XOR<LessonProgressUpdateInput, LessonProgressUncheckedUpdateInput>;
    };
    export type LessonProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonProgressSelect<ExtArgs> | null;
        omit?: LessonProgressOmit<ExtArgs> | null;
        include?: LessonProgressInclude<ExtArgs> | null;
        where: LessonProgressWhereUniqueInput;
    };
    export type LessonProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: LessonProgressWhereInput;
        limit?: number;
    };
    export type LessonProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: LessonProgressSelect<ExtArgs> | null;
        omit?: LessonProgressOmit<ExtArgs> | null;
        include?: LessonProgressInclude<ExtArgs> | null;
    };
    export type AggregateSession = {
        _count: SessionCountAggregateOutputType | null;
        _min: SessionMinAggregateOutputType | null;
        _max: SessionMaxAggregateOutputType | null;
    };
    export type SessionMinAggregateOutputType = {
        id: string | null;
        sid: string | null;
        data: string | null;
        expiresAt: Date | null;
    };
    export type SessionMaxAggregateOutputType = {
        id: string | null;
        sid: string | null;
        data: string | null;
        expiresAt: Date | null;
    };
    export type SessionCountAggregateOutputType = {
        id: number;
        sid: number;
        data: number;
        expiresAt: number;
        _all: number;
    };
    export type SessionMinAggregateInputType = {
        id?: true;
        sid?: true;
        data?: true;
        expiresAt?: true;
    };
    export type SessionMaxAggregateInputType = {
        id?: true;
        sid?: true;
        data?: true;
        expiresAt?: true;
    };
    export type SessionCountAggregateInputType = {
        id?: true;
        sid?: true;
        data?: true;
        expiresAt?: true;
        _all?: true;
    };
    export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: SessionWhereInput;
        orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[];
        cursor?: SessionWhereUniqueInput;
        take?: number;
        skip?: number;
        _count?: true | SessionCountAggregateInputType;
        _min?: SessionMinAggregateInputType;
        _max?: SessionMaxAggregateInputType;
    };
    export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count' ? T[P] extends true ? number : GetScalarType<T[P], AggregateSession[P]> : GetScalarType<T[P], AggregateSession[P]>;
    };
    export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: SessionWhereInput;
        orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[];
        by: SessionScalarFieldEnum[] | SessionScalarFieldEnum;
        having?: SessionScalarWhereWithAggregatesInput;
        take?: number;
        skip?: number;
        _count?: SessionCountAggregateInputType | true;
        _min?: SessionMinAggregateInputType;
        _max?: SessionMaxAggregateInputType;
    };
    export type SessionGroupByOutputType = {
        id: string;
        sid: string;
        data: string;
        expiresAt: Date;
        _count: SessionCountAggregateOutputType | null;
        _min: SessionMinAggregateOutputType | null;
        _max: SessionMaxAggregateOutputType | null;
    };
    type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<Array<PickEnumerable<SessionGroupByOutputType, T['by']> & {
        [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : GetScalarType<T[P], SessionGroupByOutputType[P]> : GetScalarType<T[P], SessionGroupByOutputType[P]>;
    }>>;
    export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        sid?: boolean;
        data?: boolean;
        expiresAt?: boolean;
    }, ExtArgs["result"]["session"]>;
    export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        sid?: boolean;
        data?: boolean;
        expiresAt?: boolean;
    }, ExtArgs["result"]["session"]>;
    export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
        id?: boolean;
        sid?: boolean;
        data?: boolean;
        expiresAt?: boolean;
    }, ExtArgs["result"]["session"]>;
    export type SessionSelectScalar = {
        id?: boolean;
        sid?: boolean;
        data?: boolean;
        expiresAt?: boolean;
    };
    export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sid" | "data" | "expiresAt", ExtArgs["result"]["session"]>;
    export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        name: "Session";
        objects: {};
        scalars: $Extensions.GetPayloadResult<{
            id: string;
            sid: string;
            data: string;
            expiresAt: Date;
        }, ExtArgs["result"]["session"]>;
        composites: {};
    };
    type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
        select?: SessionCountAggregateInputType | true;
    };
    export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
        [K: symbol]: {
            types: Prisma.TypeMap<ExtArgs>['model']['Session'];
            meta: {
                name: 'Session';
            };
        };
        findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
        findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
        create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
        delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>;
        updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
        upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
        count<T extends SessionCountArgs>(args?: Subset<T, SessionCountArgs>): Prisma.PrismaPromise<T extends $Utils.Record<'select', any> ? T['select'] extends true ? number : GetScalarType<T['select'], SessionCountAggregateOutputType> : number>;
        aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>;
        groupBy<T extends SessionGroupByArgs, HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>, OrderByArg extends True extends HasSelectOrTake ? {
            orderBy: SessionGroupByArgs['orderBy'];
        } : {
            orderBy?: SessionGroupByArgs['orderBy'];
        }, OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>, ByFields extends MaybeTupleToUnion<T['by']>, ByValid extends Has<ByFields, OrderFields>, HavingFields extends GetHavingFields<T['having']>, HavingValid extends Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? True : False, InputErrors extends ByEmpty extends True ? `Error: "by" must not be empty.` : HavingValid extends False ? {
            [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`
            ];
        }[HavingFields] : 'take' extends Keys<T> ? 'orderBy' extends Keys<T> ? ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Keys<T> ? 'orderBy' extends Keys<T> ? ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends True ? {} : {
            [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
        }[OrderFields]>(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
        readonly fields: SessionFieldRefs;
    }
    export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
        readonly [Symbol.toStringTag]: "PrismaPromise";
        then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
        catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
        finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
    }
    interface SessionFieldRefs {
        readonly id: FieldRef<"Session", 'String'>;
        readonly sid: FieldRef<"Session", 'String'>;
        readonly data: FieldRef<"Session", 'String'>;
        readonly expiresAt: FieldRef<"Session", 'DateTime'>;
    }
    export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: SessionSelect<ExtArgs> | null;
        omit?: SessionOmit<ExtArgs> | null;
        where: SessionWhereUniqueInput;
    };
    export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: SessionSelect<ExtArgs> | null;
        omit?: SessionOmit<ExtArgs> | null;
        where: SessionWhereUniqueInput;
    };
    export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: SessionSelect<ExtArgs> | null;
        omit?: SessionOmit<ExtArgs> | null;
        where?: SessionWhereInput;
        orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[];
        cursor?: SessionWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
    };
    export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: SessionSelect<ExtArgs> | null;
        omit?: SessionOmit<ExtArgs> | null;
        where?: SessionWhereInput;
        orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[];
        cursor?: SessionWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
    };
    export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: SessionSelect<ExtArgs> | null;
        omit?: SessionOmit<ExtArgs> | null;
        where?: SessionWhereInput;
        orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[];
        cursor?: SessionWhereUniqueInput;
        take?: number;
        skip?: number;
        distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
    };
    export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: SessionSelect<ExtArgs> | null;
        omit?: SessionOmit<ExtArgs> | null;
        data: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
    };
    export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        data: SessionCreateManyInput | SessionCreateManyInput[];
        skipDuplicates?: boolean;
    };
    export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: SessionSelectCreateManyAndReturn<ExtArgs> | null;
        omit?: SessionOmit<ExtArgs> | null;
        data: SessionCreateManyInput | SessionCreateManyInput[];
        skipDuplicates?: boolean;
    };
    export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: SessionSelect<ExtArgs> | null;
        omit?: SessionOmit<ExtArgs> | null;
        data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
        where: SessionWhereUniqueInput;
    };
    export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>;
        where?: SessionWhereInput;
        limit?: number;
    };
    export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null;
        omit?: SessionOmit<ExtArgs> | null;
        data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>;
        where?: SessionWhereInput;
        limit?: number;
    };
    export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: SessionSelect<ExtArgs> | null;
        omit?: SessionOmit<ExtArgs> | null;
        where: SessionWhereUniqueInput;
        create: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
        update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
    };
    export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: SessionSelect<ExtArgs> | null;
        omit?: SessionOmit<ExtArgs> | null;
        where: SessionWhereUniqueInput;
    };
    export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        where?: SessionWhereInput;
        limit?: number;
    };
    export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
        select?: SessionSelect<ExtArgs> | null;
        omit?: SessionOmit<ExtArgs> | null;
    };
    export const TransactionIsolationLevel: {
        ReadUncommitted: 'ReadUncommitted';
        ReadCommitted: 'ReadCommitted';
        RepeatableRead: 'RepeatableRead';
        Serializable: 'Serializable';
    };
    export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
    export const UserScalarFieldEnum: {
        id: 'id';
        googleId: 'googleId';
        email: 'email';
        fullName: 'fullName';
        profilePictureUrl: 'profilePictureUrl';
        role: 'role';
        createdAt: 'createdAt';
    };
    export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
    export const CourseScalarFieldEnum: {
        id: 'id';
        courseCode: 'courseCode';
        title: 'title';
        description: 'description';
        createdById: 'createdById';
        createdAt: 'createdAt';
    };
    export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum];
    export const ModuleScalarFieldEnum: {
        id: 'id';
        courseId: 'courseId';
        title: 'title';
        description: 'description';
        moduleOrder: 'moduleOrder';
    };
    export type ModuleScalarFieldEnum = (typeof ModuleScalarFieldEnum)[keyof typeof ModuleScalarFieldEnum];
    export const InstructorScalarFieldEnum: {
        id: 'id';
        fullName: 'fullName';
        title: 'title';
        bio: 'bio';
    };
    export type InstructorScalarFieldEnum = (typeof InstructorScalarFieldEnum)[keyof typeof InstructorScalarFieldEnum];
    export const LessonScalarFieldEnum: {
        id: 'id';
        moduleId: 'moduleId';
        instructorId: 'instructorId';
        title: 'title';
        description: 'description';
        lessonDate: 'lessonDate';
        zoomInfo: 'zoomInfo';
        lessonOrder: 'lessonOrder';
    };
    export type LessonScalarFieldEnum = (typeof LessonScalarFieldEnum)[keyof typeof LessonScalarFieldEnum];
    export const ResourceScalarFieldEnum: {
        id: 'id';
        lessonId: 'lessonId';
        resourceType: 'resourceType';
        title: 'title';
        url: 'url';
        deadline: 'deadline';
    };
    export type ResourceScalarFieldEnum = (typeof ResourceScalarFieldEnum)[keyof typeof ResourceScalarFieldEnum];
    export const EnrollmentScalarFieldEnum: {
        id: 'id';
        userId: 'userId';
        courseId: 'courseId';
        enrollmentDate: 'enrollmentDate';
    };
    export type EnrollmentScalarFieldEnum = (typeof EnrollmentScalarFieldEnum)[keyof typeof EnrollmentScalarFieldEnum];
    export const LessonProgressScalarFieldEnum: {
        id: 'id';
        userId: 'userId';
        lessonId: 'lessonId';
        status: 'status';
        completedAt: 'completedAt';
    };
    export type LessonProgressScalarFieldEnum = (typeof LessonProgressScalarFieldEnum)[keyof typeof LessonProgressScalarFieldEnum];
    export const SessionScalarFieldEnum: {
        id: 'id';
        sid: 'sid';
        data: 'data';
        expiresAt: 'expiresAt';
    };
    export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
    export const SortOrder: {
        asc: 'asc';
        desc: 'desc';
    };
    export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
    export const QueryMode: {
        default: 'default';
        insensitive: 'insensitive';
    };
    export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
    export const NullsOrder: {
        first: 'first';
        last: 'last';
    };
    export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
    export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
    export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
    export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>;
    export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>;
    export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
    export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
    export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
    export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
    export type EnumResourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResourceType'>;
    export type ListEnumResourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResourceType[]'>;
    export type EnumLessonStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LessonStatus'>;
    export type ListEnumLessonStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LessonStatus[]'>;
    export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
    export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
    export type UserWhereInput = {
        AND?: UserWhereInput | UserWhereInput[];
        OR?: UserWhereInput[];
        NOT?: UserWhereInput | UserWhereInput[];
        id?: StringFilter<"User"> | string;
        googleId?: StringFilter<"User"> | string;
        email?: StringFilter<"User"> | string;
        fullName?: StringFilter<"User"> | string;
        profilePictureUrl?: StringNullableFilter<"User"> | string | null;
        role?: EnumUserRoleFilter<"User"> | $Enums.UserRole;
        createdAt?: DateTimeFilter<"User"> | Date | string;
        enrollments?: EnrollmentListRelationFilter;
        lessonProgress?: LessonProgressListRelationFilter;
        createdCourses?: CourseListRelationFilter;
    };
    export type UserOrderByWithRelationInput = {
        id?: SortOrder;
        googleId?: SortOrder;
        email?: SortOrder;
        fullName?: SortOrder;
        profilePictureUrl?: SortOrderInput | SortOrder;
        role?: SortOrder;
        createdAt?: SortOrder;
        enrollments?: EnrollmentOrderByRelationAggregateInput;
        lessonProgress?: LessonProgressOrderByRelationAggregateInput;
        createdCourses?: CourseOrderByRelationAggregateInput;
    };
    export type UserWhereUniqueInput = Prisma.AtLeast<{
        id?: string;
        googleId?: string;
        email?: string;
        AND?: UserWhereInput | UserWhereInput[];
        OR?: UserWhereInput[];
        NOT?: UserWhereInput | UserWhereInput[];
        fullName?: StringFilter<"User"> | string;
        profilePictureUrl?: StringNullableFilter<"User"> | string | null;
        role?: EnumUserRoleFilter<"User"> | $Enums.UserRole;
        createdAt?: DateTimeFilter<"User"> | Date | string;
        enrollments?: EnrollmentListRelationFilter;
        lessonProgress?: LessonProgressListRelationFilter;
        createdCourses?: CourseListRelationFilter;
    }, "id" | "googleId" | "email">;
    export type UserOrderByWithAggregationInput = {
        id?: SortOrder;
        googleId?: SortOrder;
        email?: SortOrder;
        fullName?: SortOrder;
        profilePictureUrl?: SortOrderInput | SortOrder;
        role?: SortOrder;
        createdAt?: SortOrder;
        _count?: UserCountOrderByAggregateInput;
        _max?: UserMaxOrderByAggregateInput;
        _min?: UserMinOrderByAggregateInput;
    };
    export type UserScalarWhereWithAggregatesInput = {
        AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[];
        OR?: UserScalarWhereWithAggregatesInput[];
        NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[];
        id?: StringWithAggregatesFilter<"User"> | string;
        googleId?: StringWithAggregatesFilter<"User"> | string;
        email?: StringWithAggregatesFilter<"User"> | string;
        fullName?: StringWithAggregatesFilter<"User"> | string;
        profilePictureUrl?: StringNullableWithAggregatesFilter<"User"> | string | null;
        role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole;
        createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string;
    };
    export type CourseWhereInput = {
        AND?: CourseWhereInput | CourseWhereInput[];
        OR?: CourseWhereInput[];
        NOT?: CourseWhereInput | CourseWhereInput[];
        id?: StringFilter<"Course"> | string;
        courseCode?: StringFilter<"Course"> | string;
        title?: StringFilter<"Course"> | string;
        description?: StringNullableFilter<"Course"> | string | null;
        createdById?: StringFilter<"Course"> | string;
        createdAt?: DateTimeFilter<"Course"> | Date | string;
        createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>;
        modules?: ModuleListRelationFilter;
        enrollments?: EnrollmentListRelationFilter;
    };
    export type CourseOrderByWithRelationInput = {
        id?: SortOrder;
        courseCode?: SortOrder;
        title?: SortOrder;
        description?: SortOrderInput | SortOrder;
        createdById?: SortOrder;
        createdAt?: SortOrder;
        createdBy?: UserOrderByWithRelationInput;
        modules?: ModuleOrderByRelationAggregateInput;
        enrollments?: EnrollmentOrderByRelationAggregateInput;
    };
    export type CourseWhereUniqueInput = Prisma.AtLeast<{
        id?: string;
        courseCode?: string;
        AND?: CourseWhereInput | CourseWhereInput[];
        OR?: CourseWhereInput[];
        NOT?: CourseWhereInput | CourseWhereInput[];
        title?: StringFilter<"Course"> | string;
        description?: StringNullableFilter<"Course"> | string | null;
        createdById?: StringFilter<"Course"> | string;
        createdAt?: DateTimeFilter<"Course"> | Date | string;
        createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>;
        modules?: ModuleListRelationFilter;
        enrollments?: EnrollmentListRelationFilter;
    }, "id" | "courseCode">;
    export type CourseOrderByWithAggregationInput = {
        id?: SortOrder;
        courseCode?: SortOrder;
        title?: SortOrder;
        description?: SortOrderInput | SortOrder;
        createdById?: SortOrder;
        createdAt?: SortOrder;
        _count?: CourseCountOrderByAggregateInput;
        _max?: CourseMaxOrderByAggregateInput;
        _min?: CourseMinOrderByAggregateInput;
    };
    export type CourseScalarWhereWithAggregatesInput = {
        AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[];
        OR?: CourseScalarWhereWithAggregatesInput[];
        NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[];
        id?: StringWithAggregatesFilter<"Course"> | string;
        courseCode?: StringWithAggregatesFilter<"Course"> | string;
        title?: StringWithAggregatesFilter<"Course"> | string;
        description?: StringNullableWithAggregatesFilter<"Course"> | string | null;
        createdById?: StringWithAggregatesFilter<"Course"> | string;
        createdAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string;
    };
    export type ModuleWhereInput = {
        AND?: ModuleWhereInput | ModuleWhereInput[];
        OR?: ModuleWhereInput[];
        NOT?: ModuleWhereInput | ModuleWhereInput[];
        id?: StringFilter<"Module"> | string;
        courseId?: StringFilter<"Module"> | string;
        title?: StringFilter<"Module"> | string;
        description?: StringNullableFilter<"Module"> | string | null;
        moduleOrder?: IntFilter<"Module"> | number;
        course?: XOR<CourseScalarRelationFilter, CourseWhereInput>;
        lessons?: LessonListRelationFilter;
    };
    export type ModuleOrderByWithRelationInput = {
        id?: SortOrder;
        courseId?: SortOrder;
        title?: SortOrder;
        description?: SortOrderInput | SortOrder;
        moduleOrder?: SortOrder;
        course?: CourseOrderByWithRelationInput;
        lessons?: LessonOrderByRelationAggregateInput;
    };
    export type ModuleWhereUniqueInput = Prisma.AtLeast<{
        id?: string;
        AND?: ModuleWhereInput | ModuleWhereInput[];
        OR?: ModuleWhereInput[];
        NOT?: ModuleWhereInput | ModuleWhereInput[];
        courseId?: StringFilter<"Module"> | string;
        title?: StringFilter<"Module"> | string;
        description?: StringNullableFilter<"Module"> | string | null;
        moduleOrder?: IntFilter<"Module"> | number;
        course?: XOR<CourseScalarRelationFilter, CourseWhereInput>;
        lessons?: LessonListRelationFilter;
    }, "id">;
    export type ModuleOrderByWithAggregationInput = {
        id?: SortOrder;
        courseId?: SortOrder;
        title?: SortOrder;
        description?: SortOrderInput | SortOrder;
        moduleOrder?: SortOrder;
        _count?: ModuleCountOrderByAggregateInput;
        _avg?: ModuleAvgOrderByAggregateInput;
        _max?: ModuleMaxOrderByAggregateInput;
        _min?: ModuleMinOrderByAggregateInput;
        _sum?: ModuleSumOrderByAggregateInput;
    };
    export type ModuleScalarWhereWithAggregatesInput = {
        AND?: ModuleScalarWhereWithAggregatesInput | ModuleScalarWhereWithAggregatesInput[];
        OR?: ModuleScalarWhereWithAggregatesInput[];
        NOT?: ModuleScalarWhereWithAggregatesInput | ModuleScalarWhereWithAggregatesInput[];
        id?: StringWithAggregatesFilter<"Module"> | string;
        courseId?: StringWithAggregatesFilter<"Module"> | string;
        title?: StringWithAggregatesFilter<"Module"> | string;
        description?: StringNullableWithAggregatesFilter<"Module"> | string | null;
        moduleOrder?: IntWithAggregatesFilter<"Module"> | number;
    };
    export type InstructorWhereInput = {
        AND?: InstructorWhereInput | InstructorWhereInput[];
        OR?: InstructorWhereInput[];
        NOT?: InstructorWhereInput | InstructorWhereInput[];
        id?: StringFilter<"Instructor"> | string;
        fullName?: StringFilter<"Instructor"> | string;
        title?: StringNullableFilter<"Instructor"> | string | null;
        bio?: StringNullableFilter<"Instructor"> | string | null;
        lessons?: LessonListRelationFilter;
    };
    export type InstructorOrderByWithRelationInput = {
        id?: SortOrder;
        fullName?: SortOrder;
        title?: SortOrderInput | SortOrder;
        bio?: SortOrderInput | SortOrder;
        lessons?: LessonOrderByRelationAggregateInput;
    };
    export type InstructorWhereUniqueInput = Prisma.AtLeast<{
        id?: string;
        fullName?: string;
        AND?: InstructorWhereInput | InstructorWhereInput[];
        OR?: InstructorWhereInput[];
        NOT?: InstructorWhereInput | InstructorWhereInput[];
        title?: StringNullableFilter<"Instructor"> | string | null;
        bio?: StringNullableFilter<"Instructor"> | string | null;
        lessons?: LessonListRelationFilter;
    }, "id" | "fullName">;
    export type InstructorOrderByWithAggregationInput = {
        id?: SortOrder;
        fullName?: SortOrder;
        title?: SortOrderInput | SortOrder;
        bio?: SortOrderInput | SortOrder;
        _count?: InstructorCountOrderByAggregateInput;
        _max?: InstructorMaxOrderByAggregateInput;
        _min?: InstructorMinOrderByAggregateInput;
    };
    export type InstructorScalarWhereWithAggregatesInput = {
        AND?: InstructorScalarWhereWithAggregatesInput | InstructorScalarWhereWithAggregatesInput[];
        OR?: InstructorScalarWhereWithAggregatesInput[];
        NOT?: InstructorScalarWhereWithAggregatesInput | InstructorScalarWhereWithAggregatesInput[];
        id?: StringWithAggregatesFilter<"Instructor"> | string;
        fullName?: StringWithAggregatesFilter<"Instructor"> | string;
        title?: StringNullableWithAggregatesFilter<"Instructor"> | string | null;
        bio?: StringNullableWithAggregatesFilter<"Instructor"> | string | null;
    };
    export type LessonWhereInput = {
        AND?: LessonWhereInput | LessonWhereInput[];
        OR?: LessonWhereInput[];
        NOT?: LessonWhereInput | LessonWhereInput[];
        id?: StringFilter<"Lesson"> | string;
        moduleId?: StringFilter<"Lesson"> | string;
        instructorId?: StringFilter<"Lesson"> | string;
        title?: StringFilter<"Lesson"> | string;
        description?: StringNullableFilter<"Lesson"> | string | null;
        lessonDate?: DateTimeNullableFilter<"Lesson"> | Date | string | null;
        zoomInfo?: StringNullableFilter<"Lesson"> | string | null;
        lessonOrder?: IntFilter<"Lesson"> | number;
        module?: XOR<ModuleScalarRelationFilter, ModuleWhereInput>;
        instructor?: XOR<InstructorScalarRelationFilter, InstructorWhereInput>;
        resources?: ResourceListRelationFilter;
        lessonProgress?: LessonProgressListRelationFilter;
    };
    export type LessonOrderByWithRelationInput = {
        id?: SortOrder;
        moduleId?: SortOrder;
        instructorId?: SortOrder;
        title?: SortOrder;
        description?: SortOrderInput | SortOrder;
        lessonDate?: SortOrderInput | SortOrder;
        zoomInfo?: SortOrderInput | SortOrder;
        lessonOrder?: SortOrder;
        module?: ModuleOrderByWithRelationInput;
        instructor?: InstructorOrderByWithRelationInput;
        resources?: ResourceOrderByRelationAggregateInput;
        lessonProgress?: LessonProgressOrderByRelationAggregateInput;
    };
    export type LessonWhereUniqueInput = Prisma.AtLeast<{
        id?: string;
        AND?: LessonWhereInput | LessonWhereInput[];
        OR?: LessonWhereInput[];
        NOT?: LessonWhereInput | LessonWhereInput[];
        moduleId?: StringFilter<"Lesson"> | string;
        instructorId?: StringFilter<"Lesson"> | string;
        title?: StringFilter<"Lesson"> | string;
        description?: StringNullableFilter<"Lesson"> | string | null;
        lessonDate?: DateTimeNullableFilter<"Lesson"> | Date | string | null;
        zoomInfo?: StringNullableFilter<"Lesson"> | string | null;
        lessonOrder?: IntFilter<"Lesson"> | number;
        module?: XOR<ModuleScalarRelationFilter, ModuleWhereInput>;
        instructor?: XOR<InstructorScalarRelationFilter, InstructorWhereInput>;
        resources?: ResourceListRelationFilter;
        lessonProgress?: LessonProgressListRelationFilter;
    }, "id">;
    export type LessonOrderByWithAggregationInput = {
        id?: SortOrder;
        moduleId?: SortOrder;
        instructorId?: SortOrder;
        title?: SortOrder;
        description?: SortOrderInput | SortOrder;
        lessonDate?: SortOrderInput | SortOrder;
        zoomInfo?: SortOrderInput | SortOrder;
        lessonOrder?: SortOrder;
        _count?: LessonCountOrderByAggregateInput;
        _avg?: LessonAvgOrderByAggregateInput;
        _max?: LessonMaxOrderByAggregateInput;
        _min?: LessonMinOrderByAggregateInput;
        _sum?: LessonSumOrderByAggregateInput;
    };
    export type LessonScalarWhereWithAggregatesInput = {
        AND?: LessonScalarWhereWithAggregatesInput | LessonScalarWhereWithAggregatesInput[];
        OR?: LessonScalarWhereWithAggregatesInput[];
        NOT?: LessonScalarWhereWithAggregatesInput | LessonScalarWhereWithAggregatesInput[];
        id?: StringWithAggregatesFilter<"Lesson"> | string;
        moduleId?: StringWithAggregatesFilter<"Lesson"> | string;
        instructorId?: StringWithAggregatesFilter<"Lesson"> | string;
        title?: StringWithAggregatesFilter<"Lesson"> | string;
        description?: StringNullableWithAggregatesFilter<"Lesson"> | string | null;
        lessonDate?: DateTimeNullableWithAggregatesFilter<"Lesson"> | Date | string | null;
        zoomInfo?: StringNullableWithAggregatesFilter<"Lesson"> | string | null;
        lessonOrder?: IntWithAggregatesFilter<"Lesson"> | number;
    };
    export type ResourceWhereInput = {
        AND?: ResourceWhereInput | ResourceWhereInput[];
        OR?: ResourceWhereInput[];
        NOT?: ResourceWhereInput | ResourceWhereInput[];
        id?: StringFilter<"Resource"> | string;
        lessonId?: StringFilter<"Resource"> | string;
        resourceType?: EnumResourceTypeFilter<"Resource"> | $Enums.ResourceType;
        title?: StringFilter<"Resource"> | string;
        url?: StringFilter<"Resource"> | string;
        deadline?: DateTimeNullableFilter<"Resource"> | Date | string | null;
        lesson?: XOR<LessonScalarRelationFilter, LessonWhereInput>;
    };
    export type ResourceOrderByWithRelationInput = {
        id?: SortOrder;
        lessonId?: SortOrder;
        resourceType?: SortOrder;
        title?: SortOrder;
        url?: SortOrder;
        deadline?: SortOrderInput | SortOrder;
        lesson?: LessonOrderByWithRelationInput;
    };
    export type ResourceWhereUniqueInput = Prisma.AtLeast<{
        id?: string;
        AND?: ResourceWhereInput | ResourceWhereInput[];
        OR?: ResourceWhereInput[];
        NOT?: ResourceWhereInput | ResourceWhereInput[];
        lessonId?: StringFilter<"Resource"> | string;
        resourceType?: EnumResourceTypeFilter<"Resource"> | $Enums.ResourceType;
        title?: StringFilter<"Resource"> | string;
        url?: StringFilter<"Resource"> | string;
        deadline?: DateTimeNullableFilter<"Resource"> | Date | string | null;
        lesson?: XOR<LessonScalarRelationFilter, LessonWhereInput>;
    }, "id">;
    export type ResourceOrderByWithAggregationInput = {
        id?: SortOrder;
        lessonId?: SortOrder;
        resourceType?: SortOrder;
        title?: SortOrder;
        url?: SortOrder;
        deadline?: SortOrderInput | SortOrder;
        _count?: ResourceCountOrderByAggregateInput;
        _max?: ResourceMaxOrderByAggregateInput;
        _min?: ResourceMinOrderByAggregateInput;
    };
    export type ResourceScalarWhereWithAggregatesInput = {
        AND?: ResourceScalarWhereWithAggregatesInput | ResourceScalarWhereWithAggregatesInput[];
        OR?: ResourceScalarWhereWithAggregatesInput[];
        NOT?: ResourceScalarWhereWithAggregatesInput | ResourceScalarWhereWithAggregatesInput[];
        id?: StringWithAggregatesFilter<"Resource"> | string;
        lessonId?: StringWithAggregatesFilter<"Resource"> | string;
        resourceType?: EnumResourceTypeWithAggregatesFilter<"Resource"> | $Enums.ResourceType;
        title?: StringWithAggregatesFilter<"Resource"> | string;
        url?: StringWithAggregatesFilter<"Resource"> | string;
        deadline?: DateTimeNullableWithAggregatesFilter<"Resource"> | Date | string | null;
    };
    export type EnrollmentWhereInput = {
        AND?: EnrollmentWhereInput | EnrollmentWhereInput[];
        OR?: EnrollmentWhereInput[];
        NOT?: EnrollmentWhereInput | EnrollmentWhereInput[];
        id?: StringFilter<"Enrollment"> | string;
        userId?: StringFilter<"Enrollment"> | string;
        courseId?: StringFilter<"Enrollment"> | string;
        enrollmentDate?: DateTimeFilter<"Enrollment"> | Date | string;
        user?: XOR<UserScalarRelationFilter, UserWhereInput>;
        course?: XOR<CourseScalarRelationFilter, CourseWhereInput>;
    };
    export type EnrollmentOrderByWithRelationInput = {
        id?: SortOrder;
        userId?: SortOrder;
        courseId?: SortOrder;
        enrollmentDate?: SortOrder;
        user?: UserOrderByWithRelationInput;
        course?: CourseOrderByWithRelationInput;
    };
    export type EnrollmentWhereUniqueInput = Prisma.AtLeast<{
        id?: string;
        userId_courseId?: EnrollmentUserIdCourseIdCompoundUniqueInput;
        AND?: EnrollmentWhereInput | EnrollmentWhereInput[];
        OR?: EnrollmentWhereInput[];
        NOT?: EnrollmentWhereInput | EnrollmentWhereInput[];
        userId?: StringFilter<"Enrollment"> | string;
        courseId?: StringFilter<"Enrollment"> | string;
        enrollmentDate?: DateTimeFilter<"Enrollment"> | Date | string;
        user?: XOR<UserScalarRelationFilter, UserWhereInput>;
        course?: XOR<CourseScalarRelationFilter, CourseWhereInput>;
    }, "id" | "userId_courseId">;
    export type EnrollmentOrderByWithAggregationInput = {
        id?: SortOrder;
        userId?: SortOrder;
        courseId?: SortOrder;
        enrollmentDate?: SortOrder;
        _count?: EnrollmentCountOrderByAggregateInput;
        _max?: EnrollmentMaxOrderByAggregateInput;
        _min?: EnrollmentMinOrderByAggregateInput;
    };
    export type EnrollmentScalarWhereWithAggregatesInput = {
        AND?: EnrollmentScalarWhereWithAggregatesInput | EnrollmentScalarWhereWithAggregatesInput[];
        OR?: EnrollmentScalarWhereWithAggregatesInput[];
        NOT?: EnrollmentScalarWhereWithAggregatesInput | EnrollmentScalarWhereWithAggregatesInput[];
        id?: StringWithAggregatesFilter<"Enrollment"> | string;
        userId?: StringWithAggregatesFilter<"Enrollment"> | string;
        courseId?: StringWithAggregatesFilter<"Enrollment"> | string;
        enrollmentDate?: DateTimeWithAggregatesFilter<"Enrollment"> | Date | string;
    };
    export type LessonProgressWhereInput = {
        AND?: LessonProgressWhereInput | LessonProgressWhereInput[];
        OR?: LessonProgressWhereInput[];
        NOT?: LessonProgressWhereInput | LessonProgressWhereInput[];
        id?: StringFilter<"LessonProgress"> | string;
        userId?: StringFilter<"LessonProgress"> | string;
        lessonId?: StringFilter<"LessonProgress"> | string;
        status?: EnumLessonStatusFilter<"LessonProgress"> | $Enums.LessonStatus;
        completedAt?: DateTimeNullableFilter<"LessonProgress"> | Date | string | null;
        user?: XOR<UserScalarRelationFilter, UserWhereInput>;
        lesson?: XOR<LessonScalarRelationFilter, LessonWhereInput>;
    };
    export type LessonProgressOrderByWithRelationInput = {
        id?: SortOrder;
        userId?: SortOrder;
        lessonId?: SortOrder;
        status?: SortOrder;
        completedAt?: SortOrderInput | SortOrder;
        user?: UserOrderByWithRelationInput;
        lesson?: LessonOrderByWithRelationInput;
    };
    export type LessonProgressWhereUniqueInput = Prisma.AtLeast<{
        id?: string;
        userId_lessonId?: LessonProgressUserIdLessonIdCompoundUniqueInput;
        AND?: LessonProgressWhereInput | LessonProgressWhereInput[];
        OR?: LessonProgressWhereInput[];
        NOT?: LessonProgressWhereInput | LessonProgressWhereInput[];
        userId?: StringFilter<"LessonProgress"> | string;
        lessonId?: StringFilter<"LessonProgress"> | string;
        status?: EnumLessonStatusFilter<"LessonProgress"> | $Enums.LessonStatus;
        completedAt?: DateTimeNullableFilter<"LessonProgress"> | Date | string | null;
        user?: XOR<UserScalarRelationFilter, UserWhereInput>;
        lesson?: XOR<LessonScalarRelationFilter, LessonWhereInput>;
    }, "id" | "userId_lessonId">;
    export type LessonProgressOrderByWithAggregationInput = {
        id?: SortOrder;
        userId?: SortOrder;
        lessonId?: SortOrder;
        status?: SortOrder;
        completedAt?: SortOrderInput | SortOrder;
        _count?: LessonProgressCountOrderByAggregateInput;
        _max?: LessonProgressMaxOrderByAggregateInput;
        _min?: LessonProgressMinOrderByAggregateInput;
    };
    export type LessonProgressScalarWhereWithAggregatesInput = {
        AND?: LessonProgressScalarWhereWithAggregatesInput | LessonProgressScalarWhereWithAggregatesInput[];
        OR?: LessonProgressScalarWhereWithAggregatesInput[];
        NOT?: LessonProgressScalarWhereWithAggregatesInput | LessonProgressScalarWhereWithAggregatesInput[];
        id?: StringWithAggregatesFilter<"LessonProgress"> | string;
        userId?: StringWithAggregatesFilter<"LessonProgress"> | string;
        lessonId?: StringWithAggregatesFilter<"LessonProgress"> | string;
        status?: EnumLessonStatusWithAggregatesFilter<"LessonProgress"> | $Enums.LessonStatus;
        completedAt?: DateTimeNullableWithAggregatesFilter<"LessonProgress"> | Date | string | null;
    };
    export type SessionWhereInput = {
        AND?: SessionWhereInput | SessionWhereInput[];
        OR?: SessionWhereInput[];
        NOT?: SessionWhereInput | SessionWhereInput[];
        id?: StringFilter<"Session"> | string;
        sid?: StringFilter<"Session"> | string;
        data?: StringFilter<"Session"> | string;
        expiresAt?: DateTimeFilter<"Session"> | Date | string;
    };
    export type SessionOrderByWithRelationInput = {
        id?: SortOrder;
        sid?: SortOrder;
        data?: SortOrder;
        expiresAt?: SortOrder;
    };
    export type SessionWhereUniqueInput = Prisma.AtLeast<{
        id?: string;
        sid?: string;
        AND?: SessionWhereInput | SessionWhereInput[];
        OR?: SessionWhereInput[];
        NOT?: SessionWhereInput | SessionWhereInput[];
        data?: StringFilter<"Session"> | string;
        expiresAt?: DateTimeFilter<"Session"> | Date | string;
    }, "id" | "sid">;
    export type SessionOrderByWithAggregationInput = {
        id?: SortOrder;
        sid?: SortOrder;
        data?: SortOrder;
        expiresAt?: SortOrder;
        _count?: SessionCountOrderByAggregateInput;
        _max?: SessionMaxOrderByAggregateInput;
        _min?: SessionMinOrderByAggregateInput;
    };
    export type SessionScalarWhereWithAggregatesInput = {
        AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[];
        OR?: SessionScalarWhereWithAggregatesInput[];
        NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[];
        id?: StringWithAggregatesFilter<"Session"> | string;
        sid?: StringWithAggregatesFilter<"Session"> | string;
        data?: StringWithAggregatesFilter<"Session"> | string;
        expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string;
    };
    export type UserCreateInput = {
        id?: string;
        googleId: string;
        email: string;
        fullName: string;
        profilePictureUrl?: string | null;
        role?: $Enums.UserRole;
        createdAt?: Date | string;
        enrollments?: EnrollmentCreateNestedManyWithoutUserInput;
        lessonProgress?: LessonProgressCreateNestedManyWithoutUserInput;
        createdCourses?: CourseCreateNestedManyWithoutCreatedByInput;
    };
    export type UserUncheckedCreateInput = {
        id?: string;
        googleId: string;
        email: string;
        fullName: string;
        profilePictureUrl?: string | null;
        role?: $Enums.UserRole;
        createdAt?: Date | string;
        enrollments?: EnrollmentUncheckedCreateNestedManyWithoutUserInput;
        lessonProgress?: LessonProgressUncheckedCreateNestedManyWithoutUserInput;
        createdCourses?: CourseUncheckedCreateNestedManyWithoutCreatedByInput;
    };
    export type UserUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        googleId?: StringFieldUpdateOperationsInput | string;
        email?: StringFieldUpdateOperationsInput | string;
        fullName?: StringFieldUpdateOperationsInput | string;
        profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null;
        role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        enrollments?: EnrollmentUpdateManyWithoutUserNestedInput;
        lessonProgress?: LessonProgressUpdateManyWithoutUserNestedInput;
        createdCourses?: CourseUpdateManyWithoutCreatedByNestedInput;
    };
    export type UserUncheckedUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        googleId?: StringFieldUpdateOperationsInput | string;
        email?: StringFieldUpdateOperationsInput | string;
        fullName?: StringFieldUpdateOperationsInput | string;
        profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null;
        role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        enrollments?: EnrollmentUncheckedUpdateManyWithoutUserNestedInput;
        lessonProgress?: LessonProgressUncheckedUpdateManyWithoutUserNestedInput;
        createdCourses?: CourseUncheckedUpdateManyWithoutCreatedByNestedInput;
    };
    export type UserCreateManyInput = {
        id?: string;
        googleId: string;
        email: string;
        fullName: string;
        profilePictureUrl?: string | null;
        role?: $Enums.UserRole;
        createdAt?: Date | string;
    };
    export type UserUpdateManyMutationInput = {
        id?: StringFieldUpdateOperationsInput | string;
        googleId?: StringFieldUpdateOperationsInput | string;
        email?: StringFieldUpdateOperationsInput | string;
        fullName?: StringFieldUpdateOperationsInput | string;
        profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null;
        role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    };
    export type UserUncheckedUpdateManyInput = {
        id?: StringFieldUpdateOperationsInput | string;
        googleId?: StringFieldUpdateOperationsInput | string;
        email?: StringFieldUpdateOperationsInput | string;
        fullName?: StringFieldUpdateOperationsInput | string;
        profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null;
        role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    };
    export type CourseCreateInput = {
        id?: string;
        courseCode: string;
        title: string;
        description?: string | null;
        createdAt?: Date | string;
        createdBy: UserCreateNestedOneWithoutCreatedCoursesInput;
        modules?: ModuleCreateNestedManyWithoutCourseInput;
        enrollments?: EnrollmentCreateNestedManyWithoutCourseInput;
    };
    export type CourseUncheckedCreateInput = {
        id?: string;
        courseCode: string;
        title: string;
        description?: string | null;
        createdById: string;
        createdAt?: Date | string;
        modules?: ModuleUncheckedCreateNestedManyWithoutCourseInput;
        enrollments?: EnrollmentUncheckedCreateNestedManyWithoutCourseInput;
    };
    export type CourseUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        courseCode?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        createdBy?: UserUpdateOneRequiredWithoutCreatedCoursesNestedInput;
        modules?: ModuleUpdateManyWithoutCourseNestedInput;
        enrollments?: EnrollmentUpdateManyWithoutCourseNestedInput;
    };
    export type CourseUncheckedUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        courseCode?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        createdById?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        modules?: ModuleUncheckedUpdateManyWithoutCourseNestedInput;
        enrollments?: EnrollmentUncheckedUpdateManyWithoutCourseNestedInput;
    };
    export type CourseCreateManyInput = {
        id?: string;
        courseCode: string;
        title: string;
        description?: string | null;
        createdById: string;
        createdAt?: Date | string;
    };
    export type CourseUpdateManyMutationInput = {
        id?: StringFieldUpdateOperationsInput | string;
        courseCode?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    };
    export type CourseUncheckedUpdateManyInput = {
        id?: StringFieldUpdateOperationsInput | string;
        courseCode?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        createdById?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    };
    export type ModuleCreateInput = {
        id?: string;
        title: string;
        description?: string | null;
        moduleOrder: number;
        course: CourseCreateNestedOneWithoutModulesInput;
        lessons?: LessonCreateNestedManyWithoutModuleInput;
    };
    export type ModuleUncheckedCreateInput = {
        id?: string;
        courseId: string;
        title: string;
        description?: string | null;
        moduleOrder: number;
        lessons?: LessonUncheckedCreateNestedManyWithoutModuleInput;
    };
    export type ModuleUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        moduleOrder?: IntFieldUpdateOperationsInput | number;
        course?: CourseUpdateOneRequiredWithoutModulesNestedInput;
        lessons?: LessonUpdateManyWithoutModuleNestedInput;
    };
    export type ModuleUncheckedUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        courseId?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        moduleOrder?: IntFieldUpdateOperationsInput | number;
        lessons?: LessonUncheckedUpdateManyWithoutModuleNestedInput;
    };
    export type ModuleCreateManyInput = {
        id?: string;
        courseId: string;
        title: string;
        description?: string | null;
        moduleOrder: number;
    };
    export type ModuleUpdateManyMutationInput = {
        id?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        moduleOrder?: IntFieldUpdateOperationsInput | number;
    };
    export type ModuleUncheckedUpdateManyInput = {
        id?: StringFieldUpdateOperationsInput | string;
        courseId?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        moduleOrder?: IntFieldUpdateOperationsInput | number;
    };
    export type InstructorCreateInput = {
        id?: string;
        fullName: string;
        title?: string | null;
        bio?: string | null;
        lessons?: LessonCreateNestedManyWithoutInstructorInput;
    };
    export type InstructorUncheckedCreateInput = {
        id?: string;
        fullName: string;
        title?: string | null;
        bio?: string | null;
        lessons?: LessonUncheckedCreateNestedManyWithoutInstructorInput;
    };
    export type InstructorUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        fullName?: StringFieldUpdateOperationsInput | string;
        title?: NullableStringFieldUpdateOperationsInput | string | null;
        bio?: NullableStringFieldUpdateOperationsInput | string | null;
        lessons?: LessonUpdateManyWithoutInstructorNestedInput;
    };
    export type InstructorUncheckedUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        fullName?: StringFieldUpdateOperationsInput | string;
        title?: NullableStringFieldUpdateOperationsInput | string | null;
        bio?: NullableStringFieldUpdateOperationsInput | string | null;
        lessons?: LessonUncheckedUpdateManyWithoutInstructorNestedInput;
    };
    export type InstructorCreateManyInput = {
        id?: string;
        fullName: string;
        title?: string | null;
        bio?: string | null;
    };
    export type InstructorUpdateManyMutationInput = {
        id?: StringFieldUpdateOperationsInput | string;
        fullName?: StringFieldUpdateOperationsInput | string;
        title?: NullableStringFieldUpdateOperationsInput | string | null;
        bio?: NullableStringFieldUpdateOperationsInput | string | null;
    };
    export type InstructorUncheckedUpdateManyInput = {
        id?: StringFieldUpdateOperationsInput | string;
        fullName?: StringFieldUpdateOperationsInput | string;
        title?: NullableStringFieldUpdateOperationsInput | string | null;
        bio?: NullableStringFieldUpdateOperationsInput | string | null;
    };
    export type LessonCreateInput = {
        id?: string;
        title: string;
        description?: string | null;
        lessonDate?: Date | string | null;
        zoomInfo?: string | null;
        lessonOrder: number;
        module: ModuleCreateNestedOneWithoutLessonsInput;
        instructor: InstructorCreateNestedOneWithoutLessonsInput;
        resources?: ResourceCreateNestedManyWithoutLessonInput;
        lessonProgress?: LessonProgressCreateNestedManyWithoutLessonInput;
    };
    export type LessonUncheckedCreateInput = {
        id?: string;
        moduleId: string;
        instructorId: string;
        title: string;
        description?: string | null;
        lessonDate?: Date | string | null;
        zoomInfo?: string | null;
        lessonOrder: number;
        resources?: ResourceUncheckedCreateNestedManyWithoutLessonInput;
        lessonProgress?: LessonProgressUncheckedCreateNestedManyWithoutLessonInput;
    };
    export type LessonUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
        zoomInfo?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonOrder?: IntFieldUpdateOperationsInput | number;
        module?: ModuleUpdateOneRequiredWithoutLessonsNestedInput;
        instructor?: InstructorUpdateOneRequiredWithoutLessonsNestedInput;
        resources?: ResourceUpdateManyWithoutLessonNestedInput;
        lessonProgress?: LessonProgressUpdateManyWithoutLessonNestedInput;
    };
    export type LessonUncheckedUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        moduleId?: StringFieldUpdateOperationsInput | string;
        instructorId?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
        zoomInfo?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonOrder?: IntFieldUpdateOperationsInput | number;
        resources?: ResourceUncheckedUpdateManyWithoutLessonNestedInput;
        lessonProgress?: LessonProgressUncheckedUpdateManyWithoutLessonNestedInput;
    };
    export type LessonCreateManyInput = {
        id?: string;
        moduleId: string;
        instructorId: string;
        title: string;
        description?: string | null;
        lessonDate?: Date | string | null;
        zoomInfo?: string | null;
        lessonOrder: number;
    };
    export type LessonUpdateManyMutationInput = {
        id?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
        zoomInfo?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonOrder?: IntFieldUpdateOperationsInput | number;
    };
    export type LessonUncheckedUpdateManyInput = {
        id?: StringFieldUpdateOperationsInput | string;
        moduleId?: StringFieldUpdateOperationsInput | string;
        instructorId?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
        zoomInfo?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonOrder?: IntFieldUpdateOperationsInput | number;
    };
    export type ResourceCreateInput = {
        id?: string;
        resourceType: $Enums.ResourceType;
        title: string;
        url: string;
        deadline?: Date | string | null;
        lesson: LessonCreateNestedOneWithoutResourcesInput;
    };
    export type ResourceUncheckedCreateInput = {
        id?: string;
        lessonId: string;
        resourceType: $Enums.ResourceType;
        title: string;
        url: string;
        deadline?: Date | string | null;
    };
    export type ResourceUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        resourceType?: EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType;
        title?: StringFieldUpdateOperationsInput | string;
        url?: StringFieldUpdateOperationsInput | string;
        deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
        lesson?: LessonUpdateOneRequiredWithoutResourcesNestedInput;
    };
    export type ResourceUncheckedUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        lessonId?: StringFieldUpdateOperationsInput | string;
        resourceType?: EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType;
        title?: StringFieldUpdateOperationsInput | string;
        url?: StringFieldUpdateOperationsInput | string;
        deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    };
    export type ResourceCreateManyInput = {
        id?: string;
        lessonId: string;
        resourceType: $Enums.ResourceType;
        title: string;
        url: string;
        deadline?: Date | string | null;
    };
    export type ResourceUpdateManyMutationInput = {
        id?: StringFieldUpdateOperationsInput | string;
        resourceType?: EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType;
        title?: StringFieldUpdateOperationsInput | string;
        url?: StringFieldUpdateOperationsInput | string;
        deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    };
    export type ResourceUncheckedUpdateManyInput = {
        id?: StringFieldUpdateOperationsInput | string;
        lessonId?: StringFieldUpdateOperationsInput | string;
        resourceType?: EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType;
        title?: StringFieldUpdateOperationsInput | string;
        url?: StringFieldUpdateOperationsInput | string;
        deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    };
    export type EnrollmentCreateInput = {
        id?: string;
        enrollmentDate?: Date | string;
        user: UserCreateNestedOneWithoutEnrollmentsInput;
        course: CourseCreateNestedOneWithoutEnrollmentsInput;
    };
    export type EnrollmentUncheckedCreateInput = {
        id?: string;
        userId: string;
        courseId: string;
        enrollmentDate?: Date | string;
    };
    export type EnrollmentUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string;
        user?: UserUpdateOneRequiredWithoutEnrollmentsNestedInput;
        course?: CourseUpdateOneRequiredWithoutEnrollmentsNestedInput;
    };
    export type EnrollmentUncheckedUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        userId?: StringFieldUpdateOperationsInput | string;
        courseId?: StringFieldUpdateOperationsInput | string;
        enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    };
    export type EnrollmentCreateManyInput = {
        id?: string;
        userId: string;
        courseId: string;
        enrollmentDate?: Date | string;
    };
    export type EnrollmentUpdateManyMutationInput = {
        id?: StringFieldUpdateOperationsInput | string;
        enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    };
    export type EnrollmentUncheckedUpdateManyInput = {
        id?: StringFieldUpdateOperationsInput | string;
        userId?: StringFieldUpdateOperationsInput | string;
        courseId?: StringFieldUpdateOperationsInput | string;
        enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    };
    export type LessonProgressCreateInput = {
        id?: string;
        status?: $Enums.LessonStatus;
        completedAt?: Date | string | null;
        user: UserCreateNestedOneWithoutLessonProgressInput;
        lesson: LessonCreateNestedOneWithoutLessonProgressInput;
    };
    export type LessonProgressUncheckedCreateInput = {
        id?: string;
        userId: string;
        lessonId: string;
        status?: $Enums.LessonStatus;
        completedAt?: Date | string | null;
    };
    export type LessonProgressUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        status?: EnumLessonStatusFieldUpdateOperationsInput | $Enums.LessonStatus;
        completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
        user?: UserUpdateOneRequiredWithoutLessonProgressNestedInput;
        lesson?: LessonUpdateOneRequiredWithoutLessonProgressNestedInput;
    };
    export type LessonProgressUncheckedUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        userId?: StringFieldUpdateOperationsInput | string;
        lessonId?: StringFieldUpdateOperationsInput | string;
        status?: EnumLessonStatusFieldUpdateOperationsInput | $Enums.LessonStatus;
        completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    };
    export type LessonProgressCreateManyInput = {
        id?: string;
        userId: string;
        lessonId: string;
        status?: $Enums.LessonStatus;
        completedAt?: Date | string | null;
    };
    export type LessonProgressUpdateManyMutationInput = {
        id?: StringFieldUpdateOperationsInput | string;
        status?: EnumLessonStatusFieldUpdateOperationsInput | $Enums.LessonStatus;
        completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    };
    export type LessonProgressUncheckedUpdateManyInput = {
        id?: StringFieldUpdateOperationsInput | string;
        userId?: StringFieldUpdateOperationsInput | string;
        lessonId?: StringFieldUpdateOperationsInput | string;
        status?: EnumLessonStatusFieldUpdateOperationsInput | $Enums.LessonStatus;
        completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    };
    export type SessionCreateInput = {
        id: string;
        sid: string;
        data: string;
        expiresAt: Date | string;
    };
    export type SessionUncheckedCreateInput = {
        id: string;
        sid: string;
        data: string;
        expiresAt: Date | string;
    };
    export type SessionUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        sid?: StringFieldUpdateOperationsInput | string;
        data?: StringFieldUpdateOperationsInput | string;
        expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    };
    export type SessionUncheckedUpdateInput = {
        id?: StringFieldUpdateOperationsInput | string;
        sid?: StringFieldUpdateOperationsInput | string;
        data?: StringFieldUpdateOperationsInput | string;
        expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    };
    export type SessionCreateManyInput = {
        id: string;
        sid: string;
        data: string;
        expiresAt: Date | string;
    };
    export type SessionUpdateManyMutationInput = {
        id?: StringFieldUpdateOperationsInput | string;
        sid?: StringFieldUpdateOperationsInput | string;
        data?: StringFieldUpdateOperationsInput | string;
        expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    };
    export type SessionUncheckedUpdateManyInput = {
        id?: StringFieldUpdateOperationsInput | string;
        sid?: StringFieldUpdateOperationsInput | string;
        data?: StringFieldUpdateOperationsInput | string;
        expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    };
    export type StringFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel>;
        in?: string[] | ListStringFieldRefInput<$PrismaModel>;
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
        lt?: string | StringFieldRefInput<$PrismaModel>;
        lte?: string | StringFieldRefInput<$PrismaModel>;
        gt?: string | StringFieldRefInput<$PrismaModel>;
        gte?: string | StringFieldRefInput<$PrismaModel>;
        contains?: string | StringFieldRefInput<$PrismaModel>;
        startsWith?: string | StringFieldRefInput<$PrismaModel>;
        endsWith?: string | StringFieldRefInput<$PrismaModel>;
        mode?: QueryMode;
        not?: NestedStringFilter<$PrismaModel> | string;
    };
    export type StringNullableFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel> | null;
        in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
        lt?: string | StringFieldRefInput<$PrismaModel>;
        lte?: string | StringFieldRefInput<$PrismaModel>;
        gt?: string | StringFieldRefInput<$PrismaModel>;
        gte?: string | StringFieldRefInput<$PrismaModel>;
        contains?: string | StringFieldRefInput<$PrismaModel>;
        startsWith?: string | StringFieldRefInput<$PrismaModel>;
        endsWith?: string | StringFieldRefInput<$PrismaModel>;
        mode?: QueryMode;
        not?: NestedStringNullableFilter<$PrismaModel> | string | null;
    };
    export type EnumUserRoleFilter<$PrismaModel = never> = {
        equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>;
        in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>;
        notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>;
        not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole;
    };
    export type DateTimeFilter<$PrismaModel = never> = {
        equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
        notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
        lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
    };
    export type EnrollmentListRelationFilter = {
        every?: EnrollmentWhereInput;
        some?: EnrollmentWhereInput;
        none?: EnrollmentWhereInput;
    };
    export type LessonProgressListRelationFilter = {
        every?: LessonProgressWhereInput;
        some?: LessonProgressWhereInput;
        none?: LessonProgressWhereInput;
    };
    export type CourseListRelationFilter = {
        every?: CourseWhereInput;
        some?: CourseWhereInput;
        none?: CourseWhereInput;
    };
    export type SortOrderInput = {
        sort: SortOrder;
        nulls?: NullsOrder;
    };
    export type EnrollmentOrderByRelationAggregateInput = {
        _count?: SortOrder;
    };
    export type LessonProgressOrderByRelationAggregateInput = {
        _count?: SortOrder;
    };
    export type CourseOrderByRelationAggregateInput = {
        _count?: SortOrder;
    };
    export type UserCountOrderByAggregateInput = {
        id?: SortOrder;
        googleId?: SortOrder;
        email?: SortOrder;
        fullName?: SortOrder;
        profilePictureUrl?: SortOrder;
        role?: SortOrder;
        createdAt?: SortOrder;
    };
    export type UserMaxOrderByAggregateInput = {
        id?: SortOrder;
        googleId?: SortOrder;
        email?: SortOrder;
        fullName?: SortOrder;
        profilePictureUrl?: SortOrder;
        role?: SortOrder;
        createdAt?: SortOrder;
    };
    export type UserMinOrderByAggregateInput = {
        id?: SortOrder;
        googleId?: SortOrder;
        email?: SortOrder;
        fullName?: SortOrder;
        profilePictureUrl?: SortOrder;
        role?: SortOrder;
        createdAt?: SortOrder;
    };
    export type StringWithAggregatesFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel>;
        in?: string[] | ListStringFieldRefInput<$PrismaModel>;
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
        lt?: string | StringFieldRefInput<$PrismaModel>;
        lte?: string | StringFieldRefInput<$PrismaModel>;
        gt?: string | StringFieldRefInput<$PrismaModel>;
        gte?: string | StringFieldRefInput<$PrismaModel>;
        contains?: string | StringFieldRefInput<$PrismaModel>;
        startsWith?: string | StringFieldRefInput<$PrismaModel>;
        endsWith?: string | StringFieldRefInput<$PrismaModel>;
        mode?: QueryMode;
        not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedStringFilter<$PrismaModel>;
        _max?: NestedStringFilter<$PrismaModel>;
    };
    export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel> | null;
        in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
        lt?: string | StringFieldRefInput<$PrismaModel>;
        lte?: string | StringFieldRefInput<$PrismaModel>;
        gt?: string | StringFieldRefInput<$PrismaModel>;
        gte?: string | StringFieldRefInput<$PrismaModel>;
        contains?: string | StringFieldRefInput<$PrismaModel>;
        startsWith?: string | StringFieldRefInput<$PrismaModel>;
        endsWith?: string | StringFieldRefInput<$PrismaModel>;
        mode?: QueryMode;
        not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
        _count?: NestedIntNullableFilter<$PrismaModel>;
        _min?: NestedStringNullableFilter<$PrismaModel>;
        _max?: NestedStringNullableFilter<$PrismaModel>;
    };
    export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>;
        in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>;
        notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>;
        not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumUserRoleFilter<$PrismaModel>;
        _max?: NestedEnumUserRoleFilter<$PrismaModel>;
    };
    export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
        equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
        notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
        lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedDateTimeFilter<$PrismaModel>;
        _max?: NestedDateTimeFilter<$PrismaModel>;
    };
    export type UserScalarRelationFilter = {
        is?: UserWhereInput;
        isNot?: UserWhereInput;
    };
    export type ModuleListRelationFilter = {
        every?: ModuleWhereInput;
        some?: ModuleWhereInput;
        none?: ModuleWhereInput;
    };
    export type ModuleOrderByRelationAggregateInput = {
        _count?: SortOrder;
    };
    export type CourseCountOrderByAggregateInput = {
        id?: SortOrder;
        courseCode?: SortOrder;
        title?: SortOrder;
        description?: SortOrder;
        createdById?: SortOrder;
        createdAt?: SortOrder;
    };
    export type CourseMaxOrderByAggregateInput = {
        id?: SortOrder;
        courseCode?: SortOrder;
        title?: SortOrder;
        description?: SortOrder;
        createdById?: SortOrder;
        createdAt?: SortOrder;
    };
    export type CourseMinOrderByAggregateInput = {
        id?: SortOrder;
        courseCode?: SortOrder;
        title?: SortOrder;
        description?: SortOrder;
        createdById?: SortOrder;
        createdAt?: SortOrder;
    };
    export type IntFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel>;
        in?: number[] | ListIntFieldRefInput<$PrismaModel>;
        notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
        lt?: number | IntFieldRefInput<$PrismaModel>;
        lte?: number | IntFieldRefInput<$PrismaModel>;
        gt?: number | IntFieldRefInput<$PrismaModel>;
        gte?: number | IntFieldRefInput<$PrismaModel>;
        not?: NestedIntFilter<$PrismaModel> | number;
    };
    export type CourseScalarRelationFilter = {
        is?: CourseWhereInput;
        isNot?: CourseWhereInput;
    };
    export type LessonListRelationFilter = {
        every?: LessonWhereInput;
        some?: LessonWhereInput;
        none?: LessonWhereInput;
    };
    export type LessonOrderByRelationAggregateInput = {
        _count?: SortOrder;
    };
    export type ModuleCountOrderByAggregateInput = {
        id?: SortOrder;
        courseId?: SortOrder;
        title?: SortOrder;
        description?: SortOrder;
        moduleOrder?: SortOrder;
    };
    export type ModuleAvgOrderByAggregateInput = {
        moduleOrder?: SortOrder;
    };
    export type ModuleMaxOrderByAggregateInput = {
        id?: SortOrder;
        courseId?: SortOrder;
        title?: SortOrder;
        description?: SortOrder;
        moduleOrder?: SortOrder;
    };
    export type ModuleMinOrderByAggregateInput = {
        id?: SortOrder;
        courseId?: SortOrder;
        title?: SortOrder;
        description?: SortOrder;
        moduleOrder?: SortOrder;
    };
    export type ModuleSumOrderByAggregateInput = {
        moduleOrder?: SortOrder;
    };
    export type IntWithAggregatesFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel>;
        in?: number[] | ListIntFieldRefInput<$PrismaModel>;
        notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
        lt?: number | IntFieldRefInput<$PrismaModel>;
        lte?: number | IntFieldRefInput<$PrismaModel>;
        gt?: number | IntFieldRefInput<$PrismaModel>;
        gte?: number | IntFieldRefInput<$PrismaModel>;
        not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
        _count?: NestedIntFilter<$PrismaModel>;
        _avg?: NestedFloatFilter<$PrismaModel>;
        _sum?: NestedIntFilter<$PrismaModel>;
        _min?: NestedIntFilter<$PrismaModel>;
        _max?: NestedIntFilter<$PrismaModel>;
    };
    export type InstructorCountOrderByAggregateInput = {
        id?: SortOrder;
        fullName?: SortOrder;
        title?: SortOrder;
        bio?: SortOrder;
    };
    export type InstructorMaxOrderByAggregateInput = {
        id?: SortOrder;
        fullName?: SortOrder;
        title?: SortOrder;
        bio?: SortOrder;
    };
    export type InstructorMinOrderByAggregateInput = {
        id?: SortOrder;
        fullName?: SortOrder;
        title?: SortOrder;
        bio?: SortOrder;
    };
    export type DateTimeNullableFilter<$PrismaModel = never> = {
        equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
        in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
        notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
        lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
    };
    export type ModuleScalarRelationFilter = {
        is?: ModuleWhereInput;
        isNot?: ModuleWhereInput;
    };
    export type InstructorScalarRelationFilter = {
        is?: InstructorWhereInput;
        isNot?: InstructorWhereInput;
    };
    export type ResourceListRelationFilter = {
        every?: ResourceWhereInput;
        some?: ResourceWhereInput;
        none?: ResourceWhereInput;
    };
    export type ResourceOrderByRelationAggregateInput = {
        _count?: SortOrder;
    };
    export type LessonCountOrderByAggregateInput = {
        id?: SortOrder;
        moduleId?: SortOrder;
        instructorId?: SortOrder;
        title?: SortOrder;
        description?: SortOrder;
        lessonDate?: SortOrder;
        zoomInfo?: SortOrder;
        lessonOrder?: SortOrder;
    };
    export type LessonAvgOrderByAggregateInput = {
        lessonOrder?: SortOrder;
    };
    export type LessonMaxOrderByAggregateInput = {
        id?: SortOrder;
        moduleId?: SortOrder;
        instructorId?: SortOrder;
        title?: SortOrder;
        description?: SortOrder;
        lessonDate?: SortOrder;
        zoomInfo?: SortOrder;
        lessonOrder?: SortOrder;
    };
    export type LessonMinOrderByAggregateInput = {
        id?: SortOrder;
        moduleId?: SortOrder;
        instructorId?: SortOrder;
        title?: SortOrder;
        description?: SortOrder;
        lessonDate?: SortOrder;
        zoomInfo?: SortOrder;
        lessonOrder?: SortOrder;
    };
    export type LessonSumOrderByAggregateInput = {
        lessonOrder?: SortOrder;
    };
    export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
        equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
        in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
        notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
        lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
        _count?: NestedIntNullableFilter<$PrismaModel>;
        _min?: NestedDateTimeNullableFilter<$PrismaModel>;
        _max?: NestedDateTimeNullableFilter<$PrismaModel>;
    };
    export type EnumResourceTypeFilter<$PrismaModel = never> = {
        equals?: $Enums.ResourceType | EnumResourceTypeFieldRefInput<$PrismaModel>;
        in?: $Enums.ResourceType[] | ListEnumResourceTypeFieldRefInput<$PrismaModel>;
        notIn?: $Enums.ResourceType[] | ListEnumResourceTypeFieldRefInput<$PrismaModel>;
        not?: NestedEnumResourceTypeFilter<$PrismaModel> | $Enums.ResourceType;
    };
    export type LessonScalarRelationFilter = {
        is?: LessonWhereInput;
        isNot?: LessonWhereInput;
    };
    export type ResourceCountOrderByAggregateInput = {
        id?: SortOrder;
        lessonId?: SortOrder;
        resourceType?: SortOrder;
        title?: SortOrder;
        url?: SortOrder;
        deadline?: SortOrder;
    };
    export type ResourceMaxOrderByAggregateInput = {
        id?: SortOrder;
        lessonId?: SortOrder;
        resourceType?: SortOrder;
        title?: SortOrder;
        url?: SortOrder;
        deadline?: SortOrder;
    };
    export type ResourceMinOrderByAggregateInput = {
        id?: SortOrder;
        lessonId?: SortOrder;
        resourceType?: SortOrder;
        title?: SortOrder;
        url?: SortOrder;
        deadline?: SortOrder;
    };
    export type EnumResourceTypeWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.ResourceType | EnumResourceTypeFieldRefInput<$PrismaModel>;
        in?: $Enums.ResourceType[] | ListEnumResourceTypeFieldRefInput<$PrismaModel>;
        notIn?: $Enums.ResourceType[] | ListEnumResourceTypeFieldRefInput<$PrismaModel>;
        not?: NestedEnumResourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.ResourceType;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumResourceTypeFilter<$PrismaModel>;
        _max?: NestedEnumResourceTypeFilter<$PrismaModel>;
    };
    export type EnrollmentUserIdCourseIdCompoundUniqueInput = {
        userId: string;
        courseId: string;
    };
    export type EnrollmentCountOrderByAggregateInput = {
        id?: SortOrder;
        userId?: SortOrder;
        courseId?: SortOrder;
        enrollmentDate?: SortOrder;
    };
    export type EnrollmentMaxOrderByAggregateInput = {
        id?: SortOrder;
        userId?: SortOrder;
        courseId?: SortOrder;
        enrollmentDate?: SortOrder;
    };
    export type EnrollmentMinOrderByAggregateInput = {
        id?: SortOrder;
        userId?: SortOrder;
        courseId?: SortOrder;
        enrollmentDate?: SortOrder;
    };
    export type EnumLessonStatusFilter<$PrismaModel = never> = {
        equals?: $Enums.LessonStatus | EnumLessonStatusFieldRefInput<$PrismaModel>;
        in?: $Enums.LessonStatus[] | ListEnumLessonStatusFieldRefInput<$PrismaModel>;
        notIn?: $Enums.LessonStatus[] | ListEnumLessonStatusFieldRefInput<$PrismaModel>;
        not?: NestedEnumLessonStatusFilter<$PrismaModel> | $Enums.LessonStatus;
    };
    export type LessonProgressUserIdLessonIdCompoundUniqueInput = {
        userId: string;
        lessonId: string;
    };
    export type LessonProgressCountOrderByAggregateInput = {
        id?: SortOrder;
        userId?: SortOrder;
        lessonId?: SortOrder;
        status?: SortOrder;
        completedAt?: SortOrder;
    };
    export type LessonProgressMaxOrderByAggregateInput = {
        id?: SortOrder;
        userId?: SortOrder;
        lessonId?: SortOrder;
        status?: SortOrder;
        completedAt?: SortOrder;
    };
    export type LessonProgressMinOrderByAggregateInput = {
        id?: SortOrder;
        userId?: SortOrder;
        lessonId?: SortOrder;
        status?: SortOrder;
        completedAt?: SortOrder;
    };
    export type EnumLessonStatusWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.LessonStatus | EnumLessonStatusFieldRefInput<$PrismaModel>;
        in?: $Enums.LessonStatus[] | ListEnumLessonStatusFieldRefInput<$PrismaModel>;
        notIn?: $Enums.LessonStatus[] | ListEnumLessonStatusFieldRefInput<$PrismaModel>;
        not?: NestedEnumLessonStatusWithAggregatesFilter<$PrismaModel> | $Enums.LessonStatus;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumLessonStatusFilter<$PrismaModel>;
        _max?: NestedEnumLessonStatusFilter<$PrismaModel>;
    };
    export type SessionCountOrderByAggregateInput = {
        id?: SortOrder;
        sid?: SortOrder;
        data?: SortOrder;
        expiresAt?: SortOrder;
    };
    export type SessionMaxOrderByAggregateInput = {
        id?: SortOrder;
        sid?: SortOrder;
        data?: SortOrder;
        expiresAt?: SortOrder;
    };
    export type SessionMinOrderByAggregateInput = {
        id?: SortOrder;
        sid?: SortOrder;
        data?: SortOrder;
        expiresAt?: SortOrder;
    };
    export type EnrollmentCreateNestedManyWithoutUserInput = {
        create?: XOR<EnrollmentCreateWithoutUserInput, EnrollmentUncheckedCreateWithoutUserInput> | EnrollmentCreateWithoutUserInput[] | EnrollmentUncheckedCreateWithoutUserInput[];
        connectOrCreate?: EnrollmentCreateOrConnectWithoutUserInput | EnrollmentCreateOrConnectWithoutUserInput[];
        createMany?: EnrollmentCreateManyUserInputEnvelope;
        connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[];
    };
    export type LessonProgressCreateNestedManyWithoutUserInput = {
        create?: XOR<LessonProgressCreateWithoutUserInput, LessonProgressUncheckedCreateWithoutUserInput> | LessonProgressCreateWithoutUserInput[] | LessonProgressUncheckedCreateWithoutUserInput[];
        connectOrCreate?: LessonProgressCreateOrConnectWithoutUserInput | LessonProgressCreateOrConnectWithoutUserInput[];
        createMany?: LessonProgressCreateManyUserInputEnvelope;
        connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[];
    };
    export type CourseCreateNestedManyWithoutCreatedByInput = {
        create?: XOR<CourseCreateWithoutCreatedByInput, CourseUncheckedCreateWithoutCreatedByInput> | CourseCreateWithoutCreatedByInput[] | CourseUncheckedCreateWithoutCreatedByInput[];
        connectOrCreate?: CourseCreateOrConnectWithoutCreatedByInput | CourseCreateOrConnectWithoutCreatedByInput[];
        createMany?: CourseCreateManyCreatedByInputEnvelope;
        connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
    };
    export type EnrollmentUncheckedCreateNestedManyWithoutUserInput = {
        create?: XOR<EnrollmentCreateWithoutUserInput, EnrollmentUncheckedCreateWithoutUserInput> | EnrollmentCreateWithoutUserInput[] | EnrollmentUncheckedCreateWithoutUserInput[];
        connectOrCreate?: EnrollmentCreateOrConnectWithoutUserInput | EnrollmentCreateOrConnectWithoutUserInput[];
        createMany?: EnrollmentCreateManyUserInputEnvelope;
        connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[];
    };
    export type LessonProgressUncheckedCreateNestedManyWithoutUserInput = {
        create?: XOR<LessonProgressCreateWithoutUserInput, LessonProgressUncheckedCreateWithoutUserInput> | LessonProgressCreateWithoutUserInput[] | LessonProgressUncheckedCreateWithoutUserInput[];
        connectOrCreate?: LessonProgressCreateOrConnectWithoutUserInput | LessonProgressCreateOrConnectWithoutUserInput[];
        createMany?: LessonProgressCreateManyUserInputEnvelope;
        connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[];
    };
    export type CourseUncheckedCreateNestedManyWithoutCreatedByInput = {
        create?: XOR<CourseCreateWithoutCreatedByInput, CourseUncheckedCreateWithoutCreatedByInput> | CourseCreateWithoutCreatedByInput[] | CourseUncheckedCreateWithoutCreatedByInput[];
        connectOrCreate?: CourseCreateOrConnectWithoutCreatedByInput | CourseCreateOrConnectWithoutCreatedByInput[];
        createMany?: CourseCreateManyCreatedByInputEnvelope;
        connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
    };
    export type StringFieldUpdateOperationsInput = {
        set?: string;
    };
    export type NullableStringFieldUpdateOperationsInput = {
        set?: string | null;
    };
    export type EnumUserRoleFieldUpdateOperationsInput = {
        set?: $Enums.UserRole;
    };
    export type DateTimeFieldUpdateOperationsInput = {
        set?: Date | string;
    };
    export type EnrollmentUpdateManyWithoutUserNestedInput = {
        create?: XOR<EnrollmentCreateWithoutUserInput, EnrollmentUncheckedCreateWithoutUserInput> | EnrollmentCreateWithoutUserInput[] | EnrollmentUncheckedCreateWithoutUserInput[];
        connectOrCreate?: EnrollmentCreateOrConnectWithoutUserInput | EnrollmentCreateOrConnectWithoutUserInput[];
        upsert?: EnrollmentUpsertWithWhereUniqueWithoutUserInput | EnrollmentUpsertWithWhereUniqueWithoutUserInput[];
        createMany?: EnrollmentCreateManyUserInputEnvelope;
        set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[];
        disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[];
        delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[];
        connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[];
        update?: EnrollmentUpdateWithWhereUniqueWithoutUserInput | EnrollmentUpdateWithWhereUniqueWithoutUserInput[];
        updateMany?: EnrollmentUpdateManyWithWhereWithoutUserInput | EnrollmentUpdateManyWithWhereWithoutUserInput[];
        deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[];
    };
    export type LessonProgressUpdateManyWithoutUserNestedInput = {
        create?: XOR<LessonProgressCreateWithoutUserInput, LessonProgressUncheckedCreateWithoutUserInput> | LessonProgressCreateWithoutUserInput[] | LessonProgressUncheckedCreateWithoutUserInput[];
        connectOrCreate?: LessonProgressCreateOrConnectWithoutUserInput | LessonProgressCreateOrConnectWithoutUserInput[];
        upsert?: LessonProgressUpsertWithWhereUniqueWithoutUserInput | LessonProgressUpsertWithWhereUniqueWithoutUserInput[];
        createMany?: LessonProgressCreateManyUserInputEnvelope;
        set?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[];
        disconnect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[];
        delete?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[];
        connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[];
        update?: LessonProgressUpdateWithWhereUniqueWithoutUserInput | LessonProgressUpdateWithWhereUniqueWithoutUserInput[];
        updateMany?: LessonProgressUpdateManyWithWhereWithoutUserInput | LessonProgressUpdateManyWithWhereWithoutUserInput[];
        deleteMany?: LessonProgressScalarWhereInput | LessonProgressScalarWhereInput[];
    };
    export type CourseUpdateManyWithoutCreatedByNestedInput = {
        create?: XOR<CourseCreateWithoutCreatedByInput, CourseUncheckedCreateWithoutCreatedByInput> | CourseCreateWithoutCreatedByInput[] | CourseUncheckedCreateWithoutCreatedByInput[];
        connectOrCreate?: CourseCreateOrConnectWithoutCreatedByInput | CourseCreateOrConnectWithoutCreatedByInput[];
        upsert?: CourseUpsertWithWhereUniqueWithoutCreatedByInput | CourseUpsertWithWhereUniqueWithoutCreatedByInput[];
        createMany?: CourseCreateManyCreatedByInputEnvelope;
        set?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
        disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
        delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
        connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
        update?: CourseUpdateWithWhereUniqueWithoutCreatedByInput | CourseUpdateWithWhereUniqueWithoutCreatedByInput[];
        updateMany?: CourseUpdateManyWithWhereWithoutCreatedByInput | CourseUpdateManyWithWhereWithoutCreatedByInput[];
        deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[];
    };
    export type EnrollmentUncheckedUpdateManyWithoutUserNestedInput = {
        create?: XOR<EnrollmentCreateWithoutUserInput, EnrollmentUncheckedCreateWithoutUserInput> | EnrollmentCreateWithoutUserInput[] | EnrollmentUncheckedCreateWithoutUserInput[];
        connectOrCreate?: EnrollmentCreateOrConnectWithoutUserInput | EnrollmentCreateOrConnectWithoutUserInput[];
        upsert?: EnrollmentUpsertWithWhereUniqueWithoutUserInput | EnrollmentUpsertWithWhereUniqueWithoutUserInput[];
        createMany?: EnrollmentCreateManyUserInputEnvelope;
        set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[];
        disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[];
        delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[];
        connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[];
        update?: EnrollmentUpdateWithWhereUniqueWithoutUserInput | EnrollmentUpdateWithWhereUniqueWithoutUserInput[];
        updateMany?: EnrollmentUpdateManyWithWhereWithoutUserInput | EnrollmentUpdateManyWithWhereWithoutUserInput[];
        deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[];
    };
    export type LessonProgressUncheckedUpdateManyWithoutUserNestedInput = {
        create?: XOR<LessonProgressCreateWithoutUserInput, LessonProgressUncheckedCreateWithoutUserInput> | LessonProgressCreateWithoutUserInput[] | LessonProgressUncheckedCreateWithoutUserInput[];
        connectOrCreate?: LessonProgressCreateOrConnectWithoutUserInput | LessonProgressCreateOrConnectWithoutUserInput[];
        upsert?: LessonProgressUpsertWithWhereUniqueWithoutUserInput | LessonProgressUpsertWithWhereUniqueWithoutUserInput[];
        createMany?: LessonProgressCreateManyUserInputEnvelope;
        set?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[];
        disconnect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[];
        delete?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[];
        connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[];
        update?: LessonProgressUpdateWithWhereUniqueWithoutUserInput | LessonProgressUpdateWithWhereUniqueWithoutUserInput[];
        updateMany?: LessonProgressUpdateManyWithWhereWithoutUserInput | LessonProgressUpdateManyWithWhereWithoutUserInput[];
        deleteMany?: LessonProgressScalarWhereInput | LessonProgressScalarWhereInput[];
    };
    export type CourseUncheckedUpdateManyWithoutCreatedByNestedInput = {
        create?: XOR<CourseCreateWithoutCreatedByInput, CourseUncheckedCreateWithoutCreatedByInput> | CourseCreateWithoutCreatedByInput[] | CourseUncheckedCreateWithoutCreatedByInput[];
        connectOrCreate?: CourseCreateOrConnectWithoutCreatedByInput | CourseCreateOrConnectWithoutCreatedByInput[];
        upsert?: CourseUpsertWithWhereUniqueWithoutCreatedByInput | CourseUpsertWithWhereUniqueWithoutCreatedByInput[];
        createMany?: CourseCreateManyCreatedByInputEnvelope;
        set?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
        disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
        delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
        connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[];
        update?: CourseUpdateWithWhereUniqueWithoutCreatedByInput | CourseUpdateWithWhereUniqueWithoutCreatedByInput[];
        updateMany?: CourseUpdateManyWithWhereWithoutCreatedByInput | CourseUpdateManyWithWhereWithoutCreatedByInput[];
        deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[];
    };
    export type UserCreateNestedOneWithoutCreatedCoursesInput = {
        create?: XOR<UserCreateWithoutCreatedCoursesInput, UserUncheckedCreateWithoutCreatedCoursesInput>;
        connectOrCreate?: UserCreateOrConnectWithoutCreatedCoursesInput;
        connect?: UserWhereUniqueInput;
    };
    export type ModuleCreateNestedManyWithoutCourseInput = {
        create?: XOR<ModuleCreateWithoutCourseInput, ModuleUncheckedCreateWithoutCourseInput> | ModuleCreateWithoutCourseInput[] | ModuleUncheckedCreateWithoutCourseInput[];
        connectOrCreate?: ModuleCreateOrConnectWithoutCourseInput | ModuleCreateOrConnectWithoutCourseInput[];
        createMany?: ModuleCreateManyCourseInputEnvelope;
        connect?: ModuleWhereUniqueInput | ModuleWhereUniqueInput[];
    };
    export type EnrollmentCreateNestedManyWithoutCourseInput = {
        create?: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput> | EnrollmentCreateWithoutCourseInput[] | EnrollmentUncheckedCreateWithoutCourseInput[];
        connectOrCreate?: EnrollmentCreateOrConnectWithoutCourseInput | EnrollmentCreateOrConnectWithoutCourseInput[];
        createMany?: EnrollmentCreateManyCourseInputEnvelope;
        connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[];
    };
    export type ModuleUncheckedCreateNestedManyWithoutCourseInput = {
        create?: XOR<ModuleCreateWithoutCourseInput, ModuleUncheckedCreateWithoutCourseInput> | ModuleCreateWithoutCourseInput[] | ModuleUncheckedCreateWithoutCourseInput[];
        connectOrCreate?: ModuleCreateOrConnectWithoutCourseInput | ModuleCreateOrConnectWithoutCourseInput[];
        createMany?: ModuleCreateManyCourseInputEnvelope;
        connect?: ModuleWhereUniqueInput | ModuleWhereUniqueInput[];
    };
    export type EnrollmentUncheckedCreateNestedManyWithoutCourseInput = {
        create?: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput> | EnrollmentCreateWithoutCourseInput[] | EnrollmentUncheckedCreateWithoutCourseInput[];
        connectOrCreate?: EnrollmentCreateOrConnectWithoutCourseInput | EnrollmentCreateOrConnectWithoutCourseInput[];
        createMany?: EnrollmentCreateManyCourseInputEnvelope;
        connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[];
    };
    export type UserUpdateOneRequiredWithoutCreatedCoursesNestedInput = {
        create?: XOR<UserCreateWithoutCreatedCoursesInput, UserUncheckedCreateWithoutCreatedCoursesInput>;
        connectOrCreate?: UserCreateOrConnectWithoutCreatedCoursesInput;
        upsert?: UserUpsertWithoutCreatedCoursesInput;
        connect?: UserWhereUniqueInput;
        update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedCoursesInput, UserUpdateWithoutCreatedCoursesInput>, UserUncheckedUpdateWithoutCreatedCoursesInput>;
    };
    export type ModuleUpdateManyWithoutCourseNestedInput = {
        create?: XOR<ModuleCreateWithoutCourseInput, ModuleUncheckedCreateWithoutCourseInput> | ModuleCreateWithoutCourseInput[] | ModuleUncheckedCreateWithoutCourseInput[];
        connectOrCreate?: ModuleCreateOrConnectWithoutCourseInput | ModuleCreateOrConnectWithoutCourseInput[];
        upsert?: ModuleUpsertWithWhereUniqueWithoutCourseInput | ModuleUpsertWithWhereUniqueWithoutCourseInput[];
        createMany?: ModuleCreateManyCourseInputEnvelope;
        set?: ModuleWhereUniqueInput | ModuleWhereUniqueInput[];
        disconnect?: ModuleWhereUniqueInput | ModuleWhereUniqueInput[];
        delete?: ModuleWhereUniqueInput | ModuleWhereUniqueInput[];
        connect?: ModuleWhereUniqueInput | ModuleWhereUniqueInput[];
        update?: ModuleUpdateWithWhereUniqueWithoutCourseInput | ModuleUpdateWithWhereUniqueWithoutCourseInput[];
        updateMany?: ModuleUpdateManyWithWhereWithoutCourseInput | ModuleUpdateManyWithWhereWithoutCourseInput[];
        deleteMany?: ModuleScalarWhereInput | ModuleScalarWhereInput[];
    };
    export type EnrollmentUpdateManyWithoutCourseNestedInput = {
        create?: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput> | EnrollmentCreateWithoutCourseInput[] | EnrollmentUncheckedCreateWithoutCourseInput[];
        connectOrCreate?: EnrollmentCreateOrConnectWithoutCourseInput | EnrollmentCreateOrConnectWithoutCourseInput[];
        upsert?: EnrollmentUpsertWithWhereUniqueWithoutCourseInput | EnrollmentUpsertWithWhereUniqueWithoutCourseInput[];
        createMany?: EnrollmentCreateManyCourseInputEnvelope;
        set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[];
        disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[];
        delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[];
        connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[];
        update?: EnrollmentUpdateWithWhereUniqueWithoutCourseInput | EnrollmentUpdateWithWhereUniqueWithoutCourseInput[];
        updateMany?: EnrollmentUpdateManyWithWhereWithoutCourseInput | EnrollmentUpdateManyWithWhereWithoutCourseInput[];
        deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[];
    };
    export type ModuleUncheckedUpdateManyWithoutCourseNestedInput = {
        create?: XOR<ModuleCreateWithoutCourseInput, ModuleUncheckedCreateWithoutCourseInput> | ModuleCreateWithoutCourseInput[] | ModuleUncheckedCreateWithoutCourseInput[];
        connectOrCreate?: ModuleCreateOrConnectWithoutCourseInput | ModuleCreateOrConnectWithoutCourseInput[];
        upsert?: ModuleUpsertWithWhereUniqueWithoutCourseInput | ModuleUpsertWithWhereUniqueWithoutCourseInput[];
        createMany?: ModuleCreateManyCourseInputEnvelope;
        set?: ModuleWhereUniqueInput | ModuleWhereUniqueInput[];
        disconnect?: ModuleWhereUniqueInput | ModuleWhereUniqueInput[];
        delete?: ModuleWhereUniqueInput | ModuleWhereUniqueInput[];
        connect?: ModuleWhereUniqueInput | ModuleWhereUniqueInput[];
        update?: ModuleUpdateWithWhereUniqueWithoutCourseInput | ModuleUpdateWithWhereUniqueWithoutCourseInput[];
        updateMany?: ModuleUpdateManyWithWhereWithoutCourseInput | ModuleUpdateManyWithWhereWithoutCourseInput[];
        deleteMany?: ModuleScalarWhereInput | ModuleScalarWhereInput[];
    };
    export type EnrollmentUncheckedUpdateManyWithoutCourseNestedInput = {
        create?: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput> | EnrollmentCreateWithoutCourseInput[] | EnrollmentUncheckedCreateWithoutCourseInput[];
        connectOrCreate?: EnrollmentCreateOrConnectWithoutCourseInput | EnrollmentCreateOrConnectWithoutCourseInput[];
        upsert?: EnrollmentUpsertWithWhereUniqueWithoutCourseInput | EnrollmentUpsertWithWhereUniqueWithoutCourseInput[];
        createMany?: EnrollmentCreateManyCourseInputEnvelope;
        set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[];
        disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[];
        delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[];
        connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[];
        update?: EnrollmentUpdateWithWhereUniqueWithoutCourseInput | EnrollmentUpdateWithWhereUniqueWithoutCourseInput[];
        updateMany?: EnrollmentUpdateManyWithWhereWithoutCourseInput | EnrollmentUpdateManyWithWhereWithoutCourseInput[];
        deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[];
    };
    export type CourseCreateNestedOneWithoutModulesInput = {
        create?: XOR<CourseCreateWithoutModulesInput, CourseUncheckedCreateWithoutModulesInput>;
        connectOrCreate?: CourseCreateOrConnectWithoutModulesInput;
        connect?: CourseWhereUniqueInput;
    };
    export type LessonCreateNestedManyWithoutModuleInput = {
        create?: XOR<LessonCreateWithoutModuleInput, LessonUncheckedCreateWithoutModuleInput> | LessonCreateWithoutModuleInput[] | LessonUncheckedCreateWithoutModuleInput[];
        connectOrCreate?: LessonCreateOrConnectWithoutModuleInput | LessonCreateOrConnectWithoutModuleInput[];
        createMany?: LessonCreateManyModuleInputEnvelope;
        connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
    };
    export type LessonUncheckedCreateNestedManyWithoutModuleInput = {
        create?: XOR<LessonCreateWithoutModuleInput, LessonUncheckedCreateWithoutModuleInput> | LessonCreateWithoutModuleInput[] | LessonUncheckedCreateWithoutModuleInput[];
        connectOrCreate?: LessonCreateOrConnectWithoutModuleInput | LessonCreateOrConnectWithoutModuleInput[];
        createMany?: LessonCreateManyModuleInputEnvelope;
        connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
    };
    export type IntFieldUpdateOperationsInput = {
        set?: number;
        increment?: number;
        decrement?: number;
        multiply?: number;
        divide?: number;
    };
    export type CourseUpdateOneRequiredWithoutModulesNestedInput = {
        create?: XOR<CourseCreateWithoutModulesInput, CourseUncheckedCreateWithoutModulesInput>;
        connectOrCreate?: CourseCreateOrConnectWithoutModulesInput;
        upsert?: CourseUpsertWithoutModulesInput;
        connect?: CourseWhereUniqueInput;
        update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutModulesInput, CourseUpdateWithoutModulesInput>, CourseUncheckedUpdateWithoutModulesInput>;
    };
    export type LessonUpdateManyWithoutModuleNestedInput = {
        create?: XOR<LessonCreateWithoutModuleInput, LessonUncheckedCreateWithoutModuleInput> | LessonCreateWithoutModuleInput[] | LessonUncheckedCreateWithoutModuleInput[];
        connectOrCreate?: LessonCreateOrConnectWithoutModuleInput | LessonCreateOrConnectWithoutModuleInput[];
        upsert?: LessonUpsertWithWhereUniqueWithoutModuleInput | LessonUpsertWithWhereUniqueWithoutModuleInput[];
        createMany?: LessonCreateManyModuleInputEnvelope;
        set?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
        disconnect?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
        delete?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
        connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
        update?: LessonUpdateWithWhereUniqueWithoutModuleInput | LessonUpdateWithWhereUniqueWithoutModuleInput[];
        updateMany?: LessonUpdateManyWithWhereWithoutModuleInput | LessonUpdateManyWithWhereWithoutModuleInput[];
        deleteMany?: LessonScalarWhereInput | LessonScalarWhereInput[];
    };
    export type LessonUncheckedUpdateManyWithoutModuleNestedInput = {
        create?: XOR<LessonCreateWithoutModuleInput, LessonUncheckedCreateWithoutModuleInput> | LessonCreateWithoutModuleInput[] | LessonUncheckedCreateWithoutModuleInput[];
        connectOrCreate?: LessonCreateOrConnectWithoutModuleInput | LessonCreateOrConnectWithoutModuleInput[];
        upsert?: LessonUpsertWithWhereUniqueWithoutModuleInput | LessonUpsertWithWhereUniqueWithoutModuleInput[];
        createMany?: LessonCreateManyModuleInputEnvelope;
        set?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
        disconnect?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
        delete?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
        connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
        update?: LessonUpdateWithWhereUniqueWithoutModuleInput | LessonUpdateWithWhereUniqueWithoutModuleInput[];
        updateMany?: LessonUpdateManyWithWhereWithoutModuleInput | LessonUpdateManyWithWhereWithoutModuleInput[];
        deleteMany?: LessonScalarWhereInput | LessonScalarWhereInput[];
    };
    export type LessonCreateNestedManyWithoutInstructorInput = {
        create?: XOR<LessonCreateWithoutInstructorInput, LessonUncheckedCreateWithoutInstructorInput> | LessonCreateWithoutInstructorInput[] | LessonUncheckedCreateWithoutInstructorInput[];
        connectOrCreate?: LessonCreateOrConnectWithoutInstructorInput | LessonCreateOrConnectWithoutInstructorInput[];
        createMany?: LessonCreateManyInstructorInputEnvelope;
        connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
    };
    export type LessonUncheckedCreateNestedManyWithoutInstructorInput = {
        create?: XOR<LessonCreateWithoutInstructorInput, LessonUncheckedCreateWithoutInstructorInput> | LessonCreateWithoutInstructorInput[] | LessonUncheckedCreateWithoutInstructorInput[];
        connectOrCreate?: LessonCreateOrConnectWithoutInstructorInput | LessonCreateOrConnectWithoutInstructorInput[];
        createMany?: LessonCreateManyInstructorInputEnvelope;
        connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
    };
    export type LessonUpdateManyWithoutInstructorNestedInput = {
        create?: XOR<LessonCreateWithoutInstructorInput, LessonUncheckedCreateWithoutInstructorInput> | LessonCreateWithoutInstructorInput[] | LessonUncheckedCreateWithoutInstructorInput[];
        connectOrCreate?: LessonCreateOrConnectWithoutInstructorInput | LessonCreateOrConnectWithoutInstructorInput[];
        upsert?: LessonUpsertWithWhereUniqueWithoutInstructorInput | LessonUpsertWithWhereUniqueWithoutInstructorInput[];
        createMany?: LessonCreateManyInstructorInputEnvelope;
        set?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
        disconnect?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
        delete?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
        connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
        update?: LessonUpdateWithWhereUniqueWithoutInstructorInput | LessonUpdateWithWhereUniqueWithoutInstructorInput[];
        updateMany?: LessonUpdateManyWithWhereWithoutInstructorInput | LessonUpdateManyWithWhereWithoutInstructorInput[];
        deleteMany?: LessonScalarWhereInput | LessonScalarWhereInput[];
    };
    export type LessonUncheckedUpdateManyWithoutInstructorNestedInput = {
        create?: XOR<LessonCreateWithoutInstructorInput, LessonUncheckedCreateWithoutInstructorInput> | LessonCreateWithoutInstructorInput[] | LessonUncheckedCreateWithoutInstructorInput[];
        connectOrCreate?: LessonCreateOrConnectWithoutInstructorInput | LessonCreateOrConnectWithoutInstructorInput[];
        upsert?: LessonUpsertWithWhereUniqueWithoutInstructorInput | LessonUpsertWithWhereUniqueWithoutInstructorInput[];
        createMany?: LessonCreateManyInstructorInputEnvelope;
        set?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
        disconnect?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
        delete?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
        connect?: LessonWhereUniqueInput | LessonWhereUniqueInput[];
        update?: LessonUpdateWithWhereUniqueWithoutInstructorInput | LessonUpdateWithWhereUniqueWithoutInstructorInput[];
        updateMany?: LessonUpdateManyWithWhereWithoutInstructorInput | LessonUpdateManyWithWhereWithoutInstructorInput[];
        deleteMany?: LessonScalarWhereInput | LessonScalarWhereInput[];
    };
    export type ModuleCreateNestedOneWithoutLessonsInput = {
        create?: XOR<ModuleCreateWithoutLessonsInput, ModuleUncheckedCreateWithoutLessonsInput>;
        connectOrCreate?: ModuleCreateOrConnectWithoutLessonsInput;
        connect?: ModuleWhereUniqueInput;
    };
    export type InstructorCreateNestedOneWithoutLessonsInput = {
        create?: XOR<InstructorCreateWithoutLessonsInput, InstructorUncheckedCreateWithoutLessonsInput>;
        connectOrCreate?: InstructorCreateOrConnectWithoutLessonsInput;
        connect?: InstructorWhereUniqueInput;
    };
    export type ResourceCreateNestedManyWithoutLessonInput = {
        create?: XOR<ResourceCreateWithoutLessonInput, ResourceUncheckedCreateWithoutLessonInput> | ResourceCreateWithoutLessonInput[] | ResourceUncheckedCreateWithoutLessonInput[];
        connectOrCreate?: ResourceCreateOrConnectWithoutLessonInput | ResourceCreateOrConnectWithoutLessonInput[];
        createMany?: ResourceCreateManyLessonInputEnvelope;
        connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[];
    };
    export type LessonProgressCreateNestedManyWithoutLessonInput = {
        create?: XOR<LessonProgressCreateWithoutLessonInput, LessonProgressUncheckedCreateWithoutLessonInput> | LessonProgressCreateWithoutLessonInput[] | LessonProgressUncheckedCreateWithoutLessonInput[];
        connectOrCreate?: LessonProgressCreateOrConnectWithoutLessonInput | LessonProgressCreateOrConnectWithoutLessonInput[];
        createMany?: LessonProgressCreateManyLessonInputEnvelope;
        connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[];
    };
    export type ResourceUncheckedCreateNestedManyWithoutLessonInput = {
        create?: XOR<ResourceCreateWithoutLessonInput, ResourceUncheckedCreateWithoutLessonInput> | ResourceCreateWithoutLessonInput[] | ResourceUncheckedCreateWithoutLessonInput[];
        connectOrCreate?: ResourceCreateOrConnectWithoutLessonInput | ResourceCreateOrConnectWithoutLessonInput[];
        createMany?: ResourceCreateManyLessonInputEnvelope;
        connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[];
    };
    export type LessonProgressUncheckedCreateNestedManyWithoutLessonInput = {
        create?: XOR<LessonProgressCreateWithoutLessonInput, LessonProgressUncheckedCreateWithoutLessonInput> | LessonProgressCreateWithoutLessonInput[] | LessonProgressUncheckedCreateWithoutLessonInput[];
        connectOrCreate?: LessonProgressCreateOrConnectWithoutLessonInput | LessonProgressCreateOrConnectWithoutLessonInput[];
        createMany?: LessonProgressCreateManyLessonInputEnvelope;
        connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[];
    };
    export type NullableDateTimeFieldUpdateOperationsInput = {
        set?: Date | string | null;
    };
    export type ModuleUpdateOneRequiredWithoutLessonsNestedInput = {
        create?: XOR<ModuleCreateWithoutLessonsInput, ModuleUncheckedCreateWithoutLessonsInput>;
        connectOrCreate?: ModuleCreateOrConnectWithoutLessonsInput;
        upsert?: ModuleUpsertWithoutLessonsInput;
        connect?: ModuleWhereUniqueInput;
        update?: XOR<XOR<ModuleUpdateToOneWithWhereWithoutLessonsInput, ModuleUpdateWithoutLessonsInput>, ModuleUncheckedUpdateWithoutLessonsInput>;
    };
    export type InstructorUpdateOneRequiredWithoutLessonsNestedInput = {
        create?: XOR<InstructorCreateWithoutLessonsInput, InstructorUncheckedCreateWithoutLessonsInput>;
        connectOrCreate?: InstructorCreateOrConnectWithoutLessonsInput;
        upsert?: InstructorUpsertWithoutLessonsInput;
        connect?: InstructorWhereUniqueInput;
        update?: XOR<XOR<InstructorUpdateToOneWithWhereWithoutLessonsInput, InstructorUpdateWithoutLessonsInput>, InstructorUncheckedUpdateWithoutLessonsInput>;
    };
    export type ResourceUpdateManyWithoutLessonNestedInput = {
        create?: XOR<ResourceCreateWithoutLessonInput, ResourceUncheckedCreateWithoutLessonInput> | ResourceCreateWithoutLessonInput[] | ResourceUncheckedCreateWithoutLessonInput[];
        connectOrCreate?: ResourceCreateOrConnectWithoutLessonInput | ResourceCreateOrConnectWithoutLessonInput[];
        upsert?: ResourceUpsertWithWhereUniqueWithoutLessonInput | ResourceUpsertWithWhereUniqueWithoutLessonInput[];
        createMany?: ResourceCreateManyLessonInputEnvelope;
        set?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[];
        disconnect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[];
        delete?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[];
        connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[];
        update?: ResourceUpdateWithWhereUniqueWithoutLessonInput | ResourceUpdateWithWhereUniqueWithoutLessonInput[];
        updateMany?: ResourceUpdateManyWithWhereWithoutLessonInput | ResourceUpdateManyWithWhereWithoutLessonInput[];
        deleteMany?: ResourceScalarWhereInput | ResourceScalarWhereInput[];
    };
    export type LessonProgressUpdateManyWithoutLessonNestedInput = {
        create?: XOR<LessonProgressCreateWithoutLessonInput, LessonProgressUncheckedCreateWithoutLessonInput> | LessonProgressCreateWithoutLessonInput[] | LessonProgressUncheckedCreateWithoutLessonInput[];
        connectOrCreate?: LessonProgressCreateOrConnectWithoutLessonInput | LessonProgressCreateOrConnectWithoutLessonInput[];
        upsert?: LessonProgressUpsertWithWhereUniqueWithoutLessonInput | LessonProgressUpsertWithWhereUniqueWithoutLessonInput[];
        createMany?: LessonProgressCreateManyLessonInputEnvelope;
        set?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[];
        disconnect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[];
        delete?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[];
        connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[];
        update?: LessonProgressUpdateWithWhereUniqueWithoutLessonInput | LessonProgressUpdateWithWhereUniqueWithoutLessonInput[];
        updateMany?: LessonProgressUpdateManyWithWhereWithoutLessonInput | LessonProgressUpdateManyWithWhereWithoutLessonInput[];
        deleteMany?: LessonProgressScalarWhereInput | LessonProgressScalarWhereInput[];
    };
    export type ResourceUncheckedUpdateManyWithoutLessonNestedInput = {
        create?: XOR<ResourceCreateWithoutLessonInput, ResourceUncheckedCreateWithoutLessonInput> | ResourceCreateWithoutLessonInput[] | ResourceUncheckedCreateWithoutLessonInput[];
        connectOrCreate?: ResourceCreateOrConnectWithoutLessonInput | ResourceCreateOrConnectWithoutLessonInput[];
        upsert?: ResourceUpsertWithWhereUniqueWithoutLessonInput | ResourceUpsertWithWhereUniqueWithoutLessonInput[];
        createMany?: ResourceCreateManyLessonInputEnvelope;
        set?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[];
        disconnect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[];
        delete?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[];
        connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[];
        update?: ResourceUpdateWithWhereUniqueWithoutLessonInput | ResourceUpdateWithWhereUniqueWithoutLessonInput[];
        updateMany?: ResourceUpdateManyWithWhereWithoutLessonInput | ResourceUpdateManyWithWhereWithoutLessonInput[];
        deleteMany?: ResourceScalarWhereInput | ResourceScalarWhereInput[];
    };
    export type LessonProgressUncheckedUpdateManyWithoutLessonNestedInput = {
        create?: XOR<LessonProgressCreateWithoutLessonInput, LessonProgressUncheckedCreateWithoutLessonInput> | LessonProgressCreateWithoutLessonInput[] | LessonProgressUncheckedCreateWithoutLessonInput[];
        connectOrCreate?: LessonProgressCreateOrConnectWithoutLessonInput | LessonProgressCreateOrConnectWithoutLessonInput[];
        upsert?: LessonProgressUpsertWithWhereUniqueWithoutLessonInput | LessonProgressUpsertWithWhereUniqueWithoutLessonInput[];
        createMany?: LessonProgressCreateManyLessonInputEnvelope;
        set?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[];
        disconnect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[];
        delete?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[];
        connect?: LessonProgressWhereUniqueInput | LessonProgressWhereUniqueInput[];
        update?: LessonProgressUpdateWithWhereUniqueWithoutLessonInput | LessonProgressUpdateWithWhereUniqueWithoutLessonInput[];
        updateMany?: LessonProgressUpdateManyWithWhereWithoutLessonInput | LessonProgressUpdateManyWithWhereWithoutLessonInput[];
        deleteMany?: LessonProgressScalarWhereInput | LessonProgressScalarWhereInput[];
    };
    export type LessonCreateNestedOneWithoutResourcesInput = {
        create?: XOR<LessonCreateWithoutResourcesInput, LessonUncheckedCreateWithoutResourcesInput>;
        connectOrCreate?: LessonCreateOrConnectWithoutResourcesInput;
        connect?: LessonWhereUniqueInput;
    };
    export type EnumResourceTypeFieldUpdateOperationsInput = {
        set?: $Enums.ResourceType;
    };
    export type LessonUpdateOneRequiredWithoutResourcesNestedInput = {
        create?: XOR<LessonCreateWithoutResourcesInput, LessonUncheckedCreateWithoutResourcesInput>;
        connectOrCreate?: LessonCreateOrConnectWithoutResourcesInput;
        upsert?: LessonUpsertWithoutResourcesInput;
        connect?: LessonWhereUniqueInput;
        update?: XOR<XOR<LessonUpdateToOneWithWhereWithoutResourcesInput, LessonUpdateWithoutResourcesInput>, LessonUncheckedUpdateWithoutResourcesInput>;
    };
    export type UserCreateNestedOneWithoutEnrollmentsInput = {
        create?: XOR<UserCreateWithoutEnrollmentsInput, UserUncheckedCreateWithoutEnrollmentsInput>;
        connectOrCreate?: UserCreateOrConnectWithoutEnrollmentsInput;
        connect?: UserWhereUniqueInput;
    };
    export type CourseCreateNestedOneWithoutEnrollmentsInput = {
        create?: XOR<CourseCreateWithoutEnrollmentsInput, CourseUncheckedCreateWithoutEnrollmentsInput>;
        connectOrCreate?: CourseCreateOrConnectWithoutEnrollmentsInput;
        connect?: CourseWhereUniqueInput;
    };
    export type UserUpdateOneRequiredWithoutEnrollmentsNestedInput = {
        create?: XOR<UserCreateWithoutEnrollmentsInput, UserUncheckedCreateWithoutEnrollmentsInput>;
        connectOrCreate?: UserCreateOrConnectWithoutEnrollmentsInput;
        upsert?: UserUpsertWithoutEnrollmentsInput;
        connect?: UserWhereUniqueInput;
        update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEnrollmentsInput, UserUpdateWithoutEnrollmentsInput>, UserUncheckedUpdateWithoutEnrollmentsInput>;
    };
    export type CourseUpdateOneRequiredWithoutEnrollmentsNestedInput = {
        create?: XOR<CourseCreateWithoutEnrollmentsInput, CourseUncheckedCreateWithoutEnrollmentsInput>;
        connectOrCreate?: CourseCreateOrConnectWithoutEnrollmentsInput;
        upsert?: CourseUpsertWithoutEnrollmentsInput;
        connect?: CourseWhereUniqueInput;
        update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutEnrollmentsInput, CourseUpdateWithoutEnrollmentsInput>, CourseUncheckedUpdateWithoutEnrollmentsInput>;
    };
    export type UserCreateNestedOneWithoutLessonProgressInput = {
        create?: XOR<UserCreateWithoutLessonProgressInput, UserUncheckedCreateWithoutLessonProgressInput>;
        connectOrCreate?: UserCreateOrConnectWithoutLessonProgressInput;
        connect?: UserWhereUniqueInput;
    };
    export type LessonCreateNestedOneWithoutLessonProgressInput = {
        create?: XOR<LessonCreateWithoutLessonProgressInput, LessonUncheckedCreateWithoutLessonProgressInput>;
        connectOrCreate?: LessonCreateOrConnectWithoutLessonProgressInput;
        connect?: LessonWhereUniqueInput;
    };
    export type EnumLessonStatusFieldUpdateOperationsInput = {
        set?: $Enums.LessonStatus;
    };
    export type UserUpdateOneRequiredWithoutLessonProgressNestedInput = {
        create?: XOR<UserCreateWithoutLessonProgressInput, UserUncheckedCreateWithoutLessonProgressInput>;
        connectOrCreate?: UserCreateOrConnectWithoutLessonProgressInput;
        upsert?: UserUpsertWithoutLessonProgressInput;
        connect?: UserWhereUniqueInput;
        update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLessonProgressInput, UserUpdateWithoutLessonProgressInput>, UserUncheckedUpdateWithoutLessonProgressInput>;
    };
    export type LessonUpdateOneRequiredWithoutLessonProgressNestedInput = {
        create?: XOR<LessonCreateWithoutLessonProgressInput, LessonUncheckedCreateWithoutLessonProgressInput>;
        connectOrCreate?: LessonCreateOrConnectWithoutLessonProgressInput;
        upsert?: LessonUpsertWithoutLessonProgressInput;
        connect?: LessonWhereUniqueInput;
        update?: XOR<XOR<LessonUpdateToOneWithWhereWithoutLessonProgressInput, LessonUpdateWithoutLessonProgressInput>, LessonUncheckedUpdateWithoutLessonProgressInput>;
    };
    export type NestedStringFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel>;
        in?: string[] | ListStringFieldRefInput<$PrismaModel>;
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
        lt?: string | StringFieldRefInput<$PrismaModel>;
        lte?: string | StringFieldRefInput<$PrismaModel>;
        gt?: string | StringFieldRefInput<$PrismaModel>;
        gte?: string | StringFieldRefInput<$PrismaModel>;
        contains?: string | StringFieldRefInput<$PrismaModel>;
        startsWith?: string | StringFieldRefInput<$PrismaModel>;
        endsWith?: string | StringFieldRefInput<$PrismaModel>;
        not?: NestedStringFilter<$PrismaModel> | string;
    };
    export type NestedStringNullableFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel> | null;
        in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
        lt?: string | StringFieldRefInput<$PrismaModel>;
        lte?: string | StringFieldRefInput<$PrismaModel>;
        gt?: string | StringFieldRefInput<$PrismaModel>;
        gte?: string | StringFieldRefInput<$PrismaModel>;
        contains?: string | StringFieldRefInput<$PrismaModel>;
        startsWith?: string | StringFieldRefInput<$PrismaModel>;
        endsWith?: string | StringFieldRefInput<$PrismaModel>;
        not?: NestedStringNullableFilter<$PrismaModel> | string | null;
    };
    export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
        equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>;
        in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>;
        notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>;
        not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole;
    };
    export type NestedDateTimeFilter<$PrismaModel = never> = {
        equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
        notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
        lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
    };
    export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel>;
        in?: string[] | ListStringFieldRefInput<$PrismaModel>;
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
        lt?: string | StringFieldRefInput<$PrismaModel>;
        lte?: string | StringFieldRefInput<$PrismaModel>;
        gt?: string | StringFieldRefInput<$PrismaModel>;
        gte?: string | StringFieldRefInput<$PrismaModel>;
        contains?: string | StringFieldRefInput<$PrismaModel>;
        startsWith?: string | StringFieldRefInput<$PrismaModel>;
        endsWith?: string | StringFieldRefInput<$PrismaModel>;
        not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedStringFilter<$PrismaModel>;
        _max?: NestedStringFilter<$PrismaModel>;
    };
    export type NestedIntFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel>;
        in?: number[] | ListIntFieldRefInput<$PrismaModel>;
        notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
        lt?: number | IntFieldRefInput<$PrismaModel>;
        lte?: number | IntFieldRefInput<$PrismaModel>;
        gt?: number | IntFieldRefInput<$PrismaModel>;
        gte?: number | IntFieldRefInput<$PrismaModel>;
        not?: NestedIntFilter<$PrismaModel> | number;
    };
    export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel> | null;
        in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
        notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
        lt?: string | StringFieldRefInput<$PrismaModel>;
        lte?: string | StringFieldRefInput<$PrismaModel>;
        gt?: string | StringFieldRefInput<$PrismaModel>;
        gte?: string | StringFieldRefInput<$PrismaModel>;
        contains?: string | StringFieldRefInput<$PrismaModel>;
        startsWith?: string | StringFieldRefInput<$PrismaModel>;
        endsWith?: string | StringFieldRefInput<$PrismaModel>;
        not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
        _count?: NestedIntNullableFilter<$PrismaModel>;
        _min?: NestedStringNullableFilter<$PrismaModel>;
        _max?: NestedStringNullableFilter<$PrismaModel>;
    };
    export type NestedIntNullableFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel> | null;
        in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
        notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
        lt?: number | IntFieldRefInput<$PrismaModel>;
        lte?: number | IntFieldRefInput<$PrismaModel>;
        gt?: number | IntFieldRefInput<$PrismaModel>;
        gte?: number | IntFieldRefInput<$PrismaModel>;
        not?: NestedIntNullableFilter<$PrismaModel> | number | null;
    };
    export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>;
        in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>;
        notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>;
        not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumUserRoleFilter<$PrismaModel>;
        _max?: NestedEnumUserRoleFilter<$PrismaModel>;
    };
    export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
        equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
        notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
        lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedDateTimeFilter<$PrismaModel>;
        _max?: NestedDateTimeFilter<$PrismaModel>;
    };
    export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel>;
        in?: number[] | ListIntFieldRefInput<$PrismaModel>;
        notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
        lt?: number | IntFieldRefInput<$PrismaModel>;
        lte?: number | IntFieldRefInput<$PrismaModel>;
        gt?: number | IntFieldRefInput<$PrismaModel>;
        gte?: number | IntFieldRefInput<$PrismaModel>;
        not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
        _count?: NestedIntFilter<$PrismaModel>;
        _avg?: NestedFloatFilter<$PrismaModel>;
        _sum?: NestedIntFilter<$PrismaModel>;
        _min?: NestedIntFilter<$PrismaModel>;
        _max?: NestedIntFilter<$PrismaModel>;
    };
    export type NestedFloatFilter<$PrismaModel = never> = {
        equals?: number | FloatFieldRefInput<$PrismaModel>;
        in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
        notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
        lt?: number | FloatFieldRefInput<$PrismaModel>;
        lte?: number | FloatFieldRefInput<$PrismaModel>;
        gt?: number | FloatFieldRefInput<$PrismaModel>;
        gte?: number | FloatFieldRefInput<$PrismaModel>;
        not?: NestedFloatFilter<$PrismaModel> | number;
    };
    export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
        equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
        in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
        notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
        lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
    };
    export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
        equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
        in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
        notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
        lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
        not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
        _count?: NestedIntNullableFilter<$PrismaModel>;
        _min?: NestedDateTimeNullableFilter<$PrismaModel>;
        _max?: NestedDateTimeNullableFilter<$PrismaModel>;
    };
    export type NestedEnumResourceTypeFilter<$PrismaModel = never> = {
        equals?: $Enums.ResourceType | EnumResourceTypeFieldRefInput<$PrismaModel>;
        in?: $Enums.ResourceType[] | ListEnumResourceTypeFieldRefInput<$PrismaModel>;
        notIn?: $Enums.ResourceType[] | ListEnumResourceTypeFieldRefInput<$PrismaModel>;
        not?: NestedEnumResourceTypeFilter<$PrismaModel> | $Enums.ResourceType;
    };
    export type NestedEnumResourceTypeWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.ResourceType | EnumResourceTypeFieldRefInput<$PrismaModel>;
        in?: $Enums.ResourceType[] | ListEnumResourceTypeFieldRefInput<$PrismaModel>;
        notIn?: $Enums.ResourceType[] | ListEnumResourceTypeFieldRefInput<$PrismaModel>;
        not?: NestedEnumResourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.ResourceType;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumResourceTypeFilter<$PrismaModel>;
        _max?: NestedEnumResourceTypeFilter<$PrismaModel>;
    };
    export type NestedEnumLessonStatusFilter<$PrismaModel = never> = {
        equals?: $Enums.LessonStatus | EnumLessonStatusFieldRefInput<$PrismaModel>;
        in?: $Enums.LessonStatus[] | ListEnumLessonStatusFieldRefInput<$PrismaModel>;
        notIn?: $Enums.LessonStatus[] | ListEnumLessonStatusFieldRefInput<$PrismaModel>;
        not?: NestedEnumLessonStatusFilter<$PrismaModel> | $Enums.LessonStatus;
    };
    export type NestedEnumLessonStatusWithAggregatesFilter<$PrismaModel = never> = {
        equals?: $Enums.LessonStatus | EnumLessonStatusFieldRefInput<$PrismaModel>;
        in?: $Enums.LessonStatus[] | ListEnumLessonStatusFieldRefInput<$PrismaModel>;
        notIn?: $Enums.LessonStatus[] | ListEnumLessonStatusFieldRefInput<$PrismaModel>;
        not?: NestedEnumLessonStatusWithAggregatesFilter<$PrismaModel> | $Enums.LessonStatus;
        _count?: NestedIntFilter<$PrismaModel>;
        _min?: NestedEnumLessonStatusFilter<$PrismaModel>;
        _max?: NestedEnumLessonStatusFilter<$PrismaModel>;
    };
    export type EnrollmentCreateWithoutUserInput = {
        id?: string;
        enrollmentDate?: Date | string;
        course: CourseCreateNestedOneWithoutEnrollmentsInput;
    };
    export type EnrollmentUncheckedCreateWithoutUserInput = {
        id?: string;
        courseId: string;
        enrollmentDate?: Date | string;
    };
    export type EnrollmentCreateOrConnectWithoutUserInput = {
        where: EnrollmentWhereUniqueInput;
        create: XOR<EnrollmentCreateWithoutUserInput, EnrollmentUncheckedCreateWithoutUserInput>;
    };
    export type EnrollmentCreateManyUserInputEnvelope = {
        data: EnrollmentCreateManyUserInput | EnrollmentCreateManyUserInput[];
        skipDuplicates?: boolean;
    };
    export type LessonProgressCreateWithoutUserInput = {
        id?: string;
        status?: $Enums.LessonStatus;
        completedAt?: Date | string | null;
        lesson: LessonCreateNestedOneWithoutLessonProgressInput;
    };
    export type LessonProgressUncheckedCreateWithoutUserInput = {
        id?: string;
        lessonId: string;
        status?: $Enums.LessonStatus;
        completedAt?: Date | string | null;
    };
    export type LessonProgressCreateOrConnectWithoutUserInput = {
        where: LessonProgressWhereUniqueInput;
        create: XOR<LessonProgressCreateWithoutUserInput, LessonProgressUncheckedCreateWithoutUserInput>;
    };
    export type LessonProgressCreateManyUserInputEnvelope = {
        data: LessonProgressCreateManyUserInput | LessonProgressCreateManyUserInput[];
        skipDuplicates?: boolean;
    };
    export type CourseCreateWithoutCreatedByInput = {
        id?: string;
        courseCode: string;
        title: string;
        description?: string | null;
        createdAt?: Date | string;
        modules?: ModuleCreateNestedManyWithoutCourseInput;
        enrollments?: EnrollmentCreateNestedManyWithoutCourseInput;
    };
    export type CourseUncheckedCreateWithoutCreatedByInput = {
        id?: string;
        courseCode: string;
        title: string;
        description?: string | null;
        createdAt?: Date | string;
        modules?: ModuleUncheckedCreateNestedManyWithoutCourseInput;
        enrollments?: EnrollmentUncheckedCreateNestedManyWithoutCourseInput;
    };
    export type CourseCreateOrConnectWithoutCreatedByInput = {
        where: CourseWhereUniqueInput;
        create: XOR<CourseCreateWithoutCreatedByInput, CourseUncheckedCreateWithoutCreatedByInput>;
    };
    export type CourseCreateManyCreatedByInputEnvelope = {
        data: CourseCreateManyCreatedByInput | CourseCreateManyCreatedByInput[];
        skipDuplicates?: boolean;
    };
    export type EnrollmentUpsertWithWhereUniqueWithoutUserInput = {
        where: EnrollmentWhereUniqueInput;
        update: XOR<EnrollmentUpdateWithoutUserInput, EnrollmentUncheckedUpdateWithoutUserInput>;
        create: XOR<EnrollmentCreateWithoutUserInput, EnrollmentUncheckedCreateWithoutUserInput>;
    };
    export type EnrollmentUpdateWithWhereUniqueWithoutUserInput = {
        where: EnrollmentWhereUniqueInput;
        data: XOR<EnrollmentUpdateWithoutUserInput, EnrollmentUncheckedUpdateWithoutUserInput>;
    };
    export type EnrollmentUpdateManyWithWhereWithoutUserInput = {
        where: EnrollmentScalarWhereInput;
        data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyWithoutUserInput>;
    };
    export type EnrollmentScalarWhereInput = {
        AND?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[];
        OR?: EnrollmentScalarWhereInput[];
        NOT?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[];
        id?: StringFilter<"Enrollment"> | string;
        userId?: StringFilter<"Enrollment"> | string;
        courseId?: StringFilter<"Enrollment"> | string;
        enrollmentDate?: DateTimeFilter<"Enrollment"> | Date | string;
    };
    export type LessonProgressUpsertWithWhereUniqueWithoutUserInput = {
        where: LessonProgressWhereUniqueInput;
        update: XOR<LessonProgressUpdateWithoutUserInput, LessonProgressUncheckedUpdateWithoutUserInput>;
        create: XOR<LessonProgressCreateWithoutUserInput, LessonProgressUncheckedCreateWithoutUserInput>;
    };
    export type LessonProgressUpdateWithWhereUniqueWithoutUserInput = {
        where: LessonProgressWhereUniqueInput;
        data: XOR<LessonProgressUpdateWithoutUserInput, LessonProgressUncheckedUpdateWithoutUserInput>;
    };
    export type LessonProgressUpdateManyWithWhereWithoutUserInput = {
        where: LessonProgressScalarWhereInput;
        data: XOR<LessonProgressUpdateManyMutationInput, LessonProgressUncheckedUpdateManyWithoutUserInput>;
    };
    export type LessonProgressScalarWhereInput = {
        AND?: LessonProgressScalarWhereInput | LessonProgressScalarWhereInput[];
        OR?: LessonProgressScalarWhereInput[];
        NOT?: LessonProgressScalarWhereInput | LessonProgressScalarWhereInput[];
        id?: StringFilter<"LessonProgress"> | string;
        userId?: StringFilter<"LessonProgress"> | string;
        lessonId?: StringFilter<"LessonProgress"> | string;
        status?: EnumLessonStatusFilter<"LessonProgress"> | $Enums.LessonStatus;
        completedAt?: DateTimeNullableFilter<"LessonProgress"> | Date | string | null;
    };
    export type CourseUpsertWithWhereUniqueWithoutCreatedByInput = {
        where: CourseWhereUniqueInput;
        update: XOR<CourseUpdateWithoutCreatedByInput, CourseUncheckedUpdateWithoutCreatedByInput>;
        create: XOR<CourseCreateWithoutCreatedByInput, CourseUncheckedCreateWithoutCreatedByInput>;
    };
    export type CourseUpdateWithWhereUniqueWithoutCreatedByInput = {
        where: CourseWhereUniqueInput;
        data: XOR<CourseUpdateWithoutCreatedByInput, CourseUncheckedUpdateWithoutCreatedByInput>;
    };
    export type CourseUpdateManyWithWhereWithoutCreatedByInput = {
        where: CourseScalarWhereInput;
        data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutCreatedByInput>;
    };
    export type CourseScalarWhereInput = {
        AND?: CourseScalarWhereInput | CourseScalarWhereInput[];
        OR?: CourseScalarWhereInput[];
        NOT?: CourseScalarWhereInput | CourseScalarWhereInput[];
        id?: StringFilter<"Course"> | string;
        courseCode?: StringFilter<"Course"> | string;
        title?: StringFilter<"Course"> | string;
        description?: StringNullableFilter<"Course"> | string | null;
        createdById?: StringFilter<"Course"> | string;
        createdAt?: DateTimeFilter<"Course"> | Date | string;
    };
    export type UserCreateWithoutCreatedCoursesInput = {
        id?: string;
        googleId: string;
        email: string;
        fullName: string;
        profilePictureUrl?: string | null;
        role?: $Enums.UserRole;
        createdAt?: Date | string;
        enrollments?: EnrollmentCreateNestedManyWithoutUserInput;
        lessonProgress?: LessonProgressCreateNestedManyWithoutUserInput;
    };
    export type UserUncheckedCreateWithoutCreatedCoursesInput = {
        id?: string;
        googleId: string;
        email: string;
        fullName: string;
        profilePictureUrl?: string | null;
        role?: $Enums.UserRole;
        createdAt?: Date | string;
        enrollments?: EnrollmentUncheckedCreateNestedManyWithoutUserInput;
        lessonProgress?: LessonProgressUncheckedCreateNestedManyWithoutUserInput;
    };
    export type UserCreateOrConnectWithoutCreatedCoursesInput = {
        where: UserWhereUniqueInput;
        create: XOR<UserCreateWithoutCreatedCoursesInput, UserUncheckedCreateWithoutCreatedCoursesInput>;
    };
    export type ModuleCreateWithoutCourseInput = {
        id?: string;
        title: string;
        description?: string | null;
        moduleOrder: number;
        lessons?: LessonCreateNestedManyWithoutModuleInput;
    };
    export type ModuleUncheckedCreateWithoutCourseInput = {
        id?: string;
        title: string;
        description?: string | null;
        moduleOrder: number;
        lessons?: LessonUncheckedCreateNestedManyWithoutModuleInput;
    };
    export type ModuleCreateOrConnectWithoutCourseInput = {
        where: ModuleWhereUniqueInput;
        create: XOR<ModuleCreateWithoutCourseInput, ModuleUncheckedCreateWithoutCourseInput>;
    };
    export type ModuleCreateManyCourseInputEnvelope = {
        data: ModuleCreateManyCourseInput | ModuleCreateManyCourseInput[];
        skipDuplicates?: boolean;
    };
    export type EnrollmentCreateWithoutCourseInput = {
        id?: string;
        enrollmentDate?: Date | string;
        user: UserCreateNestedOneWithoutEnrollmentsInput;
    };
    export type EnrollmentUncheckedCreateWithoutCourseInput = {
        id?: string;
        userId: string;
        enrollmentDate?: Date | string;
    };
    export type EnrollmentCreateOrConnectWithoutCourseInput = {
        where: EnrollmentWhereUniqueInput;
        create: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput>;
    };
    export type EnrollmentCreateManyCourseInputEnvelope = {
        data: EnrollmentCreateManyCourseInput | EnrollmentCreateManyCourseInput[];
        skipDuplicates?: boolean;
    };
    export type UserUpsertWithoutCreatedCoursesInput = {
        update: XOR<UserUpdateWithoutCreatedCoursesInput, UserUncheckedUpdateWithoutCreatedCoursesInput>;
        create: XOR<UserCreateWithoutCreatedCoursesInput, UserUncheckedCreateWithoutCreatedCoursesInput>;
        where?: UserWhereInput;
    };
    export type UserUpdateToOneWithWhereWithoutCreatedCoursesInput = {
        where?: UserWhereInput;
        data: XOR<UserUpdateWithoutCreatedCoursesInput, UserUncheckedUpdateWithoutCreatedCoursesInput>;
    };
    export type UserUpdateWithoutCreatedCoursesInput = {
        id?: StringFieldUpdateOperationsInput | string;
        googleId?: StringFieldUpdateOperationsInput | string;
        email?: StringFieldUpdateOperationsInput | string;
        fullName?: StringFieldUpdateOperationsInput | string;
        profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null;
        role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        enrollments?: EnrollmentUpdateManyWithoutUserNestedInput;
        lessonProgress?: LessonProgressUpdateManyWithoutUserNestedInput;
    };
    export type UserUncheckedUpdateWithoutCreatedCoursesInput = {
        id?: StringFieldUpdateOperationsInput | string;
        googleId?: StringFieldUpdateOperationsInput | string;
        email?: StringFieldUpdateOperationsInput | string;
        fullName?: StringFieldUpdateOperationsInput | string;
        profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null;
        role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        enrollments?: EnrollmentUncheckedUpdateManyWithoutUserNestedInput;
        lessonProgress?: LessonProgressUncheckedUpdateManyWithoutUserNestedInput;
    };
    export type ModuleUpsertWithWhereUniqueWithoutCourseInput = {
        where: ModuleWhereUniqueInput;
        update: XOR<ModuleUpdateWithoutCourseInput, ModuleUncheckedUpdateWithoutCourseInput>;
        create: XOR<ModuleCreateWithoutCourseInput, ModuleUncheckedCreateWithoutCourseInput>;
    };
    export type ModuleUpdateWithWhereUniqueWithoutCourseInput = {
        where: ModuleWhereUniqueInput;
        data: XOR<ModuleUpdateWithoutCourseInput, ModuleUncheckedUpdateWithoutCourseInput>;
    };
    export type ModuleUpdateManyWithWhereWithoutCourseInput = {
        where: ModuleScalarWhereInput;
        data: XOR<ModuleUpdateManyMutationInput, ModuleUncheckedUpdateManyWithoutCourseInput>;
    };
    export type ModuleScalarWhereInput = {
        AND?: ModuleScalarWhereInput | ModuleScalarWhereInput[];
        OR?: ModuleScalarWhereInput[];
        NOT?: ModuleScalarWhereInput | ModuleScalarWhereInput[];
        id?: StringFilter<"Module"> | string;
        courseId?: StringFilter<"Module"> | string;
        title?: StringFilter<"Module"> | string;
        description?: StringNullableFilter<"Module"> | string | null;
        moduleOrder?: IntFilter<"Module"> | number;
    };
    export type EnrollmentUpsertWithWhereUniqueWithoutCourseInput = {
        where: EnrollmentWhereUniqueInput;
        update: XOR<EnrollmentUpdateWithoutCourseInput, EnrollmentUncheckedUpdateWithoutCourseInput>;
        create: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput>;
    };
    export type EnrollmentUpdateWithWhereUniqueWithoutCourseInput = {
        where: EnrollmentWhereUniqueInput;
        data: XOR<EnrollmentUpdateWithoutCourseInput, EnrollmentUncheckedUpdateWithoutCourseInput>;
    };
    export type EnrollmentUpdateManyWithWhereWithoutCourseInput = {
        where: EnrollmentScalarWhereInput;
        data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyWithoutCourseInput>;
    };
    export type CourseCreateWithoutModulesInput = {
        id?: string;
        courseCode: string;
        title: string;
        description?: string | null;
        createdAt?: Date | string;
        createdBy: UserCreateNestedOneWithoutCreatedCoursesInput;
        enrollments?: EnrollmentCreateNestedManyWithoutCourseInput;
    };
    export type CourseUncheckedCreateWithoutModulesInput = {
        id?: string;
        courseCode: string;
        title: string;
        description?: string | null;
        createdById: string;
        createdAt?: Date | string;
        enrollments?: EnrollmentUncheckedCreateNestedManyWithoutCourseInput;
    };
    export type CourseCreateOrConnectWithoutModulesInput = {
        where: CourseWhereUniqueInput;
        create: XOR<CourseCreateWithoutModulesInput, CourseUncheckedCreateWithoutModulesInput>;
    };
    export type LessonCreateWithoutModuleInput = {
        id?: string;
        title: string;
        description?: string | null;
        lessonDate?: Date | string | null;
        zoomInfo?: string | null;
        lessonOrder: number;
        instructor: InstructorCreateNestedOneWithoutLessonsInput;
        resources?: ResourceCreateNestedManyWithoutLessonInput;
        lessonProgress?: LessonProgressCreateNestedManyWithoutLessonInput;
    };
    export type LessonUncheckedCreateWithoutModuleInput = {
        id?: string;
        instructorId: string;
        title: string;
        description?: string | null;
        lessonDate?: Date | string | null;
        zoomInfo?: string | null;
        lessonOrder: number;
        resources?: ResourceUncheckedCreateNestedManyWithoutLessonInput;
        lessonProgress?: LessonProgressUncheckedCreateNestedManyWithoutLessonInput;
    };
    export type LessonCreateOrConnectWithoutModuleInput = {
        where: LessonWhereUniqueInput;
        create: XOR<LessonCreateWithoutModuleInput, LessonUncheckedCreateWithoutModuleInput>;
    };
    export type LessonCreateManyModuleInputEnvelope = {
        data: LessonCreateManyModuleInput | LessonCreateManyModuleInput[];
        skipDuplicates?: boolean;
    };
    export type CourseUpsertWithoutModulesInput = {
        update: XOR<CourseUpdateWithoutModulesInput, CourseUncheckedUpdateWithoutModulesInput>;
        create: XOR<CourseCreateWithoutModulesInput, CourseUncheckedCreateWithoutModulesInput>;
        where?: CourseWhereInput;
    };
    export type CourseUpdateToOneWithWhereWithoutModulesInput = {
        where?: CourseWhereInput;
        data: XOR<CourseUpdateWithoutModulesInput, CourseUncheckedUpdateWithoutModulesInput>;
    };
    export type CourseUpdateWithoutModulesInput = {
        id?: StringFieldUpdateOperationsInput | string;
        courseCode?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        createdBy?: UserUpdateOneRequiredWithoutCreatedCoursesNestedInput;
        enrollments?: EnrollmentUpdateManyWithoutCourseNestedInput;
    };
    export type CourseUncheckedUpdateWithoutModulesInput = {
        id?: StringFieldUpdateOperationsInput | string;
        courseCode?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        createdById?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        enrollments?: EnrollmentUncheckedUpdateManyWithoutCourseNestedInput;
    };
    export type LessonUpsertWithWhereUniqueWithoutModuleInput = {
        where: LessonWhereUniqueInput;
        update: XOR<LessonUpdateWithoutModuleInput, LessonUncheckedUpdateWithoutModuleInput>;
        create: XOR<LessonCreateWithoutModuleInput, LessonUncheckedCreateWithoutModuleInput>;
    };
    export type LessonUpdateWithWhereUniqueWithoutModuleInput = {
        where: LessonWhereUniqueInput;
        data: XOR<LessonUpdateWithoutModuleInput, LessonUncheckedUpdateWithoutModuleInput>;
    };
    export type LessonUpdateManyWithWhereWithoutModuleInput = {
        where: LessonScalarWhereInput;
        data: XOR<LessonUpdateManyMutationInput, LessonUncheckedUpdateManyWithoutModuleInput>;
    };
    export type LessonScalarWhereInput = {
        AND?: LessonScalarWhereInput | LessonScalarWhereInput[];
        OR?: LessonScalarWhereInput[];
        NOT?: LessonScalarWhereInput | LessonScalarWhereInput[];
        id?: StringFilter<"Lesson"> | string;
        moduleId?: StringFilter<"Lesson"> | string;
        instructorId?: StringFilter<"Lesson"> | string;
        title?: StringFilter<"Lesson"> | string;
        description?: StringNullableFilter<"Lesson"> | string | null;
        lessonDate?: DateTimeNullableFilter<"Lesson"> | Date | string | null;
        zoomInfo?: StringNullableFilter<"Lesson"> | string | null;
        lessonOrder?: IntFilter<"Lesson"> | number;
    };
    export type LessonCreateWithoutInstructorInput = {
        id?: string;
        title: string;
        description?: string | null;
        lessonDate?: Date | string | null;
        zoomInfo?: string | null;
        lessonOrder: number;
        module: ModuleCreateNestedOneWithoutLessonsInput;
        resources?: ResourceCreateNestedManyWithoutLessonInput;
        lessonProgress?: LessonProgressCreateNestedManyWithoutLessonInput;
    };
    export type LessonUncheckedCreateWithoutInstructorInput = {
        id?: string;
        moduleId: string;
        title: string;
        description?: string | null;
        lessonDate?: Date | string | null;
        zoomInfo?: string | null;
        lessonOrder: number;
        resources?: ResourceUncheckedCreateNestedManyWithoutLessonInput;
        lessonProgress?: LessonProgressUncheckedCreateNestedManyWithoutLessonInput;
    };
    export type LessonCreateOrConnectWithoutInstructorInput = {
        where: LessonWhereUniqueInput;
        create: XOR<LessonCreateWithoutInstructorInput, LessonUncheckedCreateWithoutInstructorInput>;
    };
    export type LessonCreateManyInstructorInputEnvelope = {
        data: LessonCreateManyInstructorInput | LessonCreateManyInstructorInput[];
        skipDuplicates?: boolean;
    };
    export type LessonUpsertWithWhereUniqueWithoutInstructorInput = {
        where: LessonWhereUniqueInput;
        update: XOR<LessonUpdateWithoutInstructorInput, LessonUncheckedUpdateWithoutInstructorInput>;
        create: XOR<LessonCreateWithoutInstructorInput, LessonUncheckedCreateWithoutInstructorInput>;
    };
    export type LessonUpdateWithWhereUniqueWithoutInstructorInput = {
        where: LessonWhereUniqueInput;
        data: XOR<LessonUpdateWithoutInstructorInput, LessonUncheckedUpdateWithoutInstructorInput>;
    };
    export type LessonUpdateManyWithWhereWithoutInstructorInput = {
        where: LessonScalarWhereInput;
        data: XOR<LessonUpdateManyMutationInput, LessonUncheckedUpdateManyWithoutInstructorInput>;
    };
    export type ModuleCreateWithoutLessonsInput = {
        id?: string;
        title: string;
        description?: string | null;
        moduleOrder: number;
        course: CourseCreateNestedOneWithoutModulesInput;
    };
    export type ModuleUncheckedCreateWithoutLessonsInput = {
        id?: string;
        courseId: string;
        title: string;
        description?: string | null;
        moduleOrder: number;
    };
    export type ModuleCreateOrConnectWithoutLessonsInput = {
        where: ModuleWhereUniqueInput;
        create: XOR<ModuleCreateWithoutLessonsInput, ModuleUncheckedCreateWithoutLessonsInput>;
    };
    export type InstructorCreateWithoutLessonsInput = {
        id?: string;
        fullName: string;
        title?: string | null;
        bio?: string | null;
    };
    export type InstructorUncheckedCreateWithoutLessonsInput = {
        id?: string;
        fullName: string;
        title?: string | null;
        bio?: string | null;
    };
    export type InstructorCreateOrConnectWithoutLessonsInput = {
        where: InstructorWhereUniqueInput;
        create: XOR<InstructorCreateWithoutLessonsInput, InstructorUncheckedCreateWithoutLessonsInput>;
    };
    export type ResourceCreateWithoutLessonInput = {
        id?: string;
        resourceType: $Enums.ResourceType;
        title: string;
        url: string;
        deadline?: Date | string | null;
    };
    export type ResourceUncheckedCreateWithoutLessonInput = {
        id?: string;
        resourceType: $Enums.ResourceType;
        title: string;
        url: string;
        deadline?: Date | string | null;
    };
    export type ResourceCreateOrConnectWithoutLessonInput = {
        where: ResourceWhereUniqueInput;
        create: XOR<ResourceCreateWithoutLessonInput, ResourceUncheckedCreateWithoutLessonInput>;
    };
    export type ResourceCreateManyLessonInputEnvelope = {
        data: ResourceCreateManyLessonInput | ResourceCreateManyLessonInput[];
        skipDuplicates?: boolean;
    };
    export type LessonProgressCreateWithoutLessonInput = {
        id?: string;
        status?: $Enums.LessonStatus;
        completedAt?: Date | string | null;
        user: UserCreateNestedOneWithoutLessonProgressInput;
    };
    export type LessonProgressUncheckedCreateWithoutLessonInput = {
        id?: string;
        userId: string;
        status?: $Enums.LessonStatus;
        completedAt?: Date | string | null;
    };
    export type LessonProgressCreateOrConnectWithoutLessonInput = {
        where: LessonProgressWhereUniqueInput;
        create: XOR<LessonProgressCreateWithoutLessonInput, LessonProgressUncheckedCreateWithoutLessonInput>;
    };
    export type LessonProgressCreateManyLessonInputEnvelope = {
        data: LessonProgressCreateManyLessonInput | LessonProgressCreateManyLessonInput[];
        skipDuplicates?: boolean;
    };
    export type ModuleUpsertWithoutLessonsInput = {
        update: XOR<ModuleUpdateWithoutLessonsInput, ModuleUncheckedUpdateWithoutLessonsInput>;
        create: XOR<ModuleCreateWithoutLessonsInput, ModuleUncheckedCreateWithoutLessonsInput>;
        where?: ModuleWhereInput;
    };
    export type ModuleUpdateToOneWithWhereWithoutLessonsInput = {
        where?: ModuleWhereInput;
        data: XOR<ModuleUpdateWithoutLessonsInput, ModuleUncheckedUpdateWithoutLessonsInput>;
    };
    export type ModuleUpdateWithoutLessonsInput = {
        id?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        moduleOrder?: IntFieldUpdateOperationsInput | number;
        course?: CourseUpdateOneRequiredWithoutModulesNestedInput;
    };
    export type ModuleUncheckedUpdateWithoutLessonsInput = {
        id?: StringFieldUpdateOperationsInput | string;
        courseId?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        moduleOrder?: IntFieldUpdateOperationsInput | number;
    };
    export type InstructorUpsertWithoutLessonsInput = {
        update: XOR<InstructorUpdateWithoutLessonsInput, InstructorUncheckedUpdateWithoutLessonsInput>;
        create: XOR<InstructorCreateWithoutLessonsInput, InstructorUncheckedCreateWithoutLessonsInput>;
        where?: InstructorWhereInput;
    };
    export type InstructorUpdateToOneWithWhereWithoutLessonsInput = {
        where?: InstructorWhereInput;
        data: XOR<InstructorUpdateWithoutLessonsInput, InstructorUncheckedUpdateWithoutLessonsInput>;
    };
    export type InstructorUpdateWithoutLessonsInput = {
        id?: StringFieldUpdateOperationsInput | string;
        fullName?: StringFieldUpdateOperationsInput | string;
        title?: NullableStringFieldUpdateOperationsInput | string | null;
        bio?: NullableStringFieldUpdateOperationsInput | string | null;
    };
    export type InstructorUncheckedUpdateWithoutLessonsInput = {
        id?: StringFieldUpdateOperationsInput | string;
        fullName?: StringFieldUpdateOperationsInput | string;
        title?: NullableStringFieldUpdateOperationsInput | string | null;
        bio?: NullableStringFieldUpdateOperationsInput | string | null;
    };
    export type ResourceUpsertWithWhereUniqueWithoutLessonInput = {
        where: ResourceWhereUniqueInput;
        update: XOR<ResourceUpdateWithoutLessonInput, ResourceUncheckedUpdateWithoutLessonInput>;
        create: XOR<ResourceCreateWithoutLessonInput, ResourceUncheckedCreateWithoutLessonInput>;
    };
    export type ResourceUpdateWithWhereUniqueWithoutLessonInput = {
        where: ResourceWhereUniqueInput;
        data: XOR<ResourceUpdateWithoutLessonInput, ResourceUncheckedUpdateWithoutLessonInput>;
    };
    export type ResourceUpdateManyWithWhereWithoutLessonInput = {
        where: ResourceScalarWhereInput;
        data: XOR<ResourceUpdateManyMutationInput, ResourceUncheckedUpdateManyWithoutLessonInput>;
    };
    export type ResourceScalarWhereInput = {
        AND?: ResourceScalarWhereInput | ResourceScalarWhereInput[];
        OR?: ResourceScalarWhereInput[];
        NOT?: ResourceScalarWhereInput | ResourceScalarWhereInput[];
        id?: StringFilter<"Resource"> | string;
        lessonId?: StringFilter<"Resource"> | string;
        resourceType?: EnumResourceTypeFilter<"Resource"> | $Enums.ResourceType;
        title?: StringFilter<"Resource"> | string;
        url?: StringFilter<"Resource"> | string;
        deadline?: DateTimeNullableFilter<"Resource"> | Date | string | null;
    };
    export type LessonProgressUpsertWithWhereUniqueWithoutLessonInput = {
        where: LessonProgressWhereUniqueInput;
        update: XOR<LessonProgressUpdateWithoutLessonInput, LessonProgressUncheckedUpdateWithoutLessonInput>;
        create: XOR<LessonProgressCreateWithoutLessonInput, LessonProgressUncheckedCreateWithoutLessonInput>;
    };
    export type LessonProgressUpdateWithWhereUniqueWithoutLessonInput = {
        where: LessonProgressWhereUniqueInput;
        data: XOR<LessonProgressUpdateWithoutLessonInput, LessonProgressUncheckedUpdateWithoutLessonInput>;
    };
    export type LessonProgressUpdateManyWithWhereWithoutLessonInput = {
        where: LessonProgressScalarWhereInput;
        data: XOR<LessonProgressUpdateManyMutationInput, LessonProgressUncheckedUpdateManyWithoutLessonInput>;
    };
    export type LessonCreateWithoutResourcesInput = {
        id?: string;
        title: string;
        description?: string | null;
        lessonDate?: Date | string | null;
        zoomInfo?: string | null;
        lessonOrder: number;
        module: ModuleCreateNestedOneWithoutLessonsInput;
        instructor: InstructorCreateNestedOneWithoutLessonsInput;
        lessonProgress?: LessonProgressCreateNestedManyWithoutLessonInput;
    };
    export type LessonUncheckedCreateWithoutResourcesInput = {
        id?: string;
        moduleId: string;
        instructorId: string;
        title: string;
        description?: string | null;
        lessonDate?: Date | string | null;
        zoomInfo?: string | null;
        lessonOrder: number;
        lessonProgress?: LessonProgressUncheckedCreateNestedManyWithoutLessonInput;
    };
    export type LessonCreateOrConnectWithoutResourcesInput = {
        where: LessonWhereUniqueInput;
        create: XOR<LessonCreateWithoutResourcesInput, LessonUncheckedCreateWithoutResourcesInput>;
    };
    export type LessonUpsertWithoutResourcesInput = {
        update: XOR<LessonUpdateWithoutResourcesInput, LessonUncheckedUpdateWithoutResourcesInput>;
        create: XOR<LessonCreateWithoutResourcesInput, LessonUncheckedCreateWithoutResourcesInput>;
        where?: LessonWhereInput;
    };
    export type LessonUpdateToOneWithWhereWithoutResourcesInput = {
        where?: LessonWhereInput;
        data: XOR<LessonUpdateWithoutResourcesInput, LessonUncheckedUpdateWithoutResourcesInput>;
    };
    export type LessonUpdateWithoutResourcesInput = {
        id?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
        zoomInfo?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonOrder?: IntFieldUpdateOperationsInput | number;
        module?: ModuleUpdateOneRequiredWithoutLessonsNestedInput;
        instructor?: InstructorUpdateOneRequiredWithoutLessonsNestedInput;
        lessonProgress?: LessonProgressUpdateManyWithoutLessonNestedInput;
    };
    export type LessonUncheckedUpdateWithoutResourcesInput = {
        id?: StringFieldUpdateOperationsInput | string;
        moduleId?: StringFieldUpdateOperationsInput | string;
        instructorId?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
        zoomInfo?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonOrder?: IntFieldUpdateOperationsInput | number;
        lessonProgress?: LessonProgressUncheckedUpdateManyWithoutLessonNestedInput;
    };
    export type UserCreateWithoutEnrollmentsInput = {
        id?: string;
        googleId: string;
        email: string;
        fullName: string;
        profilePictureUrl?: string | null;
        role?: $Enums.UserRole;
        createdAt?: Date | string;
        lessonProgress?: LessonProgressCreateNestedManyWithoutUserInput;
        createdCourses?: CourseCreateNestedManyWithoutCreatedByInput;
    };
    export type UserUncheckedCreateWithoutEnrollmentsInput = {
        id?: string;
        googleId: string;
        email: string;
        fullName: string;
        profilePictureUrl?: string | null;
        role?: $Enums.UserRole;
        createdAt?: Date | string;
        lessonProgress?: LessonProgressUncheckedCreateNestedManyWithoutUserInput;
        createdCourses?: CourseUncheckedCreateNestedManyWithoutCreatedByInput;
    };
    export type UserCreateOrConnectWithoutEnrollmentsInput = {
        where: UserWhereUniqueInput;
        create: XOR<UserCreateWithoutEnrollmentsInput, UserUncheckedCreateWithoutEnrollmentsInput>;
    };
    export type CourseCreateWithoutEnrollmentsInput = {
        id?: string;
        courseCode: string;
        title: string;
        description?: string | null;
        createdAt?: Date | string;
        createdBy: UserCreateNestedOneWithoutCreatedCoursesInput;
        modules?: ModuleCreateNestedManyWithoutCourseInput;
    };
    export type CourseUncheckedCreateWithoutEnrollmentsInput = {
        id?: string;
        courseCode: string;
        title: string;
        description?: string | null;
        createdById: string;
        createdAt?: Date | string;
        modules?: ModuleUncheckedCreateNestedManyWithoutCourseInput;
    };
    export type CourseCreateOrConnectWithoutEnrollmentsInput = {
        where: CourseWhereUniqueInput;
        create: XOR<CourseCreateWithoutEnrollmentsInput, CourseUncheckedCreateWithoutEnrollmentsInput>;
    };
    export type UserUpsertWithoutEnrollmentsInput = {
        update: XOR<UserUpdateWithoutEnrollmentsInput, UserUncheckedUpdateWithoutEnrollmentsInput>;
        create: XOR<UserCreateWithoutEnrollmentsInput, UserUncheckedCreateWithoutEnrollmentsInput>;
        where?: UserWhereInput;
    };
    export type UserUpdateToOneWithWhereWithoutEnrollmentsInput = {
        where?: UserWhereInput;
        data: XOR<UserUpdateWithoutEnrollmentsInput, UserUncheckedUpdateWithoutEnrollmentsInput>;
    };
    export type UserUpdateWithoutEnrollmentsInput = {
        id?: StringFieldUpdateOperationsInput | string;
        googleId?: StringFieldUpdateOperationsInput | string;
        email?: StringFieldUpdateOperationsInput | string;
        fullName?: StringFieldUpdateOperationsInput | string;
        profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null;
        role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        lessonProgress?: LessonProgressUpdateManyWithoutUserNestedInput;
        createdCourses?: CourseUpdateManyWithoutCreatedByNestedInput;
    };
    export type UserUncheckedUpdateWithoutEnrollmentsInput = {
        id?: StringFieldUpdateOperationsInput | string;
        googleId?: StringFieldUpdateOperationsInput | string;
        email?: StringFieldUpdateOperationsInput | string;
        fullName?: StringFieldUpdateOperationsInput | string;
        profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null;
        role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        lessonProgress?: LessonProgressUncheckedUpdateManyWithoutUserNestedInput;
        createdCourses?: CourseUncheckedUpdateManyWithoutCreatedByNestedInput;
    };
    export type CourseUpsertWithoutEnrollmentsInput = {
        update: XOR<CourseUpdateWithoutEnrollmentsInput, CourseUncheckedUpdateWithoutEnrollmentsInput>;
        create: XOR<CourseCreateWithoutEnrollmentsInput, CourseUncheckedCreateWithoutEnrollmentsInput>;
        where?: CourseWhereInput;
    };
    export type CourseUpdateToOneWithWhereWithoutEnrollmentsInput = {
        where?: CourseWhereInput;
        data: XOR<CourseUpdateWithoutEnrollmentsInput, CourseUncheckedUpdateWithoutEnrollmentsInput>;
    };
    export type CourseUpdateWithoutEnrollmentsInput = {
        id?: StringFieldUpdateOperationsInput | string;
        courseCode?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        createdBy?: UserUpdateOneRequiredWithoutCreatedCoursesNestedInput;
        modules?: ModuleUpdateManyWithoutCourseNestedInput;
    };
    export type CourseUncheckedUpdateWithoutEnrollmentsInput = {
        id?: StringFieldUpdateOperationsInput | string;
        courseCode?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        createdById?: StringFieldUpdateOperationsInput | string;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        modules?: ModuleUncheckedUpdateManyWithoutCourseNestedInput;
    };
    export type UserCreateWithoutLessonProgressInput = {
        id?: string;
        googleId: string;
        email: string;
        fullName: string;
        profilePictureUrl?: string | null;
        role?: $Enums.UserRole;
        createdAt?: Date | string;
        enrollments?: EnrollmentCreateNestedManyWithoutUserInput;
        createdCourses?: CourseCreateNestedManyWithoutCreatedByInput;
    };
    export type UserUncheckedCreateWithoutLessonProgressInput = {
        id?: string;
        googleId: string;
        email: string;
        fullName: string;
        profilePictureUrl?: string | null;
        role?: $Enums.UserRole;
        createdAt?: Date | string;
        enrollments?: EnrollmentUncheckedCreateNestedManyWithoutUserInput;
        createdCourses?: CourseUncheckedCreateNestedManyWithoutCreatedByInput;
    };
    export type UserCreateOrConnectWithoutLessonProgressInput = {
        where: UserWhereUniqueInput;
        create: XOR<UserCreateWithoutLessonProgressInput, UserUncheckedCreateWithoutLessonProgressInput>;
    };
    export type LessonCreateWithoutLessonProgressInput = {
        id?: string;
        title: string;
        description?: string | null;
        lessonDate?: Date | string | null;
        zoomInfo?: string | null;
        lessonOrder: number;
        module: ModuleCreateNestedOneWithoutLessonsInput;
        instructor: InstructorCreateNestedOneWithoutLessonsInput;
        resources?: ResourceCreateNestedManyWithoutLessonInput;
    };
    export type LessonUncheckedCreateWithoutLessonProgressInput = {
        id?: string;
        moduleId: string;
        instructorId: string;
        title: string;
        description?: string | null;
        lessonDate?: Date | string | null;
        zoomInfo?: string | null;
        lessonOrder: number;
        resources?: ResourceUncheckedCreateNestedManyWithoutLessonInput;
    };
    export type LessonCreateOrConnectWithoutLessonProgressInput = {
        where: LessonWhereUniqueInput;
        create: XOR<LessonCreateWithoutLessonProgressInput, LessonUncheckedCreateWithoutLessonProgressInput>;
    };
    export type UserUpsertWithoutLessonProgressInput = {
        update: XOR<UserUpdateWithoutLessonProgressInput, UserUncheckedUpdateWithoutLessonProgressInput>;
        create: XOR<UserCreateWithoutLessonProgressInput, UserUncheckedCreateWithoutLessonProgressInput>;
        where?: UserWhereInput;
    };
    export type UserUpdateToOneWithWhereWithoutLessonProgressInput = {
        where?: UserWhereInput;
        data: XOR<UserUpdateWithoutLessonProgressInput, UserUncheckedUpdateWithoutLessonProgressInput>;
    };
    export type UserUpdateWithoutLessonProgressInput = {
        id?: StringFieldUpdateOperationsInput | string;
        googleId?: StringFieldUpdateOperationsInput | string;
        email?: StringFieldUpdateOperationsInput | string;
        fullName?: StringFieldUpdateOperationsInput | string;
        profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null;
        role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        enrollments?: EnrollmentUpdateManyWithoutUserNestedInput;
        createdCourses?: CourseUpdateManyWithoutCreatedByNestedInput;
    };
    export type UserUncheckedUpdateWithoutLessonProgressInput = {
        id?: StringFieldUpdateOperationsInput | string;
        googleId?: StringFieldUpdateOperationsInput | string;
        email?: StringFieldUpdateOperationsInput | string;
        fullName?: StringFieldUpdateOperationsInput | string;
        profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null;
        role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        enrollments?: EnrollmentUncheckedUpdateManyWithoutUserNestedInput;
        createdCourses?: CourseUncheckedUpdateManyWithoutCreatedByNestedInput;
    };
    export type LessonUpsertWithoutLessonProgressInput = {
        update: XOR<LessonUpdateWithoutLessonProgressInput, LessonUncheckedUpdateWithoutLessonProgressInput>;
        create: XOR<LessonCreateWithoutLessonProgressInput, LessonUncheckedCreateWithoutLessonProgressInput>;
        where?: LessonWhereInput;
    };
    export type LessonUpdateToOneWithWhereWithoutLessonProgressInput = {
        where?: LessonWhereInput;
        data: XOR<LessonUpdateWithoutLessonProgressInput, LessonUncheckedUpdateWithoutLessonProgressInput>;
    };
    export type LessonUpdateWithoutLessonProgressInput = {
        id?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
        zoomInfo?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonOrder?: IntFieldUpdateOperationsInput | number;
        module?: ModuleUpdateOneRequiredWithoutLessonsNestedInput;
        instructor?: InstructorUpdateOneRequiredWithoutLessonsNestedInput;
        resources?: ResourceUpdateManyWithoutLessonNestedInput;
    };
    export type LessonUncheckedUpdateWithoutLessonProgressInput = {
        id?: StringFieldUpdateOperationsInput | string;
        moduleId?: StringFieldUpdateOperationsInput | string;
        instructorId?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
        zoomInfo?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonOrder?: IntFieldUpdateOperationsInput | number;
        resources?: ResourceUncheckedUpdateManyWithoutLessonNestedInput;
    };
    export type EnrollmentCreateManyUserInput = {
        id?: string;
        courseId: string;
        enrollmentDate?: Date | string;
    };
    export type LessonProgressCreateManyUserInput = {
        id?: string;
        lessonId: string;
        status?: $Enums.LessonStatus;
        completedAt?: Date | string | null;
    };
    export type CourseCreateManyCreatedByInput = {
        id?: string;
        courseCode: string;
        title: string;
        description?: string | null;
        createdAt?: Date | string;
    };
    export type EnrollmentUpdateWithoutUserInput = {
        id?: StringFieldUpdateOperationsInput | string;
        enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string;
        course?: CourseUpdateOneRequiredWithoutEnrollmentsNestedInput;
    };
    export type EnrollmentUncheckedUpdateWithoutUserInput = {
        id?: StringFieldUpdateOperationsInput | string;
        courseId?: StringFieldUpdateOperationsInput | string;
        enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    };
    export type EnrollmentUncheckedUpdateManyWithoutUserInput = {
        id?: StringFieldUpdateOperationsInput | string;
        courseId?: StringFieldUpdateOperationsInput | string;
        enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    };
    export type LessonProgressUpdateWithoutUserInput = {
        id?: StringFieldUpdateOperationsInput | string;
        status?: EnumLessonStatusFieldUpdateOperationsInput | $Enums.LessonStatus;
        completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
        lesson?: LessonUpdateOneRequiredWithoutLessonProgressNestedInput;
    };
    export type LessonProgressUncheckedUpdateWithoutUserInput = {
        id?: StringFieldUpdateOperationsInput | string;
        lessonId?: StringFieldUpdateOperationsInput | string;
        status?: EnumLessonStatusFieldUpdateOperationsInput | $Enums.LessonStatus;
        completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    };
    export type LessonProgressUncheckedUpdateManyWithoutUserInput = {
        id?: StringFieldUpdateOperationsInput | string;
        lessonId?: StringFieldUpdateOperationsInput | string;
        status?: EnumLessonStatusFieldUpdateOperationsInput | $Enums.LessonStatus;
        completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    };
    export type CourseUpdateWithoutCreatedByInput = {
        id?: StringFieldUpdateOperationsInput | string;
        courseCode?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        modules?: ModuleUpdateManyWithoutCourseNestedInput;
        enrollments?: EnrollmentUpdateManyWithoutCourseNestedInput;
    };
    export type CourseUncheckedUpdateWithoutCreatedByInput = {
        id?: StringFieldUpdateOperationsInput | string;
        courseCode?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
        modules?: ModuleUncheckedUpdateManyWithoutCourseNestedInput;
        enrollments?: EnrollmentUncheckedUpdateManyWithoutCourseNestedInput;
    };
    export type CourseUncheckedUpdateManyWithoutCreatedByInput = {
        id?: StringFieldUpdateOperationsInput | string;
        courseCode?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    };
    export type ModuleCreateManyCourseInput = {
        id?: string;
        title: string;
        description?: string | null;
        moduleOrder: number;
    };
    export type EnrollmentCreateManyCourseInput = {
        id?: string;
        userId: string;
        enrollmentDate?: Date | string;
    };
    export type ModuleUpdateWithoutCourseInput = {
        id?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        moduleOrder?: IntFieldUpdateOperationsInput | number;
        lessons?: LessonUpdateManyWithoutModuleNestedInput;
    };
    export type ModuleUncheckedUpdateWithoutCourseInput = {
        id?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        moduleOrder?: IntFieldUpdateOperationsInput | number;
        lessons?: LessonUncheckedUpdateManyWithoutModuleNestedInput;
    };
    export type ModuleUncheckedUpdateManyWithoutCourseInput = {
        id?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        moduleOrder?: IntFieldUpdateOperationsInput | number;
    };
    export type EnrollmentUpdateWithoutCourseInput = {
        id?: StringFieldUpdateOperationsInput | string;
        enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string;
        user?: UserUpdateOneRequiredWithoutEnrollmentsNestedInput;
    };
    export type EnrollmentUncheckedUpdateWithoutCourseInput = {
        id?: StringFieldUpdateOperationsInput | string;
        userId?: StringFieldUpdateOperationsInput | string;
        enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    };
    export type EnrollmentUncheckedUpdateManyWithoutCourseInput = {
        id?: StringFieldUpdateOperationsInput | string;
        userId?: StringFieldUpdateOperationsInput | string;
        enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string;
    };
    export type LessonCreateManyModuleInput = {
        id?: string;
        instructorId: string;
        title: string;
        description?: string | null;
        lessonDate?: Date | string | null;
        zoomInfo?: string | null;
        lessonOrder: number;
    };
    export type LessonUpdateWithoutModuleInput = {
        id?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
        zoomInfo?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonOrder?: IntFieldUpdateOperationsInput | number;
        instructor?: InstructorUpdateOneRequiredWithoutLessonsNestedInput;
        resources?: ResourceUpdateManyWithoutLessonNestedInput;
        lessonProgress?: LessonProgressUpdateManyWithoutLessonNestedInput;
    };
    export type LessonUncheckedUpdateWithoutModuleInput = {
        id?: StringFieldUpdateOperationsInput | string;
        instructorId?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
        zoomInfo?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonOrder?: IntFieldUpdateOperationsInput | number;
        resources?: ResourceUncheckedUpdateManyWithoutLessonNestedInput;
        lessonProgress?: LessonProgressUncheckedUpdateManyWithoutLessonNestedInput;
    };
    export type LessonUncheckedUpdateManyWithoutModuleInput = {
        id?: StringFieldUpdateOperationsInput | string;
        instructorId?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
        zoomInfo?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonOrder?: IntFieldUpdateOperationsInput | number;
    };
    export type LessonCreateManyInstructorInput = {
        id?: string;
        moduleId: string;
        title: string;
        description?: string | null;
        lessonDate?: Date | string | null;
        zoomInfo?: string | null;
        lessonOrder: number;
    };
    export type LessonUpdateWithoutInstructorInput = {
        id?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
        zoomInfo?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonOrder?: IntFieldUpdateOperationsInput | number;
        module?: ModuleUpdateOneRequiredWithoutLessonsNestedInput;
        resources?: ResourceUpdateManyWithoutLessonNestedInput;
        lessonProgress?: LessonProgressUpdateManyWithoutLessonNestedInput;
    };
    export type LessonUncheckedUpdateWithoutInstructorInput = {
        id?: StringFieldUpdateOperationsInput | string;
        moduleId?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
        zoomInfo?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonOrder?: IntFieldUpdateOperationsInput | number;
        resources?: ResourceUncheckedUpdateManyWithoutLessonNestedInput;
        lessonProgress?: LessonProgressUncheckedUpdateManyWithoutLessonNestedInput;
    };
    export type LessonUncheckedUpdateManyWithoutInstructorInput = {
        id?: StringFieldUpdateOperationsInput | string;
        moduleId?: StringFieldUpdateOperationsInput | string;
        title?: StringFieldUpdateOperationsInput | string;
        description?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
        zoomInfo?: NullableStringFieldUpdateOperationsInput | string | null;
        lessonOrder?: IntFieldUpdateOperationsInput | number;
    };
    export type ResourceCreateManyLessonInput = {
        id?: string;
        resourceType: $Enums.ResourceType;
        title: string;
        url: string;
        deadline?: Date | string | null;
    };
    export type LessonProgressCreateManyLessonInput = {
        id?: string;
        userId: string;
        status?: $Enums.LessonStatus;
        completedAt?: Date | string | null;
    };
    export type ResourceUpdateWithoutLessonInput = {
        id?: StringFieldUpdateOperationsInput | string;
        resourceType?: EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType;
        title?: StringFieldUpdateOperationsInput | string;
        url?: StringFieldUpdateOperationsInput | string;
        deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    };
    export type ResourceUncheckedUpdateWithoutLessonInput = {
        id?: StringFieldUpdateOperationsInput | string;
        resourceType?: EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType;
        title?: StringFieldUpdateOperationsInput | string;
        url?: StringFieldUpdateOperationsInput | string;
        deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    };
    export type ResourceUncheckedUpdateManyWithoutLessonInput = {
        id?: StringFieldUpdateOperationsInput | string;
        resourceType?: EnumResourceTypeFieldUpdateOperationsInput | $Enums.ResourceType;
        title?: StringFieldUpdateOperationsInput | string;
        url?: StringFieldUpdateOperationsInput | string;
        deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    };
    export type LessonProgressUpdateWithoutLessonInput = {
        id?: StringFieldUpdateOperationsInput | string;
        status?: EnumLessonStatusFieldUpdateOperationsInput | $Enums.LessonStatus;
        completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
        user?: UserUpdateOneRequiredWithoutLessonProgressNestedInput;
    };
    export type LessonProgressUncheckedUpdateWithoutLessonInput = {
        id?: StringFieldUpdateOperationsInput | string;
        userId?: StringFieldUpdateOperationsInput | string;
        status?: EnumLessonStatusFieldUpdateOperationsInput | $Enums.LessonStatus;
        completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    };
    export type LessonProgressUncheckedUpdateManyWithoutLessonInput = {
        id?: StringFieldUpdateOperationsInput | string;
        userId?: StringFieldUpdateOperationsInput | string;
        status?: EnumLessonStatusFieldUpdateOperationsInput | $Enums.LessonStatus;
        completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    };
    export type BatchPayload = {
        count: number;
    };
    export const dmmf: runtime.BaseDMMF;
    export {};
}
//# sourceMappingURL=index.d%202.d.ts.map