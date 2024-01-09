<script>
  export let show = false;
	import Modal from '@/components/Modal/Modal.svelte';

	let showModal = false;
</script>

{#if show}
<button on:click={event => {
  showModal = true;
  event.stopPropagation();
}}>어떻게 가나요?</button>
{/if}

<Modal bind:showModal />

<style>
  button {
    position: absolute;
    height: 80px;
    border-radius: 40px;
    bottom: 80px;
    font-weight: 900;
    font-size: 2rem;
    text-align: center;
    background-color: #eeeeee;
    color: RGBA(77, 78, 74, 1.00);
    outline: none;
    text-align: center;
    bottom: 100px;
  }
</style>