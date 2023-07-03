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
            city: '',
            district: '',
            weekDay: '',
            isException: false,
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
        async toPage(pageNum) {
            this.page = pageNum
            this.fetchOrdersByConditions()
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
        async fetchOrdersByConditions() {
            try {

                const url = `api/orders/conditions?page=${this.page}&pageSize=${this.pageSize}&city=${this.city}
                                &district=${this.district}&weekDay=${this.weekDay}&isException=${this.isException}`

                console.log('url', url)
                const res = await axios.get(url)
                if (res.status !== 200) {
                    throw new Error('Request failed with status ' + res.status);
                }
                const data = res.data
                this.setNewPage(data);
            } catch (e) {
                console.log("error: ", e)
            }

        },
        async setNewPage(data) {
            this.data = data.data
            this.orders = data.data.results
            this.page =  this.page || this.$route.query.page
            this.pageSize = this.pageSize || this.$route.query.pageSize
            console.log(this.page, this.pageSize)

            this.$router.replace({
                query:
                {
                    page: this.page,
                    pageSize: this.pageSize,
                    city: this.city,
                    district: this.district,
                    weekDay: this.weekDay,
                    isException: this.isException,
                }
            });
        },
        async conditionSearch(searchCondition) {

            this.page = searchCondition.page || this.page
            this.pageSize = searchCondition.pageSize || this.pageSize
            this.city = searchCondition.city || ''
            this.district = searchCondition.district || ''
            this.weekDay = searchCondition.weekDay || ''
            this.isException = searchCondition.isException || false


            this.fetchOrdersByConditions()
            this.$router.replace({
                query:
                {
                    page: 1,
                    pageSize: searchCondition.pageSize,
                    city: searchCondition.city,
                    district: searchCondition.district,
                    weekDay: searchCondition.weekDay,
                    isException: searchCondition.isException,
                }
            });
        }
    },
    async created() {
        this.page = this.$route.query.page || this.page;
        this.pageSize = this.$route.query.pageSize || this.pageSize;
        this.city = this.$route.query.city || ''
        this.district = this.$route.query.district || ''
        this.weekDay = this.$route.query.weekDay || ''
        this.isException = this.$route.query.searchIsException || false

        this.fetchOrdersByConditions()
    },
}
</script>