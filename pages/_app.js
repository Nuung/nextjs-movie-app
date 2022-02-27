// 이름을 필수로 _app.js로 지어서 React기준으로 모든 컴포넌트의 부모격인 최상위 div
// App component를 오버라이딩 할 수 있다!! 
// 여기에 전역 성격의 script, style 등을 지정할 수 있다. 
// 일단 styles -> globals.css 값에 진짜 전역 글로벌 css 값을 볼 수 있다! 
import Layout from '../components/Layout';

const App = ({ Component, pageProps }) => {
    return (
        <Layout>
            <Component {...pageProps} />
            {/* <span> _app.js component test </span> */}
        </Layout>
    );
}

export default App;