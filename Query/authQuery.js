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
    }
  }
`;
