<template>
  <div class="card-list columns">
    <AppCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      :isAdmin="true"
      size="is-3"
    />
    <div v-if="!items || !items.length">No items added yet 😑...</div>
  </div>
</template>

<script lang="ts">
import AppCard from "@/components/AppCard.vue";
export default {
  components: {
    AppCard
  },
  props: {
    items: {
      type: Array,
      default: []
    }
  }
};
</script>

<style lang="scss" scoped>
.card-list {
  padding-top: 20px;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
