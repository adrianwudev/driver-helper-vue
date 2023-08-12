<template>
    <div class="input-group">
        <div class="form-outline form-outline-sm">
            <input v-model="searchCity" type="search" class="form-control" placeholder="城市" />
        </div>
        <div class="form-outline form-outline-sm">
            <input v-model="searchDistrict" type="search" class="form-control" placeholder="區" />
        </div>
        <div class="form-outline form-outline-sm">
            <select v-model="searchWeekDay" class="form-control custom-select">
                <option value="">請選擇</option>
                <option value="MONDAY">周一</option>
                <option value="TUESDAY">周二</option>
                <option value="WEDNESDAY">周三</option>
                <option value="THURSDAY">周四</option>
                <option value="FRIDAY">周五</option>
                <option value="SATURDAY">周六</option>
                <option value="SUNDAY">周日</option>
            </select>
        </div>
        <div class="form-outline form-outline-sm">
            <select v-model="searchIsException" class="form-control custom-select">
                <option value="">請選擇</option>
                <option value="false">正常</option>
                <option value="true">異常</option>
            </select>
        </div>
        <div class="cs-form">
            <input v-model="searchTime" type="time" class="form-control" />
        </div>

        <button type="button" class="btn btn-outline-primary" @click="getData">search</button>
    </div>
</template>

<script>

export default {
    name: 'SearchBar',
    props: {
        pageSize: Number,
        page: Number,
    },
    data() {
        return {
            searchPageSize: 10,
            searchCity: '',
            searchDistrict: '',
            searchWeekDay: '',
            searchIsException: '',
            searchTime: '',
        }
    },
    mounted() {
        this.getFromLocalStorage()
    },
    methods: {
        async getFromLocalStorage(){
            this.searchPageSize = localStorage.getItem('searchPageSize') || 10;
            this.searchCity = localStorage.getItem('searchCity') || '';
            this.searchDistrict = localStorage.getItem('searchDistrict') || '';
            this.searchWeekDay = localStorage.getItem('searchWeekDay') || '';
            this.searchIsException = localStorage.getItem('searchIsException') || '';
            this.searchTime = localStorage.getItem('searchTime') || '';
        },
        async searchBarSetLocalStorage(){
            localStorage.setItem('searchPageSize', this.searchPageSize);
            localStorage.setItem('searchCity', this.searchCity);
            localStorage.setItem('searchDistrict', this.searchDistrict);
            localStorage.setItem('searchWeekDay', this.searchWeekDay);
            localStorage.setItem('searchIsException', this.searchIsException);
            localStorage.setItem('searchTime', this.searchTime);
        },
        async getData() {
            try {
                this.searchPageSize = localStorage.getItem('searchPageSize') || 10;
                this.searchBarSetLocalStorage()
                
                this.$emit('condition-search', {
                    page: 1,
                    pageSize: this.searchPageSize,
                    city: this.searchCity,
                    district: this.searchDistrict,
                    weekDay: this.searchWeekDay,
                    isException: this.searchIsException,
                    time: this.searchTime,
                })
            } catch (e) {
                console.log("error: ", e)
            }
        },
    }
}

</script>


<style scoped>
.custom-select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding-right: 1.75rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%234D5156' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 8px 10px;
}
</style>