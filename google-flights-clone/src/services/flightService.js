import axios from 'axios';
import config from '../config/gfcConfig.json';

export const flightService = {
    fetchAirports: async (skyName) => {
        const options = {
            method: 'GET',
            url: "https://" + config.API.HOST + config.URIs.searchAirport,
            params: {
                query: skyName,
                locale: 'en-US'
            },
            headers: {
                'x-rapidapi-key': config.API.KEY,
                'x-rapidapi-host': config.API.HOST
            }
        };
        console.log("fetchAirports: ", options);
        try {
            const response = await axios.request(options);
            console.log(response.data);

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
    },

    fetchFlights: async (params) => {
        const options = {
            method: 'GET',
            url: "https://" + config.API.HOST + config.URIs.searchFlights,
            params,
            headers: {
                'x-rapidapi-key': config.API.KEY,
                'x-rapidapi-host': config.API.HOST
            },
        };

        console.log("fetchFlights: ", options);
        try {
            const response = await axios.request(options);
            console.log(response.data);

            if (response.data.status) {
                return {
                    flights: response.data.data.itineraries,
                    success: true
                };
            } else {
                console.error("Failed to fetch flights. Incorrect user's data: ", params);
                return { flights: [], success: false };
            }
        } catch (error) {
            console.error("Error(s) occurred while fetching flights: ", error);
            return { flights: [], success: false };
        }
    }
};
