<template>
  <div>
    <base-dialog
      :show="!!error"
      title=" Authentication is failed!!"
      @close="closeDialog"
      >{{ error }}</base-dialog
    >
    <base-spinner v-if="isLoading"></base-spinner>
    <form action="" @submit.prevent="submitForm" v-if="!isLoading">
      <base-card>
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="inputValues.email.val" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model.trim="inputValues.password.val"
          />
        </div>
        <p v-if="!formIsValid">*Your email and password is incorrect!!</p>
        <div class="actions">
          <base-button>{{ submitBtnCaption }}</base-button>
          <base-button type="button" mode="flat" @click="setMode">{{
            switchModeBtnCaption
          }}</base-button>
        </div>
      </base-card>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValues: {
        email: {
          val: "",
          emailIsValid: null,
        },
        password: {
          val: "",
          passwordIsValid: null,
        },
      },
      formIsValid: true,
      mode: "Login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitBtnCaption() {
      if (this.mode === "Login") {
        return "Login";
      } else {
        return "Sign up";
      }
    },
    switchModeBtnCaption() {
      if (this.mode === "Login") {
        return "Sign up instead";
      } else {
        return "Login instead";
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.inputValues.email === "" ||
        !this.inputValues.email.val.includes("@") ||
        this.inputValues.password.val.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      if (this.mode === "Login") {
        try {
          await this.$store.dispatch("login", {
          email: this.inputValues.email.val,
          password: this.inputValues.password.val,
        });
        const redirectUrl='/'+(this.$route.query.redirect ||'coaches')
        this.$router.replace(redirectUrl)
        } catch (error) {
          this.error=error.message
        }
        this.isLoading = false;
        
      } else {
        try {
          await this.$store.dispatch("signUp", {
            email: this.inputValues.email.val,
            password: this.inputValues.password.val,
          });
          this.$router.replace('/coaches')
        } catch (error) {
          this.error = error.message;
        }
        this.isLoading = false;
      }
    },
  
    setMode() {
      if (this.mode === "Login") {
        this.mode = "Sign up";
      } else {
        this.mode = "Login";
      }
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
