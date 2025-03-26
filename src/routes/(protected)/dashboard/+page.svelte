<script lang="ts">
import type { PageProps } from "../home/$types";

const { data }: PageProps = $props();
</script>

<div class="w-full flex h-full items-center justify-center">
   <div class="flex items-center flex-col">
      <h2>Nenhum servidor selecionado.</h2>
   <p class="text-muted-foreground">
      Selecione um servidor para ver as informações.
   </p>
   </div>
</div>
