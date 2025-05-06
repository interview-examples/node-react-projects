import { useEffect, useState } from 'react';

export function useSearchFormValidation(params) {
  const [isValid, setIsValid] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    // Initialize errors object
    const errors = {};
    
    // Check for empty required fields
    if (params.originSkyName.length === 0) {
      errors.originSkyName = 'Origin airport is required';
    }
    
    if (params.destinationSkyName.length === 0) {
      errors.destinationSkyName = 'Destination airport is required';
    }
    
    if (params.date.length === 0) {
      errors.date = 'Flight date is required';
    }
    
    if (params.tripType === 'round-trip' && params.returnDate.length === 0) {
      errors.returnDate = 'Return date is required for round trips';
    }
    
    // Check that return date is after flight date for round trips
    if (params.tripType === 'round-trip' && 
        params.date.length !== 0 && 
        params.returnDate.length !== 0) {
      const flightDate = new Date(params.date);
      const returnDate = new Date(params.returnDate);
      
      if (returnDate < flightDate) {
        errors.returnDate = 'Return date must be after flight date';
      }
    }
    
    // Check that there's at least one passenger
    if (params.adults + params.kids + params.infants <= 0) {
      errors.passengers = 'At least one passenger is required';
    }
    
    // Update validation errors state
    setValidationErrors(errors);
    
    // Form is valid if there are no errors
    setIsValid(Object.keys(errors).length === 0);
  }, [params]);

  return { isValid, validationErrors };
}