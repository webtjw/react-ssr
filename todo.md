1，样式 prefix
2，页面入口将请求 context 传递给子组件进行样式初始化
3，登录 session 记录，更改 avatar 链接地址
4，生产环境 nginx 转发 api 请求
5，是否可以通过一个入口 js 生成不同的页面同时完成 SSR


1，static async getInitialProps 只能在 pages 下的入口页面运行，且只会在服务端运行，该函数返回的对象会被注入到组件的 props 里去，在 ssr 过程中，props 是要经过序列化的，这意味着一些非字面量的对象如 Date，Map，Set 等是无法被 render 的，因此 getInitialProps 返回的对象必须是完全字面量的形式。
2，首次初始化页面，该函数只会在服务端执行，会得到一个 context 传参；当页面通过 Link 组件导航到另一个路由时，客户端的 getInitialProps 才会被执行，这时候会传一个路由信息对象，和 context 是不一样的，需要做区别对待