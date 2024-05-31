import ReviewList from "@/components/activity-detail/ReviewList";
import React from "react";

const page = () => {
  return (
    <div className="bg-gray-10 px-0 py-4 md:px-6 md:py-6 xl:py-20">
      <div className="mx-auto max-w-[1200px]">
        <header className="flex items-center justify-between px-4 py-4 xl:pt-20">
          <div>
            <span className="mb-2.5 text-sm leading-normal text-black">
              category
            </span>
            <h1 className="mb-4 text-2xl font-bold leading-normal text-nomad-black md:text-3xl">
              title
            </h1>
            <div className="flex gap-3 text-sm text-black ">
              <span>rating</span>
              <span>location</span>
            </div>
          </div>
          <button>kebab section</button>
        </header>
        <main>
          <section>대충 이미지가 들어갈 장소</section>
          <div className="flex gap-6 px-6 pt-4">
            <article className="w-full">
              <hr color="nomad-black" className="hidden md:block" />
              <h3 className="mb-4 text-xl font-bold leading-[130%] text-nomad-black md:mt-10">
                체험 설명
              </h3>
              <textarea
                disabled
                className="w-full resize-none text-wrap bg-transparent text-base leading-[162.5%] text-nomad-black"
                defaultValue="체험 설명 쫘라라라라락 sfasd;fadjsfkldsjfdls;fsdfasfsd
                kf;lsakfjas;lfkasjfls;dkfjas;lfaksjf;lsakfjdsl;fkjasdfl;aksdjfals;kfjasdfsadfadsfdasfadsfadsfadsfds"
              ></textarea>
              <hr className="mb-10 mt-10" />
              지도 컴포넌트
              <hr className="my-10" />
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
                <ReviewList />
              </section>
            </article>

            <section className="h-96 w-80 shrink-0 border-2 border-black">
              asdf
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default page;
