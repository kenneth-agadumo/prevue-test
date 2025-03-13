import { motion } from "framer-motion";

export default function AboutUs() {
  const floatVariants = {
    animate: {
      y: [0, -20, 0, 20, 0],
      transition: {
        repeat: Infinity,
        duration: 6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="about-section-container relative h-auto md:h-[90vh] mb-10 flex items-center justify-center overflow-hidden p-6">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/about-image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-5xl h-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 md:gap-10 items-center p-6 sm:p-8 md:p-10 lg:p-12 bg-white/80 backdrop-blur-md rounded-lg shadow-xl"
        variants={floatVariants}
        animate="animate"
      >
        {/* Text Section */}
        <div className="text-section min-h-[250px] p-5 space-y-6 text-center md:text-left">
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 tracking-wide">
            About Prevue
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
            At Prevue, we are your gateway to unforgettable experiences. Our
            mission is to simplify your quest for the perfect property, dining
            experience, or outing. Our platform offers immersive virtual reality
            tours, allowing you to step inside properties or explore dining
            destinations before you arrive. We are committed to transparency in
            your planning, with cost estimates that cover every detail, from
            property costs to VAT and caution fees.
          </p>
          <button className="learn-more bg-emerald-500 text-white py-3 px-6 sm:px-8 rounded-lg shadow-lg hover:bg-emerald-600 transition duration-300">
            Learn More
          </button>
        </div>

        {/* Image Section - Hidden on Tablets */}
        <div className="image-section hidden lg:flex justify-center items-center">
          <img
            src="/about-image.png"
            alt="About Prevue"
            className="w-full max-w-[80%] md:max-w-[90%] lg:max-w-[100%] rounded-3xl shadow-2xl"
          />
        </div>
      </motion.div>
    </div>
  );
}
