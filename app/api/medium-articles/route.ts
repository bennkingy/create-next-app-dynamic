import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'media'],
      ['content:encoded', 'content'],
    ],
  },
});

const cache: { articles: unknown[] | null; timestamp: number } = {
  articles: null,
  timestamp: 0,
};

export async function GET() {
  try {
    const CACHE_DURATION = 1000 * 60 * 5; // Cache for 5 minutes

    // Check if cached articles are available and not expired
    if (cache.articles && (Date.now() - (cache.timestamp ?? 0) < CACHE_DURATION)) {
      return NextResponse.json(cache.articles);
    }

    const CORS_PROXY = "https://api.allorigins.win/raw?url=";
    const MEDIUM_USERNAME = "berahorses"; 
    const feedUrl = `${CORS_PROXY}${encodeURIComponent(`https://medium.com/feed/@${MEDIUM_USERNAME}`)}`;

    const feed = await parser.parseURL(feedUrl);
    
    if (!feed?.items?.length) {
      return NextResponse.json({ error: 'No articles found' }, { status: 404 });
    }

    const articles = feed.items.map(item => {
      // Extract the first image from the content if no media:content
      let thumbnail = null;
      if (item.media?.$.url) {
        thumbnail = item.media.$.url;
      } else if (item['content:encoded']) {
        const imgMatch = item['content:encoded'].match(/<img[^>]+src="([^">]+)"/);
        thumbnail = imgMatch ? imgMatch[1] : null;
      }

      return {
        title: item.title || 'Untitled',
        link: item.link || '#',
        pubDate: item.pubDate || new Date().toISOString(),
        thumbnail: thumbnail || '/default-article-image.jpg',
        description: item.content 
          ? item.content.replace(/<[^>]*>/g, '').slice(0, 200) + '...'
          : 'No description available',
      };
    });

    // Cache the articles and the current timestamp
    cache.articles = articles;
    cache.timestamp = Date.now();

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching Medium feed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles', details: (error as Error).message },
      { status: 500 }
    );
  }
} 