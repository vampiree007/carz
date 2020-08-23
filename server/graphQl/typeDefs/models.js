const {gql} = require('apollo-server-express');

module.exports = gql`
    type Model {
        model_make_id: String,
        model_name: String
    }
    # input type
    input CreateModelInput {
        model_make_id: String,
        model_name: String
    }
    input UpdateModelInput {
        model_make_id: String,
        model_name: String
    }
    # query
    type Query {
        allModels: [Model]
        makeModels(model_make_id: String!): [Model]
    }
    # mutations
    type Mutation {
        createModel(input: CreateModelInput!): Model!
        updateModel(input: UpdateModelInput!): Model!
        deleteModel(modelId: String!): Model!
    }
`