<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#" style="margin-left: 5px; font-weight: bold; font-size: 24px;">訂單查詢</a>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Header',
};
</script>

<style scoped>
header {
    background-color: #f8f9fa;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
    color: #333;
    text-decoration: none;
}

.navbar-brand:hover {
    color: #007bff;
}

@media (max-width: 575.98px) {
    .navbar-brand {
        font-size: 20px;
    }
}
</style>
