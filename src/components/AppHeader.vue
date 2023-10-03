<script>
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
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">Disabled</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Dropdown
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
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