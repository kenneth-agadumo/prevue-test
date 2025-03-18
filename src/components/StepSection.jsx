

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function StepsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <div ref={ref} className="steps-section-container bg-[#F8F9FA] py-20">
      <motion.div
        className="steps-header text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-4">How it works</h2>
        <p className="text-lg text-gray-600">In 3 simple steps</p>
      </motion.div>

      <motion.div
        className="steps-content flex  flex-col lg:flex-row items-center justify-between gap-4 w-[90%] mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Step 1 */}
        <motion.div
          className="step-card flex items-start  bg-white shadow-md p-6 rounded-lg mb-8 lg:mb-0"
          variants={stepVariants}
        >
          <div className="step-number bg-emerald-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg mr-4">
            01
          </div>
          <div>
            <h4 className="font-semibold text-xl mb-2">Select a Category</h4>
            <p className="text-gray-600">
              Whether it’s a charming property, delightful dining spot, or an
              exciting adventure, we have you covered.
            </p>
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          className="step-card flex items-start bg-white shadow-md p-6 rounded-lg mb-8 lg:mb-0"
          variants={stepVariants}
        >
          <div className="step-number bg-emerald-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg mr-4">
            02
          </div>
          <div>
            <h4 className="font-semibold text-xl mb-2">Explore Options</h4>
            <p className="text-gray-600">
              Dive into immersive VR tours, detailed listings, and transparent
              cost breakdowns.
            </p>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          className="step-card flex items-start bg-white shadow-md p-6 rounded-lg"
          variants={stepVariants}
        >
          <div className="step-number bg-emerald-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg mr-4">
            03
          </div>
          <div>
            <h4 className="font-semibold text-xl mb-2">Book and Enjoy</h4>
            <p className="text-gray-600">
              Make your selection and get ready for an unforgettable experience.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Flow-style graphic */}
      <motion.div
        className="steps-graphic mt-16 flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <img
          src="/steps-image.png"
          alt="Steps Graphic"
            className="max-w-[600px] w-full"
        //   className="w-full h-auto rounded-xl shadow-lg"
        />
      </motion.div>
    </div>
  );
}
