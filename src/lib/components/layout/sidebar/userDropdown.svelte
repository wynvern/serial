<script>
   import { goto } from "$app/navigation";
   import { showConfirm } from "$lib/components/dialog/showConfirmDialog";
   import {
      DropdownMenu,
      DropdownMenuTrigger,
      DropdownMenuContent,
      DropdownMenuSeparator,
      DropdownMenuItem,
   } from "$lib/components/ui/dropdown-menu";
   import { DoorOpen } from "lucide-svelte"; // or your icon library

   async function handleLogout() {
      const confirm = await showConfirm({
         title: "Confirmar",
         message: "Tem certeza que deseja sair?",
         variant: "destructive",
      });

      if (confirm) {
         document.cookie = "";
         goto("/");
      }
   }

   export let session;
</script>

<DropdownMenu>
   <DropdownMenuTrigger>
      <img
         class="h-7 rounded-full"
         src={`https://cdn.discordapp.com/avatars/${session.user.id}/${session.user.avatar}?size=128`}
         alt="discord-user-avatar"
      />
   </DropdownMenuTrigger>
   <DropdownMenuContent class="min-w-48">
      <div class="p-1 flex items-center gap-2">
         <img
            class="h-10 rounded"
            src={`https://cdn.discordapp.com/avatars/${session.user.id}/${session.user.avatar}?size=128`}
            alt="discord-user-avatar"
         />
         <div class="flex flex-col">
            <b class="text-sm">{session.user.global_name}</b>
            <p class="text-xs text-muted-foreground">
               {session.user.username}
            </p>
         </div>
      </div>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="text-red-400" on:click={handleLogout}>
         <DoorOpen />
         Sair
      </DropdownMenuItem>
   </DropdownMenuContent>
</DropdownMenu>
