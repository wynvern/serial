<script>
   import Button from "$lib/components/ui/button/button.svelte";
   import { Plus } from "@lucide/svelte";
</script>

<div class="w-full h-screen flex px-4">
   <div
      class="absolute rounded overflow-hidden z-0 transform right-40 -translate-y-1/2 top-1/2"
   >
      <img
         src="/client-banner.jpg"
         class="w-[700px] h-[70vh] object-cover brightness-90"
      />
   </div>

   <div class="flex z-1 flex-col gap-10 h-full w-full justify-center ml-10">
      <div class="flex flex-col gap-6">
         <h1 style="font-weight: 900; font-size: 5rem; line-height: 90px;">
            Serial :: Seu ajudante<br />Protogen
         </h1>
         <h2 class="text-muted-foreground">
            Mais um bot de proposito geral para o Discord, porem peludo e com
            nanites
         </h2>
      </div>
      <div>
         <Button class="w-48"><Plus />Me adicione!</Button>
      </div>
   </div>
</div>
