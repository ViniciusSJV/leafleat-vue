<template>
  <transition name="modal-fade">
    <div id="modal-default" class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">

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
  name: 'ModalDefault'
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

  .modal-backdrop {
    position: fixed;
    top: 50px;
    right: 8px;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    z-index: 999999999;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  #modal-default .modal-header,
  #modal-default .modal-footer {
    padding: 15px;
    display: flex;
  }

  #modal-default .modal-header {
    background-color: #33b5e5;
    color: white;
    font-weight: 600;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
    justify-content: space-between;
  }

  #modal-default .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  #modal-default .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  #modal-default .body-div{
    margin-bottom: 12px;
  }

  #modal-default .modal-body label {
    color:#0078a8;
  }

  #modal-default .modal-body span {
    color: #37474F;
    font-weight: 500;
  }

  #modal-default .separado {
    margin-top: 15px;
  }

  #modal-default .modal-footer label, .modal-footer span {
    color: #37474F;
  }

  #modal-default .progress-modal {
    display: block;
    width: 100%;
    margin: 5px 0px;
  }

  #modal-default .progress-modal > div {
    width: 100%;
    height: 10px;
    margin: 1px 0px;
    background-color: #f1f1f1!important;
  }

  #modal-default .progress-modal .progressPorcent {
    background-color: #8BC34A;
    height: 100%;
    font-size: 9px;
    text-align: center;
    color: white;
    max-width: 100%;
  }

  #modal-default .progressPorcent.danger {
    background-color: #FF5722;
  }

  #modal-default .progressPorcent.alert {
    background-color: #FFC107;
  }

</style>
