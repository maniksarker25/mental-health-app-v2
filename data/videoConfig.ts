/**
 * Global Video Configuration for the Mobile App
 *
 * You can upload your video (MP4, HLS/m3u8, WebM) to an Amazon AWS S3 bucket,
 * CloudFront, or any CDN and paste the public URL directly below in `videoUrl`.
 */
export const APP_VIDEO_CONFIG = {
  // 👉 Paste your AWS S3 bucket video URL here:
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',

  // 👉 Poster thumbnail image URL:
  posterUrl:
    'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=1000&auto=format&fit=crop&q=80',

  title: 'See how anonymous support works',
  subtitle: 'Watch how quiet, confidential care reaches someone without pressure.',
  duration: '1:42 min',
};
