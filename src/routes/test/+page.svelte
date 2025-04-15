<script>
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
  } from "$lib/components/ui/select";

  const { data } = $props();

  console.log(data.guilds.owned);
</script>

<div class="p-10">
  <Select type="single">
    <SelectTrigger class="h-fit">
      <div>
        <img
          src={`https://cdn.discordapp.com/icons/${data.guilds.owned[0].id}/${data.guilds.owned[0].icon}.png`}
          alt="Guild Icon"
          class="h-20 rounded"
        />
      </div>
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="a">Item 1</SelectItem>
    </SelectContent>
  </Select>
</div>
