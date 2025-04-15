<script lang="ts">
  import SettingOption from "$lib/components/layout/setting/settingOption.svelte";
  import SettingPageTitle from "$lib/components/layout/setting/settingPageTitle.svelte";
  import SettingSave from "$lib/components/layout/setting/settingSave.svelte";
  import SettingSeparator from "$lib/components/layout/setting/settingSeparator.svelte";
  import SelectTextChannel from "$lib/components/ui/customSelect/selectTextChannel.svelte";
  import Switch from "$lib/components/ui/switch/switch.svelte";
  import { Textarea } from "$lib/components/ui/textarea";

  const { data } = $props();

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
      JSON.stringify(join) !== JSON.stringify(data.join) ||
      JSON.stringify(leave) !== JSON.stringify(data.leave)
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
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  }
</script>

<div class="h-full min-h-full">
  <SettingPageTitle
    title="Entrada/Saída"
    description="Configurações de mensagens de entrada e saída."
  />

  <SettingOption
    title="Mensagem de Entrada"
    description="Mensagem enviada quando um membro entra no servidor."
  >
    <Switch bind:checked={join.enabled} />
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

  <SettingSeparator />

  <!-- Leave Message Settings -->
  <SettingOption
    title="Mensagem de Saída"
    description="Mensagem enviada quando um membro sai do servidor."
  >
    <Switch bind:checked={leave.enabled} />
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

  <SettingSave hasChanges={hasChanges()} onSave={saveChanges} />
</div>
