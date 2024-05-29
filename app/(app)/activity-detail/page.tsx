import React from "react";

const page = () => {
  return (
    <>
      <header className="my-4 flex items-center justify-between">
        <div>체험 상세 정보</div>
        <button>kebab section</button>
      </header>
      <main>
        <section>대충 이미지가 들어갈 장소</section>
        <div className="flex">
          <article className="">
            <hr color="nomad-black" className="hidden md:block" />
            <h3 className="mb-4 mt-4 text-xl font-bold leading-[130%] text-nomad-black md:mt-10">
              체험 설명
            </h3>
            <textarea
              disabled
              className="w-full resize-none text-wrap bg-transparent text-base leading-[162.5%] text-nomad-black"
            >
              체험 설명
              쫘라라라라락sfasd;fadjsfkldsjfdls;fsdfasfsdkf;lsakfjas;lfkasjfls;dkfjas;lfaksjf;lsakfjdsl;fkjasdfl;aksdjfals;kfj
            </textarea>
            <hr className="mt-16" />
            지도 컴포넌트
            <hr />
            <section>
              <header>
                <h3 className="mb-6 text-xl font-bold leading-[130%] text-nomad-black">
                  후기
                </h3>
                별점
              </header>
              후기 렌더링 컴포넌트
            </section>
          </article>

          <section className="shrink-0"></section>
        </div>
      </main>
    </>
  );
};

export default page;
