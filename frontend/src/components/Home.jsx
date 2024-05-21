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
    <section className=" bg-[url('./assets/images/paisaje-3.jpg')] bg-cover bg-no-repeat bg-center w-2/5 h-full">
      <h1 className="  mt-6 px-10 flex flex-col text-[#1f2e31] text-[4.5rem] font-bold">
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
