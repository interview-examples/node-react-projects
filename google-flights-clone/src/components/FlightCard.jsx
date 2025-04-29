import { useState } from 'react';
import PropTypes from 'prop-types';

function FlightCard({ flight }) {
    const [showDetails, setShowDetails] = useState(false);
    const toggleDetails = () => setShowDetails(!showDetails);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    };

    const formatDuration = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };

    const farePolicyExists = Object.values(flight.farePolicy).some(value => value);

    return (
        <div className="border p-4 pt-8 rounded-lg shadow-lg mb-4 bg-white w-full max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-bold">{flight.legs[0].origin.name} - {flight.legs[0].destination.name}</h2>
                    <p className="text-sm">{formatDate(flight.legs[0].departure)} - {formatDate(flight.legs[flight.legs.length - 1].arrival)}</p>
                </div>
                <div className="text-right">
                    <span className="text-xl font-semibold">{flight.price.formatted}</span>
                    {flight.tags && (
                        <div className={"flex flex-col space-y-1"}>
                        {flight.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">
                                {tag}
                            </span>
                        ))}
                    </div>
                    )}
                </div>
            </div>

            <button onClick={toggleDetails} className="text-blue-500 underline">
                {showDetails ? 'Hide flight details' : 'Show flight details'}
            </button>

            {showDetails && flight.legs.map((leg, index) => (
                <div key={leg.id} className="border-t pt-4 mt-4 ">
                    <h3 className="text-md font-semibold">Fly {index + 1}: {leg.origin.name} <small>to</small> {leg.destination.name}</h3>
                    <p className="text-sm">Duration: {formatDuration(leg.durationInMinutes)}</p>
                    <p className="text-sm">Stops: {leg.stopCount === 0 ? 'Direct flight' : `${leg.stopCount} stop(s)`}</p>
                    {leg.segments.map((segment, segmentIndex) => {
                        const carrierLogos = {};
                        leg.carriers.marketing.forEach(carrier => {
                            carrierLogos[carrier.id] = carrier.logoUrl;
                        });
                        return (
                            <div key={segment.id} className="border-t pt-4 mt-4 flex justify-center">
                                <div className="w-full max-w-2xl pl-4 mt-2 flex flex-col sm:flex-row items-center sm:items-start sm:justify-between">
                                    <div className="mr-2 flex items-center">
                                        <img
                                            src={carrierLogos[segment.marketingCarrier.id]}
                                            alt={segment.marketingCarrier.name}
                                            title={segment.marketingCarrier.name}
                                            className="w-10 h-10 mr-2"
                                        />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <p className="text-sm font-medium">{segmentIndex + 1}: {segment.origin.name} <small>to</small> {segment.destination.name}</p>
                                        <p className="text-sm">Departure: {formatDate(segment.departure)}</p>
                                        <p className="text-sm">Arrival: {formatDate(segment.arrival)}</p>
                                    </div>
                                    <div className="text-right sm:text-left sm:w-1/4 sm:self-start">
                                        <p className="text-sm mt-0">Flight Number: <strong>{segment.flightNumber}</strong></p>
                                    </div>
                                </div>
                            </div>

                        );
                    })}
                </div>
            ))}

            {farePolicyExists && (
                <div className="border-t pt-4 mt-4">
                    <p className="text-sm">Fare Policy:</p>
                    <ul className="list-disc list-inside">
                        {flight.farePolicy.hasFlexibleOptions && <li>Flexible options</li>}                        {flight.farePolicy.isChangeAllowed && <li>Change allowed</li>}
                        {flight.farePolicy.isPartiallyChangeable && <li>Partially changeable</li>}
                        {flight.farePolicy.isCancellationAllowed && <li>Cancellation allowed</li>}
                        {flight.farePolicy.isPartiallyRefundable && <li>Partially refundable</li>}
                    </ul>
                </div>
            )}
        </div>
    );
}

FlightCard.propTypes = {
    flight: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        farePolicy: PropTypes.shape({
            hasFlexibleOptions: PropTypes.bool,
            isChangeAllowed: PropTypes.bool,
            isPartiallyChangeable: PropTypes.bool,
            isCancellationAllowed: PropTypes.bool,
            isPartiallyRefundable: PropTypes.bool,
        }),
        hasFlexibleOptions: PropTypes.bool,
        price: PropTypes.shape({
            raw: PropTypes.number,
            formatted: PropTypes.string,
            pricingOptionId: PropTypes.string,
        }),
        tags: PropTypes.arrayOf(PropTypes.string),
        legs: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                arrival: PropTypes.string,
                departure: PropTypes.string,
                origin: PropTypes.shape({
                    id: PropTypes.string,
                    name: PropTypes.string,
                }),
                destination: PropTypes.shape({
                    id: PropTypes.string,
                    name: PropTypes.string,
                }),
                durationInMinutes: PropTypes.number,
                stopCount: PropTypes.number,
                segments: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.string,
                        departure: PropTypes.string,
                        arrival: PropTypes.string,
                        origin: PropTypes.object,
                        destination: PropTypes.object,
                        durationInMinutes: PropTypes.number,
                        flightNumber: PropTypes.string,
                        marketingCarrier: PropTypes.shape({
                            logoUrl: PropTypes.string,
                            name: PropTypes.string,
                        }),
                        operatingCarrier: PropTypes.shape({
                            name: PropTypes.string,
                        }),
                    })
                ),
            })
        ),
    }).isRequired,
};

export default FlightCard;