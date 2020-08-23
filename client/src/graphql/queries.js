import { gql } from 'apollo-boost';
import { MAKE_DATA, MODEL_DATA, TRIM_DATA } from './fragments';

/////////////////////////////////////////////////////////////////////////////////////////////
//////////////MAKE QUERIES/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

export const GET_ALL_MAKES = gql`
    query allMakes($page: Int!) {
        allPosts(page: $page) {
            ...postData
        }
    }
    ${MAKE_DATA}
`;

export const SINGLE_MAKES = gql`
    query singleMake($postId: String!) {
        singlePost(postId: $postId) {
            ...postData
        }
    }
    ${MAKE_DATA}
`;

export const TOTAL_MAKES = gql`
    query {
        totalMakes{
            make_id,
            make_display
        }
    }
`;

/////////////////////////////////////////////////////////////////////////////////////////////
//////////////MODEL QUERIES/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

export const GET_ALL_MODELS = gql`
    query allModels($page: Int!) {
        allModels(page: $page) {
            ...postData
        }
    }
    ${MODEL_DATA}
`;

export const SINGLE_MODEL = gql`
    query singleModel($postId: String!) {
        singleModel(postId: $postId) {
            ...postData
        }
    }
    ${MODEL_DATA}
`;
export const MAKE_MODELS = gql`
    query makeModels($model_make_id: String!) {
        makeModels(model_make_id: $model_make_id) {
            ...modelData
        }
    }
    ${MODEL_DATA}
`;
export const TOTAL_MODELS = gql`
    query {
        totalModels
    }
`;


/////////////////////////////////////////////////////////////////////////////////////////////
//////////////MODEL QUERIES/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

export const GET_ALL_TRIMS = gql`
    query allTrims($page: Int!) {
        allTrims(page: $page) {
            ...postData
        }
    }
    ${TRIM_DATA}
`;

export const LATEST_TRIMS = gql`
    query eightTrims{
        eightTrims{
            ...trimData
        }
    }
    ${TRIM_DATA}
`;

export const SINGLE_TRIM = gql`
    query singleTrim($postId: String!) {
        singleTrim(postId: $postId) {
            ...trimData
        }
    }
    ${MODEL_DATA}
`;
export const MODEL_TRIMS = gql`
    query modelTrims($model_name: String!) {
        modelTrims(model_name: $model_name) {
            ...trimData
        }
    }
    ${TRIM_DATA}
`;
export const TOTAL_TRIMS = gql`
    query {
        totaltrims
    }
`;