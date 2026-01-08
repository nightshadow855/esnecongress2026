import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

function PageTransitionsWrapper({ children }) {
	const location = useLocation(); // Get the current location object from the router to use as unique key for the motion component
	return (
		<AnimatePresence mode="wait">
			<motion.div
				className="w-full h-screen bg-blue-500 z-50 fixed top-0 left-0"
				key={location.pathname}
				initial={{
					opacity: 1,
					scaleX: 1,
					transformOrigin: "center",
				}}
				animate={{
					scaleX: 0,
					transformOrigin: "center",
				}}
				exit={{
					scaleX: 0,
					transformOrigin: "center",
				}}
				transition={{ duration: 0.75, delay: 1 }}></motion.div>
			<motion.div
				className="w-full md:min-h-screen"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.75, delay: 0.5 }}>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}

export default PageTransitionsWrapper;
