<template>
  <div>
    <HeaderItem class="fixed top-0 z-50 w-full" />
    <div
      class="bg-base-200 mx-auto mt-28 w-full break-all sm:mt-36 lg:max-w-7xl"
    >
      <slot />
    </div>
    <FooterItem />
  </div>
</template>
