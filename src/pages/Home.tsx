import { Cursor, Typewriter, useTypewriter } from "react-simple-typewriter";

const Home = () => {
  const [text, helper] = useTypewriter({
    words: ["Developer", "Designer"],
    loop: 2,
    typeSpeed: 50,
    deleteSpeed: 300,
    delaySpeed: 2000,
    onLoopDone() {
      console.info("Loop done.");
    },
    onDelay() {
      console.info("Delay after typing.");
    },
    onDelete() {
      console.warn("Deleting words.");
    },
    onType() {
      console.info("Typing...");
    },
  });
  const { isType, isDelay, isDelete, isDone } = helper;

  return (
    <div className="bg-gray-300 flex flex-col justify-start items-center">
      <p className="text-gray-900 text-2xl font-semibold">Welcome To Home.</p>
      <div className="mt-8">
        {isType && (
          <p className="text-center font-semibold w-full text-sm text-green-600">
            Typing...
          </p>
        )}
        {isDelay && (
          <p className="text-center font-semibold w-full text-sm text-yellow-600">
            Delay after typing.
          </p>
        )}
        {isDelete && (
          <p className="text-center font-semibold w-full text-sm text-red-600">
            Deleting...
          </p>
        )}
        {isDone && (
          <p className="text-center font-semibold w-full text-sm text-green-600">
            Loop Done.
          </p>
        )}

        <h1 className="text-2xl font-semibold text-black">
          I'm a <span className="font-bold text-4xl text-blue-600">{text}</span>
          <span className="text-4xl font-bold">
            <Cursor cursorBlinking cursorColor="red" cursorStyle="|" />
          </span>
          .
        </h1>
      </div>
    </div>
  );
};

export default Home;
