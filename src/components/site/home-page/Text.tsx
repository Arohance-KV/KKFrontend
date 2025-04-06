import { useEffect, useRef } from "react";

export function TestimonialCard({
  name,
  text,
  rating,
  imageUrl,
}: {
  name: string;
  text: string;
  rating: number;
  imageUrl: string;
}) {
  const stars = Array.from({ length: 5 }, (_, index) => index < rating);

  return (
    <div className="bg-tan-light p-6 rounded-lg shadow-md w-full sm:w-80 relative flex-shrink-0 inline-block mx-2">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-white flex-shrink-0 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-white"></div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className="flex space-x-1">
            {stars.map((filled, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${
                  filled ? "text-yellow-400" : "text-gray-300"
                }`}
                fill={filled ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                ></path>
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600">{text}</p>
    </div>
  );
}

export default function TestimonialMarquee() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    let animationFrame: number;

    const scrollSpeed = 3;

    const step = () => {
      if (marquee) {
        marquee.scrollLeft += scrollSpeed;
        console.log("scroll left : ", marquee.scrollLeft);
        const scrollWidth = marquee.scrollWidth / 2;

        if (marquee.scrollLeft >= scrollWidth) {
          marquee.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Create cards and duplicate them
  const testimonials = [...Array(9)].map((_, index) => (
    <TestimonialCard
      key={index}
      name="Lorem ipsum"
      text="Lorem ipsum dolor sit amet consectetur. Pellentesque lectus tincidunt eget venenatis."
      rating={4 + (index % 2)}
      imageUrl=""
    />
  ));

  return (
    <div className="relative flex items-center justify-center bg-gray-100 overflow-hidden py-10">
      <div
        ref={marqueeRef}
        className="flex overflow-x-hidden whitespace-nowrap w-full"
      >
        <div className="flex space-x-4">{testimonials}</div>
        <div className="flex space-x-4">{testimonials}</div>
      </div>
    </div>
  );
}
