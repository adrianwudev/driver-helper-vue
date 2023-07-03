<template>
    <Header />
    <SearchBar :data="data" :orders="orders" :pageSize="Number(pageSize)" :page="Number(page)"
        @condition-search="conditionSearch" />
    <AddOrder />
    <Table :orders="orders" :data="data" @to-page="toPage" @delete-order="deleteOrder" />
</template>

<script>
import Table from '../components/Table.vue'
import Header from '../components/Header.vue'
import AddOrder from '../components/AddOrder.vue'
import SearchBar from '@/components/SearchBar.vue'
import axios from 'axios';

export default {
    name: 'Home',
    props: {

    },
    components: {
        Table,
        Header,
        AddOrder,
        SearchBar,

    },
    data() {

        return {
            orders: [],
            data: {},
            pageSize: 5,
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

                this.$router.replace({ query: { page: page, pageSize: this.pageSize } });
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
        },
        async fetchOrdersByConditions(searchCondition) {
            try {
                const page = searchCondition.page || this.page
                const pageSize = searchCondition.pageSize || this.pageSize
                const city = searchCondition.searchCity || ''
                const district = searchCondition.searchDistrict || ''
                const weekDay = searchCondition.weekDay || ''
                const isException = searchCondition.searchIsException || false

                const url = `api/orders/conditions?page=${page}&pageSize=${pageSize}&city=${city}
                                &district=${district}&weekDay=${weekDay}&isException=${isException}`


                const res = await axios.get(url)
                if (res.status !== 200) {
                    throw new Error('Request failed with status ' + res.status);
                }
                const data = res.data
                
                return data
            } catch (e) {
                console.log("error: ", e)
            }

        },
        async conditionSearch(searchCondition) {
            try {
                const result = await this.fetchOrdersByConditions(searchCondition)

                this.data = result.data
                this.orders = result.data.results
                this.page = this.$route.query.page || this.page
                this.pageSize = this.$route.query.pageSize || this.pageSize
            } catch (e) {
                console.log("error: ", e)
            }

        },
    },
    async created() {
        const page = this.$route.query.page || this.page;
        const pageSize = this.$route.query.pageSize || this.pageSize;
        this.page = page
        this.pageSize = pageSize
        this.getData(this.page);

        const city = this.$route.query.city || ''
        const district = this.$route.query.district || ''
        const weekDay = this.$route.query.weekDay || ''
        const isException = this.$route.query.searchIsException || false

        if (this.$route.query.city == undefined)
            return
        this.conditionSearch(page, pageSize, city, district, weekDay, isException)

    },
}
</script>