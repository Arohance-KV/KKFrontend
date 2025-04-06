import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

export const CategoriesSection = () => {
  const navigate = useNavigate();
  const categoriesImageRef = useRef<HTMLImageElement>(null);
  const hoverElementRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create the timeline with the original animation and keep it paused initially
      timelineRef.current = gsap.timeline({ paused: true })
        .to(hoverElementRef.current, {
          translateX: "300px",
          rotateZ: 80,
          duration: 2,
          ease: "power2.inOut",
        })
        .to(hoverElementRef.current, {
          translateX: "560px",
          rotateZ: 100,
          duration: 2,
          ease: "power2.inOut",
        })
        .to(hoverElementRef.current, {
          translateX: "0",
          rotateZ: 75,
          duration: 2,
          ease: "power2.inOut",
        });
    });

    return () => {
      ctx.revert();
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  const handleHoverStart = (position: string, imageSrc: string, rotate: number) => {
    if (categoriesImageRef.current && hoverElementRef.current && timelineRef.current) {
      // Update image source
      categoriesImageRef.current.src = imageSrc;

      // Kill any existing animation to reset
      gsap.killTweensOf(hoverElementRef.current);

      // Animate to the desired position with the original animation style
      gsap.to(hoverElementRef.current, {
        translateX: position,
        rotateZ: rotate,
        duration: 2,
        ease: "power2.inOut",
      });
    }
  };

  const handleHoverEnd = () => {
    if (hoverElementRef.current && timelineRef.current) {
      // When hover ends, resume the original timeline animation
      timelineRef.current.restart();
    }
  };

  return (
    <section className="playfair-display w-full flex items-center snap-start h-[100vh] overflow-hidden flex-col">
      <div className="gap-4 py-[5%] flex text-[#BFA6A1] text-[75px] h-[100%] justify-center w-[80%] relative">
        <div
          className="flex-1 h-full cursor-pointer flex justify-center items-center z-10"
          onMouseEnter={() => handleHoverStart("0px", "/ring.png", 75)}
          onMouseLeave={handleHoverEnd}
        >
          Rings
        </div>
        <div
          className="flex-1 h-full cursor-pointer flex justify-center items-center z-10"
          onMouseEnter={() => handleHoverStart("300px", "/earring.png", 80)}
          onMouseLeave={handleHoverEnd}
        >
          Earrings
        </div>
        <div
          className="flex-1 h-full cursor-pointer flex justify-center items-center z-10"
          onMouseEnter={() => handleHoverStart("560px", "/pendent.png", 100)}
          onMouseLeave={handleHoverEnd}
        >
          Pendants
        </div>
        <div
          ref={hoverElementRef}
          id="categories-hover-element"
          className="absolute bg-[#E9D6C8] z-[0] w-[350px] top-1/2 flex justify-end items-end -translate-y-1/2 overflow-hidden left-[10%] aspect-video"
        >
          <img
            ref={categoriesImageRef}
            src="/ring.png"
            className="h-auto w-[70%]"
            alt="Category preview"
          />
        </div>
      </div>
    </section>
  );
};