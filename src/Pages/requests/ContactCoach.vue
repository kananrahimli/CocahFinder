<template>
  <section>
    <base-dialog
      @close="closeDialog"
      :show="!!error"
      title="Registration is failed!!"
      >{{ error }}</base-dialog
    >
    <base-spinner v-if="isLoading"></base-spinner>
    <form action="" @submit.prevent="submitForm">
      <div class="form-control" :class="{ errors: !inputValues.email.isValid }">
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          v-model.trim="inputValues.email.val"
          @blur="clearErrorInput('email')"
        />
      </div>
      <div
        class="form-control"
        :class="{ errors: !inputValues.message.isValid }"
      >
        <label for="message">Message</label>
        <textarea
          name="message"
          id="message"
          rows="5"
          v-model.trim="inputValues.message.val"
          @blur="clearErrorInput('message')"
        ></textarea>
      </div>
      <p v-if="!inputIsValid">*Something went wrong.Plesae check again!</p>
      <base-button>Send message</base-button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      error: null,
      inputValues: {
        email: {
          val: "",
          isValid: true,
        },
        message: {
          val: "",
          isValid: true,
        },
      },
      inputIsValid: true,
    };
  },
  methods: {
    clearErrorInput(input) {
      this.inputValues[input].isValid = true;
    },
    formValidate() {
      this.inputIsValid = true;
      if (
        this.inputValues.email.val === "" ||
        !this.inputValues.email.val.includes("@")
      ) {
        this.inputValues.email.isValid = false;
        this.inputIsValid = false;
      }
      if (this.inputValues.message.val === "") {
        this.inputValues.message.isValid = false;
        this.inputIsValid = false;
      }
    },
   async submitForm() {
      this.formValidate();
      if (!this.inputIsValid) {
        return;
      }

      let sendedRequest = {
        coachId: this.$route.params.id,
        message: this.inputValues.message.val,
        email: this.inputValues.email.val,
      };
  
      this.isLoading=true
     try {
      await this.$store.dispatch("requests/contactCoach", sendedRequest);
      this.$router.go(-1);
     } catch (error) {
       this.error=error.message
     } 
     this.isLoading=false

      
    },
    closeDialog() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}
.errors input,
.errors textarea {
  border: 1px red solid;
}

.actions {
  text-align: center;
}
</style>
