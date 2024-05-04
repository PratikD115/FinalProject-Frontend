import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation (
    $email: String!
    $name: String!
    $password: String!
    $role: UserRole!
  ) {
    signUp(
      createUserDto: {
        name: $name
        email: $email
        password: $password
        role: $role
      }
    ) {
      id
      name
      email
      password
    }
  }
`;
export const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(loginUserDto: { inputEmail: $email, inputPassword: $password }) {
      token
      id
      name
      role
      email
      profile
    }
  }
`;

export const User = gql`
  query ($userId: String!) {
    getUserById(userId: $userId) {
      id
      name
      email
      role
      profile
      favourite {
        id
      }
      follow {
        id
      }
    }
  }
`;
