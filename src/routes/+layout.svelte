<script>
const { children } = $props();

import "@fontsource/inter";
import "../app.css";
</script>

<main class="w-full min-h-screen">
   {@render children()}
</main>