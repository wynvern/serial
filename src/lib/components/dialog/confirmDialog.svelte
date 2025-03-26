<script>
   import { Check, X } from "@lucide/svelte";
   import Button from "../ui/button/button.svelte";
   import { Dialog, DialogContent } from "../ui/dialog";

   export let open = false;
   export let title = "Confirmar";
   export let message = "Tem certeza que deseja realizar esta ação?";
   export let variant = "default";
   export let onResult;
</script>

<Dialog {open}>
   <DialogContent>
      <div>
         <h2>{title}</h2>
         <p>{message}</p>
      </div>
      <div class="w-full flex items-center justify-end gap-2">
         <Button on:click={() => onResult(false)} variant="outline"
            ><X />Cancelar</Button
         >
         <Button
            on:click={() => onResult(true)}
            variant={variant === "destructive" ? "destructive" : "default"}
            ><Check />Confirmar</Button
         >
      </div>
   </DialogContent>
</Dialog>
