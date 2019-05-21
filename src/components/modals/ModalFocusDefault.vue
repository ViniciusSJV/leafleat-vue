<template>
  <transition name="modal-fade">
    <div class="modal-focus-backdrop">
      <div class="modal-focus" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">

        <header class="modal-header" id="modalTitle">
          <slot name="header">

          </slot>
        </header>

        <section class="modal-body" id="modalDescription">
          <slot name="body">

          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">

          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'ModalFocusDefault'
}

</script>

<style>

  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }

  .modal-focus-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999999999;
  }

  .modal-focus {
    position: relative;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #999;
    border: 1px solid rgba(0,0,0,.2);
    max-height: 80%;
    min-width: 452px;
    outline: 0;
    box-shadow: 0 3px 9px rgba(0,0,0,.5);
  }

  .modal-focus .modal-header,
  .modal-focus .modal-footer {
    padding: 12px;
    display: flex;
  }

  .modal-focus .modal-footer {
    background-color: white;
  }

  .modal-focus .modal-header {
    background-color: #33b5e5;
    color: white;
    font-weight: 600;
    -webkit-box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  .modal-focus .modal-footer {
    border-top: none;
    justify-content: flex-end;
  }

  .modal-focus .modal-body {
    position: relative;
    padding: 0px;
    max-height: 330px;
    overflow-y: scroll;
  }

  .actionModal {
    border: 1px solid #4285f4;
    background-color: #4285f4;
    cursor: pointer;
    color: #fff;
    font-size: 11px;
    font-weight: bold;
    height: 27px;
    padding: 0 8px;
    text-transform: uppercase;
    line-height: 27px;
    border-radius: 2px;
    -webkit-transition: all 0.218s;
    transition: all 0.218s;
    display: inline-block;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    margin: 0;
    padding: 8px 30px;
    -webkit-box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
}

.closeModal {
    background-color: white;
    border: 2px solid #4285f4;
    color: #4285f4;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 11px;
    font-weight: bold;
    height: 27px;
    padding: 0 8px;
    text-transform: uppercase;
    line-height: 27px;
    border-radius: 2px;
    -webkit-transition: all 0.218s;
    transition: all 0.218s;
    display: inline-block;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    margin: 0;
    padding: 7px 30px;
    -webkit-box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
}

</style>
