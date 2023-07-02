<template>
    <Header />
    <AddOrder />
    <Table :orders="orders" :data="data" @to-page="toPage" />
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
        }
    },
    methods: {
        async fetchOrders() {
            try {
                const res = await fetch('api/orders')
                if (!res.ok) {
                    throw new Error('Request failed with status ' + res.status);
                }
                const data = res.json()
                return data
            } catch (e) {
                console.log("error: ", e)
            }

        },
        async getData(){
            try{
                console.log("getData")
                const result = await this.fetchOrders();
                if (result.statusCode !== 200) return
                this.data = result.data
                this.orders = result.data.results
            }catch(e){
                console.log("error: ", e)
            }
        },
        async toPage(pageNum){
            console.log(pageNum)
        }
    },
    async created() {
        this.getData();
        
    },
}
</script>