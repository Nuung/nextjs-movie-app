/** @type {import('next').NextConfig} */

const API_KEY = process.env.MOVIE_API_KEY;

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/form",
        destination: "/marketofmaterial",
        permanent: false // 검색엔진을 위해! - 영구적 이냐 아니냐
      },
      {
        source: "/old-one/:path",
        destination: "/new-one/:path",
        permanent: false
      },
      {
        source: "/old-blog/:path*",
        destination: "/new-blog/:path*",
        permanent: false
      }
    ]
  },

  // web server의 개념에서 리다이렉트와 리라이트 생각을 해보자!! -> 서버가 대신 요청을 때려준다!!
  // url 마스킹을 해준다!
  async rewrites() {
    return [
      // API URL을 이와 같은 URL - 리다이렉트, 패턴매칭을 통해 숨길 수 있다.
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1"`,
      }
    ]
  }
}

module.exports = nextConfig
