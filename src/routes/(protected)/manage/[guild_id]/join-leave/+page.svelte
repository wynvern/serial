<script lang="ts">
   import SettingOption from "$lib/components/layout/setting/settingOption.svelte";
   import SettingPageTitle from "$lib/components/layout/setting/settingPageTitle.svelte";
   import SettingSave from "$lib/components/layout/setting/settingSave.svelte";
   import Button from "$lib/components/ui/button/button.svelte";
   import SelectTextChannel from "$lib/components/ui/customSelect/selectTextChannel.svelte";
   import {
      Popover,
      PopoverTrigger,
      PopoverContent,
   } from "$lib/components/ui/popover";
   import Switch from "$lib/components/ui/switch/switch.svelte";
   import { Textarea } from "$lib/components/ui/textarea";
   import { FlaskConical, Play, Send } from "@lucide/svelte";

   const { data } = $props();

   let originalData = data;

   let join = $state({
      enabled: data.join.enabled,
      message: data.join.message,
      channelId: data.join.channelId,
   });

   let leave = $state({
      enabled: data.leave.enabled,
      message: data.leave.message,
      channelId: data.leave.channelId,
   });

   function hasChanges() {
      return (
         JSON.stringify(join) !== JSON.stringify(originalData.join) ||
         JSON.stringify(leave) !== JSON.stringify(originalData.leave)
      );
   }

   async function saveChanges() {
      console.log("Join Settings:", join);
      console.log("Leave Settings:", leave);

      try {
         const response = await fetch(`/api/guild/${data.guild.id}/setting`, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${data.session.user.access_token}`,
            },
            body: JSON.stringify({
               join,
               leave,
            }),
         });

         if (!response.ok) {
            throw new Error("Failed to save settings");
         }

         const result = await response.json();
         console.log("Settings saved successfully:", result);

         window.location.reload();
      } catch (error) {
         console.error("Error saving settings:", error);
      }
   }

   async function sendTestMessage() {
      try {
         const response = await fetch(`/api/guild/${data.guild.id}/test/join`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${data.session.user.access_token}`,
            },
         });

         if (!response.ok) {
            throw new Error("Failed to send test message");
         }

         const result = await response.json();
         console.log("Test message sent successfully:", result);
      } catch (error) {
         console.error("Error sending test message:", error);
      }
   }

   async function sendLeaveMessage() {
      try {
         const response = await fetch(
            `/api/guild/${data.guild.id}/test/leave`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${data.session.user.access_token}`,
               },
            },
         );

         if (!response.ok) {
            throw new Error("Failed to send test message");
         }

         const result = await response.json();
         console.log("Test message sent successfully:", result);
      } catch (error) {
         console.error("Error sending test message:", error);
      }
   }
</script>

<div class="h-full min-h-full">
   <SettingPageTitle
      title="Entrada/Saída"
      description="Configurações de mensagens de entrada e saída."
   />

   <div class="pb-4">
      <SettingOption
         title="Mensagem de Entrada"
         description="Mensagem enviada quando um membro entra no servidor."
      >
         <div class="flex gap-4 items-center">
            <Popover>
               <PopoverTrigger disabled={!join.enabled}>
                  <Button
                     class="p-2"
                     size="sm"
                     variant="outline"
                     disabled={!join.enabled}
                  >
                     <FlaskConical />
                  </Button>
               </PopoverTrigger>
               <PopoverContent>
                  <div class="flex flex-col gap-4">
                     <span>
                        <b>Testar mensagem</b>
                        <p class="text-xs text-muted-foreground">
                           Clique no botão abaixo para testar a mensagem de
                           entrada com o conteúdo atual.
                        </p>
                     </span>
                     <Button onclick={sendTestMessage}><Send />Testar</Button>
                  </div>
               </PopoverContent>
            </Popover>
            <Switch bind:checked={join.enabled} />
         </div>
      </SettingOption>

      <SettingOption
         title="Canal"
         description="Canal onde a mensagem de entrada será enviada."
         disabled={!join.enabled}
         row
      >
         <SelectTextChannel
            channels={data.channels}
            bind:selected={join.channelId}
            placeholder="Selecione um canal de entrada"
         />
      </SettingOption>

      <SettingOption
         title="Conteúdo da Mensagem de Entrada"
         description="Conteúdo da mensagem enviada quando um membro entra no servidor."
         disabled={!join.enabled}
         row
      >
         <Textarea
            class="w-full"
            bind:value={join.message}
            disabled={!join.enabled}
         />
         <ul class="text-xs mt-2 list-disc list-inside">
            <p class="mb-1">Abaixo estão os placeholders existentes:</p>
            <li><strong>{`{guild_name}`}</strong>: Nome do servidor.</li>
            <li><strong>{`{user_name}`}</strong>: Nome do usuário.</li>
            <li><strong>{`{user_mention}`}</strong>: Menção ao usuário.</li>
            <li>
               <strong>{`{member_count}`}</strong>: Número total de membros no
               servidor.
            </li>
         </ul>
      </SettingOption>
   </div>

   <div>
      <!-- Leave Message Settings -->
      <SettingOption
         title="Mensagem de Saída"
         description="Mensagem enviada quando um membro sai do servidor."
      >
         <div class="flex gap-4 items-center">
            <Popover>
               <PopoverTrigger disabled={!join.enabled}>
                  <Button
                     class="p-2"
                     size="sm"
                     variant="outline"
                     disabled={!join.enabled}
                  >
                     <FlaskConical />
                  </Button>
               </PopoverTrigger>
               <PopoverContent>
                  <div class="flex flex-col gap-4">
                     <span>
                        <b>Testar mensagem</b>
                        <p class="text-xs text-muted-foreground">
                           Clique no botão abaixo para testar a mensagem de
                           saída com o conteúdo atual.
                        </p>
                     </span>
                     <Button onclick={sendLeaveMessage}><Send />Testar</Button>
                  </div>
               </PopoverContent>
            </Popover>
            <Switch bind:checked={leave.enabled} />
         </div>
      </SettingOption>

      <SettingOption
         title="Canal"
         description="Canal onde a mensagem de saída será enviada."
         disabled={!leave.enabled}
         row
      >
         <SelectTextChannel
            channels={data.channels}
            bind:selected={leave.channelId}
         />
      </SettingOption>

      <SettingOption
         title="Conteúdo da Mensagem de Saída"
         description="Conteúdo da mensagem enviada quando um membro sai no servidor."
         disabled={!leave.enabled}
         row
      >
         <Textarea
            class="w-full"
            bind:value={leave.message}
            disabled={!leave.enabled}
         />
         <ul class="text-xs mt-2 list-disc list-inside">
            <p class="mb-1">Abaixo estão os placeholders existentes:</p>
            <li><strong>{`{guild_name}`}</strong>: Nome do servidor.</li>
            <li><strong>{`{user_name}`}</strong>: Nome do usuário.</li>
            <li><strong>{`{user_mention}`}</strong>: Menção ao usuário.</li>
            <li>
               <strong>{`{member_count}`}</strong>: Número total de membros no
               servidor.
            </li>
         </ul>
      </SettingOption>
   </div>

   <SettingSave hasChanges={hasChanges()} onSave={saveChanges} />
</div>
