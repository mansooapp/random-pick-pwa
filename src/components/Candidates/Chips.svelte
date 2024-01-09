<Set chips={keyed} let:chip key={(chip) => chip.k} input>
  <Chip {chip} shouldFocusPrimaryActionOnClick={false} shouldRemoveOnTrailingIconClick={false} on:click={event => event.stopPropagation()}>
    <span class='chip-label'>{chip.v}</span>
    <TrailingAction on:click={(event) => delChip(event, chip)} icon$class="material-icons">cancel</TrailingAction>
  </Chip>
</Set>

<Dialog />

<script lang="ts">
  import Chip, { Set, TrailingAction } from '@smui/chips';
  import Dialog from '@/components/Candidates/Dialog.svelte';
  import { candidates } from '@/store/candidates';

  export let keyed:any = [];

  function delChip(event: any, val: any) {
    event.stopPropagation();
    $candidates = $candidates.filter(item => item.k !== val.k);
  }
</script>

<style>
.chip-label {
  font-weight: 900;
}
</style>