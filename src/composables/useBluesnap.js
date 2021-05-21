import { reactive, readonly, onMounted, provide, inject, toRefs } from "vue"

const isBrowser = typeof window !== undefined
export const bluesnapFields = Symbol("bluesnapFields")
export const bluesnapState = Symbol("bluesnapState")
const state = reactive({
  initialized: false,
  loading: false,
  cardType: "",
  cardData: ""
})
const fields = reactive({
  ccn: {
    focus: false,
    error: ""
  },
  cvv: {
    focus: false,
    error: ""
  },
  exp: {
    focus: false,
    error: ""
  }
})
export function initBluesnap(
  token,
  callbacks = {
    setupComplete: () => {},
    threeDsChallengeExecuted: () => {},
    onBlur: (tagId) => {},
    onFocus: (tagId) => {},
    onError: (tagId, errorCode) => {},
    onType: (tagId, cardType, cardData) => {},
    onEnter: (tagId) => {},
    onValid: (tagId) => {}
  },
  style = {}
) {
  if (!isBrowser || !window.bluesnap || state.initialized) {
    return
  }

  state.loading = true
  function setupComplete() {
    state.loading = false
    if (callbacks.setupComplete) {
      callbacks.setupComplete.apply(this, arguments)
    }
  }
  function threeDsChallengeExecuted() {
    if (callbacks.threeDsChallengeExecuted) {
      callbacks.threeDsChallengeExecuted.apply(this, arguments)
    }
  }
  function onFocus(tagId) {
    fields[tagId].focus = true
    if (callbacks.onFocus) {
      callbacks.onFocus.apply(this, arguments)
    }
  }
  function onBlur(tagId) {
    fields[tagId].focus = false
    if (callbacks.onBlur) {
      callbacks.onBlur.apply(this, arguments)
    }
  }
  function onError(tagId, errorCode, errorDescription) {
    console.log("error code", errorCode)
    console.log("error description", errorDescription)
    fields[tagId].error = errorCode
    if (callbacks.onError) {
      callbacks.onError.apply(this, arguments)
    }
  }
  function onType(tagId, cardType, cardData) {
    state.cardType = cardType
    state.cardData = cardData
    if (callbacks.onType) {
      callbacks.onType.apply(this, arguments)
    }
  }
  function onEnter(tagId) {
    if (callbacks.onEnter) {
      callbacks.onEnter.apply(this, arguments)
    }
  }
  function onValid(tagId) {
    if (callbacks.onValid) {
      callbacks.onValid.apply(this, arguments)
    }
  }

  onMounted(() => {
    window.bluesnap.hostedPaymentFieldsCreate({
      token,
      onFieldEventHandler: {
        setupComplete,
        threeDsChallengeExecuted,
        onFocus,
        onBlur,
        onError,
        onType,
        onEnter,
        onValid
      },
      style
    })
    state.initialized = true
  })

  provide(bluesnapFields, readonly(fields))
  provide(bluesnapState, readonly(state))
}

export function useBluesnap() {
  const fields = inject(bluesnapFields)
  const state = inject(bluesnapState)

  return {
    ...toRefs(fields),
    ...toRefs(state)
  }
}
