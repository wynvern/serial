<script>
  /**
   * @type {string} Title of the setting
   */
  export let title;

  /**
   * @type {string} Description of what the setting does
   */
  export let description = "";

  /**
   * @type {boolean} Whether to display items in a row instead of column
   */
  export let row = false;

  /**
   * @type {boolean} Whether the setting is disabled
   */
  export let disabled = false;

  $: console.log("disabled", disabled);
</script>

<div
  class="flex justify-between items-center gap-4 p-4 border-b border-gray-200"
  class:items-start={row}
  class:flex-col={row}
  class:opacity-50={disabled}
>
  <div class="flex flex-col">
    <b class="text-primary">{title}</b>
    <p class="text-sm">{description}</p>
  </div>
  <div class:w-full={row}>
    <slot></slot>
  </div>
</div>
