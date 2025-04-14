<script lang="ts">
  import { deserialize } from "$app/forms";
  import SettingOption from "$lib/components/layout/setting/settingOption.svelte";
  import SettingPageTitle from "$lib/components/layout/setting/settingPageTitle.svelte";
  import SettingSave from "$lib/components/layout/setting/settingSave.svelte";
  import SettingSeparator from "$lib/components/layout/setting/settingSeparator.svelte";
  import Switch from "$lib/components/ui/switch/switch.svelte";
  import { Textarea } from "$lib/components/ui/textarea";
  import type { ActionResult } from "@sveltejs/kit";

  const { data } = $props();

  console.log(data);

  let join = data.join;
  let leave = data.leave;

  async function saveChanges() {
    // Implement your save logic here
    console.log("Changes saved!");
  }
</script>

<div>
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
    title="Conteúdo da Mensagem de Entrada"
    description="Conteúdo da mensagem enviada quando um membro entra no servidor."
    row
  >
    <Textarea class="w-full" bind:value={join.message} />
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

  <SettingOption
    title="Mensagem de Saída"
    description="Mensagem enviada quando um membro sai do servidor."
  >
    <Switch bind:checked={leave.enabled} />
  </SettingOption>
  <SettingOption
    title="Conteúdo da Mensagem de Saída"
    description="Conteúdo da mensagem enviada quando um membro sai no servidor."
    row
  >
    <Textarea class="w-full" bind:value={leave.message} />
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

  <SettingSave
    hasChanges={true}
    onSave={() => {
      console.log("protogens are cool");
    }}
  />
</div>
