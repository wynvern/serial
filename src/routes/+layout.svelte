<script>
  const { children } = $props();
  import "../app.css";
</script>

<main class="w-full min-h-screen">
   {@render children()}
</main>