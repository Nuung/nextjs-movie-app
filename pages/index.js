
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../components/Seo";

// results값은 SSR랜더링을 통해 props로 받아온다!! ~ _app.js에서 "pageProps"가 필요한 이유가 두두둥장!
const Home = ({ results }) => {

    // 아래 코드를 SSR로 바꿔보자!
    // const [movies, setMovies] = useState([]);
    // useEffect(() => {
    //     (async () => {
    //         const { results } = await (
    //             await fetch(`/api/movies`)
    //         ).json();
    //         setMovies(results);
    //     })();
    // }, []);
    // SSR로 인해 fetch를 기다리는 Loading을 쓸 필요가 전혀 없어진다!!

    // Link ~ a 대신 page 라우팅 하는 다른 방법!
    // 게다가 데이터를 props 전달 대신 router "query" 어트리뷰터로써 전달하는 방법
    const router = useRouter();
    // const onClick = (movie_id, title) => {
    //     router.push({
    //         pathname: `/movie/${movie_id}`,
    //         // url Query String을 아래와 같이 전달 할 수 있다!!!
    //         // http://localhost:3000/movie/634649?title=test
    //         // 그리고 query를 user로 부터 숨길 수 있다! 즉 노출없이 마스킹을 할 수 있다!!
    //         query: {
    //             // title: "test"
    //             title
    //         }
    //     }, `/movie/${movie_id}`); // 여기가 query string대신 마스킹해서 user로 부터 숨기는 것! 
    // };

    // 위 onClick을 아래와 같이 바꿀 수 있다 -> Link 또한 매한가지
    const onClick = (movie_id, original_title) => {
        router.push(`/movie/${original_title}/${movie_id}`);
    }

    return (
        <div className="container">
            <Seo title="Home" />
            {/* {!movies && <h4>Loading...</h4>} */}
            {
                // ?를 통해 존재하지 않으면 (null, undefined라면 접근하지 않도록 함){
                results?.map((movie) => (
                    <div className="movie" key={movie.id} onClick={() => onClick(movie.id, movie.original_title)}>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                        {/* Link도위 Router setting 처럼 줘서 할 수 있다!  */}
                        {/* <Link
                            href={{
                                pathname: `/movie/${movie.id}`,
                                query: {
                                    // title: "test"
                                    title: movie.original_title,
                                }
                            }}
                            as={`/movie/${movie.id}`}
                        > */}
                        <Link href={`/movie/${movie.original_title}/${movie.id}`}>
                            <a>
                                <h4>{movie.original_title}</h4>
                            </a>
                        </Link>
                    </div>
                ))
            }
            <style jsx>{`
                .container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    padding: 20px;
                    gap: 20px;
                    text-align: center;
                }
                .movie img {
                    max-width: 100%;
                    border-radius: 12px;
                    transition: transform 0.2s ease-in-out;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                }
                .movie:hover img {
                    transform: scale(1.05) translateY(-10px);
                }
                .movie h4 {
                    font-size: 18px;
                    text-align: center;
                }
                .movie a {
                    text-decoration: none;
                }
            `}</style>
        </div>
    );
}

// nextjs는 그래도 react와는 다르게 "기본 값을 가진 props/state로 pre-rendering을 한다!!"
// 하지만 fetch등의 액션을 해서 update되는 state값을 pre-redering 해 주진 않는다 !! 하지만!!
// 아래 고정된 이름의 Object "getServerSideProps"를 통해
// CSR 포인트를 (componet create할 때 fetch를 하는 행위 등) 모두 SSR로 할 수 있다!!
export const getServerSideProps = async () => {
    // 여기서 뭘 쓰던 서버에서 돌아간다!!! -> client쪽이 아니라 server쪽에서 다 해준다는 의미!!
    // TypeError: Only absolute URLs are supported
    // const { results } = await (await fetch(`/api/movies`)).json();

    const { results } = await (await fetch(`http://localhost:3000/api/movies`)).json();
    // return해주는 object, object안 props는 results가 들어간다!
    return {
        props: {
            results,
        },
    };
}

export default Home;