<template>
    <div class="modify-order">
      <button class="btn btn-primary btn-sm" @click="openModal">修改</button>
  
      <!-- Modal -->
      <div class="modal" :class="{ 'is-active': showModal }">
        <div class="modal-background" @click="closeModal"></div>
        <div class="modal-content">
          <!-- Order form -->
          <div class="form">
            <div class="field">
              <label class="label">城市</label>
              <input v-model="selectedOrder.city" class="input" type="text" required>
            </div>
            <div class="field">
              <label class="label">區</label>
              <input v-model="selectedOrder.district" class="input" type="text" required>
            </div>
            <div class="field">
              <label class="label">地址</label>
              <input v-model="selectedOrder.address" class="input" type="text" required>
            </div>
            <div class="field">
              <label class="label">訂單時間</label>
              <input v-model="selectedOrder.orderTime" class="input" type="datetime-local" required>
            </div>
            <div class="field">
              <label class="label">下車地點</label>
              <input v-model="selectedOrder.pickUpDrop" class="input" type="text" required>
            </div>
            <div class="field">
              <label class="label">上車時間</label>
              <input v-model="selectedOrder.pickUpTime" class="input" type="datetime-local" required>
            </div>
            <div class="field">
              <label class="label">群組名</label>
              <input v-model="selectedOrder.groupName" class="input" type="text" required>
            </div>
            <div class="field">
              <label class="label">金額</label>
              <input v-model="selectedOrder.amount" class="input" type="number" min="1" step="any" required />
            </div>
            <div class="field">
              <label class="label">距離</label>
              <input v-model="selectedOrder.distance" class="input" type="text" required>
            </div>
            <div class="field">
              <label class="label">資料異常</label>
              <div class="control">
                <div class="select">
                  <select v-model="selectedOrder.isException">
                    <option value="true">異常</option>
                    <option value="false" selected>無異常</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Submit and cancel buttons -->
          <div class="buttons">
            <button type="submit" class="button is-primary submit-button" @click="confirmSubmit">儲存</button>
            <button class="button is-light cancel-button" @click="confirmCancel">取消</button>
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
      </div>
    </div>
  </template>
  
  <script>
  import { apiModifyOrder } from '../api/api.js';
  
  export default {
    name: 'ModifyOrder',
    props: {
      order: Object,
    },
    data() {
      return {
        showModal: false,
        selectedOrder: JSON.parse(JSON.stringify(this.order)),
      };
    },
    methods: {
      openModal() {
        // Clone the order object to avoid modifying the original order directly
        this.selectedOrder = JSON.parse(JSON.stringify(this.order));
        this.selectedOrder.isException = this.order.exception
        this.showModal = true;
      },
      closeModal() {
        if (this.isFormEmpty()) {
          this.showModal = false;
        } else {
          this.confirmCancel();
        }
      },
      confirmSubmit() {
        if (this.validateForm()) {
          if (confirm('確定要修改訂單嗎？')) {
            this.modifyOrder();
          }
        }
      },
      confirmCancel() {
        if (confirm('確定要取消修改訂單嗎？')) {
          this.showModal = false;
        }
      },
      modifyOrder() {
        this.putData();
        this.resetForm();
        this.showModal = false;
        window.location.reload();
      },
      resetForm() {
        this.selectedOrder = {};
      },
      validateForm() {
        // Implement your form validation logic here
        // Return true if the form is valid, false otherwise
        // You can check if the required fields are filled, validate the format, etc.
        const requiredFields = ['city', 'district', 'address', 'orderTime', 'pickUpDrop', 'pickUpTime', 'groupName', 'amount', 'distance'];
        const fieldMap = new Map([
          ['city', '城市'],
          ['district', '區'],
          ['address', '地址'],
          ['orderTime', '訂單時間'],
          ['pickUpDrop', '下車地點'],
          ['pickUpTime', '上車時間'],
          ['groupName', '群組名'],
          ['amount', '金額'],
          ['distance', '距離'],
        ]);
  
        for (const field of requiredFields) {
          if (this.selectedOrder[field] === '') {
            const fieldName = fieldMap.get(field);
            alert(`請填寫${fieldName}`);
            return false;
          }
        }
  
        return true;
      },
      isFormEmpty() {
        return this.selectedOrder === null;
      },
      async putData() {
        const data= await apiModifyOrder(this.selectedOrder);
        if(data)
          console.log(response.data);
      },
    }
  };
  </script>
  
  <style scoped>
  .modify-order {
    display: flex;
    justify-content: flex-end;
  }
  
  .modal {
    display: none;
  }
  
  .modal.is-active {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-background {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  
  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
    width: 400px;
    /* Adjust the width as needed */
    max-height: 600px;
    /* Adjust the max height as needed */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: auto;
  }
  
  .form {
    margin-bottom: 20px;
  }
  
  .field {
    margin-bottom: 15px;
  }
  
  .label {
    display: block;
    margin-bottom: 5px;
  }
  
  .buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  
  .submit-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .cancel-button {
    background-color: #e9ecef;
    color: #212529;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: #0056b3;
  }
  
  .cancel-button:hover {
    background-color: #c1c7d0;
  }
  
  .modal-close.is-large {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  </style>
  