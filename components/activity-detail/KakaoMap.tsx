import Script from "next/script";
import React from "react";

type Props = {};

const KakaoMap = (props: Props) => {
  return (
    <div>
      <div id="map" className="h-96 w-96 outline-[1px] outline-black">
        카카오 맵 들어갈 자리
      </div>
      <Script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=da964a62e055d3e70fdf6f70db10c052"
      />
      <script>
		var container = document.getElementById('map');
		var options = {center: new kakao.maps.LatLng(33.450701, 126.570667), level: 3};

		var map = new kakao.maps.Map(container, options);
	</script>
      <span>현재 체험의 주소 들어갈 자리</span>
    </div>
  );
};

export default KakaoMap;
