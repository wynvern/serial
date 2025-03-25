<script>
   import { Button } from "$lib/components/ui/button";
   import { AlarmClock, House } from "@lucide/svelte";

   const sidebarItems = [
      {
         name: "Home",
         icon: House,
         href: "/",
      },
      {
         name: "Eventos",
         icon: AlarmClock,
         href: "/events",
      },
   ];
</script>

<div class="p-4 m-2 border rounded w-80">
   <div class="flex flex-col gap-2">
      {#each sidebarItems as item}
         <Button class="w-full justify-start" variant="ghost" href={item.href}>
            <item.icon class="mr-2" />
            {item.name}
         </Button>
      {/each}
   </div>
</div>
