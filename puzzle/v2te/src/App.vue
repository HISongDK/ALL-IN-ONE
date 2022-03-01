<template>
    <div id="app">
        <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </nav>
        <router-view />
    </div>
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: var(--color);
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: var(--color);

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
