<script>
   import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
   export let guild;
</script>

<Popover>
   <PopoverTrigger>
      <slot></slot>
   </PopoverTrigger>
   <PopoverContent>
      {guild.name}
   </PopoverContent>
</Popover>
