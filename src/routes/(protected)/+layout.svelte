<script>
   import Header from "$lib/components/layout/header/header.svelte";
   import Sidebar from "$lib/components/layout/sidebar/sidebar.svelte";

   const { children, data } = $props();
</script>

<div class="w-full h-screen flex p-1">
   <Sidebar />
   <div class="grow flex flex-col ml-0 m-2 px-4 gap-2">
      <Header session={data.session}/>
      {@render children()}
   </div>
   
</div>
