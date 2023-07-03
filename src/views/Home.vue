<template>
    <Header />
    <AddOrder />
    <Table :orders="orders" :data="data" @to-page="toPage" @delete-order="deleteOrder" />
</template>

<script>
import Table from '../components/Table.vue'
import Header from '../components/Header.vue'
import AddOrder from '../components/AddOrder.vue'

export default {
    name: 'Home',
    props: {

    },
    components: {
        Table,
        Header,
        AddOrder,

    },
    data() {

        return {
            orders: [],
            data: {},
            pageSize: 20,
            page: 1,
        }
    },
    methods: {
        async fetchOrders(page, pageSize) {
            try {
                const url = `api/orders?page=${page}&pageSize=${pageSize}`
                const res = await fetch(url)
                if (!res.ok) {
                    throw new Error('Request failed with status ' + res.status);
                }
                const data = res.json()
                return data
            } catch (e) {
                console.log("error: ", e)
            }

        },
        async getData(page) {
            try {
                const result = await this.fetchOrders(page, this.pageSize);
                if (result.statusCode !== 200) return
                this.data = result.data
                this.orders = result.data.results
            } catch (e) {
                console.log("error: ", e)
            }
        },
        async toPage(pageNum) {
            this.getData(pageNum)
        },
        async deleteOrder(orderId) {
            if (!confirm('確定要刪除訂單嗎？')) return
            try {
                const res = await fetch(`api/orders/${orderId}`, {
                    method: 'DELETE',
                });
                window.location.reload();
                console.log(res)
            } catch (e) {
                console.log("error: ", e)
            }
        }
    },
    async created() {
        this.getData(this.page);

    },
}
</script>