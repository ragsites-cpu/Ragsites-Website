'use client';

import Image from 'next/image';
import { ExternalLink, Star, Quote } from 'lucide-react';

interface PortfolioCardProps {
  title: string;
  tag: string;
  stats: string;
  imagePlaceholder: string;
  imageAlt: string;
  reviewText: string;
  reviewAuthor: string;
  rating: number;
  projectUrl: string;
  imagePath?: string;
}

export default function PortfolioCard({
  title,
  tag,
  stats,
  imagePlaceholder,
  imageAlt,
  reviewText,
  reviewAuthor,
  rating,
  projectUrl,
  imagePath,
}: PortfolioCardProps) {
  return (
    <div className="glass-card overflow-hidden group hover:bg-white/10 transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-64 bg-gradient-to-br from-cyber-cyan/20 to-cyber-purple/20 overflow-hidden">
        {imagePath ? (
          <Image
            src={imagePath}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-lg flex items-center justify-center">
                <ExternalLink className="w-10 h-10 text-black" />
              </div>
              <p className="text-sm text-gray-400">{imagePlaceholder}</p>
            </div>
          </div>
        )}

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple text-black">
            {tag}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-4">{stats}</p>

        {/* Review Section */}
        <div className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-gray-600'
                }`}
              />
            ))}
          </div>
          <div className="relative">
            <Quote className="w-4 h-4 text-cyber-cyan/50 absolute -top-1 -left-1" />
            <p className="text-sm text-gray-300 italic pl-4">
              {reviewText}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-2">— {reviewAuthor}</p>
        </div>

        <div className="pt-4 border-t border-white/10">
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-cyber-cyan text-sm font-semibold group-hover:gap-3 transition-all hover:text-cyber-purple"
          >
            <span>View Project</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
