// toast组件特殊的地方在于，不是通过<Toast/>方法调用的，而是函数的形式调用
//参考文献：https://segmentfault.com/a/1190000009863702

import React, { Component } from 'react'
import Notification from './Notification/index'
import classNames from 'classnames'
//始终保持一个notification   -----单例模式
let newNotification
const getNewNotification = () => {
  if (!newNotification) {
    newNotification = Notification.reWrite()
  }
  return newNotification
}

const notice = (content, type, icon, duration = 30000, onClose, mask = true) => {
  let notificationInstance = getNewNotification();
  notificationInstance.notice({
    duration,
    mask,
    content: <div className={
      classNames(['toast-box',
        { 'info': type === 'info' },
        { 'success': type === 'success' },
        { 'warning': type === 'warning' },
        { 'error': type === 'error' }
      ])
    }>
      <div className="toast-content">{content}</div>
    </div>,
    onClose: () => { if (onClose) { onClose() } }
  })
}

export default {
  show(content, duration, icon, mask, onClose) {
    return notice(content, undefined, icon, duration, onClose, mask)
  },
  success(content, duration, icon, mask, onClose) {
    return notice(content, 'success', icon, duration, onClose, mask)
  },
  hide() {
    if (newNotification) {
      newNotification.destroy();
      newNotification = null
    }
  }
}
