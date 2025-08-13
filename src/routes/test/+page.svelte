<script lang="ts">
  import * as Select from "$lib/components/ui/select/index";

  let myValue = "";

  // log myValue whenever it changes
  $: console.log("myValue changed:", myValue);

  const fruits = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "blueberry", label: "Blueberry" },
    { value: "grapes", label: "Grapes" },
    { value: "pineapple", label: "Pineapple" },
  ];
</script>

<button on:click={() => (myValue = "A")}>Select A</button>

<Select.Root portal={null} >
  <Select.Trigger class="w-[180px]">
    <Select.Value placeholder="Select a fruit" />
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      <Select.Label>Fruits</Select.Label>
      {#each fruits as fruit}
        <Select.Item value={fruit.value} label={fruit.label}
          >{fruit.label}</Select.Item
        >
      {/each}
    </Select.Group>
  </Select.Content>
  <Select.Input name="favoriteFruit" />
</Select.Root>
