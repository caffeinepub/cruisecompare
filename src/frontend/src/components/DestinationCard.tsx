import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface DestinationCardProps {
  name: string;
  description: string;
  imageSrc: string;
  index: number;
}

const DESTINATION_IMAGES: Record<string, string> = {
  Caribbean: "/assets/generated/dest-caribbean.dim_600x400.jpg",
  Mediterranean: "/assets/generated/dest-mediterranean.dim_600x400.jpg",
  Alaska: "/assets/generated/dest-alaska.dim_600x400.jpg",
  Europe: "/assets/generated/dest-europe.dim_600x400.jpg",
  Asia: "/assets/generated/dest-mediterranean.dim_600x400.jpg",
};

export default function DestinationCard({ name, index }: DestinationCardProps) {
  const navigate = useNavigate();
  const imageSrc = DESTINATION_IMAGES[name] ?? DESTINATION_IMAGES.Europe;

  const handleClick = () => {
    navigate({ to: "/search", search: { destination: name } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      data-ocid={`dest.card.${index}`}
    >
      <button
        type="button"
        onClick={handleClick}
        className="block w-full group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 text-left"
      >
        {/* Background image */}
        <div className="relative h-56 sm:h-64">
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/90 via-ocean-deep/30 to-transparent" />
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 inset-x-0 p-5">
          <h3 className="font-display font-bold text-xl text-white mb-3">
            {name}
          </h3>
          <span className="inline-flex items-center gap-1.5 text-ocean-pale text-sm font-semibold group-hover:gap-2.5 transition-all">
            Explore
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </button>
    </motion.div>
  );
}
