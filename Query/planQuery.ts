import { gql } from "@apollo/client";

export const paymentQuery = gql`
  mutation ($price: Float!, $userId: String!) {
    createSubscription(price: $price, userId: $userId)
  }
`;
