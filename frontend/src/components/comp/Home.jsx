import { useTrail, animated } from "react-spring";
import PropTypes from "prop-types";

function Home({ frase }) {
  const words = frase.split(" ").map((word) => word + " ");

  const trail = useTrail(words.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
    config: { duration: 500 },
  });

  return (
    <section className="fondo-img h-[20%] w-full sm:h-[35%] md:h-full md:w-[35%] lg:h-full lg:w-[40%]">
      <h1 className="mt-6 flex flex-col items-center px-10 text-[4.2rem] font-bold text-[#1b2425] sm:text-[5rem]">
        {trail.map((props, index) => (
          <animated.span
            key={index}
            style={{
              ...props,
              marginLeft: `${index * 3}rem`,
            }}
          >
            {words[index]}
          </animated.span>
        ))}
      </h1>
    </section>
  );
}

Home.propTypes = {
  frase: PropTypes.string.isRequired,
};

export default Home;
