let offlineInstalled = false

export default function installOfflinePlugin() {
  if (process.env.OFFLINE_SUPPORT && process.browser && !offlineInstalled) {
    const OfflinePlugin = require('offline-plugin/runtime') // eslint-disable-line global-require

    OfflinePlugin.install({
      onUpdateReady() {
        OfflinePlugin.applyUpdate()
      },
      onUpdated() {
        window.location.reload()
      }
    })
    offlineInstalled = true
  }
}
