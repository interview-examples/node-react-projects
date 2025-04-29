import { useState } from 'react'
import PropTypes from 'prop-types';

const PassengerPopup = ({ initialPassengers, onClose, onSubmit }) => {
    const [passengers, setPassengers] = useState({ ...initialPassengers });

    const handleChange = (type, value) => {
        event.preventDefault();
        setPassengers(prevState => ({
            ...prevState,
            [type]: value,
        }));
    };

    return (
        <div className="absolute bg-white border rounded shadow-lg p-4 mt-2 z-10">
            {Object.keys(passengers).map((key) => (
                <div key={key} className="flex justify-between items-center mb-2">
                    <span>{key}</span>
                    <div className="flex items-center">
                        <button onClick={() => handleChange(key, Math.max(0, passengers[key] - 1))}>-</button>
                        <span className="mx-2">{passengers[key]}</span>
                        <button onClick={() => handleChange(key, passengers[key] + 1)}>+</button>
                    </div>
                </div>
            ))}
            <div className="flex justify-between">
                <button onClick={onClose} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                    Close
                </button>
                <button onClick={() => onSubmit(passengers)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                    OK
                </button>
            </div>
        </div>
    );
};

PassengerPopup.propTypes = {
    initialPassengers: PropTypes.shape({
        adults: PropTypes.number.isRequired,
        kids: PropTypes.number.isRequired,
        infants: PropTypes.number.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default PassengerPopup;