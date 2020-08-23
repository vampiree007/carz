import { gql } from 'apollo-boost';
import { TRIM_DATA } from './fragments';

export const POST_ADDED = gql`
    subscription {
        postAdded {
            ...trimData
        }
    }
    ${TRIM_DATA}
`;