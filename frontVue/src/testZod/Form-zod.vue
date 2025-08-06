<template>
  <div>Домашняя страничка</div>

  <form
    @submit.prevent="
      () => {
        console.log('попытка сабмита');
        onSubmit();
      }
    "
    class="border p-8 grid gap-5"
  >
    <div class="grid gap-1">
      <label for="name"></label>
      <input
        type="text"
        id="name"
        name="email"
        v-model="email"
        @blur="handleBlur"
      />
      <!-- <span v-if="meta.touched && emailError" style="color: red">-->
      <span v-if="wasSubmitted && emailError" style="color: red">
        {{ emailError }}
      </span>
    </div>

    <button>Submit</button>
  </form>

  <button @click="console.log(1)">Click</button>

  <code>{{ res }}</code>
</template>

<!-- VeeValidate + Zod -->
<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import zod from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { ref, watch } from "vue";

//  ✅ Схема валидации
const schema = zod.object({
  email: zod.string().min(3, { message: "минимум 3 буквы" }),
  isAdmin: zod.boolean().optional(),
});
//🎯 vee-validate
const { handleSubmit, errors, values } = useForm({
  validationSchema: toTypedSchema(schema),
  // 👉 обязательно задаём начальное значение!
  initialValues: {
    email: "",
  },
});

const {
  value: email,
  errorMessage: emailError,
  meta,
  handleBlur,
} = useField("email");

watch(values, (newVal) => {
  console.log("=>", newVal);
});

const res = ref<null | {}>(null);
const wasSubmitted = ref(false);

const onSubmit = handleSubmit((values) => {
  wasSubmitted.value = true;

  res.value = JSON.stringify(values, null, 2);
  // alert(JSON.stringify(values, null, 2));
});
</script>
