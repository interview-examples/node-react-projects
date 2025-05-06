import './styles/App.css'
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import Footer from './components/Footer';
import FlightList from './components/FlightList';
import FilterBar from './components/FilterBar';
import { FlightProvider, useFlightContext } from './context/FlightContext';

function FlightApp() {
    const { status, handleSearch, handleSort, sortedFlights } = useFlightContext();
    const { isLoading, noResults } = status;

    const renderLoadingState = () => (
        <div className="text-center my-4">
            <div className="loader"></div>
            <p>Searching for flights...</p>
        </div>
    );

    const renderNoResultsState = () => (
        <div className="text-center my-4">
            <p>No flights found. Please try different search criteria.</p>
        </div>
    );

    const renderResults = () => (
        <>
            <FilterBar onSort={handleSort} />
            <FlightList flights={sortedFlights} />
        </>
    );

    return (
        <div className="App">
            <Header />
            <SearchForm onSearch={handleSearch} />
            {isLoading && renderLoadingState()}
            {!isLoading && noResults && renderNoResultsState()}
            {!isLoading && !noResults && renderResults()}
            <Footer />
        </div>
    );
}

function App() {
    return (
        <FlightProvider>
            <FlightApp />
        </FlightProvider>
    );
}

export default App;
