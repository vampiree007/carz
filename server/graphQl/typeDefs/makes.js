const {gql} = require('apollo-server-express');

module.exports = gql`
    type Make {
        make_id: String,
        make_display: String,
        make_is_common: String,
        make_country: String,
        make_year: String
    }
    type SmallMake {
        make_id: String,
        make_display: String
    }
    # input type
    input CreateMakeInput {
        make_id: String,
        make_display: String,
        make_is_common: String,
        make_country: String,
        make_year: String
    }
    # queries
    type Query {
        totalMakes: [SmallMake!]
        allMakes: [Make!]
        singlePost(id: String!): Make!
    }
    # mutations
    type Mutation {
        createMake(input: CreateMakeInput!): Make!
    }
`