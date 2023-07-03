<template>
    <th scope="row">{{ order.orderId }}</th>
    <td>{{ order.city }}</td>
    <td>{{ order.district }}</td>
    <td>{{ order.address }}</td>
    <td>{{ order.orderTime }}</td>
    <td>{{ order.pickUpDrop }}</td>
    <td>{{ order.pickUpTime }}</td>
    <td>{{ order.weekday }}</td>
    <td>{{ order.groupName }}</td>
    <td>{{ order.amount }}</td>
    <td>{{ order.distance }}</td>
    <td>
        <!-- {{ order.isException }} -->
        <span v-if="order.isException">
            異常
        </span>
        <span v-else>
            正常
        </span>
    </td>
    <td>{{ order.repeatCount }}</td>
    <td>
        <div class="button-container">
            <button type="button" class="btn btn-primary btn-sm">修改</button>
            <button type="button" class="btn btn-danger btn-sm" @click="$emit('delete-order', order.orderId)">刪除</button>
        </div>
    </td>
</template>

<script>
export default {
    name: 'Order',
    props: {
        order: Object
    },
    emits:['delete-order'],
}
</script>


<style scoped>
.button-container {
  display: flex;
  justify-content: space-around;
}
</style>