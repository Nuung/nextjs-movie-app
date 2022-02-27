
// old 와 다르게 JSX 스타일 형식으로 CSS를 줘 보자! -> styled jsx 는 nextjs의 고유 방식이다!

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";


// 이름 너무 길면 ... 으로 바꿔주기
const checkMovieNameLen = (movieName) => {
    if (movieName.length > 10) return `${movieName.substring(0, 9)}...`;
    else return movieName;
}


const NavBar = () => {

    const router = useRouter();

    return (
        <nav>
            <img src="/vercel.svg" alt="site-logo" />
            <div>
                <Link href="/">
                    <a className={router.pathname === "/" ? "active" : ""}>Home</a>
                </Link>
                <Link href="/about">
                    <a className={router.pathname === "/about" ? "active" : ""}>About</a>
                </Link>
                {(router.query.params)
                    ? (
                        <Link href="/about">
                            <a className="active">{checkMovieNameLen(router.query.params[0])}</a>
                        </Link>
                    )
                    : ""}
            </div>
            <style jsx>{`
                nav {
                    display: flex;
                    gap: 10px;
                    flex-direction: column;
                    align-items: center;
                    padding-top: 20px;
                    padding-bottom: 10px;
                    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
                        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
                }
                img {
                    max-width: 100px;
                    margin-bottom: 5px;
                }
                nav a {
                    font-weight: bolder;
                    font-size: 18px;
                    text-decoration: none;
                }
                .active {
                    color: tomato;
                }
                nav div {
                    display: flex;
                    gap: 10px;
                }
            `}</style>
        </nav>
    );
}


export default NavBar;