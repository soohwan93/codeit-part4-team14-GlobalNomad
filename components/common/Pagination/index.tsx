"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import PaginationArrow from "./PaginationArrow";

interface PaginationProps {
  count: number;
  onPageClick: (currentPageData: number) => void;
  pageItemLimit?: number;
  pageRefreshSwitch?: boolean;
  enableAnchorNavigation?: boolean;
  setIsFilterChanged?: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * @param {number} count 현재 페이지네이션할 데이터의 총량을 받습니다.
 * @param {number} pageItemLimit 현재 페이지에 얼마나 많은 개수를 표기할 지 선택하는 인수입니다. 기본적으로 코드잇에서 제공하는 5값으로 되어있으며 필요시 추가로 수정할 수 있게 하였습니다.
 * @param {pageData[]} rawPageData 페이지에 표시할 순수 배열 데이터를 받는 param입니다. 이 데이터를 가공하여 [페이지][페이지 데이터] 형태의 2차원 배열로 가공합니다.
 * @param {React.Dispatch<SetStateAction>} setCurrentPageData 현재 페이지에 보여줄 데이터를 설정하는 setState함수를 받아 페이지 선택 시 그 값으로 설정합니다.
 * @param {boolean} pageRefreshSwitch boolean 형이 변화할 때 마다 바뀌었다는 것을 알려주는 인자입니다. setState(!state) 형식으로 초기화가 필요한 작업 끝단에 넣어주시면 될 듯 합니다.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsFilterChanged 페이지 이동할때 filter변경이 이뤄지지 않는다고 세팅을 해줘야해서 받는 setter함수입니다.
 * @returns
 */
const Pagination = ({
  count,
  pageItemLimit = 3,
  onPageClick = () => {},
  pageRefreshSwitch,
}: PaginationProps) => {
  const lastPageNum = Math.ceil(count / pageItemLimit);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageList, setCurrentPageList] = useState([1]);

  // 페이지 번호 설정에 따라 발생시킬 함수
  const handlePageNumberChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    onPageClick(pageNum);
    if (pageNum % 5 === 1 && pageNum < lastPageNum) {
      const pageList = [];
      for (let i = pageNum; i <= pageNum + 4 && i <= lastPageNum; i++) {
        pageList.push(i);
      }
      setCurrentPageList(pageList);
    }

    if (pageNum % 5 === 0 && pageNum < lastPageNum) {
      const pageList = [];
      for (let i = pageNum - 4; i <= pageNum && i <= lastPageNum; i++) {
        pageList.push(i);
      }
      setCurrentPageList(pageList);
    }
  };

  // 페이지 숫자 양 옆의 화살표 버튼 클릭 시 실행할 함수
  const handlePaginationArrowButton = (rightDirection: boolean) => {
    if (rightDirection) {
      if (currentPage < lastPageNum && lastPageNum !== 1) {
        handlePageNumberChange(currentPage + 1);
      }
    } else {
      if (currentPage !== 1) {
        handlePageNumberChange(currentPage - 1);
      }
    }
  };

  useEffect(() => {
    const firstPageList: number[] = [];

    if (lastPageNum === 0) {
      firstPageList.push(1);
    } else {
      for (let i = 1; i <= 5 && i <= lastPageNum; i++) {
        firstPageList.push(i);
      }
    }

    setCurrentPageList(firstPageList);
    handlePageNumberChange(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    handlePageNumberChange(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageRefreshSwitch]);

  return (
    <div className="flex h-16 w-full items-center justify-center gap-2 bg-white p-3 ">
      <button
        type="button"
        className={`h-5 w-5 rounded-full 
          ${currentPage !== 1 ? "hover:bg-gray-20" : "cursor-default opacity-40"}`}
        onClick={() => handlePaginationArrowButton(false)}
      >
        <PaginationArrow className="h-full w-full rotate-180" />
      </button>

      <div className="flex min-w-80 justify-center gap-2.5">
        {currentPageList.map((item) => (
          <React.Fragment key={`pagination-${item}`}>
            <button
              type="button"
              className={`h-14 w-14 rounded-2xl border border-black
            ${currentPage === item ? "bg-nomad-black text-white" : "text-black hover:bg-gray-10"}`}
              onClick={() => handlePageNumberChange(item)}
            >
              {item}
            </button>
          </React.Fragment>
        ))}
      </div>

      <button
        type="button"
        className={`relative h-5 w-5 rounded-full 
          ${currentPage < lastPageNum ? " hover:bg-gray-20" : "cursor-default opacity-40"}`}
        onClick={() => handlePaginationArrowButton(true)}
      >
        <PaginationArrow className="h-full w-full" />
      </button>
    </div>
  );
};

export default Pagination;
