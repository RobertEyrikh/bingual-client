<template>
  <div class="loading-wrapper">
    <div id="block_1" class="barlittle"></div>
    <div id="block_2" class="barlittle"></div>
    <div id="block_3" class="barlittle"></div>
    <div id="block_4" class="barlittle"></div>
    <div id="block_5" class="barlittle"></div>
  </div>
</template>

<style scoped>
.loading-wrapper {
  padding: 30px;
  display: flex;
  justify-content: center;
}
.barlittle {
  background-color: #ffa500;
  width: 10px;
  height: 10px;
  float: left;
  margin-left: 5px;
  opacity: 0.1;
  -moz-transform: scale(0.7);
  -webkit-transform: scale(0.7);
  -moz-animation: move 1s infinite linear;
  -webkit-animation: move 1s infinite linear;
}
#block_1 {
  -moz-animation-delay: 0.4s;
  -webkit-animation-delay: 0.4s;
}
#block_2 {
  -moz-animation-delay: 0.3s;
  -webkit-animation-delay: 0.3s;
}
#block_3 {
  -moz-animation-delay: 0.2s;
  -webkit-animation-delay: 0.2s;
}
#block_4 {
  -moz-animation-delay: 0.3s;
  -webkit-animation-delay: 0.3s;
}
#block_5 {
  -moz-animation-delay: 0.4s;
  -webkit-animation-delay: 0.4s;
}
@-moz-keyframes move {
  0% {
    -moz-transform: scale(1.2);
    opacity: 1;
  }
  100% {
    -moz-transform: scale(0.7);
    opacity: 0.1;
  }
}
@-webkit-keyframes move {
  0% {
    -webkit-transform: scale(1.2);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0.7);
    opacity: 0.1;
  }
}
</style>
