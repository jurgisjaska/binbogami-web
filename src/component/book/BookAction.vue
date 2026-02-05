<script setup>
import api from "@/api.js";

const props = defineProps({
  actionClass: {
    type: String,
    required: false,
    default: "dropdown-item"
  },
  action: {
    type: String,
    required: true,
    validator: (value) => {
      return ["delete", "close"].includes(value);
    }
  },
  id: {
    type: String,
    required: true,
  }
});

const emit = defineEmits(["action-completed", "action-failed"])

const onClick = () => {
  api.delete("/v1/books/" + props.id, {params: {action: props.action}})
      .then((r) => {
        emit("action-completed", r)
      })
      .catch((e) => {
        emit("action-failed", e)
      });
};
</script>

<template>
  <a href="#" :class="actionClass" @click.prevent="onClick">
    <slot/>
  </a>
</template>
