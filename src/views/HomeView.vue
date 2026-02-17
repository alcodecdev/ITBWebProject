<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import TitleAndSubtitle from "@/components/TitleAndSubtitle.vue";
import Button from "@/components/Button.vue";
import Footer from "@/components/layout/Footer.vue";
import '../assets/styles/coloursAndAnimation.css'

const router = useRouter()
const { t } = useI18n()


const goToList = () =>{
  router.push('/list')
}

const goToForm = () => {
  router.push('/form')
}
</script>

<template>
  <div class="bg-light text-white min-vh-100 d-flex flex-column w-100">

    <main class="flex-grow-1 d-flex align-items-center">
      <div class="container py-5">
        <div class="text-center mb-5">
          <TitleAndSubtitle
              class="textoOscuro"
              :title="$t('home.titol')"
              titleClass="display-2 fw-bolder mb-0"
          />

          <div class="row justify-content-center mt-5 px-3">
            <div class="col-12 col-md-8 col-lg-5">

              <div class="col-12 mb-5">
                <Button
                    @click="goToForm"
                    id="buttonHome"
                    clase="btn btn-success text-white btn-lg py-5 border-0 shadow d-flex flex-column align-items-center justify-content-center btn-main w-100"
                    claseSpan="display-6 fw-bold text-uppercase"
                    :nombreSpan="$t('home.enviar')"
                />
              </div>

              <div class="col-12">
                <Button
                    @click="goToList"
                    id="buttonHome"
                    clase="btn btn-success text-white btn-lg py-5 border-0 shadow d-flex flex-column align-items-center justify-content-center btn-list w-100"
                    claseSpan="display-6 fw-bold text-uppercase"
                    :nombreSpan="$t('home.llista')"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>

</style>