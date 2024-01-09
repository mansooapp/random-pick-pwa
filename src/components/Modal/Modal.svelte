<script>
	export let showModal; // boolean

  import MapImage from '@/assets/map.jpeg';

	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<img alt="map" src={MapImage} />
<!--  -->
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}></button>
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
    padding: 0;
    width: 90%;
    height: 70%;
    background-color: transparent;
    overflow: hidden;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		/* padding: 1em; */
    width: 100%;
    height: 100%;
	}
  dialog > div > img {
    width: 100%;
    height: 90%;
    object-fit: contain;
  }
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
    position: absolute;
    float: right;
    top: 15px;
    right: 15px;
    border-radius: 20px;
    background-color: #fff;
    width: 50px;
    height: 50px;
    clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
    outline: none;
	}
</style>
