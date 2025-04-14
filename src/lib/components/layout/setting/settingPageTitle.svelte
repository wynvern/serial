<script lang="ts">
  import Separator from "$lib/components/ui/separator/separator.svelte";

  export let title: string;
  export let description: string;
</script>

<div class="p-4 flex flex-col gap-4">
  <div class="flex gap-2 flex-col">
    <div class="flex gap-2">
      <h1 class="leading-none tracking-tight text-primary">{title}</h1>
    </div>
    <p class="text-sm text-muted-foreground">{description}</p>
  </div>
  <Separator />
</div>
