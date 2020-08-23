const {gql} = require('apollo-server-express');

module.exports = gql`
    type Trim {
        _id: ID!
        model_id: String
        model_make_id: String
        model_name: String
        model_trim: String
        model_year: String
        model_body: String
        model_engine_position: String
        model_engine_cc: String
        model_engine_cyl: String
        model_engine_type: String
        model_engine_valver_per_cycle: String
        model_engine_power_ps: String
        model_engine_power_rpm: String
        model_engine_torque_nm: String
        model_engine_torque_rpm: String
        model_engine_bore_mm: String
        model_engine_stroke_mm: String
        model_engine_compression: String
        model_engine_fuel: String
        model_top_speed_kph: String
        model_0_to_100_kph: String
        model_drive: String
        model_transmission_type: String
        model_gear: String
    }
    # input type
    input CreateTrimInput {
        model_id: String
        model_make_id: String
        model_name: String
        model_trim: String
        model_year: String
        model_body: String
        model_engine_position: String
        model_engine_cc: String
        model_engine_cyl: String
        model_engine_type: String
        model_engine_valver_per_cycle: String
        model_engine_power_ps: String
        model_engine_power_rpm: String
        model_engine_torque_nm: String
        model_engine_torque_rpm: String
        model_engine_bore_mm: String
        model_engine_stroke_mm: String
        model_engine_compression: String
        model_engine_fuel: String
        model_top_speed_kph: String
        model_0_to_100_kph: String
        model_drive: String
        model_transmission_type: String
        model_gear: String
    }
    # query
    type Query {
        allTrims: [Trim]
        modelTrims(model_name: String!): [Trim]
        eightTrims: [Trim] 
    }
    # mutations
    type Mutation {
        createTrim(input: CreateTrimInput!): Trim!
        deleteTrim(makeId: String!): Trim!
    }
    # subscriptions
    type Subscription {
        postAdded: Trim
    }
`