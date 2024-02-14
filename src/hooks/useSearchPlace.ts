import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Place } from '@/types';

export const useSearchPlace = (): [Place | null, (place: Place) => void] => {
  const [place, setPlace] = React.useState<Place | null>(null);
  const navigate = useNavigate();

  const handlePlaceChanged = (place: Place) => {
    navigate(`/map?lat=${place.location.lat.toString()}&lng=${place.location.lng.toString()}`);
    setPlace(place);
  };
  return [place, handlePlaceChanged];
};
