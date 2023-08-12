<template>
    <Header />
    <SearchBar :data="data" :orders="orders" :pageSize="Number(pageSize)" :page="Number(page)"
        @condition-search="conditionSearch" />
    <AddOrder />
    <Table :orders="orders" :data="data" @to-page="toPage" @delete-order="deleteOrder" @selection-change="selectionChange"/>
</template>

<script>
import Table from '../components/Table.vue'
import Header from '../components/Header.vue'
import AddOrder from '../components/AddOrder.vue'
import SearchBar from '@/components/SearchBar.vue'
import { apiFetchOrders, apiGetOrdersByConditions, apiDeleteOrder } from '../api/api.js';


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
            pageSize: 10,
            page: 1,
            city: '',
            district: '',
            weekDay: '',
            isException: false,
            time: '',
        }
    },
    methods: {
        async fetchOrders(page, pageSize) {
            return await apiFetchOrders(page, pageSize);
        },
        async toPage(pageNum) {
            this.page = pageNum
            this.fetchOrdersByConditions()
        },
        async deleteOrder(orderId) {
            if (!confirm('確定要刪除訂單嗎？')) return
            await apiDeleteOrder(orderId);
            window.location.reload();
        },
        async selectionChange(pageSize) {
            this.pageSize = pageSize
            localStorage.setItem('searchPageSize', this.pageSize);
            this.fetchOrdersByConditions()
        },
        async fetchOrdersByConditions() {
            try {
                const data = await apiGetOrdersByConditions(this.page, this.pageSize, this.city, this.district, this.weekDay, this.isException, this.time);
                this.setNewPage(data);
            } catch (e) {
                console.log("error: ", e)
            }

        },
        async resetRouter(){
            
            this.$router.replace({
                query:
                {
                    page: this.page,
                    pageSize: this.pageSize,
                    city: this.city,
                    district: this.district,
                    weekDay: this.weekDay,
                    isException: this.isException,
                    time: this.time,
                }
            });
        },
        async setNewPage(data) {
            this.data = data.data
            this.orders = data.data.results
            this.page =  this.page || this.$route.query.page
            this.pageSize = this.pageSize || this.$route.query.pageSize
            console.log(this.page, this.pageSize)
            this.resetRouter()
        },
        async conditionSearch(searchCondition) {
            
            this.page = searchCondition.page || this.page
            this.pageSize = searchCondition.pageSize || this.pageSize
            this.city = searchCondition.city || ''
            this.district = searchCondition.district || ''
            this.weekDay = searchCondition.weekDay || ''
            this.isException = searchCondition.isException || ''
            this.time = searchCondition.time || ''

            this.fetchOrdersByConditions()
            this.resetRouter()
        },
        async cleanLocalStorage(){
            const queryParams = this.$route.query
            const itemToRemove = ["city", "district", "weekDay", "isException", "time"]

            itemToRemove.forEach(item => {
                if(!queryParams[item]){
                    localStorage.removeItem(`search${item.charAt(0).toUpperCase() + item.slice(1)}`)
                }
            })
        },
    },
    async created() {
        this.cleanLocalStorage()

        this.page = this.$route.query.page || this.page;
        this.pageSize = this.$route.query.pageSize || localStorage.getItem('searchPageSize') || this.pageSize;
        this.city = this.$route.query.city || localStorage.getItem('searchCity') || ''
        this.district = this.$route.query.district || localStorage.getItem('searchDistrict') || ''
        this.weekDay = this.$route.query.weekDay || localStorage.getItem('searchWeekDay') || ''
        this.isException = this.$route.query.searchIsException || localStorage.getItem('searchIsException') || ''
        this.time = this.$route.query.searchTime || localStorage.getItem('searchTime') || ''

        this.fetchOrdersByConditions()
        this.resetRouter()
    },
}
</script>