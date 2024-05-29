import React from "react";

const page = () => {
  return (
    <>
      <header className="flex items-center justify-between px-4 py-4 xl:pt-20">
        <div>체험 상세 정보</div>
        <button>kebab section</button>
      </header>
      <main>
        <section>대충 이미지가 들어갈 장소</section>
        <div className="flex px-6 pt-4">
          <article className="w-full">
            <hr color="nomad-black" className="hidden md:block" />
            <h3 className="mb-4 text-xl font-bold leading-[130%] text-nomad-black md:mt-10">
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
                <h3 className="text-xl font-bold leading-[130%] text-nomad-black">
                  후기
                </h3>
                <div>
                  <span className="text-[3.125rem] font-semibold text-nomad-black">
                    4.2
                  </span>
                  <div className="ml-4 inline-block">
                    <span className="text-lg leading-[133%] text-nomad-black">
                      매우 만족
                    </span>
                    <div className="text-sm text-nomad-black">
                      대충 별 1300개 후기
                    </div>
                  </div>
                </div>
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
