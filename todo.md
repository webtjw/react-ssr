1，样式 prefix
2，页面入口将请求 context 传递给子组件进行样式初始化
3，登录 session 记录，更改 avatar 链接地址
4，


1，static async getInitialProps 只能在 pages 下的入口页面运行，且只会在服务端运行，该函数返回的对象会被注入到组件的 props 里去，在 ssr 过程中，props 是要经过序列化的，这意味着一些非字面量的对象如 Date，Map，Set 等是无法被 render 的，因此 getInitialProps 返回的对象必须是完全字面量的形式。