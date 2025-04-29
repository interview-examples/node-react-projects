import { useEffect, useState } from 'react';

export function useSearchFormValidation(params) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const valid =
      params.adults + params.kids + params.infants > 0 &&
      params.originSkyName.length !== 0 &&
      params.destinationSkyName.length !== 0 &&
      params.date.length !== 0 &&
      (params.tripType === 'round-trip' ? params.returnDate.length !== 0 : true);

    setIsValid(valid);
  }, [params]);

  return isValid;
}