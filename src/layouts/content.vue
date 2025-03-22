<template>
  <div>
    <!-- TODO -->
    <HeaderItem />
    <div class="mx-auto grid h-96 max-w-7xl grid-cols-[220px_1fr] gap-5">
      <SideBar />
      <div class="">
        <slot />
      </div>
    </div>
    <FooterItem />
  </div>
</template>
