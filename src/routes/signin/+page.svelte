<script lang="ts">
   import Button from "$lib/components/ui/button/button.svelte";
</script>

<div class="flex w-full h-dvh items-center justify-center">
   <div class="absolute top-0 left-0 p-6"><a href="/">Voltar</a></div>

   <div class="flex gap-4 flex-col">
      <div>
         <h1>Serial :: Sign in</h1>
         <p class="text-muted-foreground">Para utilizar a aplicacao e tudo de bom, faca login</p>
      </div>
      <div class="border rounded min-w-[500px] p-4 px-8 flex flex-col gap-2">
         <a href="/api/auth">
            <Button class="w-full flex gap-4"><img class="h-4 darkmode-image" src="/icons/discord-logo-white.svg" alt="discord-logo"/><b>Entrar com o Discord</b></Button>
         </a>
      </div>
      <a href="" class="text-muted-foreground">Problemas com o login?</a>
   </div>
</div>