<script>
  import Guilds from "$lib/components/popover/guilds.svelte";
  import { Button } from "$lib/components/ui/button";
  import { AlarmClock, ChevronDown, House } from "@lucide/svelte";

  const sidebarItems = [
    {
      name: "Geral",
      children: [
        {
          name: "Home",
          icon: House,
          href: "/",
        },
      ],
    },
    {
      name: "Portaria",
      children: [
        { name: "Entrada/Saída", icon: AlarmClock, href: "join-leave" },
      ],
    },
  ];

  export let guild;
</script>

<div
  class="m-2 border rounded w-80 overflow-hidden gap-2 flex flex-col bg-sidebar-background"
>
  <div class="w-full p-4 pb-0 flex gap-2">
    <img
      src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
      alt="Guild Icon"
      class="h-8 rounded"
    />
    <Guilds {guild}>
      <span class="flex gap-1 items-center">
        <p class="text-primary">{guild.name}</p>
        <ChevronDown />
      </span>
    </Guilds>
  </div>

  <div class="p-2 flex flex-col gap-3">
    {#each sidebarItems as category}
      <div>
        <p class="text-xs ml-2 mb-1">{category.name}</p>
        <div class="flex flex-col gap-1">
          {#each category.children as item}
            <Button
              class="w-full justify-start"
              variant="ghost"
              href={item.href}
            >
              <svelte:component this={item.icon} class="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
