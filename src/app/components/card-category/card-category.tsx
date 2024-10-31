export function CardCategory() {
  return (
    <div className="w-[300px] h-[200px] rounded overflow-hidden shadow-lg bg-white p-0 m-4 transform transition duration-300 hover:scale-105">
      <div className="h-[160px] w-full bg-gray-400"></div>
      <div className="w-full h-[40px] bottom-4 left-4 bg-white bg-opacity-75 rounded text-center">
        <a
          href="http://"
          className="w-full h-full flex justify-center items-center break-words text-black-700 hover:text-[#0ea5e9]"
        >
          Categoria
        </a>
      </div>
    </div>
  );
}
