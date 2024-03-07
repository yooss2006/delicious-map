import React from 'react';

import { Place } from '@/old-file/types/place';

const usePlaces = () => {
  const [kakaoPlaces, setKakaoPlaces] = React.useState<any>(null);
  const [places, setPlaces] = React.useState<Array<Place>>([]);

  const handleSearchPlaces = React.useCallback(
    async (keyword: string) => {
      if (kakaoPlaces) {
        const searchPromise = ['FD6', 'CE7'].map((categoryGroupCode) => {
          return new Promise<Array<Place>>((resolve) => {
            kakaoPlaces.keywordSearch(
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
    [kakaoPlaces]
  );

  React.useEffect(() => {
    if (window.kakao && !kakaoPlaces) {
      window.kakao.maps.load(() => {
        setKakaoPlaces(new window.kakao.maps.services.Places());
      });
    }
  }, [kakaoPlaces]);

  return { places, handleSearchPlaces };
};

export default usePlaces;
