import { useCallback, useEffect, useState } from 'react';

import { useParsedLocation } from '@/shared/hooks';

interface Place {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  place_url: string;
  distance: string;
  x: string;
  y: string;
}

export const useSearchPlaces = () => {
  const [placeController, setPlaceController] = useState<any>(null);
  const { query } = useParsedLocation();
  const [places, setPlaces] = useState<Array<Place>>([]);

  const searchPlaces = useCallback(
    async (keyword: string) => {
      if (placeController) {
        const searchPromise = ['FD6', 'CE7'].map((categoryGroupCode) => {
          return new Promise<Array<Place>>((resolve) => {
            placeController.keywordSearch(
              keyword,
              (result: Array<Place>, status: any) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  resolve(result);
                } else {
                  resolve([]);
                }
              },
              { category_group_code: categoryGroupCode }
            );
          });
        });

        try {
          const results = await Promise.all(searchPromise);
          const mergedResults = results.reduce((acc, cur) => {
            return [...acc, ...cur];
          }, []);
          const sortedPlaces = mergedResults.sort((a, b) => Number(a.id) - Number(b.id));
          setPlaces(sortedPlaces);
        } catch (error) {
          throw new Error('카카오맵을 불러오는 중 오류가 발생했습니다.');
        }
      }
    },
    [placeController]
  );

  useEffect(() => {
    if (window.kakao && !placeController) {
      window.kakao.maps.load(() => {
        setPlaceController(new window.kakao.maps.services.Places());
      });
    }
  }, [placeController]);

  useEffect(() => {
    if (query.q) {
      searchPlaces(query.q);
    }
  }, [query.q, searchPlaces]);

  return places;
};
