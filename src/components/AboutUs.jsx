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
    <div className="about-section-container relative h-[90vh] mb-10 flex items-center justify-center overflow-hidden">
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

      <motion.div
        className="relative z-10 w-[85%] lg:w-[75%] h-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-8 bg-white/80 backdrop-blur-md rounded-lg shadow-xl"
        animate="animate"
        variants={floatVariants}
      >
        <div className="text-section p-5 space-y-6">
          <h2 className="text-5xl font-extrabold text-gray-800 tracking-wide">
            About Prevue
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At Prevue, we are your gateway to unforgettable experiences. Our
            mission is to simplify your quest for the perfect property, dining
            experience, or outing. Our platform offers immersive virtual reality
            tours, allowing you to step inside properties or explore dining
            destinations before you arrive. We are committed to transparency in
            your planning, with cost estimates that cover every detail, from
            property costs to VAT and caution fees.
          </p>
          <button className="learn-more bg-emerald-500 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-emerald-600 transition duration-300">
            Learn More
          </button>
        </div>

        {/* Enlarged Image Section */}
        <div className="image-section flex justify-center items-center">
          <img
            src="/about-image.png"
            alt="About Prevue"
            className="w-[120%] lg:w-[100%] xl:w-[90%] max-w-[600px] rounded-3xl shadow-2xl"
          />
        </div>
      </motion.div>
    </div>
  );
}
