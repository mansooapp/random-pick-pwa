<script>
  export let data;
  export let show;

  import MapButton from '@/components/MapButton.svelte';
</script>

<div class="item">
  <span>{data}</span>

  <MapButton show={show} />
</div>

<style>
.item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: gray;
  font-weight: 900;
}

.item>span {
  font-size: 4rem;
  display: flex;
  justify-content: center;
  text-align: center;
  font-weight: bolder;
  color: #dddddd;
}
</style>