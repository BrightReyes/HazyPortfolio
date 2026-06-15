import { motion } from 'framer-motion';

export default function ScrollReveal({ children, text, className }) {
  if (text) {
    const words = text.split(' ');

    const containerVariants = {
      offscreen: { opacity: 0 },
      onscreen: {
        opacity: 1,
        transition: {
          staggerChildren: 0.03,
          delayChildren: 0.1,
        },
      },
    };

    const wordVariants = {
      offscreen: { opacity: 0, y: 20 },
      onscreen: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      },
    };

    return (
      <motion.p
        className={className}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false, amount: 0.5 }}
        variants={containerVariants}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block mr-[0.25em]"
            variants={wordVariants}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    );
  }

  const blockVariants = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      className={className}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0.3 }}
      variants={blockVariants}
    >
      {children}
    </motion.div>
  );
}
