<script lang="ts">
   import {
      Breadcrumb,
      BreadcrumbItem,
      BreadcrumbList,
   } from "$lib/components/ui/breadcrumb";
   import Button from "$lib/components/ui/button/button.svelte";
   import {
      DropdownMenu,
      DropdownMenuTrigger,
   } from "$lib/components/ui/dropdown-menu";
    import DropdownMenuContent from "$lib/components/ui/dropdown-menu/dropdown-menu-content.svelte";
    import DropdownMenuItem from "$lib/components/ui/dropdown-menu/dropdown-menu-item.svelte";
    import DropdownMenuSeparator from "$lib/components/ui/dropdown-menu/dropdown-menu-separator.svelte";
   import { DoorOpen, Sidebar, SidebarClose } from "@lucide/svelte";

   export let session;

   console.log(session);
</script>

<div class="w-full h-14 flex justify-between items-center">
   <div class="flex items-center gap-4">
      <Button class="p-1" variant="ghost">
         <Sidebar />
      </Button>
      <div class="h-6 border-r"></div>
      <Breadcrumb>
         <BreadcrumbList>
            <BreadcrumbItem>Home</BreadcrumbItem>
         </BreadcrumbList>
      </Breadcrumb>
   </div>
   <div>
      <DropdownMenu>
         <DropdownMenuTrigger>
            <img
               class="h-10 rounded-full"
               src={`https://cdn.discordapp.com/avatars/${session.user.discord_id}/${session.user.avatar}?size=128`}
               alt="discord-user-avatar"
            />
         </DropdownMenuTrigger>
         <DropdownMenuContent class="min-w-48">
               <div class="p-1 flex items-center gap-2">
                  <img
               class="h-10 rounded-full"
               src={`https://cdn.discordapp.com/avatars/${session.user.discord_id}/${session.user.avatar}?size=128`}
               alt="discord-user-avatar"
            />
                  <div class="flex flex-col">
                     <b>{session.user.global_name}</b>
                     <i>{session.user.username}</i>
                  </div>
               </div>
               <DropdownMenuSeparator/>
            <DropdownMenuItem class="text-red-400">
               <DoorOpen/>
               Sair
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   </div>
</div>
