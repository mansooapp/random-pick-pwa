<div class="app">
  <div class="container">
    <div class="box" tabindex="0" role="button" bind:this={boxRef} on:click={roll} on:keypress={roll} aria-label="click">
      {#if showBtns}
        <CandidatesComponent />

        <div class="btns">
          <button class='clear-btn' on:click={event => clearAllItems(event)}>clear</button>
          <button class='add-btn' on:click={event => addItem(event)}></button>
        </div>
      {/if}

      {#if !flg}
        <Item data={initialValue} show={show} />
      {:else}
        {#each rolls as item}
          <Item data={item} show={show} />
        {/each}
      {/if}
    </div>
  </div>
</div>

<script lang="ts">
  import { onMount } from 'svelte';
  import Item from '@/components/Item/Item.svelte';
  import CandidatesComponent from '@/components//Candidates/Candidates.svelte';

  import { candidates } from '@/store/candidates';
  import { openAddItemFlg } from '@/store/modal';

  interface ICandidate {
    k: number;
    v: string;
  };

  interface ICandidates extends Array<ICandidate>{};

  let show: boolean = false;
  let showBtns: boolean = true;
  let foods: ICandidates = [
    { k: 1, v: "자장면" },
    { k: 2, v: "돈가스" },
    { k: 3, v: "피자" },
    { k: 4, v: "햄버거" },
    { k: 5, v: "스파게티" },
    { k: 6, v: "냉모밀" },
    { k: 7, v: "부대찌게" },
    { k: 8, v: "칼국수" },
    { k: 9, v: "스테이크" },
    { k: 10, v: "초밥" }
  ];

  const initialValue = 'RANDOM PICK';
  let boxRef: HTMLElement;
  const itemHeight: number = document.body.clientHeight;
  let flg: boolean = false;
  let rolls = [];

  onMount(() =>  {
    try {
      const prev = window.localStorage.getItem('prev-items');
      if (prev !== null && prev !== '') {
        $candidates = JSON.parse(prev);
      } else {
        $candidates = foods;
      }
    } catch (e) {
      console.error('parse error');
      $candidates = foods;
    }
  });

  candidates.subscribe(() => {
    console.table($candidates);
  });

  function init() {
    window.localStorage.setItem('prev-items', JSON.stringify($candidates));

    const items: string[] = $candidates.map(item => item.v);
    const MAX_ITEMS: number = 20;
    rolls = [ ...items ];
    for (let i=0; i<MAX_ITEMS / items.length - 1; i++) {
      rolls = [ ...rolls, ...items ];
    }
    rolls = shuffle(rolls);
    console.log(rolls);

    boxRef.style.transitionDuration = `0s`;
    boxRef.style.transform = `translateY(-${itemHeight * (rolls.length - 1)}px)`;


    // Initialize transition events
    boxRef.addEventListener("transitionstart", function() {
      showBtns = false;

      document.querySelectorAll('.item').forEach((item: HTMLElement) => (item.style.filter = 'blur(1px)'));
      boxRef.removeEventListener("click", roll);
    }, {
      once: true
    });
    boxRef.addEventListener("transitionend", function() {
      document.querySelectorAll('.item').forEach((item: HTMLElement) => (item.style.filter = 'blur(0)'));
      boxRef.addEventListener("click", roll);

      setTimeout(() => {
        showBtns = true;
      }, 500);
    }, {
      once: true
    });
  }

  function shuffle([ ...arr ]) {
    return arr.sort(() => Math.random() - 0.5);
  }

  function roll() {
    if ($candidates.length < 2) {
      alert('Please add items');
      return;
    }

    init();

    flg = true;

    setTimeout(function() {
      boxRef.style.transitionDuration = `3s`;
      boxRef.style.transform = `translateY(0)`;
    }, 100);
  }

  function addItem(event: any) {
    event.stopPropagation();
    $openAddItemFlg = true;
  }

  function clearAllItems(event: any) {
    event.stopPropagation();
    $candidates = [];
  }
</script>

<style>
.app {
  width: 100dvw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* padding: 0 0 50px 0; */
}

.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.box {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  list-style: none;
  padding: 0;
  margin: 0;
  transition: transform 1s ease-in-out;
}

.btns {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: right;
  position: absolute;
  bottom: 0px;
}

.add-btn {
  clip-path: polygon(0 33%, 35% 33%, 35% 0%, 66% 0, 66% 33%, 100% 33%, 100% 66%, 66% 66%, 66% 100%, 35% 100%, 35% 66%, 0 66%);
  width: 30px;
  height: 40px;
  z-index: 11111;
  display: block;
  background-color: #fff;
  margin-right: 10px;
  outline: none;
}

/* .x-btn {
  clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
  width: 30px;
  height: 40px;
} */

.clear-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 45px;
  font-weight: 900;
  z-index: 11111;
  background-color: transparent;
  margin: 0;
  padding: 5px 10px;
  text-transform: uppercase;
  outline: none;
}
</style>