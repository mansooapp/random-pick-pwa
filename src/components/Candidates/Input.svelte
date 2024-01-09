<div class="columns margins">
  <div>
    <Textfield variant="outlined" bind:value={value} />

    <pre class="status">Value: {value}</pre>
  </div>
</div>

<script lang="ts">
  import Textfield from '@smui/textfield';

  type TInputValue = string | number | ReadonlyArray<string>;

  let value: TInputValue = '';
</script>