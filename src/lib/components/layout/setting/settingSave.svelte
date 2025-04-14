<script>
  import { Button } from "$lib/components/ui/button";

  export let hasChanges = false; // Boolean input to control visibility of the message
  export let onSave = () => {}; // Function to call when the save button is clicked

  function handleSave() {
    onSave();
  }
</script>

{#if hasChanges}
  <div class="sticky bottom-10 w-full">
    <div
      class="bg-sidebar-background border rounded flex justify-between p-2 items-center"
    >
      <div class="ml-2">
        <b class="text-sm text-primary">Aviso</b>
        <p class="text-xs">Você tem alterações não salvas.</p>
      </div>
      <Button on:click={handleSave}>Salvar</Button>
    </div>
  </div>
{/if}
