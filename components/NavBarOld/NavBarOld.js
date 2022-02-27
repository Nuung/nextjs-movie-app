

// 페이지 라우팅을 할 때에는! 앵커태그를 사용하지말고 특정 태그를 사용해야 한다!!
// 전체 페이지 새로고침을 하게 된다는 것이다!!! -> SPA 성격을 살릴 수 없다!!
// 그래서 아래 Link를 사용해야 한다!! -> Client Side Nav 제공!
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./NavBarOld.module.css";   // css module 패턴! 

const NavBarOld = () => {
    const router = useRouter();

    return (
        <nav className={styles.nav}>
            <Link href="/">
                <a
                    className={`${styles.nav__link} ${router.pathname === "/" ? styles.nav__active : null}`}
                >
                    HOME
                </a>
            </Link>
            <Link href="/about">
                <a
                    className={[styles.nav__link, router.pathname === "/about" ? styles.nav__active : null].join(" ")}
                >
                    ABOUT
                </a>
            </Link>
            {/* <a href="/">HOME</a>
            <a href="/about">ABOUT</a> */}
        </nav>
    );
}


export default NavBarOld;