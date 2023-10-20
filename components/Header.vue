<template>
  <header>
    <div class="light-header">
      <div class="light-header__logo">
        <extended-router-link to="/"
                              title="Cardoen"
                              aria-label="Cardoen">
          <logo-img/>
        </extended-router-link>
      </div>
      <div class="light-header__content">
        <slot></slot>
      </div>
      <div></div>
    </div>
  </header>
</template>

<script setup>
import LogoImg from './LogoImg.vue';

</script>

<style lang="scss" scoped>
.light-header {
  display: grid;
  max-width: 1200px;
  grid-template-columns: 151px auto 180px;
  margin: 0 auto;

  &__content {
    align-self: center;
    margin: 0 23px 0 62px;
  }

  &__logo {
    padding: inherit;
    box-shadow: none;
  }

  // &__content {
  //   margin: 36px 16px 0 16px;
  //   font-size: 24px;
  //   text-align: center;
  // }

  // &__logo {
  //   justify-self: center;
  //   padding: 17px 26px;
  //   background-color: white;
  //   border-radius: 0 0 4px 4px;
  //   box-shadow: 0 2px 4px rgb(0 0 0 / 0.1);
  // }

}
</style>
