<template>
  <div class="add-order">
    <button class="add-order__button" @click="openModal">新增訂單</button>

    <!-- Modal -->
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-content">
        <!-- Order form -->
        <div class="form">
          <div class="field">
            <label class="label">城市</label>
            <input v-model="newOrder.city" class="input" type="text" required>
          </div>
          <div class="field">
            <label class="label">區</label>
            <input v-model="newOrder.district" class="input" type="text" required>
          </div>
          <div class="field">
            <label class="label">地址</label>
            <input v-model="newOrder.address" class="input" type="text" required>
          </div>
          <div class="field">
            <label class="label">訂單時間</label>
            <input v-model="newOrder.orderTime" class="input" type="datetime-local" required>
          </div>
          <div class="field">
            <label class="label">上下車</label>
            <div class="control">
              <div class="select">
                <select v-model="newOrder.pickUpDrop" class="input" required>
                  <option value="">請選擇</option>
                  <option value="On">上車</option>
                  <option value="Off">下車</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">上車時間</label>
            <input v-model="newOrder.pickUpTime" class="input" type="datetime-local" required>
          </div>
          <div class="field">
            <label class="label">群組名</label>
            <input v-model="newOrder.groupName" class="input" type="text" required>
          </div>
          <div class="field">
            <label class="label">金額</label>
            <input v-model="newOrder.amount" class="input" type="number" min="1" step="any" required />
          </div>
          <div class="field">
            <label class="label">距離</label>
            <input v-model="newOrder.distance" class="input" type="text" required>
          </div>
          <div class="field">
            <label class="label">資料異常</label>
            <div class="control">
              <div class="select">
                <select v-model="newOrder.isException">
                  <option value="true">異常</option>
                  <option value="false" selected>無異常</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit and cancel buttons -->
        <div class="buttons">
          <button type="submit" class="button is-primary submit-button" @click="confirmSubmit">送出</button>
          <button class="button is-light cancel-button" @click="confirmCancel">取消</button>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
    </div>
  </div>
</template>

<script>
import { apiAddNewOrder } from '../api/api.js';
export default {
  name: 'AddOrder',
  data() {
    return {
      showModal: false,
      newOrder: {
        city: '',
        district: '',
        address: '',
        orderTime: '',
        pickUpDrop: '',
        pickUpTime: '',
        groupName: '',
        amount: '',
        distance: '',
        isException: false, // Initialize with the default value
      },
    };
  },
  methods: {
    openModal() {
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
        if (confirm('確定要送出訂單嗎？')) {
          this.submitOrder();
        }
      }
    },
    confirmCancel() {
      if (confirm('確定要取消新增訂單嗎？')) {
        this.resetForm();
        this.showModal = false;
      }
    },
    submitOrder() {
      // Submit the order
      this.PostData();
      // ...
      console.log('submit sent: ', this.newOrder)
      this.resetForm();
      this.showModal = false;
      // window.location.reload();
    },
    resetForm() {
      this.newOrder = {
        city: '',
        district: '',
        address: '',
        orderTime: '',
        pickUpDrop: '',
        pickUpTime: '',
        groupName: '',
        amount: '',
        distance: '',
        isException: false, // Initialize with the default value
      };

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
        ['pickUpDrop', '上下車'],
        ['pickUpTime', '上車時間'],
        ['groupName', '群組名'],
        ['amount', '金額'],
        ['distance', '距離'],
      ]);

      for (const field of requiredFields) {
        if (this.newOrder[field] === '') {
          const fieldName = fieldMap.get(field);
          alert(`請填寫${fieldName}`);
          return false;
        }
      }

      return true;
    },
    isFormEmpty() {
      if (this.newOrder === null) return false;

      return true
    },
    async PostData() {
      const data = await apiAddNewOrder(this.newOrder);
      if(data)
        console.log(data)
    },
  }
};
</script>

<style scoped>
.add-order {
  display: flex;
  justify-content: flex-end;
}

.add-order__button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-order__button:hover {
  background-color: #0056b3;
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
