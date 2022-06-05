import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import store from './store'
import { routes } from './router'
import './public-path'

let router = null
let app: any = null

function render() {
    app = createApp(App) // NOTE: 我本来是在 render 函数外面创建的实例，切换子应用对应路径就会报错，坑了我好长时间啊
    router = createRouter({
        history: createWebHistory(
            window.__POWERED_BY_QIANKUN__ ? '/vue3' : '/',
        ),
        routes,
    })

    app.use(store).use(router).mount('#app')
}

// 独立运行时
if (!(window as any).__POWERED_BY_QIANKUN__) {
    render()
}

/**
 * bootstrap ： 在微应用初始化的时候调用一次，之后的生命周期里不再调用
 */
export async function bootstrap() {
    console.log('bootstrap')
}

/**
 * mount ： 在应用每次进入时调用
 */
export async function mount(props: any) {
    render()
}

/**
 * unmount ：应用每次 切出/卸载 均会调用
 */
export async function unmount() {
    app.unmount()
}
