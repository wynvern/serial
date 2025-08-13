<script>
   import Noise from "$lib/components/layout/generic/noise.svelte";
   import Button from "$lib/components/ui/button/button.svelte";
   import { LogIn, Plus } from "@lucide/svelte";
</script>

<div class="w-full h-screen flex flex-col items-center px-48">
   <Noise />

   <div class="absolute w-full p-4 px-48">
      <div class="border rounded w-full h-full bg-background">
         <div class="w-full h-full pl-6 p-2 flex items-center justify-between">
            <b style="font-family: 'Okine';" class="text-white">:: Serial</b>
            <div class="flex gap-6 items-center">
               <div class="flex gap-1">
                  <a href="/about">
                     <Button variant="ghost">Sobre</Button>
                  </a>
                  <a href="/commands">
                     <Button variant="ghost">Comandos</Button>
                  </a>
                  <a href="/support">
                     <Button variant="ghost">Suporte</Button>
                  </a>
               </div>
               <a href="/signin"><Button><LogIn />Entrar</Button></a>
            </div>
         </div>
      </div>
   </div>

   <div class="flex flex-col gap-10 h-full w-full justify-center ml-10">
      <div class="flex flex-col gap-6">
         <h1
            style="font-weight: 900; font-size: 5rem; line-height: 90px;"
            class="text-white"
         >
            Serial :: Seu ajudante<br />Protogen.
         </h1>
         <h2 class="text-muted-foreground">
            Mais um bot de propósito geral para o <i>Discord</i>, porém<br
            />peludo e com nanites.
         </h2>
      </div>
      <div>
         <!-- Put the correct link to add the bot -->
         <Button class="w-48"><Plus />Me adicione!</Button>
      </div>
   </div>

   <div class="absolute bottom-4 left-1/2 -translate-x-1/2">
      <a href="https://github.com/wynvern"
         ><p class="text-xs text-muted-foreground">
            Desenvolvido por wynvern
         </p></a
      >
   </div>
</div>
