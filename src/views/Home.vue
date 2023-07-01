<template>
    <Header />
    <AddOrder />
    <Table :orders="orders" />
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
                console.log(result)
                if (result.statusCode !== 200) return
                this.orders = result.data.results
            }catch(e){
                console.log("error: ", e)
            }
        }
    },
    async created() {
        this.orders = this.getData();
        
    },
}
</script>