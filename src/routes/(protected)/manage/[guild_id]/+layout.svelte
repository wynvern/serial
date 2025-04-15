<script>
  import Header from "$lib/components/layout/header/header.svelte";
  import Sidebar from "$lib/components/layout/sidebar/sidebar.svelte";

  const { children, data } = $props();
</script>

<div class="w-full h-screen flex">
  <Sidebar guild={data.guild} />
  <div class="grow flex flex-col mt-4 gap-2">
    <Header session={data.session} />
    <div class="grow overflow-auto px-8">
      {@render children()}
    </div>
  </div>
</div>
