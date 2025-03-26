<script>
   import Guilds from "$lib/components/popover/guilds.svelte";
   import { Button } from "$lib/components/ui/button";
   import { AlarmClock, ChevronDown, House } from "@lucide/svelte";

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

   export let guild;
</script>

<div class="m-2 border rounded w-80 overflow-hidden gap-2 flex flex-col">
   <div class="h-40 w-full relative">
      <div
         class="w-full h-full absolute bg-gradient-to-t from-background to-transparent"
      >
         <div class="bottom-0 p-4 absolute">
            <Guilds {guild}>
               <span class="flex gap-1 items-center"
                  ><h2>{guild.name}</h2>
                  <ChevronDown /></span
               >
            </Guilds>
         </div>
      </div>
      <img
         src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
         alt="guild-icon"
         class="w-full h-full object-cover"
      />
   </div>

   <div class="p-2 flex flex-col gap-1">
      <div class="ml-2">
         <b class="text-muted-foreground text-xs">Geral</b>
      </div>
      <div class="flex flex-col gap-2">
         {#each sidebarItems as item}
            <Button
               class="w-full justify-start"
               variant="ghost"
               href={item.href}
            >
               <item.icon class="mr-2" />
               {item.name}
            </Button>
         {/each}
      </div>
   </div>
</div>
