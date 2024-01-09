<script lang="ts">
  import Chips from '@/components/Candidates/Chips.svelte';
  import { candidates } from '@/store/candidates';
</script>

<div class="candidates">
  <Chips keyed={$candidates} />
</div>

<style>
.candidates {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 10px;
}

.tag {
  height: 30px;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  background: green;
  font-weight: 900;
}
</style>