import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { flightService } from '../services/flightService';

const FlightContext = createContext();

export const useFlightContext = () => useContext(FlightContext);

export const FlightProvider = ({ children }) => {
    const [state, setState] = useState({
        flights: [],
        status: {
            isLoading: false,
            noResults: true
        },
        sortCriteria: ''
    });

    const handleSearch = async (searchParams) => {
        // Update loading state
        setState(prev => ({
            ...prev,
            status: { isLoading: true, noResults: false },
            flights: []
        }));

        const originAirportsData = await flightService.fetchAirports(searchParams.originSkyName);
        const destinationAirportsData = await flightService.fetchAirports(searchParams.destinationSkyName);

        if (originAirportsData.length > 0 && destinationAirportsData.length > 0) {
            const params = {
                originSkyId: originAirportsData[0].skyId,
                originEntityId: originAirportsData[0].entityId,
                destinationSkyId: destinationAirportsData[0].skyId,
                destinationEntityId: destinationAirportsData[0].entityId,
                date: searchParams.date,
                returnDate: searchParams.returnDate,
                tripType: searchParams.tripType,
                adults: searchParams.adults,
                childrens: searchParams.kids,
                infants: searchParams.infants,
                cabinClass: searchParams.cabinClass,
                sortBy: 'best',
            };
            
            const { flights, success } = await flightService.fetchFlights(params);
            
            setState(prev => ({
                ...prev,
                flights,
                status: { 
                    isLoading: false, 
                    noResults: !success || flights.length === 0 
                }
            }));
        } else {
            setState(prev => ({
                ...prev,
                status: { isLoading: false, noResults: true }
            }));
        }
    };

    const handleSort = (criteria) => {
        setState(prev => ({
            ...prev,
            sortCriteria: criteria
        }));
    };

    // Create a sorting configuration map instead of switch statement // Note: ?
    const sortingConfigs = {
        price: (a, b) => a.price.raw - b.price.raw,
        duration: (a, b) => a.legs[0].durationInMinutes - b.legs[0].durationInMinutes,
        departure: (a, b) => new Date(a.legs[0].departure) - new Date(b.legs[0].departure),
        arrival: (a, b) => new Date(a.legs[0].arrival) - new Date(b.legs[0].arrival),
        default: () => 0
    };

    // Get sorted flights using the configuration map // Note: ?
    const getSortedFlights = () => {
        const { flights, sortCriteria } = state;
        const sortFn = sortingConfigs[sortCriteria] || sortingConfigs.default;
        return [...flights].sort(sortFn);
    };

    return (
        <FlightContext.Provider value={{
            ...state,
            handleSearch,
            handleSort,
            sortedFlights: getSortedFlights()
        }}>
            {children}
        </FlightContext.Provider>
    );
};

FlightProvider.propTypes = {
    children: PropTypes.node.isRequired
};
