export function getConfirmStatus() {
  return new Promise((resolve) => {
    const observer = new MutationObserver((mutations) => {
      console.log('---  mutations  ---\n', mutations)
      for (const mutation of mutations) {
        console.log(
          '---  mutation.addedNodes  ---\n',
          JSON.stringify(mutation.addedNodes, null, 2),
        )
        for (const addedNode of mutation.addedNodes) {
          if (addedNode.id === 'okBtn') {
            addedNode.addEventListener('click', () => {
              resolve(true)
              observer.disconnect() // Stop observing after click
            })
          } else if (addedNode.id === 'cancelBtn') {
            addedNode.addEventListener('click', () => {
              resolve(false)
              observer.disconnect() // Stop observing after click
            })
          }
        }
      }
    })

    observer.observe(document.body, { childList: true, subtree: true }) // Observe entire body for changes
  })
}

export const getTimeoutConfirmStatus = () =>
  new Promise((res) => {
    setTimeout(() => {
      const okBtn = document.querySelector('#okBtn')
      const cancelBtn = document.querySelector('#cancelBtn')
      console.log('---  okBtn  ---\n', okBtn)
      console.log('---  cancelBtn  ---\n', cancelBtn)
      okBtn?.addEventListener('click', () => {
        console.log('点击确认')
        res(true)
      })
      cancelBtn?.addEventListener('click', () => {
        console.log('点击取消')
        res(false)
      })
    }, 500)
  })

export const getIntervalConfirmStatus = () =>
  new Promise((res) => {
    let i = 0
    const interval = setInterval(() => {
      console.log('执行查询', i++)

      const okBtn = document.querySelector('#okBtn')
      const cancelBtn = document.querySelector('#cancelBtn')
      console.log('---  okBtn,cancelBtn  ---\n', okBtn, cancelBtn)

      if (okBtn && cancelBtn) {
        // 按钮找到后清除轮询定时器
        clearInterval(interval)

        // 添加事件监听器
        okBtn.addEventListener('click', () => {
          res(true)
        })

        cancelBtn.addEventListener('click', () => {
          res(false)
        })
      }
    }, 100) // 每 100ms 检查一次
  })
