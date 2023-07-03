<template>
    <div class="table-container">
        <table class="custom-table" id="custom-table">
            <!-- class="table table-striped table-hover" -->
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">城市</th>
                    <th scope="col">區</th>
                    <th scope="col">地址</th>
                    <th scope="col">訂單時間</th>
                    <th scope="col">上下車</th>
                    <th scope="col">上車時間</th>
                    <th scope="col">星期</th>
                    <th scope="col">群組名</th>
                    <th scope="col">金額</th>
                    <th scope="col">距離</th>
                    <th scope="col">資料異常</th>
                    <th scope="col">重複次數</th>
                    <th scope="col">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <Order   @delete-order="$emit('delete-order', order.orderId)"
                    :order="order"/>
                </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation example" class="pagination-container">
            <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#" @click="$emit('to-page', 1)">首頁</a></li>
                <li class="page-item"><a class="page-link" href="#" @click="$emit('to-page', previousPage)">上一頁</a></li>
                <li class="page-item"><a class="page-link" href="#" @click="$emit('to-page', data.page)">{{ data.page }}</a></li>
                <li class="page-item" v-if="totalPages >= secondPage"><a class="page-link" href="#"
                    @click="$emit('to-page', secondPage)">{{ secondPage }}</a></li>
                <li class="page-item" v-if="totalPages >= thirdPage"><a class="page-link" href="#"
                    @click="$emit('to-page', thirdPage)">{{ thirdPage }}</a></li>
                <li class="page-item" 
                
                ><a class="page-link" href="#" @click="$emit('to-page', nextPage)">下一頁</a></li>
                <li class="page-item"><a class="page-link" href="#" 
                    @click="$emit('to-page', totalPages)">末頁</a></li>
                <li class="page-item page-info">總數: {{ data.total }}</li>
                <li class="page-item page-info">頁數: {{ data.page }}/{{ totalPages }}</li>
                <li class="page-item page-info">每頁大小: {{ data.pageSize }}</li>

            </ul>
        </nav>
    </div>
</template>

<script>
import Order from './Order'


export default {
    name: 'Table',
    props: {
        orders: Array,
        data: Object,
    },
    components: {
        Order
    },
    emits:['to-page', 'delete-order'],
    computed: {
        previousPage() {
            return (
                this.data.page - 1 < 1
                    ? 1 : this.data.page - 1
            )
        },
        nextPage() {
            return (
                this.data.page + 1 <= this.totalPages ? this.data.page + 1 : this.totalPages
            )
        },
        secondPage() {
            return this.data.page + 1;
        },
        thirdPage() {
            return this.secondPage + 1;
        },
        totalPages() {
            return Math.ceil(this.data.total / this.data.pageSize);
        }
    },
    methods: {

    }
}
</script>

<style scoped>
.table-container {
    margin-top: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    /* 添加阴影效果 */
}

.custom-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
}

.custom-table th,
.custom-table td {
    padding: 8px;
    border: 1px solid #ccc;
}

.custom-table th {
    background-color: #f0f0f0;
    font-weight: bold;
}

.custom-table tr:nth-child(even) {
    background-color: #f8f8f8;
}

.custom-table tr:hover {
    background-color: #eaeaea;
}

.pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}


.page-info {
    margin: 5px;
}</style>