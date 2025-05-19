<script lang="ts">
  import "./app.css";
  import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query'
  import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools'
  import TotalTasksCard from '$lib/components/TotalTasksCard.svelte'

  const queryClient = new QueryClient()
</script>

<QueryClientProvider client={queryClient}>
  <main>
    <TotalTasksCard />
  </main>
  <SvelteQueryDevtools />
</QueryClientProvider>

