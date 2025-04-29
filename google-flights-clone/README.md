# Flight Search Application

This project is a web application for searching and displaying flight information. It allows users to search for flights based on origin, destination, and date, and displays the results in an easy-to-read format.

## Features

- Search for flights by origin, destination, and date
- Display flight results with detailed information
- Select number of passengers (adults, children, infants)
- Responsive design for various screen sizes

## Technologies Used

- React
- Axios for API requests
- Material-Tailwind for UI components
- PropTypes for prop validation

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm (usually comes with Node.js)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/flight-search-app.git
    ```

2. Navigate to the project directory:

    ```bash
    cd flight-search-app
    ```

3. Install dependencies:

    ```bash
    npm install
    ```
4. Create a `.env` file in the root directory and add your API key:
      
    ```
    REACT_APP_API_KEY=your_api_key
    ```
      
5. Start the development server:

### Running the Application

1. Start the development server:
    ```bash
    npm start
    ```
2.  Open your browser and navigate to http://localhost:3000

## Usage

1. Enter the origin and destination airports in the search form.
2. Select the departure date.
3. (Optional) Adjust the number of passengers.
4. Click the "Search" button to find available flights.
5. View the search results displayed below the search form.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

