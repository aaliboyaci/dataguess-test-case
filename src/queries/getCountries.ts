import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      emoji
      currency
      code
      capital
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`;
