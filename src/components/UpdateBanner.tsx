// UpdateBanner.tsx
import { useRegisterSW } from 'virtual:pwa-register/react'

export default function UpdateBanner() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(swUrl) {
      console.log('SW registered:', swUrl)
    },
    onRegisterError(error) {
      console.error('SW registration failed:', error)
    },
  })

  if (!needRefresh) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-yellow-500 text-black p-3 text-center">
      <span>New version available.</span>
      <button
        className="ml-3 bg-black text-white px-3 py-1 rounded"
        onClick={() => {
          updateServiceWorker(true)
          setNeedRefresh(false)
        }}
      >
        Reload
      </button>
    </div>
  )
}
