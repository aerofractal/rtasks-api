<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  let count: number = $state(0)
  const increment = () => {
    count += 1
  }
  const decrement = () => {
    count -= 1
  }
</script>

<div class="flex flex-col bg-background max-w-md m-auto gap-y-5">
  <Button onclick={increment}>
    up
  </Button>
  <Button onclick={decrement}>
    down
  </Button>
  <p>
    {count}
  </p>
</div>