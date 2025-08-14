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
   import { DoorOpen, Sidebar } from "@lucide/svelte";
   import { goto } from "$app/navigation";
   import { showConfirm } from "$lib/components/dialog/showConfirmDialog";

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

<div class="w-full flex justify-between items-center h-14 border-b">
   <div class="flex items-center h-full">
      <div class="flex items-center h-full ml-3 mr-6 gap-3">
         <Button class="p-1" variant="ghost">
            <Sidebar />
         </Button>
         <div class="h-full border-r"></div>
      </div>
      <Breadcrumb>
         <BreadcrumbList>
            <BreadcrumbItem>Home</BreadcrumbItem>
         </BreadcrumbList>
      </Breadcrumb>
   </div>
   <div></div>
</div>
