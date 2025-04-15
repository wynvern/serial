<script lang="ts">
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "$lib/components/ui/select";
  import { Hash } from "@lucide/svelte";

  export let channels: { id: String; name: string }[] = [];
  export let placeholder: string = "Selecione um canal";
  export let selected: any = undefined;
</script>

<div>
  <Select
    type="single"
    {selected}
    onSelectedChange={(e) => (selected = e?.value)}
  >
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
