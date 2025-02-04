import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


const AlertToast= ({  obj, action, status, error }) => {
  const [visible, setVisible] = useState(true);

  // Automatically hide the toast after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Background color based on status
  const bgColor = status === "Success" ? "bg-green-500" : "bg-red-500";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white font-medium shadow-lg ${bgColor}`}
        >
          <p className="text-white">
          {status === "Success" ? `${obj} ${action} Successfully`: error } 
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertToast;
