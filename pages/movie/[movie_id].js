import { useRouter } from "next/router";

const Detail = () => {
    const router = useRouter();
    console.log(router);
    return (
        <div>
            DETAIL
        </div>
    );
}


export default Detail;