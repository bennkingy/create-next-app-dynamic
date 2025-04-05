'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';
import TextHeading from "../components/Text";
import Spinner from './Spinner';

interface MediumArticle {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  description: string;
}

export default function MediumArticles() {
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(3); // Default to mobile count

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`/api/medium-articles`);
        const data = await response.json();
        setArticles(data?.slice(0, 4)); // Still fetch 5 articles
      } catch (error) {
        console.error('Error fetching Medium articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    // Update display count based on window width
    const handleResize = () => {
      setDisplayCount(window.innerWidth >= 768 ? 5 : 3);
    };

    // Set initial display count
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return <div className="">
      <Spinner />
    </div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-5">
      <TextHeading text="Read our medium" type="heading" style="text-heading-2" className="text-center text-brand-blue mb-16" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {articles.slice(0, displayCount).map((article, index) => (
          <a
            key={index}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48">
              <Image
                src={article.thumbnail || '/default-article-image.jpg'}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 font-heading text-brand-blue">{article.title}</h3>
              <p className="text-brand-blue mb-4 line-clamp-5 font-body">{article.description}</p>
              <p className="text-[10px] text-brand-blue  font-Opensans">
                {new Date(article.pubDate).toLocaleDateString()}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
} 