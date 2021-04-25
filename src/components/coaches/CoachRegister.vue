<template>
  <form action="" @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid:!inputValues.firstName.isValid}">
      <label for="firstName">First Name</label>
      <input type="text" id="firstName" v-model.trim="inputValues.firstName.val" @blur="clearInvalidInput('firstName')" />
      <p v-if="!inputValues.firstName.isValid">*First Name can't be empty</p>
    </div>
    <div class="form-control" :class="{invalid:!inputValues.lastName.isValid}">
      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" v-model.trim="inputValues.lastName.val" @blur="clearInvalidInput('lastName')"  />
       <p v-if="!inputValues.lastName.isValid">*Last Name can't be empty</p>
    </div>
    <div class="form-control" :class="{invalid:!inputValues.description.isValid}">
      <label for="description">Description</label>
      <textarea
        name="description"
        id="description"
        rows="5"
        v-model.trim="inputValues.description.val"
        @blur="clearInvalidInput('description')" 
      ></textarea>
       <p v-if="!inputValues.description.isValid">*Description can't be empty</p>
    </div>
    <div class="form-control" :class="{invalid:!inputValues.rate.isValid}">
      <label for="rate">Rate</label>
      <input type="number" id="rate" v-model.number="inputValues.rate.val" @blur="clearInvalidInput('rate')"  />
       <p v-if="!inputValues.rate.isValid">*Rate expertise must be greater than 0</p>
    </div>
    <div class="form-control" :class="{invalid:!inputValues.role.isValid}">
      <h3>Coach's roles or role</h3>
      <div>
        <input
          type="checkbox"
          name=""
          value="frontend"
          id="frontend"
          v-model="inputValues.role.val"
          @blur="clearInvalidInput('role')" 
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name=""
          value="backend"
          id="backend"
          v-model="inputValues.role.val"
          @blur="clearInvalidInput('role')" 
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name=""
          value="career"
          id="career"
          v-model="inputValues.role.val"
          @blur="clearInvalidInput('role')" 
        />
        <label for="career">Career Advistoy</label>
      </div>
       <p v-if="!inputValues.role.isValid">*At least must choosen one role</p>
    </div>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      inputValues: {
        firstName: {
            val:'',
            isValid:true
        },
        lastName: {
            val:"",
            isValid:true,
        },
        description:{
            val:"",
            isValid:true
        },
        rate: {
            val:null,
            isValid:true
        },
        role:{
            val:[],
            isValid:true
        }
      },
      inputIsValid:true
    };
  },
  emits:['save-data'],
  methods: {
      clearInvalidInput(input){
          this.inputValues[input].isValid=true
      },
    formValidate(){
        this.inputIsValid=true
        if(this.inputValues.firstName.val===""){
            this.inputValues.firstName.isValid=false
            this.inputIsValid=false
        }
        if(this.inputValues.lastName.val===""){
            this.inputValues.lastName.isValid=false
            this.inputIsValid=false
        }
        if(this.inputValues.description.val===""){
            this.inputValues.description.isValid=false
            this.inputIsValid=false
        }
        if(this.inputValues.rate.val<0 || !this.inputValues.rate.val){
            this.inputValues.rate.isValid=false
            this.inputIsValid=false
        }
        if(this.inputValues.role.val.length==0){
            this.inputValues.role.isValid=false
            this.inputIsValid=false
        }
    },
    submitForm() {
        this.formValidate()
        if(!this.inputIsValid){
            return
        }
        const registeredData={
            firstName:this.inputValues.firstName.val,
            lastName:this.inputValues.lastName.val,
            description:this.inputValues.description.val,
            hourlyRate:this.inputValues.rate.val,
            role:this.inputValues.role.val
        }
        this.$emit('save-data',registeredData)
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
