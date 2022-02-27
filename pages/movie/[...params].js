import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CarouselDefault from "../../components/Carousel/CarouselDefault";
import Seo from "../../components/Seo";


const MovieDetailInfo = ({ movieDetail }) => {

    const imageUrlPreFix = "https://image.tmdb.org/t/p/w500/"
    const imageList = [
        `${imageUrlPreFix}${movieDetail.backdrop_path}`,
        `${imageUrlPreFix}${movieDetail.poster_path}`,
        `${imageUrlPreFix}${movieDetail.production_companies[0].logo_path}`,
        `${imageUrlPreFix}${movieDetail.production_companies[1].logo_path}`,
    ]

    return (
        <div>
            <CarouselDefault imageList={imageList} />
            <Link href={movieDetail.homepage}>
                <a> Movie Home Page </a>
            </Link>
            <h3>Original Title: {movieDetail.original_title}</h3>
            <div className="detail__info">
                <h4>Original Language: {movieDetail.original_language}</h4>
                <span>{movieDetail.overview}</span>
                <h4>Popularity</h4>
                <span>{movieDetail.popularity}</span>
                <h4>Revenue</h4>
                <span>{movieDetail.revenue}</span>
                <h4>Release Date</h4>
                <span>{movieDetail.release_date}</span>
                <h4>Runtime</h4>
                <span>{movieDetail.runtime}</span>
                <h4>Vote Average</h4>
                <span>{movieDetail.vote_average}</span>
                <h4>Vote Count</h4>
                <span>{movieDetail.vote_count}</span>
            </div>

            <style jsx>{`
                div {
                    display: flex;
                    flex-direction: column;
                    flex-wrap: nowrap;
                    align-content: center;
                    justify-content: center;
                    align-items: center;
                }

                .detail__info {
                    display: inline-block;
                    width: 70%;
                }
            `}</style>
        </div>
    );
}


const Detail = ({ params }) => {
    // const router = useRouter();
    // console.log(router);
    // 하지만 pre-lander되는 BE에서는 router.query 정보가 없다!! FE가 가지고 있음 ~ 
    // SSR에서는 빈 [] 만 가지고 있고 -> Loading만 계속 뜨고 있을 것! -> index.jsdptj getServerSideProps를 사용할 수 도 있다 
    // 이런것들이 SEO 최적화다!
    // const [title, id] = router.query.params || [];

    // getServerSideProps를 도입하고 나서는 __NEXT_DATA__ 의 script에 있는 data 영향으로 슉샥슉샥 가져올 수 있다!
    const [title, id] = params || [];

    // 하지만 url에 모든 내용을 담을 순 없다 - over view같은 경우 url max length를 초과한다 
    const [movieDetail, setMovieDetail] = useState();
    useEffect(() => {
        (async () => {
            const results = await (
                await fetch(`/api/movie/${id}`)
            ).json();
            setMovieDetail(results);
        })();
    }, []);


    return (
        <div>
            <Seo title={title} />
            {/* router.query.title는 home에서 이동했을때만 가져온다 하지만, 새로고침하면? Loading만 뜬다!! Router Query가 없기 때문에!! */}
            <h1>{title || "Loading ... "}</h1>
            {(movieDetail)
                ? <MovieDetailInfo movieDetail={movieDetail} />
                : "Loading ..."
            }
            <style jsx>{`
                div {
                    text-align: center;
                }
            `}</style>
        </div>
    );
}

// 게다가 API 요청이 필요가 없다니!!!!! 
export const getServerSideProps = ({ params: { params } }) => {
    // Server Side Context를 제공한다!
    // console.log(params);
    return {
        props: {
            params,
        },
    };
}

export default Detail;