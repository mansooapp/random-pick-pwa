<script lang="ts">
  import Dialog, { Actions } from '@smui/dialog';
  import { candidates } from '@/store/candidates';
  import { openAddItemFlg } from '@/store/modal';

  export let open = false;

  let inputValue = '';

  openAddItemFlg.subscribe(() => {
    open = $openAddItemFlg;
  });

  function addItem(event) {
    event.stopPropagation();

    if (event.key === 'Enter') {
      if (inputValue.indexOf(';') > -1) {
        const items = inputValue.split(';').map(item => ({
          k: decodeURI(item),
          v: item
        })).filter(item => item.v);
        $candidates = [
          ...$candidates,
          ...items
        ];
      } else {
        $candidates = [ ...$candidates, { k: decodeURI(inputValue), v: inputValue } ];
      }

      $openAddItemFlg = false;
      inputValue = '';
    }
  }

  function handleClose(event) {
    event.stopPropagation();

    $openAddItemFlg = false;
    inputValue = '';
  }
</script>

<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
  on:click={handleClose}
  on:focusout={handleClose}
>
  <Actions on:click={event => event.stopPropagation()} on:keypress={addItem} on:close={handleClose} on:closed={handleClose} on:unescape={handleClose} on:escape={handleClose}>
    <input class='add-input' type="text" bind:value={inputValue} />
  </Actions>
</Dialog>

<style>
.add-input {
  width: 100%;
  height: 30px;
  outline: none;
}
</style>