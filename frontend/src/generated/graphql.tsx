import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  ExpectedErrorType: any;
  GenericScalar: any;
};

export type AccountType = {
  __typename?: 'AccountType';
  company: CompanyType;
  createdAt: Scalars['DateTime'];
  givablePoint: Scalars['Int'];
  id: Scalars['ID'];
  receivedPoint: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  user: CustomUserType;
};

export type ArchiveAccount = {
  __typename?: 'ArchiveAccount';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CompanyType = {
  __typename?: 'CompanyType';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  plan: PlanType;
  point: Scalars['Int'];
  tel?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type CreateCompanyAndAdminUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  planId: Scalars['ID'];
  tel: Scalars['String'];
};

export type CreateCompanyAndAdminUserPayload = {
  __typename?: 'CreateCompanyAndAdminUserPayload';
  adminUser?: Maybe<CustomUserType>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateDealingInput = {
  amount: Scalars['Int'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  message: Scalars['String'];
  userId: Scalars['ID'];
};

export type CreateDealingPayload = {
  __typename?: 'CreateDealingPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  dealing?: Maybe<DealingType>;
};

export type CreateDistributesInput = {
  attributes?: InputMaybe<Array<InputMaybe<DistributeAttributes>>>;
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type CreateDistributesPayload = {
  __typename?: 'CreateDistributesPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  distributeLog: DistributeLogType;
};

export type CreateItemInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  companyId: Scalars['ID'];
  exchangablePoint: Scalars['Int'];
  imageKey?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  quantity: Scalars['Int'];
  status: ItemStatusEnum;
  unit: Scalars['String'];
};

export type CreateItemPayload = {
  __typename?: 'CreateItemPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateOrUpdateExchangeAppliedItemsInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  exchangeItems: Array<ExchangeItemType>;
};

export type CreateOrUpdateExchangeAppliedItemsPayload = {
  __typename?: 'CreateOrUpdateExchangeAppliedItemsPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreatePurchasePointInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  companyId: Scalars['ID'];
  point: Scalars['Int'];
  price: Scalars['Int'];
};

export type CreatePurchasePointPayload = {
  __typename?: 'CreatePurchasePointPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  purchasedPointLog: PurchasedPointLogType;
};

export type CreateUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  companyId: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
  password1: Scalars['String'];
  password2: Scalars['String'];
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  user?: Maybe<CustomUserType>;
};

export type CustomUserType = {
  __typename?: 'CustomUserType';
  account: AccountType;
  company: CompanyType;
  email: Scalars['String'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isAdmin: Scalars['Boolean'];
  name: Scalars['String'];
  password: Scalars['String'];
  profile: ProfileType;
};

export type DealingType = {
  __typename?: 'DealingType';
  amount: Scalars['Int'];
  company: CompanyType;
  createdAt: Scalars['DateTime'];
  giver: AccountType;
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  receiver: AccountType;
  updatedAt: Scalars['DateTime'];
};

export type DeleteAccount = {
  __typename?: 'DeleteAccount';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DistributeAttributes = {
  accountId: Scalars['ID'];
  distributePoint: Scalars['Int'];
};

export type DistributeLogType = {
  __typename?: 'DistributeLogType';
  account: AccountType;
  company: CompanyType;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  point: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type ExchangeItemType = {
  exchangeQuantity: Scalars['Int'];
  itemId: Scalars['String'];
  userId: Scalars['String'];
};

export type GenerateS3PresignedUrlInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  imageKey: Scalars['String'];
};

export type GenerateS3PresignedUrlPayload = {
  __typename?: 'GenerateS3PresignedUrlPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  presignedUrl: Scalars['String'];
};

export enum ItemStatusEnum {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type ItemType = {
  __typename?: 'ItemType';
  company: CompanyType;
  createdAt: Scalars['DateTime'];
  exchangablePoint: Scalars['Int'];
  id: Scalars['ID'];
  imageKey?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  quantity: Scalars['Int'];
  status: ItemStatusEnum;
  unit: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  archiveAccount?: Maybe<ArchiveAccount>;
  createCompanyAndAdminUser?: Maybe<CreateCompanyAndAdminUserPayload>;
  createDealing?: Maybe<CreateDealingPayload>;
  createDistributes?: Maybe<CreateDistributesPayload>;
  createItem?: Maybe<CreateItemPayload>;
  createOrUpdateExchangeAppliedItems?: Maybe<CreateOrUpdateExchangeAppliedItemsPayload>;
  createPurchasePoint?: Maybe<CreatePurchasePointPayload>;
  createUser?: Maybe<CreateUserPayload>;
  customRegister?: Maybe<CreateUserPayload>;
  deleteAccount?: Maybe<DeleteAccount>;
  generateS3PresignedUrl?: Maybe<GenerateS3PresignedUrlPayload>;
  passwordChange?: Maybe<PasswordChange>;
  passwordReset?: Maybe<PasswordReset>;
  passwordSet?: Maybe<PasswordSet>;
  refreshToken?: Maybe<RefreshPayload>;
  removeSecondaryEmail?: Maybe<RemoveSecondaryEmail>;
  resendActivationEmail?: Maybe<ResendActivationEmail>;
  revokeToken?: Maybe<RevokeToken>;
  sendPasswordResetEmail?: Maybe<SendPasswordResetEmail>;
  sendSecondaryEmailActivation?: Maybe<SendSecondaryEmailActivation>;
  swapEmails?: Maybe<SwapEmails>;
  tokenAuth?: Maybe<ObtainJsonWebTokenPayload>;
  updateAccount?: Maybe<UpdateAccount>;
  updateItem?: Maybe<UpdateItemPayload>;
  updatePlan?: Maybe<UpdatePlanPayload>;
  updateProfile?: Maybe<UpdateProfilePayload>;
  verifyAccount?: Maybe<VerifyAccountPayload>;
  verifySecondaryEmail?: Maybe<VerifySecondaryEmail>;
  verifyToken?: Maybe<VerifyPayload>;
};


export type MutationArchiveAccountArgs = {
  password: Scalars['String'];
};


export type MutationCreateCompanyAndAdminUserArgs = {
  input: CreateCompanyAndAdminUserInput;
};


export type MutationCreateDealingArgs = {
  input: CreateDealingInput;
};


export type MutationCreateDistributesArgs = {
  input: CreateDistributesInput;
};


export type MutationCreateItemArgs = {
  input: CreateItemInput;
};


export type MutationCreateOrUpdateExchangeAppliedItemsArgs = {
  input: CreateOrUpdateExchangeAppliedItemsInput;
};


export type MutationCreatePurchasePointArgs = {
  input: CreatePurchasePointInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCustomRegisterArgs = {
  input: CreateUserInput;
};


export type MutationDeleteAccountArgs = {
  password: Scalars['String'];
};


export type MutationGenerateS3PresignedUrlArgs = {
  input: GenerateS3PresignedUrlInput;
};


export type MutationPasswordChangeArgs = {
  newPassword1: Scalars['String'];
  newPassword2: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationPasswordResetArgs = {
  newPassword1: Scalars['String'];
  newPassword2: Scalars['String'];
  token: Scalars['String'];
};


export type MutationPasswordSetArgs = {
  newPassword1: Scalars['String'];
  newPassword2: Scalars['String'];
  token: Scalars['String'];
};


export type MutationRefreshTokenArgs = {
  input: RefreshInput;
};


export type MutationRemoveSecondaryEmailArgs = {
  password: Scalars['String'];
};


export type MutationResendActivationEmailArgs = {
  email: Scalars['String'];
};


export type MutationRevokeTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationSendPasswordResetEmailArgs = {
  email: Scalars['String'];
};


export type MutationSendSecondaryEmailActivationArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSwapEmailsArgs = {
  password: Scalars['String'];
};


export type MutationTokenAuthArgs = {
  input: ObtainJsonWebTokenInput;
};


export type MutationUpdateItemArgs = {
  input: UpdateItemInput;
};


export type MutationUpdatePlanArgs = {
  input: UpdatePlanInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationVerifyAccountArgs = {
  input: VerifyAccountInput;
};


export type MutationVerifySecondaryEmailArgs = {
  token: Scalars['String'];
};


export type MutationVerifyTokenArgs = {
  input: VerifyInput;
};

export type Node = {
  id: Scalars['ID'];
};

export type ObtainJsonWebTokenInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ObtainJsonWebTokenPayload = {
  __typename?: 'ObtainJSONWebTokenPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  user?: Maybe<CustomUserType>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type PasswordChange = {
  __typename?: 'PasswordChange';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  refreshToken?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
};

export type PasswordReset = {
  __typename?: 'PasswordReset';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type PasswordSet = {
  __typename?: 'PasswordSet';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type PlanType = {
  __typename?: 'PlanType';
  fee: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ProfileType = {
  __typename?: 'ProfileType';
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  department?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageKey?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user: CustomUserType;
};

export type PurchasedPointLogType = {
  __typename?: 'PurchasedPointLogType';
  company: CompanyType;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  point: Scalars['Int'];
  price: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  accounts: Array<AccountType>;
  companyUsers: Array<CustomUserType>;
  item: ItemType;
  items: Array<ItemType>;
  me?: Maybe<UserNode>;
  plan: PlanType;
  plans?: Maybe<Array<PlanType>>;
  profile: ProfileType;
  user?: Maybe<UserNode>;
  userGaveDealings: Array<UserGaveDealingsType>;
  userReceivedDealings: Array<UserReceivedDealingsType>;
  users?: Maybe<UserNodeConnection>;
};


export type QueryCompanyUsersArgs = {
  companyId: Scalars['ID'];
};


export type QueryItemArgs = {
  itemId: Scalars['ID'];
};


export type QueryItemsArgs = {
  companyId: Scalars['ID'];
};


export type QueryPlanArgs = {
  id: Scalars['ID'];
};


export type QueryProfileArgs = {
  userId?: InputMaybe<Scalars['ID']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Float']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  name_Icontains?: InputMaybe<Scalars['String']>;
  name_Istartswith?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  status_Archived?: InputMaybe<Scalars['Boolean']>;
  status_SecondaryEmail?: InputMaybe<Scalars['String']>;
  status_Verified?: InputMaybe<Scalars['Boolean']>;
};

export type RefreshInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  refreshToken: Scalars['String'];
};

export type RefreshPayload = {
  __typename?: 'RefreshPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  payload?: Maybe<Scalars['GenericScalar']>;
  refreshToken?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type RemoveSecondaryEmail = {
  __typename?: 'RemoveSecondaryEmail';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ResendActivationEmail = {
  __typename?: 'ResendActivationEmail';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type RevokeToken = {
  __typename?: 'RevokeToken';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  revoked?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type SendPasswordResetEmail = {
  __typename?: 'SendPasswordResetEmail';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type SendSecondaryEmailActivation = {
  __typename?: 'SendSecondaryEmailActivation';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type SwapEmails = {
  __typename?: 'SwapEmails';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateAccount = {
  __typename?: 'UpdateAccount';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateItemInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  exchangablePoint: Scalars['Int'];
  id: Scalars['ID'];
  imageKey?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  quantity: Scalars['Int'];
  status: ItemStatusEnum;
  unit: Scalars['String'];
};

export type UpdateItemPayload = {
  __typename?: 'UpdateItemPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdatePlanInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  planId: Scalars['ID'];
};

export type UpdatePlanPayload = {
  __typename?: 'UpdatePlanPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  plan?: Maybe<PlanType>;
};

export type UpdateProfileInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  comment?: InputMaybe<Scalars['String']>;
  department?: InputMaybe<Scalars['String']>;
  imageKey?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  userId: Scalars['ID'];
};

export type UpdateProfilePayload = {
  __typename?: 'UpdateProfilePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  profile?: Maybe<ProfileType>;
};

export type UserGaveDealingsType = {
  __typename?: 'UserGaveDealingsType';
  createdAt: Scalars['String'];
  dealings: Array<DealingType>;
};

export type UserNode = Node & {
  __typename?: 'UserNode';
  account?: Maybe<AccountType>;
  archived?: Maybe<Scalars['Boolean']>;
  company: CompanyType;
  email: Scalars['String'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isAdmin: Scalars['Boolean'];
  isStaff: Scalars['Boolean'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  pk?: Maybe<Scalars['Int']>;
  profile?: Maybe<ProfileType>;
  secondaryEmail?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
};

export type UserNodeConnection = {
  __typename?: 'UserNodeConnection';
  edges: Array<Maybe<UserNodeEdge>>;
  pageInfo: PageInfo;
};

export type UserNodeEdge = {
  __typename?: 'UserNodeEdge';
  cursor: Scalars['String'];
  node?: Maybe<UserNode>;
};

export type UserReceivedDealingsType = {
  __typename?: 'UserReceivedDealingsType';
  createdAt: Scalars['String'];
  dealings: Array<DealingType>;
};

export type VerifyAccountInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
};

export type VerifyAccountPayload = {
  __typename?: 'VerifyAccountPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type VerifyInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
};

export type VerifyPayload = {
  __typename?: 'VerifyPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  payload?: Maybe<Scalars['GenericScalar']>;
};

export type VerifySecondaryEmail = {
  __typename?: 'VerifySecondaryEmail';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type GaveDealingsForGavePointsChartFragment = { __typename?: 'UserGaveDealingsType', createdAt: string, dealings: Array<{ __typename?: 'DealingType', id: string, amount: number, createdAt: any }> };

export type ReceivedDealingsForReceivedPointsChartFragment = { __typename?: 'UserReceivedDealingsType', createdAt: string, dealings: Array<{ __typename?: 'DealingType', id: string, amount: number, createdAt: any }> };

export type PlanForCompanyFormFragment = { __typename?: 'PlanType', id: string, name: string, fee: number };

export type CompanyUsersListDataFragment = { __typename?: 'CustomUserType', id: string, name: string, email: string, account: { __typename?: 'AccountType', givablePoint: number, receivedPoint: number } };

export type CompanyUserForDealingFormFragment = { __typename?: 'CustomUserType', id: string, name: string, profile: { __typename?: 'ProfileType', department?: string | null } };

export type DistributeFormDataFragment = { __typename?: 'AccountType', id: string, givablePoint: number, receivedPoint: number, user: { __typename?: 'CustomUserType', name: string, email: string } };

export type ItemDataForItemCardFragment = { __typename?: 'ItemType', id: string, name: string, unit: string, exchangablePoint: number, quantity: number, status: ItemStatusEnum, imageKey?: string | null, imageUrl?: string | null };

export type ItemDataForItemFormFragment = { __typename?: 'ItemType', id: string, name: string, unit: string, exchangablePoint: number, quantity: number, status: ItemStatusEnum, imageKey?: string | null, imageUrl?: string | null };

export type ProfileDataFragment = { __typename?: 'ProfileType', id: string, department?: string | null, comment?: string | null, imageKey?: string | null, imageUrl?: string | null, user: { __typename?: 'CustomUserType', id: string, name: string } };

export type CurrentCompanyFragment = { __typename?: 'CompanyType', id: string, name: string, point: number };

export type TokenAuthMutationVariables = Exact<{
  input: ObtainJsonWebTokenInput;
}>;


export type TokenAuthMutation = { __typename?: 'Mutation', tokenAuth?: { __typename?: 'ObtainJSONWebTokenPayload', token?: string | null, refreshToken?: string | null, user?: { __typename?: 'CustomUserType', id: string, name: string, email: string, isActive: boolean, isAdmin: boolean, company: { __typename?: 'CompanyType', id: string, name: string } } | null } | null };

export type VerifyAccountMutationVariables = Exact<{
  input: VerifyAccountInput;
}>;


export type VerifyAccountMutation = { __typename?: 'Mutation', verifyAccount?: { __typename?: 'VerifyAccountPayload', success?: boolean | null, errors?: any | null } | null };

export type CompaniesNewInputInputPageQueryVariables = Exact<{ [key: string]: never; }>;


export type CompaniesNewInputInputPageQuery = { __typename?: 'Query', plans?: Array<{ __typename?: 'PlanType', id: string, name: string, fee: number }> | null };

export type CreateCompanyAndAdminUserMutationVariables = Exact<{
  input: CreateCompanyAndAdminUserInput;
}>;


export type CreateCompanyAndAdminUserMutation = { __typename?: 'Mutation', createCompanyAndAdminUser?: { __typename?: 'CreateCompanyAndAdminUserPayload', adminUser?: { __typename?: 'CustomUserType', email: string, password: string } | null } | null };

export type CreateDealingMutationVariables = Exact<{
  input: CreateDealingInput;
}>;


export type CreateDealingMutation = { __typename?: 'Mutation', createDealing?: { __typename?: 'CreateDealingPayload', clientMutationId?: string | null } | null };

export type DealingsNewInputPageQueryVariables = Exact<{
  companyId: Scalars['ID'];
}>;


export type DealingsNewInputPageQuery = { __typename?: 'Query', users: Array<{ __typename?: 'CustomUserType', id: string, name: string, profile: { __typename?: 'ProfileType', department?: string | null } }> };

export type DistributesNewInputPageQueryVariables = Exact<{ [key: string]: never; }>;


export type DistributesNewInputPageQuery = { __typename?: 'Query', accounts: Array<{ __typename?: 'AccountType', id: string, givablePoint: number, receivedPoint: number, user: { __typename?: 'CustomUserType', name: string, email: string } }> };

export type CreateDistributesMutationVariables = Exact<{
  input: CreateDistributesInput;
}>;


export type CreateDistributesMutation = { __typename?: 'Mutation', createDistributes?: { __typename?: 'CreateDistributesPayload', distributeLog: { __typename?: 'DistributeLogType', id: string, company: { __typename?: 'CompanyType', id: string, point: number } } } | null };

export type CreateOrUpdateExchangeAppliedItemsMutationVariables = Exact<{
  input: CreateOrUpdateExchangeAppliedItemsInput;
}>;


export type CreateOrUpdateExchangeAppliedItemsMutation = { __typename?: 'Mutation', createOrUpdateExchangeAppliedItems?: { __typename?: 'CreateOrUpdateExchangeAppliedItemsPayload', clientMutationId?: string | null } | null };

export type ExchangesIndexPageQueryVariables = Exact<{
  companyId: Scalars['ID'];
}>;


export type ExchangesIndexPageQuery = { __typename?: 'Query', items: Array<{ __typename?: 'ItemType', id: string, name: string, unit: string, exchangablePoint: number, quantity: number, status: ItemStatusEnum, imageKey?: string | null, imageUrl?: string | null }> };

export type ItemsEditPageQueryVariables = Exact<{
  itemId: Scalars['ID'];
}>;


export type ItemsEditPageQuery = { __typename?: 'Query', item: { __typename?: 'ItemType', id: string, name: string, unit: string, exchangablePoint: number, quantity: number, status: ItemStatusEnum, imageKey?: string | null, imageUrl?: string | null } };

export type UpdateItemMutationVariables = Exact<{
  input: UpdateItemInput;
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem?: { __typename?: 'UpdateItemPayload', clientMutationId?: string | null } | null };

export type ItemsPageQueryVariables = Exact<{
  companyId: Scalars['ID'];
}>;


export type ItemsPageQuery = { __typename?: 'Query', items: Array<{ __typename?: 'ItemType', id: string, name: string, unit: string, exchangablePoint: number, quantity: number, status: ItemStatusEnum, imageKey?: string | null, imageUrl?: string | null }> };

export type CreateItemMutationVariables = Exact<{
  input: CreateItemInput;
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem?: { __typename?: 'CreateItemPayload', clientMutationId?: string | null } | null };

export type MypagePageQueryVariables = Exact<{ [key: string]: never; }>;


export type MypagePageQuery = { __typename?: 'Query', receivedDealings: Array<{ __typename?: 'UserReceivedDealingsType', createdAt: string, dealings: Array<{ __typename?: 'DealingType', id: string, amount: number, createdAt: any }> }>, gaveDealings: Array<{ __typename?: 'UserGaveDealingsType', createdAt: string, dealings: Array<{ __typename?: 'DealingType', id: string, amount: number, createdAt: any }> }> };

export type ProfileInputPageQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type ProfileInputPageQuery = { __typename?: 'Query', profile: { __typename?: 'ProfileType', id: string, department?: string | null, comment?: string | null, imageKey?: string | null, imageUrl?: string | null, user: { __typename?: 'CustomUserType', id: string, name: string } } };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile?: { __typename?: 'UpdateProfilePayload', clientMutationId?: string | null } | null };

export type GenerateS3PresignedUrlMutationVariables = Exact<{
  input: GenerateS3PresignedUrlInput;
}>;


export type GenerateS3PresignedUrlMutation = { __typename?: 'Mutation', generateS3PresignedUrl?: { __typename?: 'GenerateS3PresignedUrlPayload', presignedUrl: string } | null };

export type CreatePurchasePointMutationVariables = Exact<{
  input: CreatePurchasePointInput;
}>;


export type CreatePurchasePointMutation = { __typename?: 'Mutation', createPurchasePoint?: { __typename?: 'CreatePurchasePointPayload', purchasedPointLog: { __typename?: 'PurchasedPointLogType', id: string, company: { __typename?: 'CompanyType', id: string, point: number } } } | null };

export type SettingsUsersPageQueryVariables = Exact<{
  companyId: Scalars['ID'];
}>;


export type SettingsUsersPageQuery = { __typename?: 'Query', users: Array<{ __typename?: 'CustomUserType', id: string, name: string, email: string, account: { __typename?: 'AccountType', givablePoint: number, receivedPoint: number } }> };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'CreateUserPayload', user?: { __typename?: 'CustomUserType', id: string, name: string, email: string } | null } | null };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'UserNode', id: string, name: string, email: string, verified?: boolean | null, isActive: boolean, isAdmin: boolean, company: { __typename?: 'CompanyType', id: string, name: string, point: number }, account?: { __typename?: 'AccountType', id: string, givablePoint: number, receivedPoint: number } | null, profile?: { __typename?: 'ProfileType', id: string, department?: string | null, comment?: string | null, imageUrl?: string | null } | null } | null };

export type CurrentAccountFragment = { __typename?: 'AccountType', id: string, givablePoint: number, receivedPoint: number };

export type CurrentProfileFragment = { __typename?: 'ProfileType', id: string, department?: string | null, comment?: string | null, imageUrl?: string | null };

export const GaveDealingsForGavePointsChartFragmentDoc = gql`
    fragment GaveDealingsForGavePointsChart on UserGaveDealingsType {
  dealings {
    id
    amount
    createdAt
  }
  createdAt
}
    `;
export const ReceivedDealingsForReceivedPointsChartFragmentDoc = gql`
    fragment ReceivedDealingsForReceivedPointsChart on UserReceivedDealingsType {
  dealings {
    id
    amount
    createdAt
  }
  createdAt
}
    `;
export const PlanForCompanyFormFragmentDoc = gql`
    fragment PlanForCompanyForm on PlanType {
  id
  name
  fee
}
    `;
export const CompanyUsersListDataFragmentDoc = gql`
    fragment CompanyUsersListData on CustomUserType {
  id
  name
  email
  account {
    givablePoint
    receivedPoint
  }
}
    `;
export const CompanyUserForDealingFormFragmentDoc = gql`
    fragment CompanyUserForDealingForm on CustomUserType {
  id
  name
  profile {
    department
  }
}
    `;
export const DistributeFormDataFragmentDoc = gql`
    fragment DistributeFormData on AccountType {
  id
  givablePoint
  receivedPoint
  user {
    name
    email
  }
}
    `;
export const ItemDataForItemCardFragmentDoc = gql`
    fragment ItemDataForItemCard on ItemType {
  id
  name
  unit
  exchangablePoint
  quantity
  status
  imageKey
  imageUrl
}
    `;
export const ItemDataForItemFormFragmentDoc = gql`
    fragment ItemDataForItemForm on ItemType {
  id
  name
  unit
  exchangablePoint
  quantity
  status
  imageKey
  imageUrl
}
    `;
export const ProfileDataFragmentDoc = gql`
    fragment ProfileData on ProfileType {
  id
  department
  comment
  imageKey
  imageUrl
  user {
    id
    name
  }
}
    `;
export const CurrentCompanyFragmentDoc = gql`
    fragment CurrentCompany on CompanyType {
  id
  name
  point
}
    `;
export const CurrentAccountFragmentDoc = gql`
    fragment CurrentAccount on AccountType {
  id
  givablePoint
  receivedPoint
}
    `;
export const CurrentProfileFragmentDoc = gql`
    fragment CurrentProfile on ProfileType {
  id
  department
  comment
  imageUrl
}
    `;
export const TokenAuthDocument = gql`
    mutation TokenAuth($input: ObtainJSONWebTokenInput!) {
  tokenAuth(input: $input) {
    token
    refreshToken
    user {
      id
      name
      email
      isActive
      isAdmin
      company {
        id
        name
      }
    }
  }
}
    `;
export type TokenAuthMutationFn = ApolloReactCommon.MutationFunction<TokenAuthMutation, TokenAuthMutationVariables>;

/**
 * __useTokenAuthMutation__
 *
 * To run a mutation, you first call `useTokenAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTokenAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tokenAuthMutation, { data, loading, error }] = useTokenAuthMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTokenAuthMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TokenAuthMutation, TokenAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<TokenAuthMutation, TokenAuthMutationVariables>(TokenAuthDocument, options);
      }
export type TokenAuthMutationHookResult = ReturnType<typeof useTokenAuthMutation>;
export type TokenAuthMutationResult = ApolloReactCommon.MutationResult<TokenAuthMutation>;
export type TokenAuthMutationOptions = ApolloReactCommon.BaseMutationOptions<TokenAuthMutation, TokenAuthMutationVariables>;
export const VerifyAccountDocument = gql`
    mutation VerifyAccount($input: VerifyAccountInput!) {
  verifyAccount(input: $input) {
    success
    errors
  }
}
    `;
export type VerifyAccountMutationFn = ApolloReactCommon.MutationFunction<VerifyAccountMutation, VerifyAccountMutationVariables>;

/**
 * __useVerifyAccountMutation__
 *
 * To run a mutation, you first call `useVerifyAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyAccountMutation, { data, loading, error }] = useVerifyAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyAccountMutation, VerifyAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<VerifyAccountMutation, VerifyAccountMutationVariables>(VerifyAccountDocument, options);
      }
export type VerifyAccountMutationHookResult = ReturnType<typeof useVerifyAccountMutation>;
export type VerifyAccountMutationResult = ApolloReactCommon.MutationResult<VerifyAccountMutation>;
export type VerifyAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<VerifyAccountMutation, VerifyAccountMutationVariables>;
export const CompaniesNewInputInputPageDocument = gql`
    query CompaniesNewInputInputPage {
  plans {
    ...PlanForCompanyForm
  }
}
    ${PlanForCompanyFormFragmentDoc}`;

/**
 * __useCompaniesNewInputInputPageQuery__
 *
 * To run a query within a React component, call `useCompaniesNewInputInputPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompaniesNewInputInputPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompaniesNewInputInputPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useCompaniesNewInputInputPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CompaniesNewInputInputPageQuery, CompaniesNewInputInputPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<CompaniesNewInputInputPageQuery, CompaniesNewInputInputPageQueryVariables>(CompaniesNewInputInputPageDocument, options);
      }
export function useCompaniesNewInputInputPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CompaniesNewInputInputPageQuery, CompaniesNewInputInputPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<CompaniesNewInputInputPageQuery, CompaniesNewInputInputPageQueryVariables>(CompaniesNewInputInputPageDocument, options);
        }
export type CompaniesNewInputInputPageQueryHookResult = ReturnType<typeof useCompaniesNewInputInputPageQuery>;
export type CompaniesNewInputInputPageLazyQueryHookResult = ReturnType<typeof useCompaniesNewInputInputPageLazyQuery>;
export type CompaniesNewInputInputPageQueryResult = ApolloReactCommon.QueryResult<CompaniesNewInputInputPageQuery, CompaniesNewInputInputPageQueryVariables>;
export const CreateCompanyAndAdminUserDocument = gql`
    mutation CreateCompanyAndAdminUser($input: CreateCompanyAndAdminUserInput!) {
  createCompanyAndAdminUser(input: $input) {
    adminUser {
      email
      password
    }
  }
}
    `;
export type CreateCompanyAndAdminUserMutationFn = ApolloReactCommon.MutationFunction<CreateCompanyAndAdminUserMutation, CreateCompanyAndAdminUserMutationVariables>;

/**
 * __useCreateCompanyAndAdminUserMutation__
 *
 * To run a mutation, you first call `useCreateCompanyAndAdminUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyAndAdminUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyAndAdminUserMutation, { data, loading, error }] = useCreateCompanyAndAdminUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCompanyAndAdminUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCompanyAndAdminUserMutation, CreateCompanyAndAdminUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateCompanyAndAdminUserMutation, CreateCompanyAndAdminUserMutationVariables>(CreateCompanyAndAdminUserDocument, options);
      }
export type CreateCompanyAndAdminUserMutationHookResult = ReturnType<typeof useCreateCompanyAndAdminUserMutation>;
export type CreateCompanyAndAdminUserMutationResult = ApolloReactCommon.MutationResult<CreateCompanyAndAdminUserMutation>;
export type CreateCompanyAndAdminUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCompanyAndAdminUserMutation, CreateCompanyAndAdminUserMutationVariables>;
export const CreateDealingDocument = gql`
    mutation CreateDealing($input: CreateDealingInput!) {
  createDealing(input: $input) {
    clientMutationId
  }
}
    `;
export type CreateDealingMutationFn = ApolloReactCommon.MutationFunction<CreateDealingMutation, CreateDealingMutationVariables>;

/**
 * __useCreateDealingMutation__
 *
 * To run a mutation, you first call `useCreateDealingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDealingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDealingMutation, { data, loading, error }] = useCreateDealingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDealingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateDealingMutation, CreateDealingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateDealingMutation, CreateDealingMutationVariables>(CreateDealingDocument, options);
      }
export type CreateDealingMutationHookResult = ReturnType<typeof useCreateDealingMutation>;
export type CreateDealingMutationResult = ApolloReactCommon.MutationResult<CreateDealingMutation>;
export type CreateDealingMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateDealingMutation, CreateDealingMutationVariables>;
export const DealingsNewInputPageDocument = gql`
    query DealingsNewInputPage($companyId: ID!) {
  users: companyUsers(companyId: $companyId) {
    ...CompanyUserForDealingForm
  }
}
    ${CompanyUserForDealingFormFragmentDoc}`;

/**
 * __useDealingsNewInputPageQuery__
 *
 * To run a query within a React component, call `useDealingsNewInputPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDealingsNewInputPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDealingsNewInputPageQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useDealingsNewInputPageQuery(baseOptions: ApolloReactHooks.QueryHookOptions<DealingsNewInputPageQuery, DealingsNewInputPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<DealingsNewInputPageQuery, DealingsNewInputPageQueryVariables>(DealingsNewInputPageDocument, options);
      }
export function useDealingsNewInputPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DealingsNewInputPageQuery, DealingsNewInputPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<DealingsNewInputPageQuery, DealingsNewInputPageQueryVariables>(DealingsNewInputPageDocument, options);
        }
export type DealingsNewInputPageQueryHookResult = ReturnType<typeof useDealingsNewInputPageQuery>;
export type DealingsNewInputPageLazyQueryHookResult = ReturnType<typeof useDealingsNewInputPageLazyQuery>;
export type DealingsNewInputPageQueryResult = ApolloReactCommon.QueryResult<DealingsNewInputPageQuery, DealingsNewInputPageQueryVariables>;
export const DistributesNewInputPageDocument = gql`
    query DistributesNewInputPage {
  accounts {
    ...DistributeFormData
  }
}
    ${DistributeFormDataFragmentDoc}`;

/**
 * __useDistributesNewInputPageQuery__
 *
 * To run a query within a React component, call `useDistributesNewInputPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDistributesNewInputPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDistributesNewInputPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useDistributesNewInputPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DistributesNewInputPageQuery, DistributesNewInputPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<DistributesNewInputPageQuery, DistributesNewInputPageQueryVariables>(DistributesNewInputPageDocument, options);
      }
export function useDistributesNewInputPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DistributesNewInputPageQuery, DistributesNewInputPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<DistributesNewInputPageQuery, DistributesNewInputPageQueryVariables>(DistributesNewInputPageDocument, options);
        }
export type DistributesNewInputPageQueryHookResult = ReturnType<typeof useDistributesNewInputPageQuery>;
export type DistributesNewInputPageLazyQueryHookResult = ReturnType<typeof useDistributesNewInputPageLazyQuery>;
export type DistributesNewInputPageQueryResult = ApolloReactCommon.QueryResult<DistributesNewInputPageQuery, DistributesNewInputPageQueryVariables>;
export const CreateDistributesDocument = gql`
    mutation CreateDistributes($input: CreateDistributesInput!) {
  createDistributes(input: $input) {
    distributeLog {
      id
      company {
        id
        point
      }
    }
  }
}
    `;
export type CreateDistributesMutationFn = ApolloReactCommon.MutationFunction<CreateDistributesMutation, CreateDistributesMutationVariables>;

/**
 * __useCreateDistributesMutation__
 *
 * To run a mutation, you first call `useCreateDistributesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDistributesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDistributesMutation, { data, loading, error }] = useCreateDistributesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDistributesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateDistributesMutation, CreateDistributesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateDistributesMutation, CreateDistributesMutationVariables>(CreateDistributesDocument, options);
      }
export type CreateDistributesMutationHookResult = ReturnType<typeof useCreateDistributesMutation>;
export type CreateDistributesMutationResult = ApolloReactCommon.MutationResult<CreateDistributesMutation>;
export type CreateDistributesMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateDistributesMutation, CreateDistributesMutationVariables>;
export const CreateOrUpdateExchangeAppliedItemsDocument = gql`
    mutation CreateOrUpdateExchangeAppliedItems($input: CreateOrUpdateExchangeAppliedItemsInput!) {
  createOrUpdateExchangeAppliedItems(input: $input) {
    clientMutationId
  }
}
    `;
export type CreateOrUpdateExchangeAppliedItemsMutationFn = ApolloReactCommon.MutationFunction<CreateOrUpdateExchangeAppliedItemsMutation, CreateOrUpdateExchangeAppliedItemsMutationVariables>;

/**
 * __useCreateOrUpdateExchangeAppliedItemsMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateExchangeAppliedItemsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateExchangeAppliedItemsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateExchangeAppliedItemsMutation, { data, loading, error }] = useCreateOrUpdateExchangeAppliedItemsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrUpdateExchangeAppliedItemsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOrUpdateExchangeAppliedItemsMutation, CreateOrUpdateExchangeAppliedItemsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateOrUpdateExchangeAppliedItemsMutation, CreateOrUpdateExchangeAppliedItemsMutationVariables>(CreateOrUpdateExchangeAppliedItemsDocument, options);
      }
export type CreateOrUpdateExchangeAppliedItemsMutationHookResult = ReturnType<typeof useCreateOrUpdateExchangeAppliedItemsMutation>;
export type CreateOrUpdateExchangeAppliedItemsMutationResult = ApolloReactCommon.MutationResult<CreateOrUpdateExchangeAppliedItemsMutation>;
export type CreateOrUpdateExchangeAppliedItemsMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateOrUpdateExchangeAppliedItemsMutation, CreateOrUpdateExchangeAppliedItemsMutationVariables>;
export const ExchangesIndexPageDocument = gql`
    query ExchangesIndexPage($companyId: ID!) {
  items(companyId: $companyId) {
    ...ItemDataForItemCard
  }
}
    ${ItemDataForItemCardFragmentDoc}`;

/**
 * __useExchangesIndexPageQuery__
 *
 * To run a query within a React component, call `useExchangesIndexPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useExchangesIndexPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExchangesIndexPageQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useExchangesIndexPageQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ExchangesIndexPageQuery, ExchangesIndexPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ExchangesIndexPageQuery, ExchangesIndexPageQueryVariables>(ExchangesIndexPageDocument, options);
      }
export function useExchangesIndexPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ExchangesIndexPageQuery, ExchangesIndexPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ExchangesIndexPageQuery, ExchangesIndexPageQueryVariables>(ExchangesIndexPageDocument, options);
        }
export type ExchangesIndexPageQueryHookResult = ReturnType<typeof useExchangesIndexPageQuery>;
export type ExchangesIndexPageLazyQueryHookResult = ReturnType<typeof useExchangesIndexPageLazyQuery>;
export type ExchangesIndexPageQueryResult = ApolloReactCommon.QueryResult<ExchangesIndexPageQuery, ExchangesIndexPageQueryVariables>;
export const ItemsEditPageDocument = gql`
    query ItemsEditPage($itemId: ID!) {
  item(itemId: $itemId) {
    ...ItemDataForItemForm
  }
}
    ${ItemDataForItemFormFragmentDoc}`;

/**
 * __useItemsEditPageQuery__
 *
 * To run a query within a React component, call `useItemsEditPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemsEditPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemsEditPageQuery({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useItemsEditPageQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ItemsEditPageQuery, ItemsEditPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ItemsEditPageQuery, ItemsEditPageQueryVariables>(ItemsEditPageDocument, options);
      }
export function useItemsEditPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ItemsEditPageQuery, ItemsEditPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ItemsEditPageQuery, ItemsEditPageQueryVariables>(ItemsEditPageDocument, options);
        }
export type ItemsEditPageQueryHookResult = ReturnType<typeof useItemsEditPageQuery>;
export type ItemsEditPageLazyQueryHookResult = ReturnType<typeof useItemsEditPageLazyQuery>;
export type ItemsEditPageQueryResult = ApolloReactCommon.QueryResult<ItemsEditPageQuery, ItemsEditPageQueryVariables>;
export const UpdateItemDocument = gql`
    mutation UpdateItem($input: UpdateItemInput!) {
  updateItem(input: $input) {
    clientMutationId
  }
}
    `;
export type UpdateItemMutationFn = ApolloReactCommon.MutationFunction<UpdateItemMutation, UpdateItemMutationVariables>;

/**
 * __useUpdateItemMutation__
 *
 * To run a mutation, you first call `useUpdateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateItemMutation, { data, loading, error }] = useUpdateItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateItemMutation, UpdateItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument, options);
      }
export type UpdateItemMutationHookResult = ReturnType<typeof useUpdateItemMutation>;
export type UpdateItemMutationResult = ApolloReactCommon.MutationResult<UpdateItemMutation>;
export type UpdateItemMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateItemMutation, UpdateItemMutationVariables>;
export const ItemsPageDocument = gql`
    query ItemsPage($companyId: ID!) {
  items(companyId: $companyId) {
    ...ItemDataForItemCard
  }
}
    ${ItemDataForItemCardFragmentDoc}`;

/**
 * __useItemsPageQuery__
 *
 * To run a query within a React component, call `useItemsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemsPageQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useItemsPageQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ItemsPageQuery, ItemsPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ItemsPageQuery, ItemsPageQueryVariables>(ItemsPageDocument, options);
      }
export function useItemsPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ItemsPageQuery, ItemsPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ItemsPageQuery, ItemsPageQueryVariables>(ItemsPageDocument, options);
        }
export type ItemsPageQueryHookResult = ReturnType<typeof useItemsPageQuery>;
export type ItemsPageLazyQueryHookResult = ReturnType<typeof useItemsPageLazyQuery>;
export type ItemsPageQueryResult = ApolloReactCommon.QueryResult<ItemsPageQuery, ItemsPageQueryVariables>;
export const CreateItemDocument = gql`
    mutation CreateItem($input: CreateItemInput!) {
  createItem(input: $input) {
    clientMutationId
  }
}
    `;
export type CreateItemMutationFn = ApolloReactCommon.MutationFunction<CreateItemMutation, CreateItemMutationVariables>;

/**
 * __useCreateItemMutation__
 *
 * To run a mutation, you first call `useCreateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createItemMutation, { data, loading, error }] = useCreateItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateItemMutation, CreateItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument, options);
      }
export type CreateItemMutationHookResult = ReturnType<typeof useCreateItemMutation>;
export type CreateItemMutationResult = ApolloReactCommon.MutationResult<CreateItemMutation>;
export type CreateItemMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateItemMutation, CreateItemMutationVariables>;
export const MypagePageDocument = gql`
    query MypagePage {
  receivedDealings: userReceivedDealings {
    ...ReceivedDealingsForReceivedPointsChart
  }
  gaveDealings: userGaveDealings {
    ...GaveDealingsForGavePointsChart
  }
}
    ${ReceivedDealingsForReceivedPointsChartFragmentDoc}
${GaveDealingsForGavePointsChartFragmentDoc}`;

/**
 * __useMypagePageQuery__
 *
 * To run a query within a React component, call `useMypagePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useMypagePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMypagePageQuery({
 *   variables: {
 *   },
 * });
 */
export function useMypagePageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MypagePageQuery, MypagePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MypagePageQuery, MypagePageQueryVariables>(MypagePageDocument, options);
      }
export function useMypagePageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MypagePageQuery, MypagePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MypagePageQuery, MypagePageQueryVariables>(MypagePageDocument, options);
        }
export type MypagePageQueryHookResult = ReturnType<typeof useMypagePageQuery>;
export type MypagePageLazyQueryHookResult = ReturnType<typeof useMypagePageLazyQuery>;
export type MypagePageQueryResult = ApolloReactCommon.QueryResult<MypagePageQuery, MypagePageQueryVariables>;
export const ProfileInputPageDocument = gql`
    query ProfileInputPage($userId: ID!) {
  profile(userId: $userId) {
    ...ProfileData
  }
}
    ${ProfileDataFragmentDoc}`;

/**
 * __useProfileInputPageQuery__
 *
 * To run a query within a React component, call `useProfileInputPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileInputPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileInputPageQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useProfileInputPageQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ProfileInputPageQuery, ProfileInputPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProfileInputPageQuery, ProfileInputPageQueryVariables>(ProfileInputPageDocument, options);
      }
export function useProfileInputPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProfileInputPageQuery, ProfileInputPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProfileInputPageQuery, ProfileInputPageQueryVariables>(ProfileInputPageDocument, options);
        }
export type ProfileInputPageQueryHookResult = ReturnType<typeof useProfileInputPageQuery>;
export type ProfileInputPageLazyQueryHookResult = ReturnType<typeof useProfileInputPageLazyQuery>;
export type ProfileInputPageQueryResult = ApolloReactCommon.QueryResult<ProfileInputPageQuery, ProfileInputPageQueryVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    clientMutationId
  }
}
    `;
export type UpdateProfileMutationFn = ApolloReactCommon.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = ApolloReactCommon.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const GenerateS3PresignedUrlDocument = gql`
    mutation GenerateS3PresignedUrl($input: GenerateS3PresignedUrlInput!) {
  generateS3PresignedUrl(input: $input) {
    presignedUrl
  }
}
    `;
export type GenerateS3PresignedUrlMutationFn = ApolloReactCommon.MutationFunction<GenerateS3PresignedUrlMutation, GenerateS3PresignedUrlMutationVariables>;

/**
 * __useGenerateS3PresignedUrlMutation__
 *
 * To run a mutation, you first call `useGenerateS3PresignedUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateS3PresignedUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateS3PresignedUrlMutation, { data, loading, error }] = useGenerateS3PresignedUrlMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateS3PresignedUrlMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GenerateS3PresignedUrlMutation, GenerateS3PresignedUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<GenerateS3PresignedUrlMutation, GenerateS3PresignedUrlMutationVariables>(GenerateS3PresignedUrlDocument, options);
      }
export type GenerateS3PresignedUrlMutationHookResult = ReturnType<typeof useGenerateS3PresignedUrlMutation>;
export type GenerateS3PresignedUrlMutationResult = ApolloReactCommon.MutationResult<GenerateS3PresignedUrlMutation>;
export type GenerateS3PresignedUrlMutationOptions = ApolloReactCommon.BaseMutationOptions<GenerateS3PresignedUrlMutation, GenerateS3PresignedUrlMutationVariables>;
export const CreatePurchasePointDocument = gql`
    mutation CreatePurchasePoint($input: CreatePurchasePointInput!) {
  createPurchasePoint(input: $input) {
    purchasedPointLog {
      id
      company {
        id
        point
      }
    }
  }
}
    `;
export type CreatePurchasePointMutationFn = ApolloReactCommon.MutationFunction<CreatePurchasePointMutation, CreatePurchasePointMutationVariables>;

/**
 * __useCreatePurchasePointMutation__
 *
 * To run a mutation, you first call `useCreatePurchasePointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePurchasePointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPurchasePointMutation, { data, loading, error }] = useCreatePurchasePointMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePurchasePointMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePurchasePointMutation, CreatePurchasePointMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreatePurchasePointMutation, CreatePurchasePointMutationVariables>(CreatePurchasePointDocument, options);
      }
export type CreatePurchasePointMutationHookResult = ReturnType<typeof useCreatePurchasePointMutation>;
export type CreatePurchasePointMutationResult = ApolloReactCommon.MutationResult<CreatePurchasePointMutation>;
export type CreatePurchasePointMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePurchasePointMutation, CreatePurchasePointMutationVariables>;
export const SettingsUsersPageDocument = gql`
    query SettingsUsersPage($companyId: ID!) {
  users: companyUsers(companyId: $companyId) {
    ...CompanyUsersListData
  }
}
    ${CompanyUsersListDataFragmentDoc}`;

/**
 * __useSettingsUsersPageQuery__
 *
 * To run a query within a React component, call `useSettingsUsersPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingsUsersPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingsUsersPageQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useSettingsUsersPageQuery(baseOptions: ApolloReactHooks.QueryHookOptions<SettingsUsersPageQuery, SettingsUsersPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<SettingsUsersPageQuery, SettingsUsersPageQueryVariables>(SettingsUsersPageDocument, options);
      }
export function useSettingsUsersPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SettingsUsersPageQuery, SettingsUsersPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<SettingsUsersPageQuery, SettingsUsersPageQueryVariables>(SettingsUsersPageDocument, options);
        }
export type SettingsUsersPageQueryHookResult = ReturnType<typeof useSettingsUsersPageQuery>;
export type SettingsUsersPageLazyQueryHookResult = ReturnType<typeof useSettingsUsersPageLazyQuery>;
export type SettingsUsersPageQueryResult = ApolloReactCommon.QueryResult<SettingsUsersPageQuery, SettingsUsersPageQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    user {
      id
      name
      email
    }
  }
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  currentUser: me {
    id
    name
    email
    verified
    isActive
    isAdmin
    company {
      ...CurrentCompany
    }
    account {
      ...CurrentAccount
    }
    profile {
      ...CurrentProfile
    }
  }
}
    ${CurrentCompanyFragmentDoc}
${CurrentAccountFragmentDoc}
${CurrentProfileFragmentDoc}`;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = ApolloReactCommon.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;