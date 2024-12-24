// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";

// const StepsSection = () => {
//   const { ref, inView } = useInView({
//     threshold: 0.2,
//     triggerOnce: true,
//   });

//   return (
//     <div
//       ref={ref}
//       className="steps-section-container bg-gradient-to-r from-gray-50 to-gray-200 py-20 px-8"
//     >
//       <motion.div
//         className="steps-section max-w-7xl mx-auto text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
//         initial={{ opacity: 0, y: 50 }}
//         animate={inView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 1 }}
//       >
//         {/* Center-Aligned Header Section */}
//         <motion.div
//           className="col-span-2 space-y-4 mb-8"
//           initial={{ opacity: 0, y: -20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//         >
//           <h3 className="text-5xl font-extrabold text-gray-800 leading-tight">
//             How it works
//           </h3>
//           <p className="text-3xl font-semibold text-emerald-500">
//             in 3 simple steps
//           </p>
//           <div className="mx-auto w-32 h-1 bg-emerald-500 rounded-full"></div>
//         </motion.div>

//         {/* Left Image Section */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={inView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 1, delay: 0.3 }}
//           className="hidden lg:block"
//         >
//           <img
//             src="/steps-image.png"
//             alt="Steps Illustration"
//             className="w-full h-auto rounded-xl shadow-lg"
//           />
//         </motion.div>

//         {/* Steps Content */}
//         <div className="steps-right space-y-12">
//           {[
//             {
//               number: "01",
//               header: "Start by selecting a category",
//               text: "Whether it's a charming property, a delightful dining spot, or an exciting adventure, our platform has you covered.",
//             },
//             {
//               number: "02",
//               header: "Explore your options in detail",
//               text: "Dive into immersive virtual tours or detailed insights to make an informed choice effortlessly.",
//             },
//             {
//               number: "03",
//               header: "Confirm your booking instantly",
//               text: "With transparent pricing and easy navigation, confirm your plans in just a few clicks.",
//             },
//           ].map((step, i) => (
//             <motion.div
//               key={step.number}
//               className="step flex items-start space-x-6"
//               initial={{ opacity: 0, x: -30 }}
//               animate={inView ? { opacity: 1, x: 0 } : {}}
//               transition={{ duration: 0.8, delay: i * 0.3 }}
//             >
//               <span className="step-number text-emerald-500 text-5xl font-bold">
//                 {step.number}
//               </span>
//               <div className="step-col space-y-2">
//                 <p className="step-header text-xl font-semibold text-gray-700">
//                   {step.header}
//                 </p>
//                 <p className="step-text text-gray-600 leading-relaxed">
//                   {step.text}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default StepsSection;

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
        className="steps-content flex flex-col lg:flex-row items-center justify-between w-[90%] mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Step 1 */}
        <motion.div
          className="step-card flex items-start bg-white shadow-md p-6 rounded-lg mb-8 lg:mb-0"
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
