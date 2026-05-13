const Card = ({ image, isFlipped, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`w-24 h-32 md:w-42 md:h-54 perspective-[1000px] ${isFlipped ? "cursor-default":" cursor-pointer"}`}
    >
      <div
        className={`relative w-full h-full transition-transform border-black border-2 rounded-md duration-500 transform-3d ${isFlipped ? "transform-[rotateY(180deg)]" : "transform-[rotateY(0deg)]"}`}
      >
        <div className="absolute inset-0 bg-blue-500 border-white border-4 flex items-center justify-center rounded-lg backface-hidden">
          <span className="text-yellow-400 text-4xl md:text-6xl font-bold">?</span>
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-white transform-[rotateY(180deg)] backface-hidden"
        >
          <img src={image} alt="card" className="w-16 h-16 object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Card;
