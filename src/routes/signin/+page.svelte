<script lang="ts">
   import Noise from "$lib/components/layout/generic/noise.svelte";
   import Button from "$lib/components/ui/button/button.svelte";
</script>

<div class="flex w-full h-dvh items-center justify-center">
   <Noise />

   <div class="absolute top-0 left-48 p-6 text-muted-foreground">
      <a href="/">Voltar</a>
   </div>

   <div class="flex gap-8 flex-col items-center">
      <div class="flex items-center flex-col gap-2">
         <h1>Serial :: Entrar</h1>
         <p class="text-muted-foreground text-center">
            Para utilizar a aplicação e aproveitar todos os<br />recursos, faça
            login.
         </p>
      </div>
      <a href="/api/auth">
         <Button class="w-96 flex gap-4"
            ><img
               class="h-4 darkmode-image"
               src="/icons/discord-logo-white.svg"
               alt="discord-logo"
            /><b>Entrar com o Discord</b></Button
         >
      </a>
      <a href="" class="text-muted-foreground text-xs">Problemas com o login?</a
      >
   </div>
</div>
