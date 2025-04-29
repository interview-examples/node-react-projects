import PropTypes from 'prop-types';

function FilterBar({ onSort }) {
    return (
        <div className="flex justify-between items-center p-4 bg-gray-200 rounded-lg shadow-md">
            <div className="flex items-center">
                <label className="mr-2">⇅</label>
                <select onChange={e => onSort(e.target.value)} className="p-2 rounded-lg">
                    <option value="--">Select...</option>
                    <option value="price">Price</option>
                    <option value="duration">Duration</option>
                    <option value="departure">Departure Time</option>
                    <option value="arrival">Arrival Time</option>
                </select>
            </div>
        </div>
    );
}

FilterBar.propTypes = {
    onSort: PropTypes.func.isRequired,
};

export default FilterBar;