<template>
  <div>Домашняя страничка</div>

  <form @submit="onSubmit" class="border p-8 grid gap-5">
    <div class="grid gap-1">
      <label for="name"></label>
      <input
        type="text"
        id="name"
        name="email"
        v-model="email"
        @blur="handleBlur"
      />
      <span v-if="meta.touched && emailError" style="color: red">
        {{ emailError }}
      </span>
    </div>

    <button>Submit</button>
  </form>

  <code>{{ res }}</code>
</template>

<!-- VeeValidate + Zod -->
<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import * as zod from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { ref } from "vue";

const validationSchema = toTypedSchema(
  zod.object({
    email: zod.string().min(3, { message: "минимум 3 буквы" }),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: {
    email: "", // 👉 обязательно задаём начальное значение!
  },
});

const {
  value: email,
  errorMessage: emailError,
  meta,
  handleBlur,
} = useField("email");

const res = ref<null | {}>(null);

const onSubmit = handleSubmit((values) => {
  res.value = JSON.stringify(values, null, 2);
  // alert(JSON.stringify(values, null, 2));
});
</script>
