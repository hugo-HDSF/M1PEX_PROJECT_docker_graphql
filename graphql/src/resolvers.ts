import type { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Movie = {
  __typename?: 'Movie';
  genre?: Maybe<Scalars['String']['output']>;
  realisators?: Maybe<Array<Maybe<Realisator>>>;
  title?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['String']['output']>;
};

export type MovieInput = {
  genre?: InputMaybe<Scalars['String']['input']>;
  realisators?: InputMaybe<Array<InputMaybe<RealisatorInput>>>;
  title?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMovie?: Maybe<Movie>;
  addRealisator?: Maybe<Realisator>;
  addSaga?: Maybe<Saga>;
  deleteMovie?: Maybe<Scalars['Boolean']['output']>;
  deleteRealisator?: Maybe<Scalars['Boolean']['output']>;
  deleteSaga?: Maybe<Scalars['Boolean']['output']>;
  modifyMovie?: Maybe<Movie>;
  modifyRealisator?: Maybe<Realisator>;
  modifySaga?: Maybe<Saga>;
};


export type MutationAddMovieArgs = {
  genre: Scalars['String']['input'];
  realisators: Array<InputMaybe<RealisatorInput>>;
  title: Scalars['String']['input'];
  year: Scalars['String']['input'];
};


export type MutationAddRealisatorArgs = {
  birthdate: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
};


export type MutationAddSagaArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  movies?: InputMaybe<Array<InputMaybe<MovieInput>>>;
  title: Scalars['String']['input'];
};


export type MutationDeleteMovieArgs = {
  title: Scalars['String']['input'];
};


export type MutationDeleteRealisatorArgs = {
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
};


export type MutationDeleteSagaArgs = {
  title: Scalars['String']['input'];
};


export type MutationModifyMovieArgs = {
  findTitle: Scalars['String']['input'];
  genre: Scalars['String']['input'];
  realisators: Array<InputMaybe<RealisatorInput>>;
  title: Scalars['String']['input'];
  year: Scalars['String']['input'];
};


export type MutationModifyRealisatorArgs = {
  birthdate: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  newBirthdate: Scalars['String']['input'];
  newFirstname: Scalars['String']['input'];
  newLastname: Scalars['String']['input'];
};


export type MutationModifySagaArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  findTitle: Scalars['String']['input'];
  movies: Array<InputMaybe<MovieInput>>;
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  movies?: Maybe<Array<Maybe<Movie>>>;
  realisators?: Maybe<Array<Maybe<Realisator>>>;
  sagas?: Maybe<Array<Maybe<Saga>>>;
};

export type Realisator = {
  __typename?: 'Realisator';
  birthdate?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
};

export type RealisatorInput = {
  birthdate: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
};

export type Saga = {
  __typename?: 'Saga';
  description?: Maybe<Scalars['String']['output']>;
  movies?: Maybe<Array<Maybe<Movie>>>;
  title: Scalars['String']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Movie: ResolverTypeWrapper<Movie>;
  MovieInput: MovieInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Realisator: ResolverTypeWrapper<Realisator>;
  RealisatorInput: RealisatorInput;
  Saga: ResolverTypeWrapper<Saga>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Movie: Movie;
  MovieInput: MovieInput;
  Mutation: {};
  Query: {};
  Realisator: Realisator;
  RealisatorInput: RealisatorInput;
  Saga: Saga;
  String: Scalars['String']['output'];
}>;

export type MovieResolvers<ContextType = any, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = ResolversObject<{
  genre?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  realisators?: Resolver<Maybe<Array<Maybe<ResolversTypes['Realisator']>>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addMovie?: Resolver<Maybe<ResolversTypes['Movie']>, ParentType, ContextType, RequireFields<MutationAddMovieArgs, 'genre' | 'realisators' | 'title' | 'year'>>;
  addRealisator?: Resolver<Maybe<ResolversTypes['Realisator']>, ParentType, ContextType, RequireFields<MutationAddRealisatorArgs, 'birthdate' | 'firstname' | 'lastname'>>;
  addSaga?: Resolver<Maybe<ResolversTypes['Saga']>, ParentType, ContextType, RequireFields<MutationAddSagaArgs, 'title'>>;
  deleteMovie?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteMovieArgs, 'title'>>;
  deleteRealisator?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteRealisatorArgs, 'firstname' | 'lastname'>>;
  deleteSaga?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteSagaArgs, 'title'>>;
  modifyMovie?: Resolver<Maybe<ResolversTypes['Movie']>, ParentType, ContextType, RequireFields<MutationModifyMovieArgs, 'findTitle' | 'genre' | 'realisators' | 'title' | 'year'>>;
  modifyRealisator?: Resolver<Maybe<ResolversTypes['Realisator']>, ParentType, ContextType, RequireFields<MutationModifyRealisatorArgs, 'birthdate' | 'firstname' | 'lastname' | 'newBirthdate' | 'newFirstname' | 'newLastname'>>;
  modifySaga?: Resolver<Maybe<ResolversTypes['Saga']>, ParentType, ContextType, RequireFields<MutationModifySagaArgs, 'findTitle' | 'movies' | 'title'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  movies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Movie']>>>, ParentType, ContextType>;
  realisators?: Resolver<Maybe<Array<Maybe<ResolversTypes['Realisator']>>>, ParentType, ContextType>;
  sagas?: Resolver<Maybe<Array<Maybe<ResolversTypes['Saga']>>>, ParentType, ContextType>;
}>;

export type RealisatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Realisator'] = ResolversParentTypes['Realisator']> = ResolversObject<{
  birthdate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SagaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Saga'] = ResolversParentTypes['Saga']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  movies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Movie']>>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Movie?: MovieResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Realisator?: RealisatorResolvers<ContextType>;
  Saga?: SagaResolvers<ContextType>;
}>;

