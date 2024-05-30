"use client";

import React, { useEffect, useRef, useState } from "react";
import PaginationArrow from "./PaginationArrow";

interface PaginationProps {
  count: number;
  onPageClick: (currentPageNum: number) => void;
  pageItemLimit?: number;
  pageRefreshSwitch?: boolean;
}

/**
 * @param {number} count 현재 페이지네이션할 데이터의 총량을 받습니다.
 * @param {number} pageItemLimit 현재 페이지에 얼마나 많은 개수를 표기할 지 선택하는 인수입니다. 기본적으로 리뷰 컴포넌트에서 표시하는 3값으로 설정되어있습니다.
 * @param {function} onPageClick 현재 페이지에 보여줄 데이터를 설정하는 setState함수를 받아 페이지 선택 시 그 값으로 설정합니다. 동일 페이지 내 화면 이동이 필요한 경우, useRef를 활용해 ref.current.scrollIntoView를 활용하시면 될 것 같습니다.
 * @param {boolean} pageRefreshSwitch 현재 페이지가 변화하여 1페이지로 돌아가야 함을 알려줄 때 사용합니다. ex)filter적용 setState(!state) 형식으로 초기화가 필요한 작업 끝단에 넣어주시면 될 듯 합니다.
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
    if (pageNum % 5 === 1 && pageNum <= lastPageNum) {
      const pageList = [];
      for (let i = pageNum; i <= pageNum + 4 && i <= lastPageNum; i++) {
        pageList.push(i);
      }
      setCurrentPageList(pageList);
    }

    if (pageNum % 5 === 0 && pageNum <= lastPageNum) {
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
    <div className="flex h-10 w-full items-center justify-center gap-2 bg-white p-3 md:h-14 ">
      <button
        type="button"
        className={`h-5 w-5 rounded-full 
          ${currentPage !== 1 ? "hover:bg-gray-20" : "cursor-default opacity-40"}`}
        onClick={() => handlePaginationArrowButton(false)}
      >
        <PaginationArrow className="h-full w-full rotate-180" />
      </button>

      <div className="flex min-w-60 justify-center gap-2.5 md:min-w-80">
        {currentPageList.map((item) => (
          <React.Fragment key={`pagination-${item}`}>
            <button
              type="button"
              className={`h-10 w-10 rounded-2xl border border-black md:h-14 md:w-14
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
