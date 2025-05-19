<script lang="ts">
  import * as Card from '$lib/components/ui/card'
  import { api } from '$lib/api'
  import { createQuery } from '@tanstack/svelte-query'

  type TotalTasksResponse = {
    totalTasks: number
  }

  async function fetchTotalTasks() {
    const res = await api.tasks['total-tasks'].$get()
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await res.json()
    return { totalTasks: data.total }
  }

  const query = createQuery<TotalTasksResponse>({
    queryKey: ['get-total-tasks'],
    queryFn: fetchTotalTasks
  })
</script>

<Card.Root class="w-[350px] m-auto">
  <Card.Header>
    <Card.Title>Total Tasks</Card.Title>
    <Card.Description>The total amount of tasks you have</Card.Description>
  </Card.Header>
  <Card.Content>
    <div>
      {#if $query.isPending}
        Loading...
      {/if}
      {#if $query.error}
        An error has occurred:
        {$query.error.message}
      {/if}
      {#if $query.isSuccess}
        <div>
          <p class="text-2xl font-bold">
            {$query.data.totalTasks}
          </p>
          <p class="text-sm text-muted-foreground">
            tasks
          </p>
        </div>
      {/if}
    </div>
  </Card.Content>
</Card.Root>