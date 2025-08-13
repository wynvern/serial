<script lang="ts">
   import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
   } from "$lib/components/ui/select";
   import { Hash } from "@lucide/svelte";

   let { selected = $bindable(), channels, placeholder } = $props();
</script>

<div>
   <Select bind:selected>
      <SelectTrigger class="h-fit">
         <SelectValue {placeholder} />
      </SelectTrigger>
      <SelectContent>
         {#each channels as channel}
            <SelectItem value={channel.id}>
               <span
                  class="bg-sidebar-background border p-1 rounded flex items-center gap-1"
                  ><Hash /> {channel.name}</span
               >
            </SelectItem>
         {/each}
      </SelectContent>
   </Select>
</div>
