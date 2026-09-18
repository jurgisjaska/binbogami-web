<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  category: {
    type: Object,
    default: () => ({})
  },
  id: {
    type: String,
    default: null
  },
  name: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: null
  }
})

const categoryId = computed(() => props.id || props.category?.id || null)
const categoryName = computed(() => props.name || props.category?.name || 'Category')
const categoryColor = computed(() => props.color || props.category?.color || null)
const categoryIcon = computed(() => props.icon || props.category?.icon || null)

const getLuminance = (r, g, b) => {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

const getContrastColor = (hexColor) => {
  if (!hexColor || typeof hexColor !== 'string') {
    return '#ffffff'
  }
  const hex = hexColor.replace('#', '').trim()
  let r = 0
  let g = 0
  let b = 0
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16)
    g = parseInt(hex[1] + hex[1], 16)
    b = parseInt(hex[2] + hex[2], 16)
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16)
    g = parseInt(hex.substring(2, 4), 16)
    b = parseInt(hex.substring(4, 6), 16)
  } else {
    return '#ffffff'
  }
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return '#ffffff'
  }
  const lum = getLuminance(r, g, b)
  const contrastWhite = 1.05 / (lum + 0.05)
  const contrastBlack = (lum + 0.05) / 0.05
  return contrastWhite >= contrastBlack ? '#ffffff' : '#000000'
}

const buttonStyle = computed(() => {
  const color = categoryColor.value
  if (!color) {
    return {
      backgroundColor: 'var(--tblr-primary)',
      borderColor: 'var(--tblr-primary)',
      color: '#ffffff'
    }
  }
  return {
    backgroundColor: color,
    borderColor: color,
    color: getContrastColor(color)
  }
})

const iconClass = computed(() => {
  const icon = categoryIcon.value
  if (!icon) {
    return 'fa-solid fa-tag'
  }
  const trimmed = icon.trim()
  if (trimmed.includes(' ')) {
    return trimmed
  }
  if (trimmed.startsWith('fa-')) {
    return `fa-solid ${trimmed}`
  }
  if (trimmed.startsWith('ti-')) {
    return `ti ${trimmed}`
  }
  return `fa-solid fa-${trimmed}`
})
</script>

<template>
  <RouterLink
    v-if="categoryId"
    :to="{ name: 'category', params: { category: categoryId } }"
    class="btn btn-icon category-icon-btn"
    :style="buttonStyle"
    :title="categoryName"
    :aria-label="categoryName"
  >
    <i :class="iconClass"></i>
  </RouterLink>
  <span
    v-else
    class="btn btn-icon category-icon-btn disabled"
    :style="buttonStyle"
    :title="categoryName"
    :aria-label="categoryName"
  >
    <i :class="iconClass"></i>
  </span>
</template>

<style scoped>
.category-icon-btn {
  transition:
    opacity 0.15s ease-in-out,
    filter 0.15s ease-in-out,
    transform 0.15s ease-in-out;
}
.category-icon-btn:hover {
  filter: brightness(0.92);
  transform: scale(1.05);
}
</style>
