<template>
    <th scope="row">{{ order.orderId }}</th>
    <td>{{ order.city }}</td>
    <td>{{ order.district }}</td>
    <td>{{ order.address }}</td>
    <td>{{ order.orderTime }}</td>
    <td>{{ pickUpDropText }}</td>
    <td>{{ order.pickUpTime }}</td>
    <td>{{ getWeekdayText }}</td>
    <td>{{ order.groupName }}</td>
    <td>{{ order.amount }}</td>
    <td>{{ order.distance }}</td>
    <td>{{ order.isException ? '異常' : '正常' }}</td>
    <td>{{ order.repeatCount }}</td>
    <td>
        <div class="button-container">
            <ModifyOrder :order="order" />
            <button type="button" class="btn btn-danger btn-sm" @click="$emit('delete-order', order.orderId)">刪除</button>
        </div>
    </td>
</template>

<script>
import ModifyOrder from './ModifyOrder.vue'

export default {
    name: 'Order',
    props: {
        order: Object
    },
    components: {
        ModifyOrder,
    },
    computed: {
        pickUpDropText() {
            if (this.order.pickUpDrop === 'On') {
                return '上車';
            } else if (this.order.pickUpDrop === 'Off') {
                return '下車';
            } else {
                return '';
            }
        },
        getWeekdayText() {
            const weekdayMap = new Map([
                ['MONDAY', '週一'],
                ['TUESDAY', '週二'],
                ['WEDNESDAY', '週三'],
                ['THURSDAY', '週四'],
                ['FRIDAY', '週五'],
                ['SATURDAY', '週六'],
                ['SUNDAY', '週日']
            ]);

            return weekdayMap.get(this.order.weekday) || '';
        }
    }
    ,
    emits: ['delete-order'],
}
</script>


<style scoped>
.button-container {
    display: flex;
    justify-content: space-around;
}
</style>