import React from 'react';
import Button from '@material-ui/core/Button';
import './carCard.styles.css';
const CAR = require('../../Assets/images/car_grapghics.png');

const CarCard = ({trim}) => {
    const {
        model_make_id,
        model_name,
        model_trim,
        model_year,
        model_body,
        model_engine_cc,
        model_engine_cyl,
        model_engine_type,
        model_engine_position,
        model_engine_power_rpm,
        model_engine_torque_rpm,
        model_engine_power_ps,
        model_engine_fuel,
        model_top_speed_kph,
        model_drive,
        model_transmission_type
    } = trim

    const autoHeight = (e) => {
        const clicked = e.target
        const element = clicked.closest('.card_info');
        const card = clicked.closest('.card');
        element.classList.toggle('auto_height')
        card.classList.toggle('auto_height');
    }
    return (
        <div className="card">
            <div className="card_name">
                {model_make_id + ' ' + model_name}
            </div>
            <div className="card_image">
                <img src={CAR} alt="car"/>
            </div>
            <div className="card_info">
                <div className="card_name">
                <Button onClick={e => autoHeight(e)} variant="outlined">Details</Button>
                </div>
                <table>
                <tbody>
                <tr>
                    <th>Make Year</th>
                    <td>{model_year || 'N/A'}</td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th>Fuel Type</th>
                    <td>{model_engine_fuel || 'N/A'}</td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th>Top Speed</th>
                    <td>{model_top_speed_kph || 'N/A'}</td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th>Engine cc</th>
                    <td>{model_engine_cc || 'N/A'}cc</td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th>Transmission</th>
                    <td>{model_transmission_type || 'N/A'}</td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th>Drive Mode</th>
                    <td>{model_drive || 'N/A'}</td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th>Trim</th>
                    <td>{model_trim || 'N/A'}</td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th>Body Type</th>
                    <td>{model_body || 'N/A'}</td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th>Cyleinder</th>
                    <td>{model_engine_cyl || 'N/A'}</td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th>Engine Position</th>
                    <td>{model_engine_position || 'N/A'}</td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th>Engine Type</th>
                    <td>{model_engine_type || 'N/A'}</td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th>Power RPM</th>
                    <td>{model_engine_power_rpm || 'N/A'}</td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th>Power ps</th>
                    <td>{model_engine_power_ps || 'N/A'}</td>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <th>Torque RPM</th>
                    <td>{model_engine_torque_rpm || 'N/A'}</td>
                </tr>
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default CarCard;
