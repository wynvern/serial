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

<div class="w-full h-14 flex justify-between items-center px-6">
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
          class="h-10 rounded"
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
  </div>
</div>
