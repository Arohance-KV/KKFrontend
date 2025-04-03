export function TestimonialCard({ name, text, rating, imageUrl } : { name: string, text: string, rating: number, imageUrl: string}) {
  const stars = Array.from({ length: 5 }, (_, index) => index < rating);

  return (
    <div className="bg-tan-light p-6 rounded-lg shadow-md w-full sm:w-80 relative">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-white flex-shrink-0">
          {/* Replace with actual image */}
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="w-full h-full rounded-full object-cover" />
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
                className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
                fill={filled ? 'currentColor' : 'none'}
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
      {/* Preview Element */}
      <div className="absolute bottom-2 left-2 bg-pink-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
        1
      </div>
    </div>
  );
}

export default function Text() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex space-x-4">
        <TestimonialCard
          name="Lorem ipsum"
          text="Lorem ipsum dolor sit amet consectetur. Pellentesque lectus tincidunt eget venenatis."
          rating={4}
          imageUrl="" // Replace with actual image URL
        />
        <TestimonialCard
          name="Lorem ipsum"
          text="Lorem ipsum dolor sit amet consectetur. Pellentesque lectus tincidunt eget venenatis."
          rating={5}
          imageUrl="" // Replace with actual image URL
        />
      </div>
      {/* Navigation Arrows (Optional) */}
      <div className="flex justify-between w-full mt-8">
        <button className="text-gray-500 hover:text-gray-700">←</button>
        <button className="text-gray-500 hover:text-gray-700">→</button>
      </div>
    </div>
  );
};