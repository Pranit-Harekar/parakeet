/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPosts
// ====================================================

export interface GetPosts_getPosts {
  __typename: "Post";
  id: number;
  description: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}

export interface GetPosts {
  getPosts: GetPosts_getPosts[] | null;
}
