import { useState } from 'react';
import './styles/App.css'
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import Footer from './components/Footer';
import FlightList from './components/FlightList';
import FilterBar from './components/FilterBar';
import axios from 'axios';

function App() {
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [noResults, setNoResults] = useState(true);
    const [sortCriteria, setSortCriteria] = useState('');

    const fetchAirports = async (skyName) => {
        try {
            const response = await axios.get('https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport', {
                headers: {
                    'x-rapidapi-key': '8bbe4fee2bmshf3a481240fa5b17p1774b6jsn5fd15f329bd4',
                    'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
                },
                params: {
                    query: skyName,
                    locale: 'en-US'
                },
            });

            if (response.data.status) {
                return response.data.data.map(item => ({
                    skyId: item.skyId,
                    entityId: item.entityId,
                    title: item.presentation.title,
                    suggestionTitle: item.presentation.suggestionTitle,
                    subtitle: item.presentation.subtitle
                }));
            } else {
                console.error("Failed to fetch airports: Status is false");
                return [];
            }
        } catch (error) {
            console.error("Error(s) occurred while fetching airports: ", error);
            return [];
        }
    };

    const fetchFlights = async (params) => {
        const options = {
            method: 'GET',
            url: 'https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights',
            params,
            headers: {
                'x-rapidapi-key': '8bbe4fee2bmshf3a481240fa5b17p1774b6jsn5fd15f329bd4',
                'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
            },
        };
        try {
            const response = await axios.request(options);
            if (response.data.status) {
                const flightsData = response.data.data.itineraries;
                setFlights(flightsData);
                setNoResults(flightsData.length === 0);
            } else {
                console.error("Failed to fetch flights. Incorrect user's data.");
                setNoResults(true);
            }
        } catch (error) {
            console.error("Error(s) occurred while fetching flights: ", error);
            setNoResults(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSort = (criteria) => {
        setSortCriteria(criteria);
    };

    const handleSearch = async (searchParams) => {
        setIsLoading(true);
        setNoResults(false);
        setFlights([]);

        const originAirportsData = await fetchAirports(searchParams.originSkyName);
        const destinationAirportsData = await fetchAirports(searchParams.destinationSkyName);

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
            await fetchFlights(params);
        } else {
            setIsLoading(false);
            setNoResults(true);
        }
    };

    const sortedFlights = flights.sort((a, b) => {
        switch (sortCriteria) {
            case 'price':
                return a.price.raw - b.price.raw;
            case 'duration':
                return a.legs[0].durationInMinutes - b.legs[0].durationInMinutes;
            case 'departure':
                return new Date(a.legs[0].departure) - new Date(b.legs[0].departure);
            case 'arrival':
                return new Date(a.legs[0].arrival) - new Date(b.legs[0].arrival);
            default:
                return 0;
        }
    });

    return (
        <div className="App">
            <Header />
            <SearchForm onSearch={handleSearch} />
            {isLoading && (
                <div className="text-center my-4">
                    <div className="loader"></div>
                    <p>Searching for flights...</p>
                </div>
            )}
            {!isLoading && noResults && (
                <div className="text-center my-4">
                    <p>No flights found. Please try different search criteria.</p>
                </div>
            )}
            {!isLoading && !noResults && (
                <>
                    <FilterBar onSort={handleSort} />
                    <FlightList flights={sortedFlights} />
                </>
            )}
            <Footer />
        </div>
    );
}

export default App;
