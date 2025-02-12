<template>
  <div class="h-[200px] w-[500px] bg-black text-white" @click="submit">{{ result }}</div>
</template>

<script lang="ts" setup>
let result:any = null;
async function submit() {
  result = useFetch('/api/zhblogs/blog', {
    method: 'post',
    body: {
      name: "test blog name ",
      url: "https://example.com",
      sign: "test blog sign",
      mainTag: "test tag",
    }
  })
}

</script>