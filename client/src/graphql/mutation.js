import { gql } from 'apollo-boost';
import { MAKE_DATA, MODEL_DATA, TRIM_DATA } from './fragments';
/////////////////////////////////////////////////////////////////////////////////////////////
//////////////MODEL QUERIES/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

export const MAKE_CREATE = gql`
    mutation createMake($input: CreateMakeInput!) {
        createMake(input: $input) {
            ...makeData
        }
    }
    ${MAKE_DATA}
`;

export const MAKE_DELETE = gql`
    mutation deleteMake($makeId: String!) {
        deleteMake(makeId: $makeId) {
            _id
        }
    }
`;

export const MAKE_UPDATE = gql`
    mutation updateMake($input: UpdateMakeInput!) {
        updateMake(input: $input) {
            ...makeData
        }
    }
    ${MAKE_DATA}
`;

/////////////////////////////////////////////////////////////////////////////////////////////
//////////////MODEL QUERIES/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

export const MODEL_CREATE = gql`
    mutation createModel($input: CreateModelInput!) {
        createModel(input: $input) {
            ...modelData
        }
    }
    ${MODEL_DATA}
`;

export const MODEL_DELETE = gql`
    mutation deleteModel($modelId: String!) {
        deleteModel(modelId: $modelId) {
            _id
        }
    }
`;

export const MODEL_UPDATE = gql`
    mutation updateModel($input: UpdateModelInput!) {
        updateModel(input: $input) {
            ...modelData
        }
    }
    ${MODEL_DATA}
`;

/////////////////////////////////////////////////////////////////////////////////////////////
//////////////TRIM QUERIES/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

export const TRIM_CREATE = gql`
    mutation createTrim($input: CreateTrimInput!) {
        createTrim(input: $input) {
            ...trimData
        }
    }
    ${TRIM_DATA}
`;

export const TRIM_DELETE = gql`
    mutation deleteTrim($trimId: String!) {
        deleteTrim(trimId: $trimId) {
            _id
        }
    }
`;

export const TRIM_UPDATE = gql`
    mutation updateTrim($input: UpdateTrimInput!) {
        updateTrim(input: $input) {
            ...trimData
        }
    }
    ${TRIM_DATA}
`;