import FlightCard from './FlightCard';
import PropTypes from 'prop-types';


function FlightList({ flights }) {
    return (
        <div className="space-y-4">
            {flights.map(flight => (
                <FlightCard key={flight.id} flight={flight} />
            ))}
        </div>
    );
}

FlightList.propTypes = {
    flights: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            farePolicy: PropTypes.shape({
                isChangeAllowed: PropTypes.bool,
                isPartiallyChangeable: PropTypes.bool,
                isCancellationAllowed: PropTypes.bool,
                isPartiallyRefundable: PropTypes.bool,
            }),
            hasFlexibleOptions: PropTypes.bool,
            isSelfTransfer: PropTypes.bool,
            isMashUp: PropTypes.bool,
            isProtectedSelfTransfer: PropTypes.bool,
            score: PropTypes.number,
            tags: PropTypes.arrayOf(PropTypes.string),
            price: PropTypes.shape({
                raw: PropTypes.number,
                formatted: PropTypes.string,
                pricingOptionId: PropTypes.string,
            }),
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
                    isSmallestStops: PropTypes.bool,
                    segments: PropTypes.arrayOf(
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
                            isSmallestStops: PropTypes.bool,
                        })
                    ),
                })
            ),
        })
    ).isRequired,
};

export default FlightList;