<script lang="ts">
   import Button from "$lib/components/ui/button/button.svelte";
</script>

<div class="flex w-full h-dvh items-center justify-center">
   <div class="absolute top-0 left-0 p-6 text-muted-foreground">
      <a href="/">Voltar</a>
   </div>

   <div class="flex gap-6 flex-col">
      <div>
         <h1>Serial :: Sign in</h1>
         <p class="text-muted-foreground">
            Para utilizar a aplicacao e tudo de bom, faca login
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
      <a href="" class="text-muted-foreground">Problemas com o login?</a>
   </div>
</div>
