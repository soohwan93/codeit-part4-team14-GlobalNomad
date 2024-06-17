"use client";
declare global {
  interface Window {
    kakao: any;
  }
}
import React, { useEffect } from "react";

interface KakaoMapProps {
  address: string;
  activityTitle: string;
}

const KakaoMap = ({ address, activityTitle }: KakaoMapProps) => {
  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        var container = document.getElementById("map");
        var options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          draggable: true,
          level: 4,
        };

        var map = new window.kakao.maps.Map(container, options);
        var geocoder = new window.kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(address, function (result: any, status: any) {
          // 정상적으로 검색이 완료됐으면
          if (status === window.kakao.maps.services.Status.OK) {
            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:6px 0;">${activityTitle}</div>`,
            });
            infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
            map.setZoomable(false);
          }
        });
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div
        id="map"
        className="flex h-[18rem] w-full items-center justify-center rounded-2xl outline-[1px] outline-black md:h-[24rem] xl:h-[28.125rem]"
      >
        지도를 불러오는 중입니다...
      </div>
      <span className="mt-2 flex items-center text-sm">
        <div className="mr-0.5 inline-block h-4 w-4 bg-[url('/icons/location.svg')] bg-no-repeat" />
        {address}
      </span>
    </div>
  );
};

export default KakaoMap;
