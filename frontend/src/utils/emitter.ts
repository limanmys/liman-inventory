import { getCurrentInstance, type ComponentInternalInstance } from "vue"

export default function useEmitter() {
    const internalInstance = getCurrentInstance() as ComponentInternalInstance
    const emitter = internalInstance.appContext.config.globalProperties.emitter

    return emitter
}