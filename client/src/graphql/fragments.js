import { gql } from 'apollo-boost';

export const MAKE_DATA = gql`
    fragment makeData on Make {
        make_id
        make_display
        make_is_common
        make_country
        make_year
    }
`;

export const MODEL_DATA = gql`
    fragment modelData on Model {
        model_name
        model_make_id
    }
`;

export const TRIM_DATA = gql`
    fragment trimData on Trim {
        model_id
        model_make_id
        model_name
        model_trim
        model_year
        model_body
        model_engine_position
        model_engine_cc
        model_engine_cyl
        model_engine_type
        model_engine_valver_per_cycle
        model_engine_power_ps
        model_engine_power_rpm
        model_engine_torque_nm
        model_engine_torque_rpm
        model_engine_bore_mm
        model_engine_stroke_mm
        model_engine_compression
        model_engine_fuel
        model_top_speed_kph
        model_0_to_100_kph
        model_drive
        model_transmission_type
        model_gear
    }
`;
