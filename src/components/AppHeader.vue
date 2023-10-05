<script>
import { RouterLink } from 'vue-router';

</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-db shadow-sm">
        <div class="container-fluid d-flex align-items-center ">
            <a class="navbar-brand d-flex align-items-center " href="#">
                <img src="../../public/Yummy_Food.svg" alt="Logo" width="50" height="50"
                    class="d-inline-block align-text-top rounded-5 mx-4">
                DeliveBoo
            </a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'home' }">
                            Home
                        </RouterLink>
                    </li>
                    <li>
                        <a class="nav-link" href="http://127.0.0.1:8000/">I am a restaurant owner <i
                                class="redirect-icon fa-solid fa-arrow-up-right-from-square ms-1"></i></a>
                    </li>
                </ul>
            </div>
            <div class="d-flex justify-content-end align-item-center">
                <RouterLink :to="{ name: 'cart' }"><i class="fa-solid fa-cart-shopping text-dark me-5 cart"></i>
                </RouterLink>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
nav {
    box-shadow: 11 11px 11px rgb(43, 43, 43);
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: #f6f6f6;
}
</style>